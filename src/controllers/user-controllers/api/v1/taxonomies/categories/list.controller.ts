import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { TaxonomyTypeEnum } from "models/taxonomies/taxonomy.model";
import { TaxonomyDto } from "services/taxonomies/DTOs/taxonomy.dto";
import { taxonomyListService } from "services/taxonomies/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function taxonomyCategoryListController ( req: Request, res: Response ) {
  const categoriesDto = await taxonomyListService( {
    query: req.query,
    preDefinedFilters: [ {
      filterBy: "type",
      filterParam: TaxonomyTypeEnum.CATEGORY
    } ],
    dataMapTo: TaxonomyDto
  } );
  res.send( categoriesDto );
  logger.info(
    `User retrieved categories successfully`,
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_USERAREA_CATEGORY_LIST )
  );
}