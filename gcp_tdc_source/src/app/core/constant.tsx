/**
 * 主题色
 *
 * @export
 * @enum {number}
 */
export enum THEME {
  "00C587" = 1,
  "0F043E",
}

export function getTheme() {
  const className = document.getElementsByTagName("body")[0].className;
  THEME[className] = 1;
  if (className) {
    return className.split("-")[1];
  }
  return "";
}
