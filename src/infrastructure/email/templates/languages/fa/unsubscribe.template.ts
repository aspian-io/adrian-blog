export const faUnsubscribeTemplate = ( email: string, verificationLink: string ) => {
  const subject = `${ process.env.BRAND_NAME } - تایید لغو عضویت در خبرنامه`;
  const template = `
  <div dir="rtl">
  <p>این نامه به این جهت ارسال شده است که شما (یا فرد دیگری) درخواست لغو عضویت خبرنامه در وب سایت  ${ process.env.BRAND_NAME } با نشانی پست الکترونیک  ‘${ email }’ را  داده اید.</p>
  
  <p>لطفا بر روی پیوند زیر کلیک نموده، یا آن را در نوار آدرس مرورگر خود الصاق نمایید تا لغو عضویت شما تایید گردد:</p>
  
  <p>&emsp;<a href=${ verificationLink } target="_blank">${ verificationLink }</a></p>

  <p>لطفا در نظر داشته باشید که پیوند بالا تا ۲۴ ساعت آینده معتبر بوده و پس از آن ابطال می گردد./p>
  
  <p>اگر این نامه به اشتباه برای شما ارسال شده، می توانید آن را نادیده بگیرید.</p>
  
  <p>با سپاس،</p>
  
  <p>تیم پشتیبانی ${ process.env.BRAND_NAME }.</p>
  </div>
`;

  return { subject, template };
};