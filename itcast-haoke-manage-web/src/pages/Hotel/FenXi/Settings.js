import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Cascader } from 'antd';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Checkbox,
  AutoComplete
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Search = Input.Search;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
function onChange(value) {
  console.log(value);
}

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class Settings extends PureComponent {


  handleSubmit = e => {

    console.log("handleSubmit")
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //把values打印出来
        console.log("**********my values is *******", values)

        /*
        values.myhotelname = this.state.myhotelname;
        values.otherhotel1name = this.state.otherhotel1name;
        values.otherhotel2name = this.state.otherhotel2name;
        values.otherhotel3name = this.state.otherhotel3name;
        values.otherhotel4name = this.state.otherhotel4name;
        */

        dispatch({
          type: 'hotelsettings/fetch',
          payload: values,
        });
        // message.info("提交成功！");
      }
    });
  };

  handleSave = (value)=>{
    let arr = new Array();
    if(value.length > 0 ){
      estateMap.forEach((v, k) => {
        if(k.startsWith(value)){
          arr.push(k);
        }
      });
    }
    this.setState({
      estateDataSource: arr
    });
  } ;

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };



    return (
      <PageHeaderWrapper>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Card bordered={false} title="基础设置">
            <FormItem {...formItemLayout} label="城市设置: ">
              <Cascader options={options} onChange={onChange} />
            </FormItem>
            <FormItem {...formItemLayout} label="我的酒店:">
              {getFieldDecorator('myhotelname',{rules:[{ required: true, message:"此项为必填项" }]})(<Input style={{ width: '100%' }} value={this.state.myhotelname} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="同行酒店1:">
              {getFieldDecorator('otherhotel1name',{rules:[{ required: true, message:"此项为必填项" }]})(<Input style={{ width: '100%' }} value={this.state.otherhotel1name} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="同行酒店2:">
              {getFieldDecorator('otherhotel2name',{rules:[{ required: true, message:"此项为必填项" }]})(<Input style={{ width: '100%' }} value={this.state.otherhotel2name} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="同行酒店3:">
              {getFieldDecorator('otherhotel3name',{rules:[{ required: true, message:"此项为必填项" }]})(<Input style={{ width: '100%' }} value={this.state.otherhotel3name} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="同行酒店4:">
              {getFieldDecorator('otherhotel4name',{rules:[{ required: true, message:"此项为必填项" }]})(<Input style={{ width: '100%' }} value={this.state.otherhotel4name} />)}
            </FormItem>
          </Card>

          <Card bordered={false} title="账号信息">
            <FormItem {...formItemLayout} label="用户账号:">
              <InputGroup compact>
                <Input  style={{ width: '100%' }} value={this.state.name} />
              </InputGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="用户密码:">
              <InputGroup compact>
                <Input  style={{ width: '100%' }} value={this.state.passwd} />
              </InputGroup>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button>
            </FormItem>
          </Card>
        </Form>
      </PageHeaderWrapper >
    );
  }
}

export default Settings;
