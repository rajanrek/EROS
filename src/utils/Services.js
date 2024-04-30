import { Platform } from "react-native";
import Globals from "./constant";

const Services =(isLive)=>{

        if (isLive) {
            Globals.TOKEN='RkdDQXBpVXNlcjE6ZjMzbGcwMGQhMjAxOA==';
            // Globals.WEBSITE_URL_LIVE = "http://213.171.214.107/api/";
            Globals.API_URL = "https://newappapi.lensgroup.co/api/gbp/";
            Globals.WEBSITE_URL_LIVE = "https://www.feelgoodcontacts.com/";
            // Globals.API_URL = "https://api2.lensgroup.co/api/website/gbp/";


        }
        else
        {
            Globals.TOKEN='QXBwMTphcHAxIzEyMw==';
            // Globals.WEBSITE_URL_LIVE = "http://213.171.214.107/api/";
            // Globals.API_URL = "https://api2.lensgroup.co/api/website/gbp/";
            //     Globals.WEBSITE_URL_LIVE = "https://ukstaging.lensgroup.co/";
            // Globals.API_URL = "https://apiuat.lensgroup.co/api/gbp/";
            Globals.API_URL = "https://newappapi.lensgroup.co/api/gbp/";

        }
        if(Platform.OS === 'ios')
        Globals.APP_PLAY_STORE='https://itunes.apple.com/gb/app/feel-good-contact-lenses/id1191834493?mt=8';
        else
        Globals.APP_PLAY_STORE="https://play.google.com/store/apps/details?id=app.feelgoodcontacts.com.feelgoodcontact"

}
export default Services;








