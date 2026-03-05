import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "معرض الأعمال | كيف الضيافة",
  description: "استعرض أعمالنا السابقة في الضيافة الفاخرة - حفلات زفاف، مؤتمرات، فعاليات حكومية وتجارية.",
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
