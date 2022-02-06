export enum AccessPoliciesEnum {
  // Core Policies
  Core_ADMIN = 'Core_ADMIN',
  Core_USER = 'Core_USER',

  // Auth Policies
  Auth_ClaimList = "Auth_ClaimList",

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


}