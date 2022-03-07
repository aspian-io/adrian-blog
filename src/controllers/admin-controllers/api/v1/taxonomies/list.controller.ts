import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { taxonomyListService } from "services/taxonomies/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminTaxonomyListController ( req: Request, res: Response ) {
  const taxonomies = await taxonomyListService();
  res.send( taxonomies );
  logger.info( "Taxonomy list retrieved successfully", logSerializer( req, res, TaxonomyLocaleEnum.INFO_LIST ) );
}