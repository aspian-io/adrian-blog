import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { taxonomyCreateService } from "services/taxonomies/create.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminTaxonomyCreateController ( req: Request, res: Response ) {
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const taxonomy = await taxonomyCreateService( {
    ...req.body,
    createdBy: req.currentUser!.id,
    createdByIp: req.ip,
    userAgent
  } );
  res.status( 201 ).send( taxonomy );
  logger.info(
    `A new taxonomy ${ taxonomy.term } of type ${ taxonomy.type } has been created by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_CREATE, { taxonomy: { id: taxonomy.id } } ) );
}