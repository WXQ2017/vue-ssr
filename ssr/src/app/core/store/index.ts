import { Message } from "element-ui";
import Vue from "vue";
import Vuex from "vuex";
import {HEADER_TOKEN, LOGIN_INFO } from "../constants";
import dictionary from "./dictionary";
import {
  LIMIT_HEAD_WIDTH,
  SET_ACCOUNT_INFO,
  SET_HAS_ASIDE,
  SET_HAS_HEAD,
} from "./mutationTypes";

Vue.use(Vuex);

const state = {
  accountInfo: {},
  hasAside: true,
  hasFooter: true,
  hasHeader: true,
  limitHeadWidth: true,
};
const info = sessionStorage.getItem(LOGIN_INFO);
if (info) {
  try {
    const accountInfo = JSON.parse(info);
    state.accountInfo = accountInfo;
  } catch (error) {
    Message.error(error);
  }
}
const vx =  new Vuex.Store<any>({
  modules: { dictionary },
  mutations: {
    [SET_ACCOUNT_INFO](store, val) {
      sessionStorage.setItem(HEADER_TOKEN, val.accessToken);
      sessionStorage.setItem(LOGIN_INFO, JSON.stringify(val));
      store.accountInfo = val;
    },
    [SET_HAS_HEAD](store, val) {
      store.hasHeader = val;
    },
    [SET_HAS_ASIDE](store, val) {
      store.hasAside = val;
    },
    [LIMIT_HEAD_WIDTH](store, val) {
      store.limitHeadWidth = val;
    },
  },
  state,
});
export function createStore () {
  return vx;
}
export default vx;