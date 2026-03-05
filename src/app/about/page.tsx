import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "من نحن | كيف الضيافة",
  description: "تعرف على كيف الضيافة - أكثر من 8 سنوات خبرة في تقديم خدمات الضيافة الفاخرة في المملكة العربية السعودية.",
};

export default function AboutPage() {
  return <AboutClient />;
}
