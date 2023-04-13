import { useTranslation } from "react-i18next";
import { LogoIcon } from "../Icon";

const Footer = () => {
  const { t } = useTranslation("footer");
  return (
    <footer className="bg-primaryGray p-5">
      <div className="container">
        <div className="flex flex-col gap-x-10 sm:grid sm:grid-cols-5">
          <div className="col-span-2">
            <div className="flex flex-col items-start gap-y-2">
              <div className="mb-5 flex items-center gap-x-2 sm:mb-0">
                <LogoIcon
                  kind="primary"
                  width={31}
                  height={30}
                ></LogoIcon>
                <span className="text-xl font-bold">Railway</span>
              </div>
              <span className="hidden text-sm font-medium text-secondaryGray sm:block">{t("footer content")}</span>
            </div>
          </div>
          <div className="col-span-1">
            <ul>
              <li>
                <h3 className="text-xl font-medium leading-[36px]">{t("services")}</h3>
              </li>
              <li className="mt-1 text-sm font-medium leading-7 text-secondaryGray">{t("booking")}</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">{t("ticket check")}</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">{t("return tickets")}</li>
            </ul>
          </div>
          <div className="col-span-1">
            <ul>
              <li>
                <h3 className="text-xl font-medium leading-[36px]">{t("support")}</h3>
              </li>
              <li className="mt-1 text-sm font-medium leading-7 text-secondaryGray">{t("account")}</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">{t("instruction")}</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">{t("contact")}</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">{t("payment policy")}</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">{t("faq")}</li>
            </ul>
          </div>
          <div className="col-span-1">
            <ul>
              <li>
                <h3 className="text-xl font-medium leading-[36px]">{t("about us")}</h3>
              </li>
              <li className="mt-1 text-sm font-medium leading-7 text-secondaryGray">{t("info and address")}</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">Blog</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
