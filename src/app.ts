import express from 'express';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import path from 'path';
import i18next from 'i18next';
import i18middleware from 'i18next-http-middleware';
import session from 'express-session';
import { authRouter } from 'infrastructure/routes/api/v1/user/auth.router';
import { adminAuthRouter } from 'infrastructure/routes/api/v1/admin/auth.router';
import { adminTaxonomyRouter } from 'infrastructure/routes/api/v1/admin/taxonomy.router';
import { adminPostRouter } from 'infrastructure/routes/api/v1/admin/post.router';
import { adminPostCommentRouter } from 'infrastructure/routes/api/v1/admin/post-comment.router';
import { adminAttachmentRouter } from 'infrastructure/routes/api/v1/admin/attachment.router';
import { adminActivityRouter } from 'infrastructure/routes/api/v1/admin/activity.router';
import { i18nextConfiguration } from 'infrastructure/locales/i18next-config';
import { currentUser } from 'infrastructure/middleware/current-user.middleware';
import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { errorHandler } from 'infrastructure/middleware/error-handler.middleware';
import { adminSettingRouter } from 'infrastructure/routes/api/v1/admin/setting.router';
import { corsInit } from 'infrastructure/security/cors-init';
import { taxonomyRouter } from 'infrastructure/routes/api/v1/user/taxonomy.router';
import { postRouter } from 'infrastructure/routes/api/v1/user/post.router';

const app = express();
app.use( express.json() );
app.use( session( {
  secret: process.env.JWT_KEY!,
  resave: true,
  saveUninitialized: true
} ) );
//app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( responseTime() );
i18nextConfiguration();
app.use( i18middleware.handle( i18next ) );

// CORS policy config
corsInit( app );

// static public path for Uppy S3 multipart upload
app.use( express.static( path.join( __dirname, '../public' ) ) );

// Assign current user to Express Request object
app.use( currentUser );
// Routes
app.use( '/:lng?/api/v1/taxonomies', taxonomyRouter );
app.use( '/:lng?/api/v1/posts', postRouter );
app.use( '/:lng?/api/v1/users', authRouter );

app.use( '/:lng?/api/v1/admin/settings', adminSettingRouter );
app.use( '/:lng?/api/v1/admin/users', adminAuthRouter );
app.use( '/:lng?/api/v1/admin/attachments', adminAttachmentRouter );
app.use( '/:lng?/api/v1/admin/taxonomies', adminTaxonomyRouter );
app.use( '/:lng?/api/v1/admin/posts', adminPostRouter );
app.use( '/:lng?/api/v1/admin/post-comments', adminPostCommentRouter );
app.use( '/:lng?/api/v1/admin/attachments', adminAttachmentRouter );
app.use( '/:lng?/api/v1/admin/activities', adminActivityRouter );
// Issue 404 Not Found Error if all paths until this point do not match 
app.all( '*', async ( req, res, next ) => {
  next( new NotFoundError() );
} );

// Custom error handler middleware
app.use( errorHandler );

export { app };
