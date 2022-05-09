import {Trans, useTranslation} from "react-i18next";
import React from "react";

export default () => {
    const {t, i18n} = useTranslation();

    return (
    <footer className="page-footer font-small blue pt-4 bg-primary text-white">
        <div className="container-fluid text-center text-md-left">
            <div className="row">
                <div className="col-md-6 mt-md-0 mt-3">
                    <h5 className="text-uppercase"><Trans i18nKey="main.part20_4">Появились вопросы?</Trans></h5>
                    <p><Trans i18nKey="main.part20_5">Свяжитесь с нами по телефону или почте.</Trans></p>
                </div>
                <hr className="clearfix w-100 d-md-none pb-3" />
                 <div className="col-md-3 mb-md-0 mb-3">
                      <h5 className="text-uppercase"><Trans i18nKey="main.part20_0">Телефоны</Trans></h5>
                        <ul className="list-unstyled">
                            <li>
                                <Trans i18nKey="main.part20_1">+7 (708) 970-61-56 (КАЗ)</Trans>
                            </li>
                            <li>
                                <Trans i18nKey="main.part20_2">+7 (962) 283-72-39 (РУС)</Trans>
                            </li>
                        </ul>
                    </div>
                <div className="col-md-3 mb-md-0 mb-3">
                    <h5 className="text-uppercase"><Trans i18nKey="main.part20_3">Почта</Trans></h5>
                    <ul className="list-unstyled">
                        <li>
                            info@bisanalytics.digital
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-copyright text-center py-3">© 2021-2022 BIS Analytics - Worldwide</div>
    </footer>
    );
}
