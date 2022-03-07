import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { taxonomyEditService } from "services/taxonomies/edit.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminTaxonomyEditController ( req: Request, res: Response ) {
  const taxonomy = await taxonomyEditService( {
    ...req.body,
    slug: req.params.slug,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent: req.get( 'User-Agent' ) ?? "unknown_agent"
  } );

  res.send( taxonomy );
  logger.info(
    "Taxonomy edited successfully",
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_EDIT, { taxonomy: { id: taxonomy.id } } )
  );
}