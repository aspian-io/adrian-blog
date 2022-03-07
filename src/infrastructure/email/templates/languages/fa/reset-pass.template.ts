export const faEmailResetPasswordTemplate = ( email: string, resetLink: string ) => {
  const subject = `بازنشانی گذرواژه ${ process.env.BRAND_NAME } شما`;
  const template = `
  <div dir="rtl">
  <p>این نامه به این جهت ارسال شده است که شما (یا فرد دیگری) درخواست بازنشانی گذرواژه حساب کاربری ‘${ email }’ را در وب سایت ${ process.env.BRAND_NAME } داده اید.</p>
  
  <p>لطفا بر روی پیوند زیر کلیک نموده، یا آن را در نوار آدرس مرورگر خود الصاق نمایید تا این عملیات تکمیل گردد:</p>
  
  <p>&emsp;<a href=${ resetLink } target="_blank">${ resetLink }</a></p>

  <p>لطفا در نظر داشته باشید که پیوند بالا تا یک ساعت آینده معتبر بوده و پس از آن ابطال می گردد./p>
  
  <p>اگر این نامه به اشتباه برای شما ارسال شده، می توانید آن را نادیده بگیرید.</p>
  
  <p>با سپاس،</p>
  
  <p>تیم پشتیبانی ${ process.env.BRAND_NAME }.</p>
  </div>
  `;

  return { subject, template };
};
