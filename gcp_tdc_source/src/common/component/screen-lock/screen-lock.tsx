import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import PatternLock from "../pattern-lock/pattern-lock";
import Clock from "../clock/clock";
import Mask from "../mask/mask";
import CSSAnimate from "../css-animate/css-animate";
import "./screen-lock.scss";

interface Props {
  title?: string;
}
/**
 * 锁屏界面
 */
export default class ScreenLock extends PureComponent<Props> {
  state = {
    showPattern: false,
    patternError: null
  };

  static contextTypes = {
    router: PropTypes.object
  };

  onChange = lock => {
    if (lock) {
      this.context.router.history.replace("/dashboard");
    } else {
      this.setState({
        patternError: true
      });
    }
  };

  togglePattern = () => {
    this.setState({
      showPattern: !this.state.showPattern
    });
  };

  render() {
    const { title } = this.props;
    const { patternError, showPattern } = this.state;
    return (
      <div className="full-layout screen-lock-page">
        <div>
          <div className="container">
            <div className="pattern-logo">
              {/* <img src={logoImg} alt="logo" /> */}
              <b>Trial.link</b>&nbsp;
              <span>Admin</span>
            </div>
            <div className="pattern-container">
              <div className="pattern-title">{title || "欢迎您回来"}</div>
              <p>使用图案进行解锁</p>
              <CSSAnimate
                className="animated-short"
                type={patternError ? "shake" : ""}
                callback={_ => this.setState({ patternError: false })}
              >
                <PatternLock lock="14753" onChange={this.onChange} />
              </CSSAnimate>
            </div>
          </div>
          <Clock />
        </div>
        <Mask visible={showPattern} onClose={this.togglePattern}></Mask>
      </div>
    );
  }
}
