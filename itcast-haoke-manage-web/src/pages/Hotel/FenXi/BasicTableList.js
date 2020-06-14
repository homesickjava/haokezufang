import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const pingtai = ['去哪儿', '携程', '美团', '艺龙'];
const hotelName = ['欧铂', '华美达', '汤臣洲际', '朵亚'];

/* eslint react/no-multi-comp:0 */
@connect(({ basictablelist, loading }) => ({
  basictablelist,
  loading: loading.models.basictablelist,
}))
@Form.create()
class BasicTableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: '酒店名称',
      dataIndex: 'hotelName',
    },
    {
      title: '平台',
      dataIndex: 'pingtai',
    },
    {
      title: '排名',
      dataIndex: 'paiming',
    },
    {
      title: '开业年份',
      dataIndex: 'openYear',
    },
    {
      title: '商圈',
      dataIndex: 'shangquan',
    },
    {
      title: '图片数',
      dataIndex: 'picNum',
    },
    {
      title: '房间数',
      dataIndex: 'roomNum',
    },
    {
      title: '评论数',
      dataIndex: 'pinglunNum',
    },
    {
      title: '用户推荐',
      dataIndex: 'tuijian',
    },
    {
      title: '评分',
      dataIndex: 'pingfen',
    },
    {
      title: '价格',
      dataIndex: 'price',
    }
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'basictablelist/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'basictablelist/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'basictablelist/fetch',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      console.log("fieldsValue -->", fieldsValue);
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'basictablelist/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="平台选择">
              {getFieldDecorator('pingtai')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="去哪儿">去哪儿</Option>
                  <Option value="携程">携程</Option>
                  <Option value="美团">美团</Option>
                  <Option value="艺龙">艺龙</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="酒店选择">
              {getFieldDecorator('hotelName')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="欧铂">欧铂</Option>
                  <Option value="华美达">华美达</Option>
                  <Option value="汤臣洲际">汤臣洲际</Option>
                  <Option value="亚朵">亚朵</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      basictablelist: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="酒店信息">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicTableList;
