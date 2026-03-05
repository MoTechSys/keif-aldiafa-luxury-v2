import { Metadata } from "next";
import { HomePageClient } from "./HomePageClient";

export const metadata: Metadata = {
  title: "كيف الضيافة | خدمات الضيافة الفاخرة في المملكة العربية السعودية",
  description: "كيف الضيافة - منصة خدمات الضيافة الفاخرة في المملكة العربية السعودية. قهوة سعودية، شاي، تقديمات راقية وفريق احترافي لمناسباتكم.",
};

export default function HomePage() {
  return <HomePageClient />;
}
