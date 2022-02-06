import { CommentSettings } from "../../../models/post-comments/post-comments-settings.model";

export async function postCommentSettingsListService () {
  const settings = await CommentSettings.find();
  return settings;
}