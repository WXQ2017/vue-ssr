import { IConfigAdapter, IProxyHttp, Factory } from "../../../lib/source";

export class BaseService {
  protected proxyHttp: IProxyHttp;
  protected configAdapter: IConfigAdapter;

  constructor() {
    this.proxyHttp = Factory.createProxyHttp();
    this.configAdapter = Factory.createConfigAdapter();
  }
}
