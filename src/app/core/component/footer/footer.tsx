import image from "../../assets/image";
import styles from "./footer.module.scss";
import classNames from "classnames/bind";
import { listMenu } from "../header/data";
import Link from "next/link";
import { sections } from "./data";
import Image from "next/image";

function Footer() {
  const cx = classNames.bind(styles);
  return (
    <footer className={cx("footer")}>
      <img
        className={cx("bg-image")}
        src={image.bgFooter.src}
        alt="bg-footer"
      />
      <div className={cx("menu")}>
        {listMenu.map((text, i) => (
          <Link href={"/"} key={i} className={cx("menu-item")}>
            <h3>{text}</h3>
          </Link>
        ))}
      </div>
      <div className={cx("sections")}>
        {sections.map((section, i) => (
          <div className={cx("section")} key={i}>
            <h3>{section.title}</h3>
            {section.items.map(({ text, icon }, i) => (
              <div key={i}>
                <Image width={28} height={28} src={icon} alt={text} />
                <h4>{text}</h4>
              </div>
            ))}
          </div>
        ))}
        <iframe
          src={process.env.LOCATION_SHOP}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  );
}

export default Footer;
