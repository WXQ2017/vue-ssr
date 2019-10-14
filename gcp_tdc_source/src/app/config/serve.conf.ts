import { IServerConfig } from "../../lib/source/config";
import { getSiteInfo } from "../../lib/source/site";

export const serverConfig: IServerConfig = {
  appKey: [],
  debug: false,
  protocol: window.location.protocol,
  publicPath: "/",
  site: getSiteInfo(),
  successCode: "0",
};
