import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Card, Select, List, Tag, Upload, Icon, Modal, Row, Col, Button, Input, message } from 'antd';
import Link from 'umi/link';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import styles from './Articles.less';

const { Option } = Select;
const FormItem = Form.Item;
const { Search } = Input;
var searchword = "";
const pageSize = 5;
const currentPage=0;
var totalnum=0;

@connect(({ ocr, loading }) => ({
  ocr,
  loading: loading.models.ocr,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues, pagination) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log("changedValues: ",changedValues, "allValues: ", allValues);
    console.log(changedValues['name']);
    console.log("pagination is ", pagination)


    // 模拟查询表单生效
    dispatch({
      type: 'ocr/fetch',
      payload: {
        count: 5,
        currentPage:currentPage,
        searchword: changedValues['name'],
      },
    });
  },
})
class newtklist extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'ocr/fetch',
      payload: {
        // pageSize: 5,
        // searchword: searchword,
        count: 5,
        currentPage:currentPage,
        total:totalnum,
      },
    });
  }

  fetchMore = (pagination) => {
    console.log("fetchMore....total, " , pagination.total, pagination.currentPage, pagination.pageSize)
    const { dispatch } = this.props;
    dispatch({
      type: 'ocr/appendFetch',
      payload: {
        // pageSize: pageSize,
        // searchword: searchword,
        count: pageSize,
        currentPage:currentPage,
        total:totalnum,
      },
    });
  };

  handleOCRSearch = (value) => {
    const { dispatch } = this.props;
    dispatch({
        type: 'ocr/fetchOcr',
        payload: {
          count: 5,
          currentPage:currentPage,
          picPath: value,
        },
    });
  };



  handlePreviewPic = (file) => {
    console.log("handlePreviewPic ", file)
  }



  handleSearch = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ocr/fetch',
      payload: {
        count: 5,
        currentPage:currentPage,
        searchword: value,
        total:totalnum,
      },
    });
  };

  getAnswer = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ocr/payAndGetAnswer',
      payload: {
        count: 5,
        currentPage:currentPage,
        searchword: value,
      },
    });
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log("预览图片");
    console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
    this.props.handlePreviewPic(file);
  }

  handleChange = ({ fileList }) => {
    console.log("handleChange ", fileList)
    this.setState({ fileList });
    console.log("state ", this.state.fileList)
    // this.props.handleFileList(this.state.fileList);
    let pics = new Set();
    console.log("handleChange ", this.state.fileList)
    var filePath='';
    this.state.fileList.forEach((v, k) => {
      console.log(v.name)
      filePath=v.name;
      pics.add(v.name);
    });

    console.log("pics ", pics);
    this.setState({
      pics : pics
    })


  }


  handleFileList = (obj)=>{
    let pics = new Set();
    console.log("handleFileList ", obj)
    var filePath='';
    obj.forEach((v, k) => {
      console.log(v.name)
      filePath=v.name;
      pics.add(v.name);
    });

    console.log("pics ", pics);

    this.setState({
      pics : pics
    })



    /*
    const { dispatch } = this.props;
    dispatch({
      type: 'ocr/picupload',
      payload: {
        filePath: pics,
      },
    });
    */
  };

  handSuccess = (response, file) => {
    console.log("handSuccess, response, file" , response, file);
    // this.state.list = response.list;
    // this.props.handlePicSearchList(response);
    const { dispatch } = this.props;
      dispatch({
        type: 'ocr/freshList',
        payload: {
          response:response,
        },
      });
  }

  handlePicSearchList = (response) => {
    console.log("handlePicSearchList ", response)
    // console.log("list is ",list)
    // list = response.list;
    // let piclist = [];
    // this.setState({
    //   piclist : response.list
    // })
  }

  handleError = (error, response, file) => {
    console.log("handleError,error, response, file" , error,response, file)
  }

  handleReset = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'ocr/fetch',
      payload: {
        // pageSize: 5,
        // searchword: searchword,
        count: 5,
        currentPage:currentPage,
        total:totalnum,
      },
    });
  }



  constructor(props){
    super(props);
    this.state = {
      estateDataSource : [],
      estateAddress : '',
      estateId : '',
      pics :[],
      piclist:[],
      previewVisible: false,
      previewImage: '',
      fileList: fileList,
    }

    //  处理默认图片
    let fileList = [];
    console.log("jnh, -----> ",this.props.fileList)
    if(this.props.fileList){
      fileList = this.props.fileList.split(',').map(item => {
        return {
          uid: item,
          name: item,
          status: 'done',
          url: item,
        }
      });
    }

  }

  render() {
    const {
      form,
      ocr: { list },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;

    totalnum = list.length;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const loadMore =
      list.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {loading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;

    const { previewVisible, previewImage } = this.state;
    const fileList = [];
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Fragment>
        <Card bordered={false}>
          <Form layout="inline">

            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable>
                    <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                    <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                    <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                    <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                    <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                    <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                    <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                    <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                    <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                    <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                    <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                    <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="历史查询" grid>
              <Row>
                <Col lg={10} md={12} sm={24} xs={24}>
                  <FormItem>
                    {getFieldDecorator('历史查询', {
                      initialValue: ['肠道微生物', '癌细胞形成的机理'],
                    })(
                      <Select
                        mode="multiple"
                        style={{ maxWidth: 286, width: '100%' }}
                        placeholder=""
                      >
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
            <StandardFormRow title="" grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <Search
                    placeholder="请输入关键字进行查询"
                    onSearch={this.handleSearch}
                    style={{ width: 200 }}
                  />
                </Col>
                <Col >
                  <div>
                    <Upload
                      action="/ocr/ocrpic/upload"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                      onSuccess={this.handSuccess}
                      onError={this.handleError}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <Button onClick={this.handleReset}>重置</Button>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.tkId}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title="所属类别"
                  description={
                    <span>
                      <Tag>{item.keywords}</Tag>
                    </span>
                  }
                />

                <div className={styles.listContent}>
                  <div className={styles.description}>{item.question}</div>
                  <div className={styles.description}>{item.types}</div>
                  <div className={styles.description}>{item.options}</div>
                  <div className={styles.description}>{item.answer}</div>
                  <div className={styles.description}>{item.anserdetail}</div>
                </div>
                <div className={styles.listContent}>
                  <div className={styles.extra}>
                    <Link to="/ocr/step-form">
                      <Button onClick={this.getAnswer}>查看答案</Button>
                    </Link>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}

export default newtklist;
