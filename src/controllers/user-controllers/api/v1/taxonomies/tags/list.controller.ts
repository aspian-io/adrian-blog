import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { TaxonomyTypeEnum } from "models/taxonomies/taxonomy.model";
import { TaxonomyDto } from "services/taxonomies/DTOs/taxonomy.dto";
import { taxonomyListService } from "services/taxonomies/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function taxonomyTagsController ( req: Request, res: Response ) {
  const tags = await taxonomyListService( {
    query: req.query,
    preDefinedFilters: [ {
      filterBy: "lang",
      filterParam: req.language
    }, {
      filterBy: "type",
      filterParam: TaxonomyTypeEnum.TAG
    } ],
    dataMapTo: TaxonomyDto
  } );
  res.send( tags );
  logger.info(
    `User retrieved tags successfully`,
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_USERAREA_TAG_LIST )
  );
}