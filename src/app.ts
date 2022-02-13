import express from 'express';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import path from 'path';
import i18next from 'i18next';
import { i18nextConfiguration } from 'locales/i18next-config';
import i18middleware from 'i18next-http-middleware';
import cors from 'cors';
import { errorHandler } from 'middleware/error-handler.middleware';
import { NotFoundError } from 'errors/not-found-error';
import { currentUser } from 'middleware/current-user.middleware';
import { attachmentRouter } from 'routes/attachment.router';
import session from 'express-session';
import { getS3ConfigParams } from 'infrastructure/s3/config.infra';
import companion from '@uppy/companion';
import { authRouter } from 'routes/auth.router';
import { taxonomyRouter } from 'routes/taxonomy.router';
import { activityRouter } from 'routes/activity.router';
import { postRouter } from 'routes/post.router';
import { postCommentRouter } from 'routes/post-comment.router';

const app = express();
app.use( express.json() );
app.use( session( {
  secret: process.env.JWT_KEY!,
  resave: true,
  saveUninitialized: true
} ) );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( responseTime() );
i18nextConfiguration();
app.use( i18middleware.handle( i18next ) );

// const whitelist = [ 'http://localhost:5000' ]
// allow cors requests from whitelist origins and with credentials
app.use( cors( {
  // origin: ( origin, callback ) => {
  //   if ( origin && whitelist.indexOf( origin ) !== -1 ) {
  //     callback( null, true )
  //   } else {
  //     callback( new Error( 'Not allowed by CORS' ) )
  //   }
  // },
  origin: '*',
  credentials: true,
  methods: [ 'get', 'post', 'put', 'patch', 'OPTIONS', 'delete', 'DELETE' ]
} ) );

// static public path for Uppy S3 multipart upload
app.use( express.static( path.join( __dirname, '../public' ) ) );

// Assign current user to Express Request object
app.use( currentUser );
// Uppy Companion
app.use( '/upload', companion.app( getS3ConfigParams( 5 * 60 * 60 ) ) );
// Routes
app.use( '/:lng?/api/v1/users', authRouter );

app.use( '/:lng?/api/v1/admin/taxonomies', taxonomyRouter );
app.use( '/:lng?/api/v1/admin/posts', postRouter );
app.use( '/:lng?/api/v1/admin/post-comments', postCommentRouter );
app.use( '/:lng?/api/v1/admin/attachments', attachmentRouter );
app.use( '/:lng?/api/v1/admin/activities', activityRouter );
// Issue 404 Not Found Error if all paths until this point do not match 
app.all( '*', async ( req, res, next ) => {
  next( new NotFoundError() );
} );

// Custom error handler middleware
app.use( errorHandler );

export { app };
