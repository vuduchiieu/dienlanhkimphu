import { StaticImageData } from "next/image";
import icon from "../../assets/icon";

export const sections: {
  title: string;
  items: {
    text: string;
    icon: StaticImageData;
  }[];
}[] = [
  {
    title: "Liên hệ",
    items: [
      {
        text: "Cs1: 155 Lê Văn Hiến - Ngũ Hành \n Sơn - Đà Nẵng",
        icon: icon.location,
      },
      {
        text: "0888 705 799",
        icon: icon.phone,
      },
      {
        text: "Cs2: lô 246 Nam Kỳ Khởi Nghĩa",
        icon: icon.location,
      },
      {
        text: "dienlanhkimphu@gmail.com",
        icon: icon.mail,
      },
    ],
  },
  {
    title: "Sản phẩm",
    items: [
      {
        text: "Máy lạnh",
        icon: icon.dot,
      },
      {
        text: "Tủ lạnh",
        icon: icon.dot,
      },
      {
        text: "Máy giặt",
        icon: icon.dot,
      },
      {
        text: "Bình nóng lạnh",
        icon: icon.dot,
      },
      {
        text: "Lò vi sóng",
        icon: icon.dot,
      },
    ],
  },
  {
    title: "Hỗ trợ khách hàng",
    items: [
      {
        text: "Chính sách phân phối",
        icon: icon.dot,
      },
      {
        text: "Chính sách bảo mật",
        icon: icon.dot,
      },
      {
        text: "Điều khoản sử dụng",
        icon: icon.dot,
      },
      {
        text: "Tra cứu đơn hàng",
        icon: icon.dot,
      },
      {
        text: "Chính sách thanh toán",
        icon: icon.dot,
      },
    ],
  },
];
