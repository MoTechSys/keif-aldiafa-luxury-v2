import { Metadata } from "next";
import OfferingsClient from "./OfferingsClient";

export const metadata: Metadata = {
  title: "تقديماتنا | كيف الضيافة",
  description: "أرقى التقديمات والمشروبات - قهوة سعودية أصيلة، شاي فاخر، حلويات شرقية وغربية، تمور فاخرة ومعدات ضيافة للإيجار.",
};

export default function OfferingsPage() {
  return <OfferingsClient />;
}
