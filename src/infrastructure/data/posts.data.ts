import { LangEnum } from "infrastructure/locales/i18next-config";
import { PostStatusEnum, PostTypeEnum, PostVisibilityEnum } from "models/posts/post.model";
import { template1 } from "./email-templates/template1";
import { template2 } from "./email-templates/template2";

export const postData = [
  {
    lang: LangEnum.EN,
    title: "email template 1",
    subtitle: "email template 1",
    excerpt: "A new post created successfully A new post created successfully",
    content: JSON.stringify( template1 ),
    visibility: PostVisibilityEnum.PUBLIC,
    status: PostStatusEnum.PUBLISH,
    commentAllowed: true,
    viewCount: 0,
    type: PostTypeEnum.EMAIL_TEMPLATE,
    isPinned: false,

    taxonomies: [],
    attachments: []
  },
  {
    lang: LangEnum.EN,
    title: "email template 2",
    subtitle: "email template 2",
    excerpt: "A new post created successfully A new post created successfully",
    content: JSON.stringify( template2 ),
    visibility: PostVisibilityEnum.PUBLIC,
    status: PostStatusEnum.PUBLISH,
    commentAllowed: true,
    viewCount: 0,
    type: PostTypeEnum.EMAIL_TEMPLATE,
    isPinned: false,

    taxonomies: [],
    attachments: []
  }
];