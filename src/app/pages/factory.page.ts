export function demoPagePreloading(): Promise<any> {
  return import("./demo/demo.vue").catch(
    error => {
      // return dealOccurred(error, "asQuesAnswerList");
    },
  );
}