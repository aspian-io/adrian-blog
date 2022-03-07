import { farazCreatePattern } from "@aspianet/faraz-sms";
import chalk from "chalk";
import { farazSMSDefaultPatterns } from "infrastructure/sms/faraz-sms-patterns";
import { smsProviderInit } from "infrastructure/sms/provider-init";
import { Settings, SettingsServiceEnum } from "models/settings/settings.model";
import emoji from "node-emoji";
import { connectToMongoDB } from "../mongodb/mongoose-connection";

connectToMongoDB();
smsProviderInit();

const importPatterns = () => {
  farazSMSDefaultPatterns.forEach( async p => {
    try {
      const pattern = await farazCreatePattern( p.pattern, p.description, p.is_shared );
      const setting = new Settings( {
        key: p.settingKey,
        value: pattern.data.pattern.code,
        service: SettingsServiceEnum.SMS,
        userAgent: "SYSTEM"
      } );
      await setting.save();
      console.log( chalk.bold.green( `${ emoji.get( 'white_check_mark' ) } FarazSMS patterns seeded to settings successfully` ) );
      process.exit();
    } catch ( error ) {
      console.error( chalk.red.inverse( `${ error }` ) );
      process.exit( 1 );
    }
  } );
};

importPatterns();