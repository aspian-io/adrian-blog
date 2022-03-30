import Queue from 'bull';
import chalk from 'chalk';
import { t } from 'i18next';
import { sendMail } from 'infrastructure/email/mailer';
import { rtlLangs } from 'infrastructure/locales/lang-directions';
import { EmailLocaleEnum } from 'infrastructure/locales/service-locale-keys/email.locale';
import { PlaceHolder } from 'infrastructure/string-utils/placeholder';
import { Post, PostTypeEnum } from 'models/posts/post.model';
import { authSubscribersList } from 'services/auth/subscriber/list.service';

interface Payload {
  headerTemplateId: string;
  bodyTemplateId: string;
  footerTemplateId: string;
}

class EmailPostInfoDto {
  constructor (
    public langDir: string,
    public title: string,
    public slug: string,
    public subtitle?: string,
    public excerpt?: string,
    public featuredImage?: string,
  ) { };
}

export const SENDING_NEWSLETTER_QUEUE_NAME = 'newsletter-cronjob:send-email';
export const sendingNewsletterQueue = new Queue<Payload>( SENDING_NEWSLETTER_QUEUE_NAME, process.env.REDIS_URL! );

sendingNewsletterQueue.process( async ( job ) => {
  const { headerTemplateId, bodyTemplateId, footerTemplateId } = job.data;
  const headerTemplate = await Post.findById( headerTemplateId );
  const bodyTemplate = await Post.findById( bodyTemplateId );
  const footerTemplate = await Post.findById( footerTemplateId );
  if ( !headerTemplate || !bodyTemplate || !footerTemplate ) return;

  const subscribers = await authSubscribersList();
  if ( subscribers.length ) {
    const last24HoursDate = new Date( new Date().getTime() - ( 24 * 60 * 60 * 1000 ) );
    const posts = await Post.find( { type: { $in: [ PostTypeEnum.BLOG, PostTypeEnum.NEWS ] }, createdAt: { $gte: last24HoursDate } } );
    await Promise.all( subscribers.map( async ( subscriber ) => {
      const langDirection = rtlLangs.includes( subscriber.lang ) ? "rtl" : "ltr";
      const langConstraintPosts = posts.filter( p => p.lang === subscriber.lang );
      const postsDto = langConstraintPosts.map( p => {
        return new EmailPostInfoDto( langDirection, p.title, p.slug, p.subtitle, p.excerpt, p.featuredImage?.url );
      } );
      let headerContent = '';
      let bodyContent = '';
      let footerContent = '';
      postsDto.forEach( p => {
        headerContent = PlaceHolder.replaceWith( headerTemplate.content, p );
        bodyContent += PlaceHolder.replaceWith( bodyTemplate.content, p );
        footerContent = PlaceHolder.replaceWith( footerTemplate.content, p );
      } );
      const fullContent = headerContent + bodyContent + footerContent;
      await sendMail( {
        from: process.env.EMAIL!,
        to: subscriber.email,
        subject: t( EmailLocaleEnum.INFO_NEWSLETTER_SUBJECT, { lng: subscriber.lang } ),
        html: fullContent
      } );
    } ) );
    console.log(
      chalk.bold.green.inverse( " Queue Info " ),
      chalk.bold.green( `Newsletter of today ${ new Date().toLocaleString() } as a cron job have been sent to subscribers successfully` )
    );
  };
} );