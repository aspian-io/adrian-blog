import { DTOMapper, IDtoMapperOption } from "infrastructure/service-utils/dto-mapper";
import { AttachmentDoc } from "models/attachments/attachment.model";
import { PostDoc } from "models/posts/post.model";
import { TaxonomyDoc } from "models/taxonomies/taxonomy.model";
import { AttachmentPhotoDto } from "services/attachments/DTOs/attachment.dto";

export class PostDto extends DTOMapper {
  dtoMapperProfile (): IDtoMapperOption<any>[] {
    const postFeaturedImageDtoOption: IDtoMapperOption<AttachmentPhotoDto> = {
      mapToClass: {
        mapFromKey: "featuredImage",
        dtoClass: AttachmentPhotoDto
      }
    };

    return [ postFeaturedImageDtoOption ];
  }
  id: string = '';
  title: string = '';
  slug: string = '';
  subtitle?: string = undefined;
  excerpt: string = '';
  content: string = '';
  featuredImage?: AttachmentPhotoDto = new AttachmentPhotoDto();
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
