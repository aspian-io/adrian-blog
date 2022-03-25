export enum AccessPoliciesEnum {
  // Core Policies
  Core_ADMIN = 'Core_ADMIN',

  // Setting Policies
  Setting_List = "Setting_List",
  Setting_Edit = "Setting_Edit",

  // Auth Policies
  Auth_ClaimList = "Auth_ClaimList",
  Auth_SetUserClaims = "Auth_SetUserClaims",
  Auth_UserList = "Auth_UserList",
  Auth_UserDetails = "Auth_UserDetails",
  Auth_Suspension = "Auth_Suspension",
  Auth_Delete = "Auth_Delete",

  // Activity Policies
  Activity_LIST = "Activity_LIST",

  // Taxonomy Policies
  Taxonomy_LIST = "Taxonomy_LIST",
  Taxonomy_DETAILS = "Taxonomy_DETAILS",
  Taxonomy_CREATE = "Taxonomy_CREATE",
  Taxonomy_EDIT = "Taxonomy_EDIT",
  Taxonomy_DELETE = "Taxonomy_DELETE",

  // Attachment Policies
  Attachment_CREATE = "Attachment_CREATE",
  Attachment_EDIT = "Attachment_EDIT",
  Attachment_DETAILS = "Attachment_DETAILS",
  Attachment_LIST = "Attachment_LIST",
  Attachment_DELETE = "Attachment_DELETE",
  Attachment_PRESIGNED = "Attachment_PRESIGNED",

  // Post Policies
  Post_LIST = "Post_LIST",
  Post_DETAILS = "Post_DETAILS",
  Post_CREATE = "Post_CREATE",
  Post_EDIT = "Post_EDIT",
  Post_DELETE = "Post_DELETE",

  // Post Comment Policies
  PostComment_APPROVE = "PostComment_APPROVE",
  PostComment_LIST = "PostComment_LIST",
  PostComment_DETAILS = "PostComment_DETAILS",
  PostComment_CREATE = "PostComment_CREATE",
  PostComment_EDIT = "PostComment_EDIT",
  PostComment_DELETE = "PostComment_DELETE",
  PostComment_SETTINGS_LIST = "PostComment_SETTINGS_LIST",
  PostComment_SETTINGS_EDIT = "PostComment_SETTINGS_EDIT",

  // SMS Policies
  SMS_CREDIT = "SMS_CREDIT",
  SMS_SEND = "SMS_SEND",
  SMS_SEND_BY_PATTERN = "SMS_SEND_BY_PATTERN",
  SMS_COMPLETED_JOBS = "SMS_COMPLETED_JOBS",
  SMS_DELAYED_JOBS = "SMS_DELAYED_JOBS",
  SMS_DELETE_JOB = "SMS_DELETE_JOB",

  // Email Policies
  EMAIL_SEND_ONE = "EMAIL_SEND_ONE",
  EMAIL_SEND_BY_TEMPLATE = "EMAIL_SEND_BY_TEMPLATE",
  EMAIL_COMPLETED_JOBS = "EMAIL_COMPLETED_JOBS",
  EMAIL_DELAYED_JOBS = "EMAIL_DELAYED_JOBS",
  EMAIL_DELETE_JOB = "EMAIL_DELETE_JOB",
}