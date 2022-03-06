export const enChangePasswordTemplate = ( email: string ) => {
  const subject = `Your ${ process.env.BRAND_NAME } password has been changed`;
  const template = `
<p>You are receiving this because you (or someone else) has changed the password of your '${ email }' ${ process.env.BRAND_NAME } user account.</p>

<p>If this was you, you can safely ignore this email.</p>

<p>If not, please reach out to us at ${ process.env.BASE_URL }/${ process.env.SUPPORT_PATH }</p>

<p>Thanks,</p>

<p>The ${ process.env.BRAND_NAME } team.</p>
`;

  return { subject, template };
}