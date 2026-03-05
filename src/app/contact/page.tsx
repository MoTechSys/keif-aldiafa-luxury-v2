import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "تواصل معنا | كيف الضيافة",
  description: "تواصل مع كيف الضيافة - واتساب، هاتف، بريد إلكتروني. احصل على استشارة مجانية لتصميم تجربة ضيافة فاخرة لمناسبتك.",
};

export default function ContactPage() {
  return <ContactClient />;
}
