export interface IHost {
  domain?: string;
  dir: string;
}
/**
 * 站点信息
 */
export interface ISite {
  local: string;
  remote: string;
  appID?: string;
  protocol?: string;
}
/**
 * 主机、站点集合对象
 */
export declare interface IHosts {
  [key: string]: IHost;
}
export declare interface ISites {
  [key: string]: ISite;
}

/**
 * 服务器配置对象
 */
export interface IServerConfig {
  appKey: string[];
  // env: Env;
  debug: boolean;
  protocol: string;
  publicPath: string;
  sites: ISites;
  successCode: string;
  successCallback?: <T>(
    res: T,
    resolve: T | PromiseLike<T> | undefined,
    reject: any,
  ) => void;
  failCallback?: <T>(
    res: T,
    resolve: (value?: T | PromiseLike<T> | undefined) => void,
    reject: any,
  ) => void;
  isMock?: boolean;
  wXJsSign?: string;
  wXOAuth?: string;
  jsApiList?: string[];
}
/**
 * 接口配置对象
 */
export interface IApiConfig {
  [key: string]: any;
  /**
   * 主机信息
   */
  hosts: IHosts;
  /**
   * post 方式接口配置
   */
  post: { [key: string]: string };
  /**
   * get 方式接口配置
   */
  get: { [key: string]: string };
  /**
   * put 方式接口配置
   */
  put: { [key: string]: any };
  /**
   * delete 方式接口配置
   */
  delete: { [key: string]: any };
  /**
   * 各服务代理（可选）
   */
  serviceFactory?: any;
}
export interface IConfigAdapter {
  hosts: IHosts;
  protocol: string;
  domain: string;
}

export type IConfigAdapterConstructor = new (
  apiConfig: IApiConfig,
  serverConfig: IServerConfig,
) => IConfigAdapter;

export function createConfigAdapter(
  ctor: IConfigAdapterConstructor,
  apiConfig: IApiConfig,
  serverConfig: IServerConfig,
) {
  return new ctor(apiConfig, serverConfig);
}

export class ConfigAdapter implements IConfigAdapter {
  hosts: IHosts;
  protocol: string;
  domain: string;
  local: string;
  remote: string;
  appID?: string;
  constructor(siteInfo: ISite, apiConfig: IApiConfig) {
    this.hosts = apiConfig.hosts;
  }
  dealConfig() {
    this.local = siteInfo.local;
    this.remote = siteInfo.remote;
  }
}
