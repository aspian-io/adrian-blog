export const faChangePasswordTemplate = ( email: string ) => {
  const subject = `گذرواژه ${ process.env.BRAND_NAME } شما تغییر یافت`;
  const template = `
  <div dir="rtl">
  <p>این نامه به این جهت ارسال شده است که شما (یا فرد دیگری) گذرواژه حساب کاربری ‘${ email }’ را در وب سایت ${ process.env.BRAND_NAME } تغییر داده اید.</p>
  
  <p>اگر تغییر گذرواژه توسط شما انجام شده است، می توانید این نامه را نادیده بگیرید.</p>

 <p>در غیر این صورت می توانید از طریق این نشانی با ما در ارتباط باشید ${ process.env.BASE_URL }/${ process.env.SUPPORT_PATH }</p>
  
  <p>با سپاس،</p>
  
  <p>تیم پشتیبانی ${ process.env.BRAND_NAME }.</p>
  </div>
`;

  return { subject, template };
}