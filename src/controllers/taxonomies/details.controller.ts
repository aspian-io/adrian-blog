import { Request, Response } from "express";
import { logSerializer } from "../../helpers/log-serializer.helper";
import { TaxonomyLocaleEnum } from "../../locales/service-locale-keys/taxonomies.locale";
import { taxonomyDetailsService } from "../../services/taxonomies/details.service";
import { logger } from "../../services/winston-logger/logger.service";

export async function taxonomyDetailsController ( req: Request, res: Response ) {
  const taxonomy = await taxonomyDetailsService( req.params.slug );
  res.send( taxonomy );
  logger.info(
    "Taxonomy details has been retrieved successfully",
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_DETAILS, taxonomy.term )
  );
}