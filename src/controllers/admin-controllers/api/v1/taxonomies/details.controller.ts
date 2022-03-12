import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { taxonomyDetailsService } from "services/taxonomies/details.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminTaxonomyDetailsController ( req: Request, res: Response ) {
  const taxonomy = await taxonomyDetailsService( req.params.slug );
  res.send( taxonomy );
  logger.info(
    `The taxonomy ${ taxonomy.term } of type ${ taxonomy.type } details has been retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_DETAILS, { taxonomy: { id: taxonomy.id } } )
  );
}