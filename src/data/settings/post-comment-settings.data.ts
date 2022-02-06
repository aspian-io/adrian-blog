import { CommentSettingsKeyEnum } from "../../models/post-comments/post-comments-settings.model";

export const postCommentSettingsData = [
  {
    key: CommentSettingsKeyEnum.IS_APPROVED,
    value: "true",
    userAgent: "SYSTEM"
  },
  {
    key: CommentSettingsKeyEnum.FORBIDDEN_EXPRESSIONS,
    value: "forbidden_1,forbidden_2,forbidden_3,forbidden_4",
    userAgent: "SYSTEM"
  },
  {
    key: CommentSettingsKeyEnum.FORBIDDEN_COMMENT_SUSPEND,
    value: "true",
    userAgent: "SYSTEM"
  },
];