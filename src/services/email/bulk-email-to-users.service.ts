import { sendMail } from "infrastructure/email/mailer";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { EmailLocaleEnum } from "infrastructure/locales/service-locale-keys/email.locale";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { PlaceHolder } from "infrastructure/string-utils/placeholder";
import { User } from "models/auth/auth-user.model";
import { Post } from "models/posts/post.model";
import { EmailUserInfoDto } from "./DTOs/email-user-info.dto";
import { scheduledEmailQueueToSend } from "./email-queue.service";

export async function bulkEmailToUsersService (
  userIds: string[],
  emailTemplateId: string,
  subject: string,
  scheduledISODate?: string
) {
  const template = await Post.findById( emailTemplateId );
  if ( !template ) {
    throw new BadRequestError( "Email template not found", EmailLocaleEnum.ERROR_TEMPLATE_NOT_FOUND );
  }
  const users = await User.find(
    { _id: { $in: userIds } },
    { isEmailConfirmed: true }
  );
  if ( !users.length ) {
    throw new BadRequestError(
      "Requested users for receiving emails are not found or not have confirmed email",
      EmailLocaleEnum.ERROR_USERS_NOT_FOUND
    );
  }

  const usersDto = dtoMapper( users, EmailUserInfoDto );
  if ( scheduledISODate ) {
    await scheduledEmailQueueToSend.add( {
      subject,
      template: template.content,
      users: usersDto
    }, {
      delay: new Date( scheduledISODate ).getTime() - Date.now()
    } );
  } else {
    await Promise.all( usersDto.map( async ( user ) => {
      const generatedContent = PlaceHolder.replaceWith( template.content, user );
      await sendMail( {
        from: process.env.EMAIL!,
        to: user.email,
        subject,
        html: generatedContent
      } );
    } ) );
  }
}