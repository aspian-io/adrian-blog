import { DTOMapper, IDtoMapperOption } from "infrastructure/service-utils/dto-mapper";
import { AttachmentPhotoDto } from "services/attachments/DTOs/attachment.dto";

export class UserMinimalDto extends DTOMapper {
  dtoMapperProfile (): IDtoMapperOption<any>[] {
    const userMinimalDtoOption: IDtoMapperOption<AttachmentPhotoDto> = {
      mapToClass: {
        mapFromKey: "avatar",
        dtoClass: AttachmentPhotoDto
      }
    };

    return [ userMinimalDtoOption ];
  }
  firstName?: string = '';
  lastName?: string = '';
  avatar?: AttachmentPhotoDto = new AttachmentPhotoDto();
  displayName?: string = '';
  imgProxySignedUrl?: string = undefined;
}