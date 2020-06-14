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

const ctExtra3 = ['去哪儿', '携程', '美团', '艺龙'];
const hotelname = ['欧铂', '华美达', '汤臣洲际', '朵亚'];

/* eslint react/no-multi-comp:0 */
@connect(({ pltablelist, loading }) => ({
  pltablelist,
  loading: loading.models.pltablelist,
}))
@Form.create()
class PLTableList extends PureComponent {
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
      dataIndex: 'hotelname',
    },
    {
      title: '点评平台',
      dataIndex: 'ctExtra3',
    },
    {
      title: '点评时间',
      dataIndex: 'ctExtra',
    },
    {
      title: '评论人昵称',
      dataIndex: 'nickname',
    },
    {
      title: '情感分析',
      dataIndex: 'dpNlp',
    },
    {
      title: '点评内容',
      dataIndex: 'jsContentall',
    },
    {
      title: '回复时间',
      dataIndex: 'replyTime',
    },
    {
      title: '回复人',
      dataIndex: 'ctOfficeReply2',
    },
    {
      title: '回复内容',
      dataIndex: 'ctOfficeReply',
    },
    {
      title: '客人印象',
      dataIndex: 'cttitle2',
    },

  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pltablelist/fetch',
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
      type: 'pltablelist/fetch',
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
      type: 'pltablelist/fetch',
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
        type: 'pltablelist/fetch',
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
          <Col md={6} sm={24}>
            <FormItem label="日期选择">
              {getFieldDecorator('ctExtra', {})(
                <DatePicker
                  style={{ width: '100%' }}
                  showTime
                  format="YYYY-MM-DD"
                  placeholder="选择日期"
                />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="平台选择">
              {getFieldDecorator('ctExtra3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="去哪儿">去哪儿</Option>
                  <Option value="携程">携程</Option>
                  <Option value="美团">美团</Option>
                  <Option value="艺龙">艺龙</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="酒店选择">
              {getFieldDecorator('hotelname')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="欧铂">欧铂</Option>
                  <Option value="华美达">华美达</Option>
                  <Option value="汤臣洲际">汤臣洲际</Option>
                  <Option value="亚朵">亚朵</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
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
      pltablelist: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="酒店评论">
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

export default PLTableList;
