import React, {useState, useEffect} from 'react';
import { Trans, useTranslation } from 'react-i18next';


export default () => {
    const {t, i18n} = useTranslation();

    const [loaded] = useState(false)
    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem('lang'));
    }, [loaded]);

    return (
        <div className="container pt-4">
            <div className="row">
                <div className="col-lg order-lg-1">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h3 className="mb-4"><Trans i18nKey="main.notFoundHeadaer">Упс! Что-то пошло не так. Страница не найдена.</Trans></h3>
                            <a href="/"><Trans i18nKey="main.notFoundBody">Перейти на главную.</Trans></a>
                            <br/><br/><br/><br/><br/><br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
