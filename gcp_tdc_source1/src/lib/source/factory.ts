// aviod mutiple init class
import { ICommon } from "./common";
import {
  ConfigAdapter,
  createConfigAdapter,
  IConfigAdapter,
  IServerConfig,
  IApiConfig,
} from "./config";

export abstract class Factory {
  public static common: ICommon;
  // public static proxyHttp: IProxyHttp;
  public static configAdapter: IConfigAdapter;
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
      if (!!apiConfig && !!serverConfig) {
        this.configAdapter = createConfigAdapter(ConfigAdapter, apiConfig);
      } else {
        throw new Error("config init fail!!");
      }
    }
    return this.configAdapter;
  }
}
