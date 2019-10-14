// aviod mutiple init class
import { ICommon, Common, createCommon } from "./common";
import {
  ConfigAdapter,
  createConfigAdapter,
  IConfigAdapter,
  IServerConfig,
  IApiConfig,
} from "./config";
import { IProxyHttp, ProxyHttp, createProxyHttp } from "./fetch";

export abstract class Factory {
  public static common: ICommon;
  public static proxyHttp: IProxyHttp;
  public static configAdapter: IConfigAdapter;

  public static createProxyHttp(): IProxyHttp {
    if (!this.proxyHttp) {
      this.proxyHttp = createProxyHttp(ProxyHttp);
    }
    return this.proxyHttp;
  }
  public static createCommon() {
    if (!this.common) {
      this.common = createCommon(Common);
    }
    return this.common;
  }
  /**
   * 使用时传参创建
   * @param apiConfig api配置
   * @param serverConfig 服务器配置
   * @param mockData 模拟数据配置
   */
  public static createConfigAdapter(
    apiConfig?: IApiConfig,
    serverConfig?: IServerConfig,
  ) {
    if (!this.configAdapter) {
      console.dir(serverConfig);
      if (!!apiConfig && !!serverConfig) {
        this.configAdapter = createConfigAdapter(
          ConfigAdapter,
          apiConfig,
          serverConfig,
        );
      } else {
        throw new Error("config init fail!!");
      }
    }
    return this.configAdapter;
  }
}
