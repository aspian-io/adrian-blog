export const enSuspendAccountTemplate = ( email: string, isSuspended: boolean ) => {
  const suspensionStatus = isSuspended ? "has been suspended" : "is not suspended anymore and is active again";
  const subject = `${ process.env.BRAND_NAME } - Please confirm your email address`;
  const template = `
  <p>You are receiving this to know that your '${ email }' account on ${ process.env.BRAND_NAME } website ${ suspensionStatus }.</p>
  
  <p>If you received this in error, please reach out to us at ${ process.env.BASE_URL }/${ process.env.SUPPORT_PATH }.</p>
  
  <p>Thanks,</p>
  
  <p>The ${ process.env.BRAND_NAME } team.</p>
`;

  return { subject, template };
}