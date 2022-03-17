import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { taxonomyListService } from "services/taxonomies/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminTaxonomyListController ( req: Request, res: Response ) {
  const taxonomies = await taxonomyListService( {
    query: req.query,
    preDefinedOrders: [ {
      orderBy: 'createdAt',
      orderParam: -1
    } ]
  } );
  res.send( taxonomies );
  logger.info(
    `List of taxonomies retrieved by admin <${ req.currentUser!.email }> successfully`,
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_LIST )
  );
}