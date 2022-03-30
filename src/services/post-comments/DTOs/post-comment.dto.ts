import { IDtoMapperOption } from "infrastructure/service-utils/dto-mapper";
import { BaseMinimalDoc } from "models/base/base.model";
import { UserMinimalDto } from "services/auth/DTOs/user.dto";

export class PostCommentDto {
  title: string = '';
  content: string = '';
  likes: BaseMinimalDoc[] = [];
  numLikes: number = 0;
  isApproved: boolean = false;
  replyLevel: number = 0;
  isReplyAllowed: boolean = false;
  parent?: string = undefined;
  replies?: string[] = [];
  createdBy: UserMinimalDto = new UserMinimalDto();
}

export const PostDtoOption: IDtoMapperOption = {
  mapFromKey: "createdBy",
  mapToDtoClass: UserMinimalDto
};