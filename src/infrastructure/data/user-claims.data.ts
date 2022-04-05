import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { AccessPoliciesEnum } from "infrastructure/security/access-policies.enum";
import { ClaimAttrs } from "models/auth/auth-claim.model";

export const claimsData: ClaimAttrs[] = [
  {
    claim: AccessPoliciesEnum.Core_ADMIN,
    description: "Administrator - ( having access to all services unlimited )",
    localizedDescKey: AuthLocaleEnum.POLICY_CORE_ADMIN
  },
  {
    claim: AccessPoliciesEnum.Setting_List,
    description: "Access to list of settings",
    localizedDescKey: AuthLocaleEnum.POLICY_SETTINGS_LIST
  },
  {
    claim: AccessPoliciesEnum.Setting_Edit,
    description: "Ability to edit a setting",
    localizedDescKey: AuthLocaleEnum.POLICY_SETTING_EDIT
  },

  {
    claim: AccessPoliciesEnum.Auth_ClaimList,
    description: "Access to claim list",
    localizedDescKey: AuthLocaleEnum.POLICY_AUTH_CLAIMLIST
  },
  {
    claim: AccessPoliciesEnum.Auth_SetUserClaims,
    description: "Ability to set user's claims",
    localizedDescKey: AuthLocaleEnum.POLICY_AUTH_SET_CLAIMS
  },
  {
    claim: AccessPoliciesEnum.Auth_UserList,
    description: "Access to users list",
    localizedDescKey: AuthLocaleEnum.POLICY_AUTH_USERS_LIST
  },
  {
    claim: AccessPoliciesEnum.Auth_UserDetails,
    description: "Access to a user's details",
    localizedDescKey: AuthLocaleEnum.POLICY_AUTH_USER_DETAILS
  },
  {
    claim: AccessPoliciesEnum.Auth_Suspension,
    description: "Ability to suspend user accounts",
    localizedDescKey: AuthLocaleEnum.POLICY_AUTH_SUSPENSION
  },
  {
    claim: AccessPoliciesEnum.Auth_Delete,
    description: "Ability to delete user accounts",
    localizedDescKey: AuthLocaleEnum.POLICY_AUTH_USER_DELETE
  },

  {
    claim: AccessPoliciesEnum.Activity_LIST,
    description: "Access to activity list of all users",
    localizedDescKey: AuthLocaleEnum.POLICY_ACTIVITY_LIST
  },
  {
    claim: AccessPoliciesEnum.Taxonomy_LIST,
    description: "Access to taxonomy list",
    localizedDescKey: AuthLocaleEnum.POLICY_TAXONOMY_LIST
  },
  {
    claim: AccessPoliciesEnum.Taxonomy_DETAILS,
    description: "Access to a taxonomy details",
    localizedDescKey: AuthLocaleEnum.POLICY_TAXONOMY_DETAILS
  },
  {
    claim: AccessPoliciesEnum.Taxonomy_CREATE,
    description: "Ability to add a taxonomy",
    localizedDescKey: AuthLocaleEnum.POLICY_TAXONOMY_CREATE
  },
  {
    claim: AccessPoliciesEnum.Taxonomy_EDIT,
    description: "Ability to edit a taxonomy",
    localizedDescKey: AuthLocaleEnum.POLICY_TAXONOMY_EDIT
  },
  {
    claim: AccessPoliciesEnum.Taxonomy_DELETE,
    description: "Ability to delete a taxonomy",
    localizedDescKey: AuthLocaleEnum.POLICY_TAXONOMY_DELETE
  },

  {
    claim: AccessPoliciesEnum.Attachment_CREATE,
    description: "Ability to upload a file",
    localizedDescKey: AuthLocaleEnum.POLICY_ATTACHMENT_CREATE
  },
  {
    claim: AccessPoliciesEnum.Attachment_EDIT,
    description: "Ability to edit an uploaded file",
    localizedDescKey: AuthLocaleEnum.POLICY_ATTACHMENT_EDIT
  },
  {
    claim: AccessPoliciesEnum.Attachment_DETAILS,
    description: "Access to the details of an uploaded file",
    localizedDescKey: AuthLocaleEnum.POLICY_ATTACHMENT_DETAILS
  },
  {
    claim: AccessPoliciesEnum.Attachment_LIST,
    description: "Access to list of all attachments",
    localizedDescKey: AuthLocaleEnum.POLICY_ATTACHMENT_LIST
  },
  {
    claim: AccessPoliciesEnum.Attachment_DELETE,
    description: "Ability to delete an uploaded file",
    localizedDescKey: AuthLocaleEnum.POLICY_ATTACHMENT_DELETE
  },
  {
    claim: AccessPoliciesEnum.Attachment_PRESIGNED,
    description: "Ability to get S3 presigned URL",
    localizedDescKey: AuthLocaleEnum.POLICY_ATTACHMENT_PRESIGNED
  },

  {
    claim: AccessPoliciesEnum.Post_LIST,
    description: "Access to post list",
    localizedDescKey: AuthLocaleEnum.POLICY_POST_LIST
  },
  {
    claim: AccessPoliciesEnum.Post_DETAILS,
    description: "Access to a post details",
    localizedDescKey: AuthLocaleEnum.POLICY_POST_DETAILS
  },
  {
    claim: AccessPoliciesEnum.Post_CREATE,
    description: "Ability to add a post",
    localizedDescKey: AuthLocaleEnum.POLICY_POST_CREATE
  },
  {
    claim: AccessPoliciesEnum.Post_EDIT,
    description: "Ability to edit a post",
    localizedDescKey: AuthLocaleEnum.POLICY_POST_EDIT
  },
  {
    claim: AccessPoliciesEnum.Post_DELETE,
    description: "Ability to delete a post",
    localizedDescKey: AuthLocaleEnum.POLICY_POST_DELETE
  },
  {
    claim: AccessPoliciesEnum.PostComment_APPROVE,
    description: "Ability to approve a post comment",
    localizedDescKey: AuthLocaleEnum.POLICY_POSTCOMMENT_APPROVE
  },
  {
    claim: AccessPoliciesEnum.PostComment_LIST,
    description: "Access to post comment list",
    localizedDescKey: AuthLocaleEnum.POLICY_POSTCOMMENT_LIST
  },
  {
    claim: AccessPoliciesEnum.PostComment_DETAILS,
    description: "Access to post comment details",
    localizedDescKey: AuthLocaleEnum.POLICY_POSTCOMMENT_DETAILS
  },
  {
    claim: AccessPoliciesEnum.PostComment_CREATE,
    description: "Ability to add a post comment",
    localizedDescKey: AuthLocaleEnum.POLICY_POSTCOMMENT_CREATE
  },
  {
    claim: AccessPoliciesEnum.PostComment_EDIT,
    description: "Ability to edit a post comment",
    localizedDescKey: AuthLocaleEnum.POLICY_POSTCOMMENT_EDIT
  },
  {
    claim: AccessPoliciesEnum.PostComment_DELETE,
    description: "Ability to delete a post comment",
    localizedDescKey: AuthLocaleEnum.POLICY_POSTCOMMENT_DELETE
  },
  {
    claim: AccessPoliciesEnum.PostComment_SETTINGS_LIST,
    description: "Access to post comment settings list",
    localizedDescKey: AuthLocaleEnum.POLICY_POSTCOMMENT_SETTINGS_LIST
  },
  {
    claim: AccessPoliciesEnum.PostComment_SETTINGS_EDIT,
    description: "Ability to change post comment settings",
    localizedDescKey: AuthLocaleEnum.POLICY_POSTCOMMENT_SETTINGS_EDIT
  },

  {
    claim: AccessPoliciesEnum.SMS_CREDIT,
    description: "Access to SMS remaining credit",
    localizedDescKey: AuthLocaleEnum.POLICY_SMS_CREDIT
  },
  {
    claim: AccessPoliciesEnum.SMS_SEND,
    description: "Ability to send SMS",
    localizedDescKey: AuthLocaleEnum.POLICY_SMS_SEND
  },
  {
    claim: AccessPoliciesEnum.SMS_SEND_BY_PATTERN,
    description: "Ability to send SMS using predefined patterns",
    localizedDescKey: AuthLocaleEnum.POLICY_SMS_SEND_BY_PATTERN
  },
  {
    claim: AccessPoliciesEnum.SMS_COMPLETED_JOBS,
    description: "Access to completed SMS jobs list",
    localizedDescKey: AuthLocaleEnum.POLICY_SMS_JOB_COMPLETED
  },
  {
    claim: AccessPoliciesEnum.SMS_DELAYED_JOBS,
    description: "Access to delayed SMS jobs list",
    localizedDescKey: AuthLocaleEnum.POLICY_SMS_JOB_DELAYED
  },
  {
    claim: AccessPoliciesEnum.SMS_DELETE_JOB,
    description: "Ability to delete SMS jobs",
    localizedDescKey: AuthLocaleEnum.POLICY_SMS_JOB_DELETE
  },

  {
    claim: AccessPoliciesEnum.EMAIL_SEND_ONE,
    description: "Ability to send an email",
    localizedDescKey: AuthLocaleEnum.POLICY_EMAIL_SEND_ONE
  },
  {
    claim: AccessPoliciesEnum.EMAIL_SEND_BY_TEMPLATE,
    description: "Ability to send emails by using predefined templates",
    localizedDescKey: AuthLocaleEnum.POLICY_EMAIL_SEND_BY_TEMPLATE
  },
  {
    claim: AccessPoliciesEnum.EMAIL_COMPLETED_JOBS,
    description: "Access to completed email jobs list",
    localizedDescKey: AuthLocaleEnum.POLICY_EMAIL_JOB_COMPLETED
  },
  {
    claim: AccessPoliciesEnum.EMAIL_DELAYED_JOBS,
    description: "Access to delayed email jobs list",
    localizedDescKey: AuthLocaleEnum.POLICY_EMAIL_JOB_DELAYED
  },
  {
    claim: AccessPoliciesEnum.EMAIL_DELETE_JOB,
    description: "Ability to delete email jobs",
    localizedDescKey: AuthLocaleEnum.POLICY_EMAIL_JOB_DELETE
  },
];