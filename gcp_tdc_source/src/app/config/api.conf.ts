import { IApiConfig } from "../../lib/source/config";
export const apiConfig: IApiConfig = {
  hosts: {
    apiHost: { dir: "/gcp-tdc-api" },
  },
  post: {
    tiralSum: "apiHost:/homeSearch/trialCount",
  },
  get: {},
  put: {},
  delete: {},
};
