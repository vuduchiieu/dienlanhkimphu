import classNames from "classnames/bind";
import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { contactDetails, iconSocial, listMenu } from "./data";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("header")}>
      <div className={cx("header-top")}>
        <div className={cx("container")}>
          {contactDetails.map(({ text, icon, classname }, i) => (
            <div key={i} className={cx("text-icon")}>
              <Image
                width={classname ? 26 : 20}
                height={classname ? 26 : 20}
                src={icon}
                alt={text}
              />
              <h4 className={cx(classname)}>{text}</h4>
            </div>
          ))}
          <div className={cx("social")}>
            {iconSocial.map(({ icon, alt }, i) => (
              <Image key={i} width={22} height={22} src={icon} alt={alt} />
            ))}
          </div>
        </div>
      </div>
      <div className={cx("header-bot")}>
        <div className={cx("menu")}>
          {listMenu.map((text, i) => (
            <Link href={"/"} key={i} className={cx("menu-item")}>
              <h3>{text}</h3>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
