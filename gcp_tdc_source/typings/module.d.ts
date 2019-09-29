declare module "*.css";
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "object.omit" {
  const content: any;
  export default content;
}
