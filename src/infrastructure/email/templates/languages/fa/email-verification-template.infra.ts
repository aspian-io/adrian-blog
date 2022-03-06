export const faEmailVerificationTemplate = ( email: string, verificationLink: string ) => {
  const subject = `${ process.env.BRAND_NAME } - لطفا نشانی پست الکترونیک خود را تایید کنید`;
  const template = `
  <div dir="rtl">
  <p>این نامه به این جهت ارسال شده است که شما (یا فرد دیگری) درخواست ثبت نام در وب سایت  ${ process.env.BRAND_NAME } با نشانی پست الکترونیک  ‘${ email }’ را  داده اید.</p>
  
  <p>لطفا بر روی پیوند زیر کلیک نموده، یا آن را در نوار آدرس مرورگر خود الصاق نمایید تا نشانی پست الکترونیک شما تایید گردد:</p>
  
  <p>&emsp;<a href=${ verificationLink } target="_blank">${ verificationLink }</a></p>

  <p>لطفا در نظر داشته باشید که پیوند بالا تا۷ روز آینده معتبر بوده و پس از آن ابطال می گردد./p>
  
  <p>اگر این نامه به اشتباه برای شما ارسال شده، می توانید آن را نادیده بگیرید.</p>
  
  <p>با سپاس،</p>
  
  <p>تیم پشتیبانی ${ process.env.BRAND_NAME }.</p>
  </div>
`;

  return { subject, template };
}