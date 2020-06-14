import { queryZhl,clearData, fetchSalesData} from '@/services/yuce';
import moment from 'moment';

export default {
  namespace: 'yuce',

  state: {
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
        // var x = parseInt(temp["x"]);
        console.log("temp[\"x\"]1" , temp["x"]);
        // var datex = moment(new Date(x)).format('MM-DD');
        // temp["x"] = x;
        var y1 = temp["y1"];
        temp["y1"] = parseInt(y1);
        var y2 = temp["y2"];
        temp["y2"] = parseInt(y2);
        var y3 = temp["y3"];
        temp["y3"] = parseInt(y3);
        var y4 = temp["y4"];
        temp["y4"] = parseInt(y4);
        // console.log("temp[\"x\"]2" , temp["x"]);
        newarr.push(temp);
      }
      console.log("offlineChartData ", newarr );
      console.log("offlineData ", payload.offlineData );
      return {
        ...state,
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
