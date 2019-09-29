import React, { PureComponent } from "react";
import PatternLock from "../../../static/js/PatternLock";
import "./pattern-lock.scss";

interface Props {
  lock?: string;
  onChange: (bool: boolean) => void;
}
export default class Lock extends React.Component<Props> {
  lock: any;
  componentDidMount() {
    this.lock = new PatternLock(this.refs.patternLock, {
      enableSetPattern: true
    });

    this.onCheckPattern();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lock !== this.props.lock) {
      this.lock.setPattern(this.props.lock);
    }
  }

  onCheckPattern = () => {
    const { lock, onChange } = this.props;
    this.lock.checkForPattern(
      lock,
      () => {
        onChange(true);
        console.log("You unlocked your app");
      },
      () => {
        onChange(false);
        console.log("Pattern is not correct");
      }
    );
  };

  render() {
    return <div ref="patternLock" />;
  }
}
