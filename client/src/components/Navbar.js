import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

const Navbar = (props) => {
    const {i18n} = useTranslation();

    const changeLanguage = (language) => {
        if (language === 'en') {
            localStorage.setItem('lang', 'en');
        } else {
            localStorage.setItem('lang', 'ru');
        }
        i18n.changeLanguage(language);
        document.location.reload();
    }

    const location = useLocation();
    const [loaded] = useState(false);

    useEffect(() => {
        switch(location.pathname) {
            case "/":
                if (localStorage.getItem('lang') === "ru") {
                    document.title = "Главная - BIS Analytics";
                } else if (localStorage.getItem('lang') === "en") {
                    document.title = "Home - BIS Analytics";
                }
                break;
            case "/review":
                if (localStorage.getItem('lang') === "ru") {
                    document.title = "Отзывы - BIS Analytics";
                } else if (localStorage.getItem('lang') === "en") {
                    document.title = "Reviews - BIS Analytics";
                }
                break;
        }
    }, [loaded]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand order-1 mr-0" href="#">
                    BIS Analytics
                    <img src={require('../img/logo.png')} width="40" height="40"
                         className="d-inline-block align-top"
                         alt="Company Logo"/>
                </a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div className="dropdown">
                            <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Trans i18nKey="locale">RU</Trans>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#" onClick={() => changeLanguage("en")}>EN</a>
                                <a className="dropdown-item" href="#" onClick={() => changeLanguage("ru")}>RU</a>
                            </div>
                        </div>
                        <a className="nav-item nav-link" href="/#home"><Trans i18nKey="navbar.main">Главная</Trans></a>
                        <a className="nav-item nav-link" href="/#about"><Trans i18nKey="navbar.about">О нас</Trans></a>
                        <a className="nav-item nav-link" href="/#services"><Trans i18nKey="navbar.services">Услуги</Trans></a>
                        <a className="nav-item nav-link" href="/review"><Trans i18nKey="navbar.reviews">Отзывы</Trans></a>
                        {localStorage.getItem('token') &&
                            <div className="dropdown">
                                <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>&nbsp;
                                    <Trans i18nKey="navbar.cabinet">Личный кабинет</Trans>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/cabinet">
                                        <Trans i18nKey="navbar.cabinet">Личный кабинет</Trans>
                                    </a>
                                    <a className="dropdown-item" href="/" onClick={() => localStorage.removeItem('token')}>
                                        <Trans i18nKey="navbar.logout">Выйти</Trans>
                                    </a>
                                </div>
                            </div>
                        }
                        {!localStorage.getItem('token') &&
                            <a href="/login" role="button" className="btn btn-outline-light"><Trans i18nKey="navbar.login">Войти</Trans></a>
                        }
                        <span>&nbsp;</span>
                        {!localStorage.getItem('token') &&
                            <a href="/register" role="button" className="btn btn-outline-light"><Trans i18nKey="navbar.register">Регистрация</Trans></a>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
