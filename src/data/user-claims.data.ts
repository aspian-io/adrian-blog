import { AccessPoliciesEnum } from "../infrastructure/security/access-policies.enum";
import { AuthLocaleEnum } from "../locales/service-locale-keys/auth.locale";
import { ClaimAttrs } from "../models/auth/auth-claim.model";

export const claimsData: ClaimAttrs[] = [
  {
    claim: AccessPoliciesEnum.Core_ADMIN,
    description: "Administrator - ( having access to all services unlimited )",
    localizedDescKey: AuthLocaleEnum.POLICY_CORE_ADMIN
  },
  {
    claim: AccessPoliciesEnum.Core_USER,
    description: "Ordinary user",
    localizedDescKey: AuthLocaleEnum.POLICY_CORE_USER
  },
  {
    claim: AccessPoliciesEnum.Auth_ClaimList,
    description: "Access to claim list",
    localizedDescKey: AuthLocaleEnum.POLICY_AUTH_CLAIMLIST
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
];