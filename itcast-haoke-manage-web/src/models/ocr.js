import { queryResourceGet, ocrAndSearch, payForAnswer,queryPicSearchList,freshTKList} from '@/services/ocr';

export default {
  namespace: 'ocr',


  state: {
    list: [],
    pageurl: '',
    currentPage:0,
    total:0,
    pagination:{},
    data:[1,2,3],
    maxNum:3,
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
    *queryFakeList({ payload }, { call, put }) {
      const response = yield call(payForAnswer, payload);
      yield put({
        type: 'payForAnswer',
        payload: response,
      });
    },
    *picupload({ payload }, { call, put }) {
      console.log("picupload ", payload)
      const response = yield call(queryPicSearchList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *freshTKList({ payload }) {
      console.log("freshTKListaaa ", payload)
      const response = yield call(kkk, payload);
      yield put({
        type: 'freshAAAList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      console.log("action.payload : ", action.payload) //会引发血光之灾的打印语句
      return {
        ...state,
        list: action.payload.list,
        // currentPage: action.payload.pagination.pageSize + state.currentPage
        // total : action.payload.pagination.pageSize + state.count,
      };
    },
    freshList: function(state, result) { //state是更新之前的状态数据
        console.log("-----------------state is---------------------- " , state)
         console.log("-----------------result is---------------------- " , result)
        return {
          ...state,
          list : result.payload.response.list,
        }
      console.log("-----------------state.list is---------------------- " ,state.list)
      console.log("-----------------list is---------------------- " ,list)

    },
    freshAAAList: function(state, result) { //state是更新之前的状态数据
      console.log("freshAAAList-----------------state is---------------------- " , state)
      console.log("freshAAAList-----------------result is---------------------- " , result)
      return {
        ...state,
        list : result.payload.response.list,
      }
      console.log("freshAAAList-----------------state.list is---------------------- " ,state.list)
      console.log("freshAAAList-----------------list is---------------------- " ,list)

    },
    // fetch: function(state, result) {
    //     console.log("cccccccccccccccccc");
    // },
      appendList(state, action) {
      console.log("****************&&&*************", action.payload)
      console.log("****************&&&*************", action.payload.list)
      console.log("***************&&&**************", action.count)
      return {
        ...state,
        list: state.list.concat(action.payload.list),
        currentPage: action.payload.pagination.current + state.currentPage
      };
    },
    queryOcrList(state, action) {
      return {
        ...state,
        list: action.payload.list,
        // currentPage: action.payload.pagination.pageSize + state.currentPage
      };
    },
    payForAnswer(state, action) {
      console.log("payForAnswer action",action)
      return {
        ...state,
        pageurl: action.payload.pageurl,
      };
    },
  },
};
