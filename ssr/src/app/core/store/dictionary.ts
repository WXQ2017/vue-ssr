// tslint:disable:max-classes-per-file
import { Action, ActionContext, ActionTree } from "vuex";
import { Services } from "../factory.serv";
import {
  // SGV-BUILD-STORE-IMPORT # NOT DELETE
  DictionaryTypeCode,
} from "./mutationTypes";

/**
 * 接口返回的对象
 */
export interface IDictionary {
  code: string;
  id: number;
  name: string;
}

/**
 * 以code索引的字典
 */
interface IDictionaryByCode {
  [code: string]: IDictionary;
}

const commonService = Services.createCommonService();

class DictionaryState {
  [key: string]: IDictionary[];
  // SGV-BUILD-STORE-INTERFACE # NOT DELETE
  constructor() {
    for (const key in DictionaryTypeCode) {
      if (DictionaryTypeCode.hasOwnProperty(key)) {
        const name = DictionaryTypeCode[key];
        this[name] = [];
      }
    }
  }
}

const mutations = {
  // SGV-BUILD-STORE-MUTATIONS # NOT DELETE
  setDictionary(
    state: DictionaryState,
    { typeCode, list }: { typeCode: DictionaryTypeCode; list: IDictionary[] },
  ) {
    state[typeCode] = list;
  },
};

const actions = {
  /**
   * 获取字典
   */
  async actionDictionary(
    { commit, state }: ActionContext<DictionaryState, any>,
    typeCode: DictionaryTypeCode,
  ) {
    try {
      if (state[typeCode].length) {
        return Promise.resolve();
      }
      const list = await commonService.lookUpDictionary(typeCode);
      commit("setDictionary", { typeCode, list });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

const getters = {
  // SGV-BUILD-STORE-GETTERS # NOT DELETE
  getDictionary(state: DictionaryState) {
    return (typeCode: DictionaryTypeCode) => {
      const dict: IDictionaryByCode = {};
      for (const item of state[typeCode]) {
        dict[item.code] = item;
      }
      return dict;
    };
  },
  getDictOptions(state: DictionaryState) {
    return (typeCode: DictionaryTypeCode) => {
      return state[typeCode]
        .map((item: IDictionary) => {
          return { value: +item.code, label: item.name };
        });
    };
  },
  getDictOption(state: DictionaryState) {
    return (typeCode: DictionaryTypeCode, code: string) => {
      if (code !== "") {
        for (const dict of state[typeCode]) {
          if (dict.code === code + "") {
            return dict;
          }
        }
      }
      return {};
    };
  },
};

export default {
  actions,
  getters,
  mutations,
  state: new DictionaryState(),
};
