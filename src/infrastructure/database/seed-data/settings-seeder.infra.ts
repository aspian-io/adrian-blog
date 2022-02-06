import chalk from "chalk";
import emoji from "node-emoji";
import { postCommentSettingsData } from "../../../data/settings/post-comment-settings.data";
import { CommentSettings } from "../../../models/post-comments/post-comments-settings.model";
import { connectToMongoDB } from "../mongodb/mongoose-connection.infra";

connectToMongoDB();

/**
 * Import default settings
 */
const importSettings = async () => {
  try {
    await CommentSettings.deleteMany();

    await CommentSettings.insertMany( postCommentSettingsData );

    console.log( chalk.bold.green( `${ emoji.get( 'white_check_mark' ) } Default settings seeded to database successfully` ) );
    process.exit();
  } catch ( error ) {
    console.error( chalk.red.inverse( `${ error }` ) );
    process.exit( 1 );
  }
};

/**
 * Destroy default settings
 */
const destroySettings = async () => {
  try {
    await CommentSettings.deleteMany();

    console.log( chalk.bold.red( `Settings destroyed successfully` ) );
    process.exit();
  } catch ( error ) {
    console.error( chalk.red.inverse( `${ error }` ) );
    process.exit( 1 );
  }
};

// Destroy default settings if console command has the "-d" flag
// otherwise import default settings
if ( process.argv[ 2 ] === '-d' ) {
  destroySettings();
} else {
  importSettings();
}