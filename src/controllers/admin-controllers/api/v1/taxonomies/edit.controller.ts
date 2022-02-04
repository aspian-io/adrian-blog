import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { TaxonomyLocaleEnum } from "../../../../../locales/service-locale-keys/taxonomies.locale";
import { taxonomyEditService } from "../../../../../services/taxonomies/edit.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminTaxonomyEditController ( req: Request, res: Response ) {
  const taxonomy = await taxonomyEditService( {
    slug: req.params.slug,
    type: req.body.type,
    description: req.body.description,
    term: req.body.term,
    parent: req.body.parent,
    children: req.body.children,
    updatedBy: req.currentUser!.id,
    updatedByIp: req.ip,
    userAgent: req.get( 'User-Agent' ) ?? "unknown_agent"
  } );

  res.send( taxonomy );
  logger.info(
    "Taxonomy edited successfully",
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_EDIT, taxonomy.term )
  );
}