import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import cssAnimate, { isCssAnimationSupported } from "css-animation";
import cx from "classnames";
interface Props {
  visible?: boolean;
  getContainer?: any;
  prefixCls?: string;
  className?: string;
  closable?: boolean;
  maskClosable?: boolean;
  onClose?(dom: HTMLDocument): void;
}
const noop = () => {};

export default class Mask extends PureComponent<Props> {
  static defaultProps = {
    prefixCls: "basic-mask",
    maskClosable: true
  };
  container: any;
  node: any;

  componentDidMount() {
    const { visible, getContainer } = this.props;
    this.container = document.createElement("div");
    // if ($$.isFunction(getContainer)) {
    if (typeof getContainer === "function") {
      const mountNode = getContainer(ReactDOM.findDOMNode(this));
      mountNode.appendChild(this.container);
    } else {
      document.body.appendChild(this.container);
    }
    this.toggle(visible);
  }

  componentDidUpdate(prevProps, prevState) {
    const { visible } = this.props;
    this.toggle(visible);
  }

  componentWillUnmount() {
    (this.container.parentNode as HTMLDivElement).removeChild(this.container);
  }

  toggle = visible => {
    const node = this.node;
    if (!node) return;
    if (visible) node.style.display = "block";

    if (isCssAnimationSupported) {
      cssAnimate(node, `fade${visible ? "In" : "Out"}`, _ => {
        node.style.display = visible ? "block" : "none";
      });
    } else {
      node.style.display = visible ? "block" : "none";
    }
  };

  onClick = e => {
    const { onClose, prefixCls } = this.props;

    if (
      (e.target.classList.contains(prefixCls) ||
        e.target.classList.contains(prefixCls + "-close")) &&
      onClose
    ) {
      onClose(e);
    }
  };

  render() {
    const {
      children,
      className,
      prefixCls,
      closable,
      maskClosable
    } = this.props;

    if (this.container) {
      return ReactDOM.createPortal(
        <div
          ref={node => (this.node = node)}
          className={cx(prefixCls, "animated", "animated-short", className)}
          onClick={maskClosable ? this.onClick : noop}
        >
          {closable ? (
            <i className="el-icon-close" onClick={this.onClick} />
          ) : null}
          {children}
        </div>,
        this.container
      );
    }

    return <div></div>;
  }
}
