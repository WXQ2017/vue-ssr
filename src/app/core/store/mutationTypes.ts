export const SET_ACCOUNT_INFO = "SET_ACCOUNT_INFO";
export const SET_HAS_HEAD = "SET_HAS_HEAD";
export const SET_HAS_ASIDE = "SET_HAS_ASIDE";
export const SET_HAS_FOOTER = "SET_HAS_FOOTER";
export const LIMIT_HEAD_WIDTH = "LIMIT_HEAD_WIDTH";
/**
 * 字典表类型
 */
export enum DictionaryTypeCode {
  /**
   * 角色类型
   */
  USER_IDENTITY = "user_identity",
  /**
   * 职务类型
   */
  USER_POSITION = "user_position",
  /**
   * 试验类型
   */
  PROJECT_TYPE = "project_type",
  /**
   * 试验分期
   */
   TRIAL_STAGES= "trial_stages",
  /**
   * 受试者文件类型
   */
  SUBJECTS_FILE_TYPE = "subjects_file_type",
  /**
   * 研究类型
   */
  RESEARCH_INTENTION_TYPE = "research_intention_type",
  /**
   * 问卷分类
   */
  TASK_TYPE = "task_type",
  /**
   * 资质要求
   */
  TASK_QUALIFICATION_REQUITE = "task_qualification_require",
  /**
   * 审核类型
   */
  GCP_EC_TEMPLATE_TYPE = "gcp_ec_template_type",
  /**
   * 审核状态
   */
  GCP_EC_TEMPLATE_STATUS = "gcp_ec_template_status",
}
