import { saveSettings } from '@/services/hotel';
import {message} from "antd/lib/index";

export default {
  namespace: 'hotel',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *saveSettings({ payload }, { call }) {
      console.log("payload -----> ", payload);
      yield call(saveSettings, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    save(state, action) {
        return {
        ...state,
        data: action.payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
        pagination: action.pagination
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
        pagination: action.pagination
      };
    },
  },
};
