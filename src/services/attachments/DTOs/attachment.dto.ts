import { AttachmentPolicyEnum } from "models/attachments/attachment.model";

export class AttachmentPhotoDto {
  path: string = '';
  policy: AttachmentPolicyEnum = AttachmentPolicyEnum.DOWNLOAD;
  fileName: string = '';
  type: string = '';
  caption: string = '';
  size: number = 0;
}