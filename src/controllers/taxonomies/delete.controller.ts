import { Request, Response } from "express";
import { logSerializer } from "../../helpers/log-serializer.helper";
import { TaxonomyLocaleEnum } from "../../locales/service-locale-keys/taxonomies.locale";
import { taxonomyDeleteService } from "../../services/taxonomies/delete.service";
import { logger } from "../../services/winston-logger/logger.service";

export async function taxonomyDeleteController ( req: Request, res: Response ) {
  const taxonomy = await taxonomyDeleteService( req.params.slug );
  res.send( taxonomy );
  logger.info(
    "The taxonomy has been deleted successfully",
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_DELETE, taxonomy.term )
  );
}