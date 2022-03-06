import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { taxonomyDeleteService } from "services/taxonomies/delete.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminTaxonomyDeleteController ( req: Request, res: Response ) {
  const taxonomy = await taxonomyDeleteService( req.params.slug );
  res.send( taxonomy );
  logger.info(
    "The taxonomy has been deleted successfully",
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_DELETE, { taxonomy } )
  );
}