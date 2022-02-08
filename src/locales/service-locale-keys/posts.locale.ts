export enum PostLocaleEnum {
  INFO_CREATE = "info.posts.create.successMsg",
  INFO_EDIT = "info.posts.edit.successMsg",
  INFO_DETAILS = "info.posts.details.successMsg",
  INFO_LIST = "info.posts.list.successMsg",
  INFO_DELETE = "info.posts.delete.successMsg",

  ERROR_DUPLICATE_POST = "errors.posts.createService.duplicatePostErr",
  ERROR_POST_ID = "errors.posts.deleteService.postIdErr",
  ERROR_PARENT_NOT_FOUND = "errors.posts.common.parentNotFoundErr",
  ERROR_DUPLICATE_PARENT = "errors.posts.common.duplicateParentPostErr",

  ERROR_SCHEMA_CREATE_TITLE = "errors.posts.createSchema.titleEmptyErr",
  ERROR_SCHEMA_CREATE_EXCERPT = "errors.posts.createSchema.excerptEmptyErr",
  ERROR_SCHEMA_CREATE_CONTENT = "errors.posts.createSchema.contentEmptyErr",
  ERROR_SCHEMA_CREATE_TAXONOMIES = "errors.posts.createSchema.taxonomiesEmptyErr",
  ERROR_SCHEMA_EDIT_TITLE = "errors.posts.editSchema.titleEmptyErr",
  ERROR_SCHEMA_EDIT_EXCERPT = "errors.posts.editSchema.excerptEmptyErr",
  ERROR_SCHEMA_EDIT_CONTENT = "errors.posts.editSchema.contentEmptyErr",
  ERROR_SCHEMA_EDIT_TAXONOMIES = "errors.posts.editSchema.taxonomiesEmptyErr",
}