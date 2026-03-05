import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "خدماتنا | كيف الضيافة",
  description: "خدمات الضيافة الفاخرة - مضيفون ومضيفات محترفون، صباح قهوة، سقاء زمزم، خدمات فنية وتراثية، معدات فاخرة وأكثر.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
