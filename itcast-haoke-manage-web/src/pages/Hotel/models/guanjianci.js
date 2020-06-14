import { getWordCloud , getWordCloudPic} from '@/services/guanjianci';

export default {
  namespace: 'guanjianci',

  state: {
    tags: [],
    picsrc: '',
  },

  effects: {
    *fetchTags(_, { call, put }) {
      // if(state.tags.length==0) {
        console.log("gjc,gjc,call")
        const response = yield call(getWordCloud);
        console.log("guanjianci response",response);
        yield put({
          type: 'saveTags',
          payload: response,
        });
      // }
    },

    *fetchPicPath(_, { call, put }) {
      // if(state.tags.length==0) {
      console.log("fetchPicPath,call")
      const response = yield call(getWordCloudPic);
      console.log("fetchPicPath response",response);
      yield put({
        type: 'savePicPath',
        payload: response,
      });
      // }
    },
  },

  reducers: {
    saveTags(state, action) {
      console.log("action.payload",action.payload);
      console.log("action.payload.list",action.payload.list);
      return {
        ...state,
        tags : action.payload.list,
      };
    },

    savePicPath(state, action) {
      console.log("savePicPath action.payload",action.payload);
      console.log("pic path ",action.payload.name);
      return {
        ...state,
        picsrc: action.payload.name,
      };
    },
  },
};
