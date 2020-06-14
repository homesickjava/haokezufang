import React, { PureComponent, Modal } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Button,
  Tooltip
} from 'antd';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Pie, WaterWave, Gauge, TagCloud } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import CountDown from '@/components/CountDown';
import ActiveChart from '@/components/ActiveChart';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Authorized from '@/utils/Authorized';
import styles from './Monitor.less';

const { Secured } = Authorized;
const FormItem = Form.Item;
const { Option } = Select;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 300);
});

@Secured(havePermissionAsync)
@connect(({ guanjianci, loading }) => ({
  guanjianci,
  loading: loading.models.guanjianci,
}))
class Guanjianci extends PureComponent {
  componentDidMount() {
    console.log("componentDidMount,componentDidMount，componentDidMount")
    const { dispatch } = this.props;
    dispatch({
      type: 'guanjianci/fetchPicPath',
    });
  }

  handleChange = () => {

  }

  render() {
    const { guanjianci, loading } = this.props;
    const { tags } = guanjianci;
    const { picsrc } = guanjianci;

    return (
      <GridContent>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title={
                <FormattedMessage
                  id="hotel.zhuanhualv.qingkuang"
                  defaultMessage="Real-Time Trading Activity"
                />
              }
              bordered={false}
            >
              <Row>
                <Form onSubmit={this.handleSearch} layout="inline">
                  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                      <FormItem label="酒店选择">
                          <Select placeholder="请选择" style={{ width: '100%' }} onChange={this.handleChange}>
                            <Option value="欧铂">欧铂</Option>
                            <Option value="华美达">华美达</Option>
                            <Option value="汤臣洲际">汤臣洲际</Option>
                            <Option value="亚朵">亚朵</Option>
                          </Select>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </Row>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={
                      <FormattedMessage
                        id="hotel.good.pinglun.ration"
                        defaultMessage="好评率"
                      />
                    }
                    suffix="元"
                    total="98%"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={
                      <FormattedMessage
                        id="hotel.bad.pinglun.ration"
                        defaultMessage="差评率"
                      />
                    }
                    total="3%"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={
                      <FormattedMessage
                        id="hotel.reply.pinglun.ration"
                        defaultMessage="回复率"
                      />
                    }
                    total="10%"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={
                      <FormattedMessage
                        id="hotel.pinglun.fenshu"
                        defaultMessage="点评分数"
                      />
                    }
                    suffix="分"
                    total={numeral(4.8).format('0.0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip
                  title={
                    <FormattedMessage
                      id="app.monitor.waiting-for-implementation"
                      defaultMessage="Waiting for implementation"
                    />
                  }
                >
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                    alt="map"
                  />
                </Tooltip>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Row>
              <Card
                title={
                  <FormattedMessage
                    id="hotel.kerenyinx.keyword"
                    defaultMessage="客人印象关键词"
                  />
                }
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <img src={picsrc}></img>
              </Card>
            </Row>
            <Row>
            <Card
              title={
                <FormattedMessage
                  id="hotel.maidian.wajue"
                  defaultMessage="酒店卖点挖掘"
                />
              }
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <img src={picsrc}></img>
            </Card>
            </Row>

            <Row>
            <Card
              title={
                <FormattedMessage
                  id="hotel.tongdian.wajue"
                  defaultMessage="酒店痛点挖掘"
                />
              }
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <img src={picsrc}></img>
            </Card>
            </Row>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Guanjianci;
