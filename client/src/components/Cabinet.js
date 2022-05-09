import React, { Component } from 'react';
import { withTranslation, Trans } from 'react-i18next';


class Cabinet extends Component {
    state = {
        tokenError: null
    };

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.phoneEl = React.createRef();
        this.firstNameEl = React.createRef();
        this.lastNameEl = React.createRef();
        this.aboutEl = React.createRef();
        this.yes = localStorage.getItem('lang') === "ru" ? "Подписан" : "Subscribed";
        this.no = localStorage.getItem('lang') === "ru" ? "Не подписан" : "Unsubscribed";

        this.state = {value: localStorage.getItem('lang') === "ru" ? "Не подписан" : "Unsubscribed"};
        this.handleChange = this.handleChange.bind(this);
    }

    getCurrentInfo = event => {
        const { t } = this.props;
        const email = localStorage.getItem('email');

        let requestBody = {
            query: `
                query GetCurrentInfo($email: String!) {
                    getCurrentInfo(email: $email) {
                        email
                        phone
                        firstName
                        lastName
                        about
                        subscribedToNewsletter
                    }
                }
            `,
            variables: {
                email: email
            }
        };

        fetch('https://bisanalytics.digital/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                if(resData.errors) {
                    throw new Error('Failed!');
                }

                this.emailEl = resData.data.getCurrentInfo.email;
                let emailInput = document.getElementById("inputEmail");
                this.emailEl ? emailInput.placeholder = this.emailEl : emailInput.placeholder = '';

                this.phoneEl = resData.data.getCurrentInfo.phone;
                let phoneInput = document.getElementById("inputPhone");
                this.phoneEl ? phoneInput.placeholder = this.phoneEl : phoneInput.placeholder = '';

                this.firstNameEl = resData.data.getCurrentInfo.firstName;
                let firstNameInput = document.getElementById("inputFirstName");
                this.firstNameEl ? firstNameInput.placeholder = this.firstNameEl : firstNameInput.placeholder = '';

                this.lastNameEl = resData.data.getCurrentInfo.lastName;
                let lastNameInput = document.getElementById("inputLastName");
                this.lastNameEl ? lastNameInput.placeholder = this.lastNameEl : lastNameInput.placeholder = '';

                this.aboutEl = resData.data.getCurrentInfo.about;
                let about = document.getElementById("about");
                this.aboutEl ? about.placeholder = this.aboutEl : about.placeholder = '';

                if (this.yes = localStorage.getItem('lang') === "ru") {
                    resData.data.getCurrentInfo.subscribedToNewsletter === "true" ?
                        document.getElementById("inputNewsletter").value = "Подписан" : document.getElementById("inputNewsletter").value = "Не подписан";
                } else if (this.yes = localStorage.getItem('lang') === "en") {
                    resData.data.getCurrentInfo.subscribedToNewsletter === "true" ?
                        document.getElementById("inputNewsletter").value = "Subscribed" : document.getElementById("inputNewsletter").value = "Unsubscribed";
                }
            })
            .catch(err => {
                this.setState({tokenError: t("error.tokenError")});
            });
    }

    updateCurrentInfo = event => {
        event.preventDefault();
        const { t } = this.props;
        const email = localStorage.getItem('email');
        const phone = document.getElementById("inputPhone").value ?
            document.getElementById("inputPhone").value : document.getElementById("inputPhone").placeholder;
        const firstName = document.getElementById("inputFirstName").value ?
            document.getElementById("inputFirstName").value : document.getElementById("inputFirstName").placeholder;
        const lastName = document.getElementById("inputLastName").value ?
            document.getElementById("inputLastName").value : document.getElementById("inputLastName").placeholder;
        const about = document.getElementById("about").value ?
            document.getElementById("about").value : document.getElementById("about").placeholder;

        let subscribedToNewsletter;
        switch(this.state.value) {
            case "Subscribed":
                subscribedToNewsletter = "true";
                break;
            case "Подписан":
                subscribedToNewsletter = "true";
                break;
            default:
                subscribedToNewsletter = "false";
                break;
        }

        let requestBody = {
            query: `
                mutation UpdateCurrentInfo($email: String!, $phone: String, $firstName: String, $lastName: String, $about: String, $subscribedToNewsletter: String) {
                    updateCurrentInfo(email: $email, phone: $phone, firstName: $firstName, lastName: $lastName, about: $about, subscribedToNewsletter: $subscribedToNewsletter) {
                        email
                        phone
                        firstName
                        lastName
                        about
                        subscribedToNewsletter
                    }
                }
            `,
            variables: {
                email: email,
                phone: phone,
                firstName: firstName,
                lastName: lastName,
                about: about,
                subscribedToNewsletter: subscribedToNewsletter
            }
        };

        fetch('https://bisanalytics.digital/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                if(resData.errors) {
                    throw new Error('Failed!');
                }
                document.getElementById('saveButton').className = 'btn btn-success float-right';
                setTimeout(() => { document.getElementById('saveButton').className = 'btn btn-primary float-right'; }, 1000);
            })
            .catch(err => {
                this.setState({tokenError: t("error.tokenError")});
                document.getElementById('saveButton').className = 'btn btn-danger float-right';
                setTimeout(() => { document.getElementById('saveButton').className = 'btn btn-primary float-right'; }, 1000);
            });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentDidMount() {
        this.getCurrentInfo();
    }

    render() {
        let {
            tokenError
        } = this.state;

        return (
        <div className="container pt-4">
                <div className="row">
                    <div className="col-lg order-lg-1">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h3 className="mb-4"><Trans i18nKey="cabinet.part0">Личный кабинет</Trans></h3>
                                <form onSubmit={this.updateCurrentInfo}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail"><Trans
                                                i18nKey="cabinet.email">Email</Trans></label>
                                            <input id="inputEmail" className="form-control" type="text" ref={this.emailEl} readOnly />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPhone"><Trans
                                                i18nKey="cabinet.phone">Телефон</Trans></label>
                                            <input type="text" className="form-control" id="inputPhone" ref={this.phoneEl} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputFirstName"><Trans
                                            i18nKey="cabinet.firstName">Имя</Trans></label>
                                        <input type="text" className="form-control" id="inputFirstName" ref={this.firstNameEl} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputLastName"><Trans i18nKey="cabinet.lastName">Фамилия</Trans></label>
                                        <input type="text" className="form-control" id="inputLastName" ref={this.lastNameEl} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="about"><Trans i18nKey="cabinet.about">О себе</Trans></label>
                                        <textarea className="form-control" id="about" ref={this.aboutEl}
                                                  rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputNewsletter"><Trans i18nKey="cabinet.newsletter">Подписаться на рассылку</Trans></label>
                                        <select id="inputNewsletter" className="form-control" value={this.state.value} onChange={this.handleChange}>
                                            <option value={this.yes}>{this.yes}</option>
                                            <option value={this.no}>{this.no}</option>
                                        </select>
                                    </div>
                                    <p style={{
                                        color: 'red',
                                    }}>{tokenError}</p>
                                    <button type="submit" className="btn btn-primary float-right" id="saveButton">
                                        <Trans i18nKey="cabinet.save">Сохранить</Trans>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Cabinet);
