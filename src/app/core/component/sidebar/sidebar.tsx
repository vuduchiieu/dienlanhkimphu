import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import icon from "../../assets/icon";
import image from "../../assets/image";

function SideBar({
  isShowPageFacebook = false,
}: {
  isShowPageFacebook?: boolean;
}) {
  const cx = classNames.bind(styles);
  const directory: string[] = [
    "Tủ lạnh",
    "Máy giặt",
    "Máy lạnh cũ giá rẻ",
    "Bình nóng lạnh",
    "Lò vi sóng",
  ];
  return (
    <div className={cx("side-bar")}>
      <div className={cx("directory")}>
        <div className={cx("title")}>
          <Image width={30} src={icon.arrowLeft} alt="icon" />
          <h3>DANH MỤC</h3>
        </div>
        <div className={cx("lists")}>
          {directory.map((item, i) => (
            <div key={i} className={cx("list")}>
              <h4>{item}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("new-product")}>
        <h2>
          <span>SẢN PHẨM MỚI</span>
        </h2>
        <div className={cx("list-product")}>
          <div className={cx("product")}>
            <div className={cx("image")}>
              <Image src={image.suadieuhoa} alt="" />
            </div>
            <div className={cx("info-product")}>
              <h3>Máy lạnh LG 1.5 Hp inverter V13ENS</h3>
              <h4>7.800.000 VNĐ</h4>
            </div>
          </div>
          <div className={cx("product")}>
            <div className={cx("image")}>
              <Image src={image.suadieuhoa} alt="" />
            </div>
            <div className={cx("info-product")}>
              <h3>Máy lạnh LG 1.5 Hp inverter V13ENS</h3>
              <h4>7.800.000 VNĐ</h4>
            </div>
          </div>
          <div className={cx("product")}>
            <div className={cx("image")}>
              <Image src={image.suadieuhoa} alt="" />
            </div>
            <div className={cx("info-product")}>
              <h3>Máy lạnh LG 1.5 Hp inverter V13ENS</h3>
              <h4>7.800.000 VNĐ</h4>
            </div>
          </div>
        </div>
      </div>
      {isShowPageFacebook ? (
        <iframe
          name="f81a9c503772761ce"
          data-testid="fb:page Facebook Social Plugin"
          title="fb:page Facebook Social Plugin"
          frameBorder="0"
          allowTransparency={true}
          allowFullScreen={true}
          scrolling="no"
          allow="encrypted-media"
          style={{
            border: "none",
            height: 240,
          }}
          src="https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&amp;app_id=1638000783132284&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df9e9933c0ab7faabe%26domain%3Ddienlanhkimphu.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fdienlanhkimphu.com%252Ffdf8c8b88821b95c9%26relation%3Dparent.parent&amp;container_width=270&amp;height=240&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fdienlanhkimphu%2F%3Fhc_ref%3DARSbgc2qxLkWLQBUeWsXJeMYL4YBeqYpVpOkQsRTM7_eT8ZbmFHLyaz_-DzegZiOY54%26fref%3Dtag%26__tn__%3DkC-R&amp;locale=en_US&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false&amp;tabs=timeline&amp;width=270"
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SideBar;
