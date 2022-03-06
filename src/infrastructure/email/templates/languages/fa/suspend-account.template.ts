export const faSuspendAccountTemplate = ( email: string, isSuspended: boolean ) => {
  const suspendStatus = "تعلیق شدن";
  const unsuspendStatus = "تعلیق خارج شدن و فعال شدن دوباره";
  const suspensionStatus = isSuspended ? suspendStatus : unsuspendStatus;
  const subject = `${ process.env.BRAND_NAME } - حساب کاربری شما تعلیق شد`;
  const template = `
  <div dir="rtl">
  <p>این نامه جهت اطلاع از ${ suspensionStatus } حساب کاربری شما با نام کاربری  ‘${ email }’ در وب سایت ${ process.env.BRAND_NAME } ارسال شده است.</p>
  
  <p>اگر تغییر گذرواژه توسط شما انجام شده است، می توانید این نامه را نادیده بگیرید.</p>

 <p>اگر اشتباهی رخ داده، لطفا از طریق این نشانی با ما در ارتباط باشید ${ process.env.BASE_URL }/${ process.env.SUPPORT_PATH }</p>
  
  <p>با سپاس،</p>
  
  <p>تیم پشتیبانی ${ process.env.BRAND_NAME }.</p>
  </div>
`;

  return { subject, template };
}