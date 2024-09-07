import { StaticImageData } from "next/image";
import bgFooter from "./bg-footer.png";
import slide1 from "./slide-1.png";
import suadieuhoa from "./sua-dieu-hoa.jpg";
interface imageType {
  bgFooter: StaticImageData;
  slide1: StaticImageData;
  suadieuhoa: StaticImageData;
}
const image: imageType = {
  bgFooter,
  slide1,
  suadieuhoa,
};

export default image;
