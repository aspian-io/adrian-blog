import chalk from "chalk";
import emoji from "node-emoji";
import { claimsData } from "../../../data/user-claims.data";
import { usersData } from "../../../data/users.data";
import { Activity } from "../../../models/activities/activity.model";
import { Claim } from "../../../models/auth/auth-claim.model";
import { RefreshToken } from "../../../models/auth/auth-refresh-token.model";
import { User } from "../../../models/auth/auth-user.model";
import { Comment } from "../../../models/post-comments/post-comment.model";
import { Post } from "../../../models/posts/post.model";
import { Taxonomy } from "../../../models/taxonomies/taxonomy.model";
import { connectToMongoDB } from "../mongodb/mongoose-connection.infra";

connectToMongoDB();

/**
 * Import sample data and users
 */
const importData = async () => {
  try {
    await User.deleteMany();
    await Claim.deleteMany();
    await RefreshToken.deleteMany();
    await Activity.collection.drop();
    await Post.deleteMany();
    await Taxonomy.deleteMany();
    await Comment.deleteMany();

    await User.insertMany( await usersData() );
    await Claim.insertMany( claimsData );

    console.log( chalk.bold.green( `${ emoji.get( 'white_check_mark' ) } Data seeded to database successfully` ) );
    process.exit();
  } catch ( error ) {
    console.error( chalk.red.inverse( `${ error }` ) );
    process.exit( 1 );
  }
};

/**
 * Destroy sample data and users
 */
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Claim.deleteMany();
    await RefreshToken.deleteMany();
    await Activity.collection.drop();
    await Post.deleteMany();
    await Taxonomy.deleteMany();
    await Comment.deleteMany();

    console.log( chalk.bold.red( `Data destroyed successfully` ) );
    process.exit();
  } catch ( error ) {
    console.error( chalk.red.inverse( `${ error }` ) );
    process.exit( 1 );
  }
};

// Destroy data if console command has the "-d" flag
// otherwise import data
if ( process.argv[ 2 ] === '-d' ) {
  destroyData();
} else {
  importData();
}