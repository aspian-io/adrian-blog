import { TaxonomyDoc } from "models/taxonomies/taxonomy.model";

export class TaxonomyDto {
  description?: string = undefined;
  term: string = "";
  slug: string = "";
  parent?: TaxonomyDoc = undefined;
  children: TaxonomyDoc[] = [];
}