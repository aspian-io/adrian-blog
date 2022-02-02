import { CorePolicies } from '../enums/core-policies.enum';
import { PasswordUtil } from "../../helpers/password-util.helper";
import { Claim } from "../auth-claim.model";
import { User } from "../auth-user.model";
import emoji from 'node-emoji';
import chalk from 'chalk';

export const authSeeder = async () => {
  const users = [
    new User( {
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin@test.com',
      password: await PasswordUtil.hash( '123456' ),
      createdByIp: '::1',
      lastIp: '::1',
      claims: [
        new Claim( {
          claim: CorePolicies.CoreClaims_ADMIN
        } )
      ],
      userAgent: "SEEDED"
    } ),
    new User( {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'user@test.com',
      password: await PasswordUtil.hash( '123456' ),
      createdByIp: '::1',
      lastIp: '::1',
      claims: [
        new Claim( {
          claim: CorePolicies.CoreClaims_USER
        } )
      ],
      userAgent: "SEEDED"
    } ),
  ];

  if ( ( await User.find( {} ) ).length === 0 ) {
    User.insertMany( users ).then( ( doc ) => {
      doc.forEach( async ( doc ) => {
        if ( doc.email === 'admin@test.com' ) {
          const claim = new Claim( {
            _id: doc.claims![ 0 ],
            claim: CorePolicies.CoreClaims_ADMIN,
            user: doc.id
          } );
          await claim.save();
        } else {
          const claim = new Claim( {
            _id: doc.claims![ 0 ],
            claim: CorePolicies.CoreClaims_USER,
            user: doc.id
          } );
          await claim.save();
        }
      } );
    } );

    console.log( chalk.bold.green( `${ emoji.get( 'white_check_mark' ) } User data seeded to database successfully` ) );
  } else {
    console.log( chalk.bold.cyan( `${ emoji.get( 'ok' ) } User data is already seeded` ) );
  }
};