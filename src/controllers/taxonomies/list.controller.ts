import { Request, Response } from "express";
import { logSerializer } from "../../helpers/log-serializer.helper";
import { TaxonomyLocaleEnum } from "../../locales/service-locale-keys/taxonomies.locale";
import { taxonomyListService } from "../../services/taxonomies/list.service";
import { logger } from "../../services/winston-logger/logger.service";

export async function taxonomyListController ( req: Request, res: Response ) {
  const taxonomies = await taxonomyListService();
  res.send( taxonomies );
  logger.info( "Taxonomy list retrieved successfully", logSerializer( req, res, TaxonomyLocaleEnum.INFO_LIST ) );
}