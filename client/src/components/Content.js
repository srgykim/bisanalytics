import React, {useState, useEffect} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

import withContext from '../Context';

import Newsletter from './Newsletter';

const dataRu = [
    {
        name: 'Окт. 21',
        plan: 5000,
        fact: 5500
    },
    {
        name: 'Нояб. 21',
        plan: 6000,
        fact: 4300
    },
    {
        name: 'Дек. 21',
        plan: 7000,
        fact: 10000
    },
    {
        name: 'Янв. 22',
        plan: 10000,
        fact: 3200
    },
];

const dataEn = [
    {
        name: 'Oct 21',
        plan: 5000,
        fact: 5500
    },
    {
        name: 'Nov 21',
        plan: 6000,
        fact: 4300
    },
    {
        name: 'Dec 21',
        plan: 7000,
        fact: 10000
    },
    {
        name: 'Jan 22',
        plan: 10000,
        fact: 3200
    },
];

const NewsletterContext = withContext(Newsletter);


export default () => {
    const {t, i18n} = useTranslation();

    let lang = "ru";
    if (localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang');
    }

    let data = dataRu;
    if(lang === "en") {
        data = dataEn;
    } else {
        data = dataRu;
    }

    const [loaded] = useState(false)
    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem('lang'));
    }, [loaded]);

    return (
        <div className="container pt-4">
            <div id="about" className="row">
                <div className="col-lg order-lg-1">
                    <h3 className="mb-4"><Trans i18nKey="main.part3">Маркетинговая аналитика</Trans></h3>
                    <p><Trans i18nKey="main.part4">Мы поможем вам отслеживать ваши важные показатели в реальном времени.</Trans></p>
                    <p><Trans i18nKey="main.part5">Анализируйте ваши рекламные кампании и всегда будьте в курсе событий.</Trans></p>
                    <p><Trans i18nKey="main.part6">Позволим вам взвешенно принимать важные решения и эффективно распределять бюджет.</Trans></p>
                    <h6><Trans i18nKey="main.part23">Выполнение плана</Trans></h6>
                    <AreaChart width={330} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area dataKey="plan" stroke="#8884d8" fill="#8884d8" />
                        <Area dataKey="fact" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </div>
                <div className="col-lg order-lg-2">
                    <h3 className="mb-4"><Trans i18nKey="main.part0">О нас</Trans></h3>
                    <div className="card mb-3">
                        <img className="card-img-top" src={require("../img/about-us.png")} alt="About us" />
                        <div className="card-body">
                            <h4 className="card-title"><Trans i18nKey="main.part1">Хранилище данных в облаке BigQuery.</Trans></h4>
                            <p className="card-text"><Trans i18nKey="main.part2">Интеграция с любыми источниками: файлы, веб-службы, базы данных.</Trans></p>
                        </div>
                    </div>
                </div>
            </div>

            <h1 id="services" className="display-4 text-center my-5 text-muted"><Trans i18nKey="main.part7">Услуги</Trans></h1>
            <div className="row">
                <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                        <img className="card-img-top" src={require("../img/powerbi-logo.png")} alt="Power BI" />
                        <div className="card-body">
                            <h4 className="card-title"><Trans i18nKey="main.part8">Визуализация в Power BI</Trans></h4>
                            <p className="card-text"><Trans i18nKey="main.part9">Дашборды и отчеты для ваших KPI в Power BI.</Trans></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                        <img className="card-img-top" src={require("../img/VK.png")} alt="VK" />
                        <div className="card-body">
                            <h4 className="card-title"><Trans i18nKey="main.part10">Данные VK</Trans></h4>
                            <p className="card-text"><Trans i18nKey="main.part11">Получите клиентов вашей целевой аудитории из Вконтакте.</Trans></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                        <img className="card-img-top" src={require("../img/instagram.png")} alt="Instagram" />
                        <div className="card-body">
                            <h4 className="card-title"><Trans i18nKey="main.part12">Данные Instagram</Trans></h4>
                            <p className="card-text"><Trans i18nKey="main.part13">Получите потенциальных клиентов из Instagram по хештегам.</Trans></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                        <img className="card-img-top" src={require("../img/yametrics.png")} alt="Yandex Metrica" />
                        <div className="card-body">
                            <h4 className="card-title"><Trans i18nKey="main.part21">Данные Яндекс Метрики</Trans></h4>
                            <p className="card-text"><Trans i18nKey="main.part22">Кастомизируйте ваши отчеты, объединив данные трафика вашего сайта из Я.Метрики.</Trans></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                        <img className="card-img-top" src={require("../img/googleanalytics.png")} alt="Google Analytics" />
                        <div className="card-body">
                            <h4 className="card-title"><Trans i18nKey="main.part24">Данные Google Analytics</Trans></h4>
                            <p className="card-text"><Trans i18nKey="main.part25">Кастомизируйте ваши отчеты, объединив данные трафика вашего сайта из Google Analytics.</Trans></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                        <img className="card-img-top" src={require("../img/airflowlogo.png")} alt="Apache Airflow" />
                        <div className="card-body">
                            <h4 className="card-title"><Trans i18nKey="main.part26">Интеграция Apache Airflow</Trans></h4>
                            <p className="card-text"><Trans i18nKey="main.part27">Оптимизируйте ваши потоки данных при помощи фреймворка оркестрации данных Apache Airflow.</Trans></p>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className="row py-4 text-muted">
                <div className="col-md col-xl-5">
                    <p><strong><Trans i18nKey="main.part14">О BIS Analytics</Trans></strong></p>
                    <p>
                        <Trans i18nKey="main.part15">Получите максимум пользы от ваших данных. Отправьте нам </Trans>
                        <a href="mailto:info@bisanalytics.digital"><Trans i18nKey="main.part16"> письмо, </Trans></a>
                        <Trans i18nKey="main.part17"> чтобы узнать больше</Trans>
                    </p>
                </div>
                <NewsletterContext />
            </div>
            <hr />
        </div>
    );
};
