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
  SMS_SEND_BY_PATTERN = "SMS_SEND_BY_PATTERN",

  // Email Policies
  EMAIL_SEND_BY_TEMPLATE = "EMAIL_SEND_BY_TEMPLATE"
}