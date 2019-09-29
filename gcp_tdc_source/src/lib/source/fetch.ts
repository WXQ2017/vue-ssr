import React from "react";
import { Common } from "./common";
const common = new Common();

export const HEAD_TOKEN = "HEAD_TOKEN";
const promiseXHR = (type, apiKey, data) => {
  const url = common.dealWithUrl(apiKey, type);
  console.log(url);
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    if (typeof data === "object") {
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      data = JSON.stringify(data);
    } else {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("version", "1.0.0");
    const headToken = sessionStorage.getItem(HEAD_TOKEN);
    if (headToken != null) {
      xhr.setRequestHeader("accessToken", headToken);
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.responseText);
        }
      }
    };
    xhr.send(data);
  });
};
export default promiseXHR;
