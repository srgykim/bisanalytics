import React, { Component } from 'react';
import { withTranslation, Trans } from 'react-i18next';
import validator from 'validator';


class Login extends Component {
    state = {
        emailError: null,
        loginError: null
    };

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }
    
    submitHandler = event => {
        event.preventDefault();
        const { context } = this.props;
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
    
        if (email.trim().length === 0 || password.trim().length === 0) {
          return;
        }
        
        let requestBody = {
            query: `
                query Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        email
                        token
                        tokenExpiration
                    }
                }
            `,
            variables: {
                email: email,
                password: password
            }
        };
    
        fetch('https://bisanalytics.digital/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            if (resData.data.login.token) {
                context.login(
                    resData.data.login.token,
                    resData.data.login.email,
                    resData.data.login.tokenExpiration
                );
            }
            window.location.href = '../';
        })
        .catch(err => {
            const { t } = this.props;
            document.getElementById('loginButton').className = 'btn btn-danger float-right';
                setTimeout(() => { document.getElementById('loginButton').className = 'btn btn-primary float-right'; }, 1000);
            this.setState({loginError: t("error.incorrectEmail")});
        });
    };    

    change = (event) => {
        const { t } = this.props;
        const name = event.target.name;
        const value = event.target.value;

        if (validator.isEmail(value)) {
            this.setState({emailError: null});
        } else {
            this.setState({emailError: t("error.invalidEmail")});
        }

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }
    render() {
        let {
            emailError,
            loginError
        } = this.state;

        return (
            <div className="container pt-4">
                <div className="row">
                    <div className="col-lg order-lg-1">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h3 className="mb-4">
                                    <Trans i18nKey="login.main_header">Вход в систему</Trans>
                                </h3>
                                <h6 className="mb-4">
                                    <Trans i18nKey="login.secondary_header">Войти с помощью эл. почты</Trans>
                                </h6>
                                <form onSubmit={this.submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                        <Trans i18nKey="login.email">Электронная почта</Trans>
                                        </label>
                                        <input type="email" className="form-control" id="email" ref={this.emailEl} aria-describedby="emailHelp" onChange={this.change} />
                                        <p style={{
                                            color: 'red',
                                        }}>{emailError}</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            <Trans i18nKey="login.password">Пароль</Trans>
                                        </label>
                                        <input type="password" className="form-control" id="password" ref={this.passwordEl} />
                                    </div>
                                    <p style={{
                                        color: 'red',
                                    }}>{loginError}</p>
                                    <button id="loginButton" type="submit" className="btn btn-primary float-right">
                                        <Trans i18nKey="login.login">Вход</Trans>
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

export default withTranslation()(Login);
