import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

export default () => {
    const {t, i18n} = useTranslation();

    return (
        <div className="jumbotron jumbotron-fluid bg-info text-white">
            <div className="container text-sm-center pt-5">
                <h1 className="display-3"><Trans i18nKey="jumbotron.title">Выжми максимум из ваших данных</Trans></h1>
                <p className="lead"><Trans i18nKey="jumbotron.description">Продвинутая аналитика для вашего бизнеса</Trans></p>
                <div className="btn-group mt-4" role="group" aria-label="Callout buttons">
                    <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#register">
                        <Trans i18nKey="jumbotron.demo">Закажите демонстрацию</Trans>
                    </button>
                    <a className="btn btn-light btn-lg" href="/#services"><Trans i18nKey="jumbotron.services">Перейти к услугам</Trans></a>
                </div>
            </div>
        </div>
    );
};
