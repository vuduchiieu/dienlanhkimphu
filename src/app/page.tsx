import styles from "./home.module.scss";
import classNames from "classnames/bind";
import Image, { StaticImageData } from "next/image";
import image from "./core/assets/image";
import icon from "./core/assets/icon";

import SideBar from "./core/component/sidebar/sidebar";

const services: {
  image: StaticImageData;
  title: string;
}[] = [
  {
    image: image.suadieuhoa,
    title: "LẮP ĐẶT ĐIỀU HOÀ",
  },
  {
    image: image.suadieuhoa,
    title: "SỬA CHỮA ĐIỀU HOÀ",
  },
  {
    image: image.suadieuhoa,
    title: "SỬA CHỮA TỦ LẠNH",
  },
  {
    image: image.suadieuhoa,
    title: "SỬA CHỮA MÁY GIẶT",
  },
];

export default function Home() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("bg")}>
      <main className={cx("main")}>
        <div className={cx("slide-image")}>
          <button className={cx("button-slide-left")}>
            <Image width={26} src={icon.arrowLeft} alt="arrowLeft" />
          </button>
          <Image src={image.slide1} alt="slide" />
          <div className={cx("txt-slide")}>
            <h2>
              Trung tâm mua bán, sửa chữa, bảo trì điện lạnh chuyên nghiệp tại
              Đà Nẵng
            </h2>
          </div>
          <button className={cx("button-slide-right")}>
            <Image width={26} src={icon.arrowRight} alt="arrowRight" />
          </button>
        </div>
        <div className={cx("content")}>
          <div className={cx("services")}>
            <h3>
              <span>DỊCH VỤ CỦA CHÚNG TÔI</span>
            </h3>
            <div className={cx("slide")}>
              <button className={cx("button-slide-left")}>
                <Image width={26} src={icon.arrowLeft} alt="arrowLeft" />
              </button>
              {services.map(({ image, title }, i) => (
                <div key={i} className={cx("service")}>
                  <Image src={image} alt={title} />
                  <div>
                    <h3>{title}</h3>
                  </div>
                </div>
              ))}
              <button className={cx("button-slide-right")}>
                <Image width={26} src={icon.arrowRight} alt="arrowRight" />
              </button>
            </div>
          </div>
          <div className={cx("main")}>
            <SideBar isShowPageFacebook={true} />
            <div className={cx("product")}></div>
          </div>
        </div>
      </main>
    </div>
  );
}
