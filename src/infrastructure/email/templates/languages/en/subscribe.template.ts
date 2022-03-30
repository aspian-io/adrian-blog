export const enSubscribeTemplate = ( email: string, verificationLink: string ) => {
  const subject = `${ process.env.BRAND_NAME } - Please confirm your subscription`;
  const template = `
  <p>You are receiving this because you (or someone else) used the email address '${ email }' on ${ process.env.BRAND_NAME } website to subscribe to our newsletter.</p>

  <p>Please click on the following link, or paste this into your browser to confirm the mentioned email address:</p>
  
  <p>&emsp;<a href=${ verificationLink } target="_blank">${ verificationLink }</a></p>
  
  <p>Please note that the above link is valid for 24 hours and then it will be revoked</p>
  
  <p>If you received this in error, you can safely ignore it.</p>
  
  <p>Thanks,</p>
  
  <p>The ${ process.env.BRAND_NAME } team.</p>
`;

  return { subject, template };
};