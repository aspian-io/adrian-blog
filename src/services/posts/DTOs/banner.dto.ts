import { AttachmentDoc } from "models/attachments/attachment.model";
import { PostDoc, Postmeta } from "models/posts/post.model";
import { TaxonomyDoc } from "models/taxonomies/taxonomy.model";

export class PostDto {
  title: string = '';
  subtitle?: string = undefined;
  excerpt: string = '';
  content: string = '';
  commentAllowed: Boolean = true;
  viewCount?: Number = 0;
  isPinned?: Boolean = false;
  child?: PostDoc = undefined;
  parent?: PostDoc = undefined;
  taxonomies: TaxonomyDoc[] = [];
  attachments: AttachmentDoc[] = [];
  postmeta?: Postmeta[] = undefined;
}