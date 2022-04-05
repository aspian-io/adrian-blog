import { IDtoMapperOption } from "infrastructure/service-utils/dto-mapper";
import { AttachmentPhotoDto } from "services/attachments/DTOs/attachment.dto";

export class UserMinimalDto {
  firstName?: string = '';
  lastName?: string = '';
  avatar?: AttachmentPhotoDto = new AttachmentPhotoDto();
  displayName?: string = '';
  imgProxySignedUrl?: string = undefined;
}

export const userMinimalDtoOption: IDtoMapperOption<AttachmentPhotoDto> = {
  mapToClass: {
    mapFromKey: "avatar",
    dtoClass: AttachmentPhotoDto
  }
};