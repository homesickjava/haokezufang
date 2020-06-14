import { queryResourceGet, ocrAndSearch, payForAnswer} from '@/services/moni';

export default {
  namespace: 'moni',


  state: {
    list: [],
    pageurl: '',
  },


/*
  state: {
    data: {
      list: [],
      pagination: {},

    },
  },
*/

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryResourceGet, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryResourceGet, payload);
      yield put({
        type: 'appendList',
        payload: response,
      });
    },
    *fetchOcr({ payload }, { call, put }) {
      const response = yield call(ocrAndSearch, payload);
      yield put({
        type: 'queryOcrList',
        payload: response,
      });
    },
    *payAndGetAnswer({ payload }, { call, put }) {
      const response = yield call(payForAnswer, payload);
      yield put({
        type: 'payForAnswer',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
    queryOcrList(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },
    payForAnswer(state, action) {
      return {
        ...state,
        pageurl: action.payload.pageurl,
      };
    },
  },
};
