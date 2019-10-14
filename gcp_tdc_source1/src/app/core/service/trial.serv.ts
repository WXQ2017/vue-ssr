import promiseXHR from "../../../lib/source/fetch";
interface ITrialService {
  tiralSum(): Promise<any>;
}
export default class TrialService implements ITrialService {
  public tiralSum() {
    return promiseXHR("post", "tiralSum", {});
  }
}
