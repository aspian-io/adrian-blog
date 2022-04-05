import { AttachmentDoc } from "models/attachments/attachment.model";
import { PostDoc } from "models/posts/post.model";
import { TaxonomyDoc } from "models/taxonomies/taxonomy.model";

export class PostDto {
  id: string = '';
  title: string = '';
  slug: string = '';
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
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  imgProxySignedUrl?: string = undefined;
}