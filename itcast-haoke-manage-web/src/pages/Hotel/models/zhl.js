import { queryZhl,clearData, fetchSalesData} from '@/services/zhl';

export default {
  namespace: 'zhl',

  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    zhlOfflineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      console.log("models, fetch", call, put)
      const response = yield call(queryZhl);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(queryZhl);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
    *clear(_, { call, put }) {
      const response = yield call(clearData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      var offlinechartdataarr = payload.offlineChartData;
      var newarr = new Array();
      for(var i=0;i<offlinechartdataarr.length;i++) {
        var temp = offlinechartdataarr[i];
        var y1 = temp["y1"];
        temp["y1"] = parseInt(y1);
        var y2 = temp["y2"];
        temp["y2"] = parseInt(y2);
        var y3 = temp["y3"];
        temp["y3"] = parseInt(y3);
        var y4 = temp["y4"];
        temp["y4"] = parseInt(y4);
        newarr.push(temp);
      }
      console.log("newarr after ", newarr );
      return {
        ...state,
        visitData: payload.visitData,
        visitData2: payload.visitData2,
        salesData: payload.salesData,
        searchData: payload.searchData,
        offlineData: payload.offlineData,
        offlineChartData: offlinechartdataarr,
        salesTypeData: payload.salesTypeData,
        salesTypeDataOnline: payload.salesTypeDataOnline,
        salesTypeDataOffline: payload.salesTypeDataOffline,
        radarData: [],
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        zhlOfflineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
