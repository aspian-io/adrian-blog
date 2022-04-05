import { AttachmentSectionEnum } from "models/attachments/attachment.model";

export function pathGeneratorBySection ( section: AttachmentSectionEnum ) {
  switch ( section ) {
    case AttachmentSectionEnum.BLOG:
      return 'blog';
    case AttachmentSectionEnum.BRAND_LOGO:
      return 'brand_logo';
    case AttachmentSectionEnum.COURSE:
      return 'course';
    case AttachmentSectionEnum.MAIN_SLIDESHOW:
      return 'main_slideshow';
    case AttachmentSectionEnum.NEWS:
      return 'news';
    case AttachmentSectionEnum.PRODUCT:
      return 'product';
    case AttachmentSectionEnum.SITE_LOGO:
      return 'site_logo';
    case AttachmentSectionEnum.USER:
      return 'user';
    default:
      return 'miscellaneous';
  }
}