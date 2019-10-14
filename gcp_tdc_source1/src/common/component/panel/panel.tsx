import React, { Component } from "react";
import cx from "classnames";
import CSSAnimate from "../css-animate/css-animate";
import "./panel.scss";
const noop = _ => {};
interface IProps {
  collapse?: boolean;
  expand?: boolean;
  animationName?: string;
  refresh?: number;
  theme?: string;
  prefix?: string;
  className?: string;
  title?: string;
  width?: string;
  height?: string;
  style?: any;
  children?: Element;
  header?: Element;
  cover?: boolean;
  scroll?: boolean;
  onChange?: (data: any) => void;
  onRefresh?: (data?: any) => void;
  onClose?: () => void;
}
/**
 * 面板组件
 */
export default class Panel extends Component<IProps> {
  static defaultProps = {
    prefix: "wxq-panel"
  };
  state: IProps = {
    refresh: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      animationName: "",
      collapse: props.collapse || false,
      expand: props.expand || false,
      refresh: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const st: any = {};
    if ("collapse" in nextProps) {
      st.collapse = true;
    } else if ("expand" in nextProps) {
      st.expand = true;
    }
    if (Object.keys(st).length) {
      this.setState(st);
    }
  }

  onExpand = expand => e => {
    const { onChange } = this.props;

    this.setState({
      expand,
      collapse: false
    });

    if (onChange) {
      onChange({
        expand,
        collapse: false
      });
    }
  };

  onCollapse = collapse => e => {
    const { onChange } = this.props;

    this.setState({
      collapse,
      expand: false
    });

    if (onChange) {
      onChange({
        collapse,
        expand: false
      });
    }
  };

  onRefresh = () => {
    this.setState({
      refresh: this.state.refresh || 0 + 1,
      animationName: "fadeIn"
    });
    this.props.onRefresh && this.props.onRefresh();
  };

  onClose = () => {
    const { expand } = this.state;
    if (expand) {
      // confirm({
      //   title: "提示",
      //   content: "您确认要关闭这个面板？",
      //   onOk: () => {
      //     this.props.onClose && this.props.onClose();
      //   }
      // });
    } else {
      this.props.onClose && this.props.onClose();
    }
  };

  render() {
    const { expand, collapse, refresh, animationName } = this.state;
    const {
      theme,
      prefix,
      className,
      title,
      width,
      height,
      style,
      children,
      header,
      cover,
      scroll
    } = this.props;

    const classnames = cx(prefix, className, {
      theme: !!theme,
      "panel-fullscreen": !!expand,
      "panel-collapsed": !!collapse,
      cover: !!cover
    });

    const styles = {
      ...style,
      width
    };
    const bodyStyles: any = {};
    if (!expand) {
      bodyStyles.height = height;
    }
    if (scroll) {
      bodyStyles.overflow = "auto";
    }

    const Header =
      typeof header === "undefined" ? (
        <div className={`${prefix}-header`}>
          <span className={`${prefix}-header-title`}>{title}</span>
          <span className={`${prefix}-header-controls`}>
            <a className="panel-control-loader" onClick={this.onRefresh}>
              {/* TODO 刷新 */}
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-refresh"></use>
              </svg>
            </a>
            <a
              className="panel-control-fullscreen"
              onClick={this.onExpand(expand ? false : true)}
            >
              {/* <Icon type={`${expand ? "shrink" : "enlarge"}`} /> */}
              {expand ? (
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-shrink"></use>
                </svg>
              ) : (
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-enlarge"></use>
                </svg>
              )}
            </a>
            <a
              className="panel-control-collapsed"
              onClick={this.onCollapse(collapse ? false : true)}
            >
              <i className={`${collapse ? "el-icon-plus" : "el-icon-minus"}`} />
            </a>
            {/* <Popconfirm
              title="您确认要关闭这个面板？"
              onConfirm={this.onClose}
              placement="topRight"
            >
              <a
                className="panel-control-remove"
                onClick={expand ? this.onClose : noop}
              >
                <i className="close" />
              </a>
            </Popconfirm> */}
          </span>
        </div>
      ) : (
        header
      );

    return (
      <div className={classnames} style={styles}>
        {Header}
        <div className={`${prefix}-body`} style={bodyStyles}>
          <CSSAnimate
            className="panel-content"
            type={animationName}
            callback={_ => this.setState({ animationName: "" })}
            key={refresh}
          >
            {children}
          </CSSAnimate>
        </div>
      </div>
    );
  }
}
