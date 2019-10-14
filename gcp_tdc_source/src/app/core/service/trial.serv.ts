import { BaseService } from "./base.serv";
interface ITrialService {
  tiralSum(): Promise<any>;
}
export default class TrialService extends BaseService implements ITrialService {
  public tiralSum() {
    return this.proxyHttp.post("tiralSum", {});
  }
}
