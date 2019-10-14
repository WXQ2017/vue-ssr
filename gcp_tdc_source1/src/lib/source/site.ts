const siteInfo = {
  DEV: {
    remote: "shuwen.test.trial.link:18081",
    local: "192.168.1.70:8100",
    appID: "xxx",
    protocol: "http:",
  },
  TEST: {
    remote: "shuwen.test.trial.link:18081",
    local: "180.167.88.250:14080",
    appID: "xxx",
    protocol: "http:",
  },
  UAT: {
    remote: "uat.trial.link:18080",
    local: "lbnweb.haveoo.com",
    protocol: "http:",
  },
  MASTER: {
    remote: "trial.link",
    local: "lbnweb.xylbn.cn",
    protocol: "https:",
  },
};

export function getSiteInfo() {
  const hostname = window.location.hostname;
  const test = hostname.match(/test/);
  const uat = hostname.match(/uat/);
  const master = hostname.match(/trial.link/);
  if (test) {
    return siteInfo["UAT"];
  } else if (uat) {
    return siteInfo["TEST"];
  } else if (master) {
    return siteInfo["MASTER"];
  } else {
    return siteInfo["DEV"];
  }
}
