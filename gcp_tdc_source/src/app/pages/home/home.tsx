import * as React from "react";
import "./home.scss";
import {
  Layout,
  Breadcrumb,
  Card,
  Input,
  Table,
  Pagination,
  Button,
} from "element-react";
import BasePage from "../BasePage";
import TrialService from "../../core/service/trial.serv";

interface IDemoProps {
  // columns: any[];
  // data: any[];
}
// @inject('router', 'global')
// @observer
export default class DemoPage extends BasePage implements IDemoProps {
  searchData: any[] = [];
  trialService: TrialService = new TrialService();
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "序号",
          type: "index",
        },
        {
          label: "中心名称",
          prop: "name",
        },
      ],
      data: [
        {
          name: "xx",
        },
      ],
    };
  }
  async fetchTrialInfo() {
    try {
      await this.trialService.tiralSum();
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.fetchTrialInfo();
  }
  render() {
    return (
      <div className="home">
        <div className="search-box pub-layout" style={{ width: "615px" }}>
          <div className="home-title">
            <img src={require("../../../static/img/trial_link.png")} />
            <span className="pub-dot"></span>
            临研决策支持平台
          </div>
          <div className="home-all-search">
            <div className="search-input">
              <Input
                type="text"
                placeholder="请输入关键字"
                append={<Button className="home-all-btn v-top">搜索</Button>}
              />
              <div
                v-if="searchArr.length>0"
                className={this.searchData.length ? "result gradual" : "result"}
              >
                <ul>
                  {this.searchData.map(item => {
                    <li key={item.value}>{item.label}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="hot-search-history">
            <span>热门搜索：</span>
            <ul>
              {this.searchData.map(item => {
                <li key={item.value}>{item.label}</li>;
              })}
            </ul>
          </div>
        </div>
        {/* 功能入口 */}
        <div className="sub-content pub-layout clearfix">
          <div className="fl sub-content--aside">
            <img
              src={require("../../../static/img/duoweibaob_icon.png")}
              alt=""
            />
            <span>多维报表</span>
          </div>
          <div className="sub-content__box">
            <div className="m-bottom-10">
              <div className="flex-column">
                <img
                  src={require("../../../static/img/zonghechax_icon.png")}
                  alt=""
                />
                <span>综合查询</span>
              </div>
              <div className="flex-column">
                <img
                  src={require("../../../static/img/jingzhengfenx_icon.png")}
                  alt=""
                />
                <span>竞争分析</span>
              </div>
              <div className="flex-column">
                <img
                  src={require("../../../static/img/gushiban_icon.png")}
                  alt=""
                />
                <span>故事板</span>
              </div>
            </div>
            <div>
              <div className="flex-column">
                <img
                  src={require("../../../static/img/xietiaoyjz_icon.png")}
                  alt=""
                />
                <span>协调研究者推荐</span>
              </div>
              <div className="flex-column">
                <img
                  src={require("../../../static/img/yanjztc_icon.png")}
                  alt=""
                />
                <span>主要研究者推荐</span>
              </div>
              <div className="flex-column">
                <img
                  src={require("../../../static/img/wodesc_icon.png")}
                  alt=""
                />
                <span>我的收藏</span>
              </div>
              <div className="flex-column">
                <img
                  src={require("../../../static/img/major_icon.png")}
                  alt=""
                />
                <span>认证专业推荐</span>
              </div>
            </div>
          </div>
        </div>
        {/* 试验部分 */}
        <div className="total-sum pub-layout">
          <div className="total-sum__box">
            <div>
              <span className="pub-line"></span>试验状态
            </div>
            <ul>
              {/* <li v-for="(item, index) in trialStatus">
            {{ item.name }}
            <span>{{ item.percent }}%</span>
            <span>{{ item.count }}</span>
          </li> */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
