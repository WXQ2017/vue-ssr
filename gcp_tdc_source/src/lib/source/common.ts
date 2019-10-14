import { IConfigAdapter, ConfigAdapter } from "./config";
import { Factory } from "./factory";
import { apiConfig, serverConfig } from "../../app/config";
export interface ICommon {
  /**
   * 去两端空格
   * @param s 字符串
   * @return 字符串
   */
  trim(s: string): string;
  /**
   * 处理路径
   * @param apiKey Api的配置key
   * @param method HTTP method (e.g. 'GET', 'POST', etc)
   */
  dealWithUrl(apiKey: string, method: string): string;
}
export type ICommonConstructor = new () => ICommon;
export function createCommon(ctor: ICommonConstructor): ICommon {
  return new ctor();
}

export class Common {
  private configAdapter: IConfigAdapter;

  constructor() {
    this.configAdapter = Factory.createConfigAdapter(apiConfig, serverConfig);
  }
  public dealWithUrl(apiKey = "", method = "GET"): string {
    let api = "";
    let url = apiKey;
    method = method.toLocaleLowerCase();
    api = this.getApi(method, apiKey);
    if (api === "") {
      return api;
    }
    if (api.indexOf(":") !== -1) {
      url = "{PROTOCOL}//{DOMAIN}{HOST}{API}";
      const path = api.split(":");
      path[0] = this.trim(path[0]);
      path[1] = this.trim(path[1]);
      
      const host: any = this.configAdapter.hosts[path[0]];
      const domain =
        host && host.domain ? host.domain : this.configAdapter.domain;
      url = url
        .replace(
          /\{PROTOCOL}/,
          this.configAdapter.protocol || location.protocol,
        )
        .replace(/\{DOMAIN}/, domain)
        .replace(/\{HOST}/, host.dir)
        .replace(/\{API}/, path[1]);
    } else {
      url = api;
    }
    return url;
  }
  public getApi(method: string, apiName: string): string {
    if (apiConfig[method] && apiConfig[method][apiName]) {
      return apiConfig[method][apiName];
    }
    return apiName;
  }
  public trim(s: string): string {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  }
}
