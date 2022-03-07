import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { taxonomyDetailsService } from "services/taxonomies/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminTaxonomyDetailsController ( req: Request, res: Response ) {
  const taxonomy = await taxonomyDetailsService( req.params.slug );
  res.send( taxonomy );
  logger.info(
    "Taxonomy details has been retrieved successfully",
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_DETAILS, { taxonomy: { id: taxonomy.id } } )
  );
}