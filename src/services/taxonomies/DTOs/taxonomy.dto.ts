import { DTOMapper } from "infrastructure/service-utils/dto-mapper";
import { AttachmentDoc } from "models/attachments/attachment.model";
import { TaxonomyDoc } from "models/taxonomies/taxonomy.model";

export class TaxonomyDto extends DTOMapper {
  description?: string = undefined;
  term: string = "";
  slug: string = "";
  parent?: TaxonomyDoc = undefined;
  children: TaxonomyDoc[] = [];
  featuredImage?: AttachmentDoc;
}