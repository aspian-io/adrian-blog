import { Request, Response } from "express";
import { logSerializer } from "../../../../../helpers/log-serializer.helper";
import { TaxonomyLocaleEnum } from "../../../../../locales/service-locale-keys/taxonomies.locale";
import { taxonomyCreateService } from "../../../../../services/taxonomies/create.service";
import { logger } from "../../../../../services/winston-logger/logger.service";

export async function adminTaxonomyCreateController ( req: Request, res: Response ) {
  const { type, description, term, parent } = req.body;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const taxonomy = await taxonomyCreateService( {
    type,
    description,
    term,
    parent,
    createdBy: req.currentUser!.id,
    createdByIp: req.ip,
    userAgent
  } );
  res.status( 201 ).send( taxonomy );
  logger.info( "Taxonomy is created successfully", logSerializer( req, res, TaxonomyLocaleEnum.INFO_CREATE, term ) );
}