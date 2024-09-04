import { StaticImageData } from "next/image";
import icon from "../../asset/icon";

export const contactDetails: {
  text: string;
  icon: StaticImageData;
  classname?: string;
}[] = [
  {
    text: "Cs1: 155 Lê Văn Hiến - Ngũ Hành Sơn - Đà Nẵng",
    icon: icon.location,
  },
  { text: "dienlanhkimphu@gmail.com", icon: icon.mail },
  { text: "0888 705 799", icon: icon.phone, classname: "phone" },
];
export const listMenu: string[] = [
  "TRANG CHỦ",
  "GIỚI THIỆU",
  "SẢN PHẨM",
  "DỊCH VỤ",
  "TUYỂN DỤNG",
  "TIN TỨC",
];
export const iconSocial: {
  icon: StaticImageData;
  alt: string;
}[] = [
  {
    icon: icon.facebook,
    alt: "facebook",
  },
  {
    icon: icon.twitter,
    alt: "twitter",
  },
  {
    icon: icon.skype,
    alt: "skype",
  },
];
