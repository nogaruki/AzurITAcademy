import { useLang } from "../../i18n/LangContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <div className="text-center py-10 px-6 text-[13px] text-mut border-t border-line mt-[60px]">
      {t("footer.text")}
    </div>
  );
}
