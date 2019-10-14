import React from "react";
import { Common, ICommon } from "./common";
import { Factory } from "./factory";
import { IConfigAdapter } from "./config";
import Axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

export const HEAD_TOKEN = "HEAD_TOKEN";
export interface IProxyHttp {
  /**
   * 代理get请求
   * @param api config定义的接口名
   * @param params 请求参数
   */
  get<T, K>(api: string, params?: K, path?: string[]): Promise<T>;
  /**
   * 代理put请求
   * @param api config定义的接口名
   * @param params 请求参数
   */
  put<T, K>(api: string, params?: K, path?: string[]): Promise<T>;
  /**
   * 代理post请求
   * @param api config定义的接口
   * @param params 请求参数
   */
  post<T, K>(api: string, params: K, path?: string[]): Promise<T>;
  /**
   * 代理delete请求
   * @param api config定义的接口
   * @param pathParams 请求参数
   */
  delete<T, K>(api: string, pathParams?: string[], data?: K | any): Promise<T>;
  form<T>(api: string, form: FormData): Promise<T>;
  getFile(url: string, headers?: any): Promise<{ data: Blob; type: any }>;
  /**
   * 初始化代理
   */
  initInterceptors(): void;
}

export type IProxyHttpConstructor = new () => IProxyHttp;

export function createProxyHttp(ctor: IProxyHttpConstructor): IProxyHttp {
  return new ctor();
}
export class ProxyHttp implements IProxyHttp {
  private configAdapter: IConfigAdapter;
  private common: ICommon;
  private reqInterceptor: any;
  private resInterceptor: any;
  private pending: Array<{ path: string; cancel: any }> = [];
  constructor() {
    this.common = Factory.createCommon();
    this.configAdapter = Factory.createConfigAdapter();
    this.initInterceptors();
  }
  public get<T, K>(api: string, params: K, path?: string[]): Promise<T> {
    let url = this.common.dealWithUrl(api, "GET");
    if (path) {
      const param = path.join("/");
      url += "/" + param;
    }
    return Axios.get(url, { params }).then<T>(this.fulfilled);
  }

  put<T, K>(api: string, data?: K, pathParams?: string[]): Promise<T> {
    let url = this.common.dealWithUrl(api, "PUT");
    if (pathParams) {
      const path = pathParams.join("/");
      url = url + "/" + path;
    }
    return Axios.put(url, data).then<T>(this.fulfilled);
  }

  public post<T, K>(api: string, data: K, path?: string[]): Promise<T> {
    let url = this.common.dealWithUrl(api, "POST");
    if (path) {
      const param = path.join("/");
      url += "/" + param;
    }
    return Axios.post(url, data).then<T>(this.fulfilled);
  }

  delete<T, K>(
    api: string,
    pathParams?: string[],
    data: K | any = {},
  ): Promise<T> {
    let url = this.common.dealWithUrl(api, "DELETE");
    if (pathParams) {
      url = url + "/" + pathParams.join("/");
    }
    return Axios.delete(url, {
      params: data,
    }).then<T>(this.fulfilled);
  }
  public form<T>(api: string, form: FormData): Promise<T> {
    const url = this.common.dealWithUrl(api, "POST");
    return Axios.post(url, form, {
      headers: { "Content-Type": undefined },
    }).then<T>(this.fulfilled);
  }

  getFile(url: string, headers: any = {}): Promise<{ data: Blob; type: any }> {
    return Axios.get(url, {
      headers,
      responseType: "blob",
    }).then((res: AxiosResponse) => {
      return new Promise<{ data: Blob; type: any }>((resolve, reject) => {
        resolve({ data: res.data, type: res.headers["content-type"] });
      });
    });
  }
  initInterceptors() {
    Axios.interceptors.request.eject(this.reqInterceptor);
    this.reqInterceptor = Axios.interceptors.request.use(
      config => {
        this.removePending(config);
        config.cancelToken = new Axios.CancelToken(c => {
          this.pending.push({
            cancel: c,
            path: [
              config.url,
              config.method,
              JSON.stringify(config.params),
              JSON.stringify(config.data),
            ].join(","),
          });
        });
        const headerToken =
          sessionStorage.getItem(HEAD_TOKEN) ||
          "GCP_SPONSOR_592607BD36EF45988E9BC9CE48758E17";
        if (headerToken) {
          config.headers["accessToken"] = headerToken;
        }

        config.headers["X-Requested-With"] = "XMLHttpRequest";
        config.headers["Content-Type"] = "application/json; charset=UTF-8";
        config.headers.version = config.headers.version || "1.0.0";
        return config;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      },
    );
    Axios.interceptors.response.eject(this.resInterceptor);
    this.resInterceptor = Axios.interceptors.response.use(
      response => {
        // console.log("response", JSON.stringify(response.config));
        this.removePending(response.config);
        return response;
      },
      error => {
        // console.log(error);
        if (error.response && error.response.data) {
          return Promise.reject(error.response.data);
        } else if (error instanceof Axios.Cancel) {
          const cancelError = new Error();
          cancelError.name = "Simultaneous Request";
          cancelError.message = "重复请求了接口 " + error.message;
          return Promise.reject(cancelError);
        } else {
          return Promise.reject(error);
        }
      },
    );
  }
  private fulfilled = <T>(res: AxiosResponse) => {
    const promise = new Promise<T>((resolve, reject) => {
      if (
        res.data.hasOwnProperty("status") &&
        res.data.status + "" === this.configAdapter.successCode
      ) {
        resolve(res.data.data);
      } else {
        if (this.configAdapter.failCallback) {
          this.configAdapter.failCallback(res.data, resolve, reject);
        } else {
          reject(res.data);
        }
      }
    });
    return promise;
  };
  private removePending(config: AxiosRequestConfig) {
    for (let i = 0; i < this.pending.length; i++) {
      const p = this.pending[i];
      if (
        p.path ===
        [
          config.url,
          config.method,
          JSON.stringify(config.params),
          JSON.stringify(config.data),
        ].join(",")
      ) {
        p.cancel(config.url);
        this.pending.splice(i--, 1);
      }
    }
  }
}
