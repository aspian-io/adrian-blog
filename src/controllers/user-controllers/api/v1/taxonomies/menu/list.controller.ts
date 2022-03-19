import { Request, Response } from "express";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { TaxonomyTypeEnum } from "models/taxonomies/taxonomy.model";
import { TaxonomyDto } from "services/taxonomies/DTOs/taxonomy.dto";
import { taxonomyListService } from "services/taxonomies/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function taxonomyMenuItemsController ( req: Request, res: Response ) {
  const menuItems = await taxonomyListService( {
    query: req.query,
    preDefinedFilters: [ {
      filterBy: "lang",
      filterParam: req.language
    }, {
      filterBy: "type",
      filterParam: TaxonomyTypeEnum.NAV_MENU
    } ],
    dataMapTo: TaxonomyDto
  } );
  res.send( menuItems );
  logger.info(
    `User retrieved menu tems successfully`,
    logSerializer( req, res, TaxonomyLocaleEnum.INFO_USERAREA_MENU_ITEMS_LIST )
  );
}