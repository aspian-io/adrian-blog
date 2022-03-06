export const enEmailResetPasswordTemplate = ( email: string, resetLink: string ) => {
  const subject = `Your ${ process.env.BRAND_NAME } password reset`;
  const template = `
<p>You are receiving this because you (or someone else) requested the reset of the '${ email }' ${ process.env.BRAND_NAME } user account.</p>

<p>Please click on the following link, or paste this into your browser to complete the process:</p>

<p>&emsp;<a href=${ resetLink } target="_blank">${ resetLink }</a></p>

<p>Please note that the above link is valid for an hour and then it will be revoked</p>

<p>If you received this in error, you can safely ignore it.</p>

<p>Thanks,</p>

<p>The ${ process.env.BRAND_NAME } team.</p>
`;

  return { subject, template };
}