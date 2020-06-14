// 代码中会兼容本地 service mock 以及部署站点的静态数据
import moment from "moment/moment";

export default {
  // 支持值为 Object 和 Array
  'GET /hotel/mock/zhuanhualv': function (req, res) {

// mock data
    const visitData = [];
    const beginDay = new Date().getTime();

    const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
    for (let i = 0; i < fakeY.length; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: fakeY[i],
      });
    }

    const visitData2 = [];
    const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
    for (let i = 0; i < fakeY2.length; i += 1) {
      visitData2.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: fakeY2[i],
      });
    }

    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }
    const searchData = [];
    for (let i = 0; i < 50; i += 1) {
      searchData.push({
        index: i + 1,
        keyword: `搜索关键词-${i}`,
        count: Math.floor(Math.random() * 1000),
        range: Math.floor(Math.random() * 100),
        status: Math.floor((Math.random() * 10) % 2),
      });
    }
    const salesTypeData = [
      {
        x: '家用电器',
        y: 4544,
      },
      {
        x: '食用酒水',
        y: 3321,
      },
      {
        x: '个护健康',
        y: 3113,
      },
      {
        x: '服饰箱包',
        y: 2341,
      },
      {
        x: '母婴产品',
        y: 1231,
      },
      {
        x: '其他',
        y: 1231,
      },
    ];

    const salesTypeDataOnline = [
      {
        x: '家用电器',
        y: 244,
      },
      {
        x: '食用酒水',
        y: 321,
      },
      {
        x: '个护健康',
        y: 311,
      },
      {
        x: '服饰箱包',
        y: 41,
      },
      {
        x: '母婴产品',
        y: 121,
      },
      {
        x: '其他',
        y: 111,
      },
    ];

    const salesTypeDataOffline = [
      {
        x: '家用电器',
        y: 99,
      },
      {
        x: '食用酒水',
        y: 188,
      },
      {
        x: '个护健康',
        y: 344,
      },
      {
        x: '服饰箱包',
        y: 255,
      },
      {
        x: '其他',
        y: 65,
      },
    ];

    const offlineData = [];
    for (let i = 0; i < 10; i += 1) {
      offlineData.push({
        name: `Stores ${i}`,
        cvr: Math.ceil(Math.random() * 9) / 10,
      });
    }

    const radarOriginData = [
      {
        name: '个人',
        ref: 10,
        koubei: 8,
        output: 4,
        contribute: 5,
        hot: 7,
      },
      {
        name: '团队',
        ref: 3,
        koubei: 9,
        output: 6,
        contribute: 3,
        hot: 1,
      },
      {
        name: '部门',
        ref: 4,
        koubei: 1,
        output: 6,
        contribute: 5,
        hot: 7,
      },
    ];

    const radarData = [];
    const radarTitleMap = {
      ref: '引用',
      koubei: '口碑',
      output: '产量',
      contribute: '贡献',
      hot: '热度',
    };
    radarOriginData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'name') {
          radarData.push({
            name: item.name,
            label: radarTitleMap[key],
            value: item[key],
          });
        }
      });
    });





    const zhlOfflineData = [];
    zhlOfflineData.push(
        {
          name: `曝光-浏览转化率`,
          cvr: Math.ceil(Math.random() * 9) / 10,
        });
    zhlOfflineData.push({
          name: `浏览-预定转化率`,
          cvr: Math.ceil(Math.random() * 9) / 10,
        });
    zhlOfflineData.push({
          name: `曝光-预定转化率`,
          cvr: Math.ceil(Math.random() * 9) / 10,
        });
    zhlOfflineData.push({
          name: `曝光-下单转化率`,
          cvr: Math.ceil(Math.random() * 9) / 10,
        })
    zhlOfflineData.push({
          name: `曝光-取消转化率`,
          cvr: Math.ceil(Math.random() * 9) / 10,
        });
    zhlOfflineData.push({
          name: `预定-取消转化率`,
          cvr: Math.ceil(Math.random() * 9) / 10,
        });
    for (let i = 0; i < 5; i += 1) {
      zhlOfflineData.push({
        name: `Zhuanhualv ${i}`,
        cvr: Math.ceil(Math.random() * 9) / 10,
      });
    }

    const offlineChartData = [];
    for (let i = 0; i < 7; i += 1) {
        offlineChartData.push({
        x: (new Date().getDay()+i)%7,
        y1: Math.floor(Math.random() * 100) + 10,
        y2: Math.floor(Math.random() * 100) + 10,
        y3: Math.floor(Math.random() * 100) + 10,
        y4: Math.floor(Math.random() * 100) + 10,
      });
    }
    for (let i = 0; i < 7; i += 1) {

    }


    const result = {
      list: [{"key":0,
        "disabled":true,
        "href":"https://ant.design",
        "avatar":"https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
        "name":"TradeCode 0",
        "title":"一个任务名称 0",
        "owner":"曲丽丽",
        "desc":"111这是一段描述",
        "callNo":903,
        "status":1,
        "updatedAt":"2017-06-30T16:00:00.000Z",
        "createdAt":"2017-06-30T16:00:00.000Z","progress":42}],
      pagination: {"total":46,"pageSize":10,"current":1},
    };

    const getFakeChartData = {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      zhlOfflineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
      radarData,
    };


    return res.json(getFakeChartData);
  }
};
