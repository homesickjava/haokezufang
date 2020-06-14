import { queryTags } from '@/services/api';

export default {
  namespace: 'monitor',

  state: {
    tags: [],
  },

  effects: {
    *fetchTags(_, { call, put }) {
      console.log("monitor  fetchTags ")
      const response = yield call(queryTags);
      console.log("monitor response",response)
      yield put({
        type: 'saveTags',
        payload: response.list,
      });
    },
  },

  reducers: {
    saveTags(state, action) {
      console.log("monitor action.payload",action.payload)
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};
