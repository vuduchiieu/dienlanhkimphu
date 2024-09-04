import { StaticImageData } from "next/image";

import location from "./location.svg";
import mail from "./mail.svg";
import phone from "./phone.svg";
import facebook from "./facebook.svg";
import twitter from "./twitter.svg";
import skype from "./skype.svg";

interface iconType {
  location: StaticImageData;
  mail: StaticImageData;
  phone: StaticImageData;
  facebook: StaticImageData;
  twitter: StaticImageData;
  skype: StaticImageData;
}
const icon: iconType = {
  location,
  mail,
  phone,
  facebook,
  twitter,
  skype,
};

export default icon;
