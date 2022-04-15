import { DTOMapper } from "infrastructure/service-utils/dto-mapper";
import { AttachmentPolicyEnum } from "models/attachments/attachment.model";

export class AttachmentPhotoDto extends DTOMapper {
  path: string = '';
  policy: AttachmentPolicyEnum = AttachmentPolicyEnum.DOWNLOAD;
  fileName: string = '';
  type: string = '';
  caption: string = '';
  size: number = 0;
}