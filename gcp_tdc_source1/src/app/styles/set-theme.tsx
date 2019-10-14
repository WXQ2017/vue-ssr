import "./element-ui.scss";
// 默认主题
export const defaultTheme = "0F043E";
export const themeList = [
  { name: "梦幻", key: "00C587" },
  { name: "小清新", key: "0F043E" },
];

export const setTheme = (themeName = defaultTheme) => {
  let key = "themeProperty";
  if (themeName === "default") {
    // 移除之前主题的属性
    window.localStorage.removeItem(key);
    if (document.body.className) document.body.className = "";
  } else {
    // 把该主题的所有属性存到缓存
    document.body.className = "custom-" + themeName;
  }
};
