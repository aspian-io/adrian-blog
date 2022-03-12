import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { taxonomyDeleteService } from "services/taxonomies/delete.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminTaxonomyDeleteController ( req: Request, res: Response ) {
  const taxonomy = await taxonomyDeleteService( req.params.slug );
  res.send( taxonomy );
  logger.info(
    `The taxonomy ${ taxonomy.term } of type ${ taxonomy.type } has been deleted by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_DELETE, { taxonomy } )
  );
}