import BaseComp from "../BaseComp";

export default class ProgressBar extends BaseComp {
  percent: number = 0;
  show: boolean = false;
  canSuccess: boolean = true;
  duration: number = 3000;
  height: string = "2px";
  color: string = "#ffca2b";
  failedColor: string = "#ff0000";
  timer: null | number= 0;  
  cut: number = 0;
  start() {
    this.show = true;
    this.canSuccess = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.percent = 0;
    }
    this.cut = 10000 / Math.floor(this.duration);
    this.timer = setInterval(() => {
      this.increase(this.cut * Math.random());
      if (this.percent > 95) {
        this.finish();
      }
    }, 100);
    return this;
  }
  set(num: number) {
    this.show = true;
    this.canSuccess = true;
    this.percent = Math.floor(num);
    return this;
  }
  get() {
    return Math.floor(this.percent);
  }
  increase(num: number) {
    this.percent = this.percent + Math.floor(num);
    return this;
  }
  decrease(num: number) {
    this.percent = this.percent - Math.floor(num);
    return this;
  }
  finish() {
    this.percent = 100;
    this.hide();
    return this;
  }
  pause() {
    clearInterval(this.timer);
    return this;
  }
  hide() {
    clearInterval(this.timer);
    this.timer = null;
    setTimeout(() => {
      this.show = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.percent = 0;
        }, 200);
      });
    }, 500);
    return this;
  }
  fail() {
    this.canSuccess = false;
    return this;
  }
}
