import React, { PureComponent, ReactText } from "react";
import "./clock.scss";

interface IClock {
  monthNames: any[];
  dayNames: any[];
  timer: number;
  date: string;
  hours: number;
  min: number;
  sec: number;
}

interface Props {}
// typeof AllInter = IClock & Props;
/**
 * 时钟组件
 */
export default class Clock extends PureComponent<
  {},
  {
    date: string;
    hours: ReactText;
    min: ReactText;
    sec: ReactText;
  }
> {
  monthNames: string[];
  dayNames: string[];
  timer: number;
  date: string;
  hours: number;
  min: number;
  sec: number;
  constructor(props) {
    super(props);
    this.monthNames = [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ];
    this.dayNames = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    this.state = this.formatClock(false);
  }

  componentDidMount() {
    this.timer = setInterval(this.formatClock, 1000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  formatClock = (render = true) => {
    const now = new Date();
    const hours = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    const state = {
      date: `${now.getFullYear()} ${
        this.monthNames[now.getMonth()]
      } ${now.getDate()} ${this.dayNames[now.getDay()]}`,
      hours: hours < 10 ? "0" + hours : hours,
      min: min < 10 ? "0" + min : min,
      sec: sec < 10 ? "0" + sec : sec
    };

    if (render) this.setState(state);
    return state;
  };

  render() {
    const { date, hours, min, sec } = this.state;

    return (
      <div className="antui-clock">
        <div className="date">{this.state.date}</div>
        <ul>
          <li className="hours">{hours}</li>
          <li className="point">:</li>
          <li className="min">{min}</li>
          <li className="point">:</li>
          <li className="sec">{sec}</li>
        </ul>
      </div>
    );
  }
}
