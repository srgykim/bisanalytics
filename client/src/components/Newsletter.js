import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import validator from 'validator';

import Form from './Form';

class Newsletter extends Component {

    state = {
        emailError: null,
        email: "",
        errors: []
    }

    render() {
        let {
            emailError,
            email,
            errors
        } = this.state;
        const { t } = this.props;

        return (
            <div className="col-md col-xl-5 ml-auto">
                <Form
                    submit={this.submitHandler}
                    errors={errors}
                    elements={() => (
                        <React.Fragment>
                            <div>
                                <p><strong>{t("main.part18")}</strong></p>
                            </div>
                            <div className="input-group">
                                <input id="newsletterEmail" type="text" className="form-control" placeholder="Email" name="email" value={email} onChange={this.change}/>
                                <input id="subscribeButton" className="btn btn-primary" type="submit" value={t("main.part19")} />
                            </div>
                            <p style={{
                                color: 'red',
                            }}>{emailError}</p>
                        </React.Fragment>
                    )}
                />
            </div>
        );
    }

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

    submitHandler = event => {
        let { email, emailError, alreadySubscribed } = this.state;

        if (!emailError) {
            let requestBody = {
                query: `
                mutation CreateNewsletterUser($email: String!) {
                    createNewsletterUser(email: $email) {
                        email
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
                    if (resData.data.createNewsletterUser.email) {
                        document.getElementById('subscribeButton').className = 'btn btn-success';
                        setTimeout(() => {
                                document.getElementById('subscribeButton').className = 'btn btn-primary';
                                document.getElementById('newsletterEmail').value = '';
                            },
                            1000);
                    }
                })
                .catch(err => {
                    const { t } = this.props;
                    this.setState({emailError: t("error.invalidEmail")});
                    document.getElementById('subscribeButton').className = 'btn btn-danger';
                    setTimeout(() => {
                            document.getElementById('subscribeButton').className = 'btn btn-primary';
                            document.getElementById('newsletterEmail').value = '';
                        },
                        1000);
                });
        } else {
            console.error(emailError);
        }
    };
}

export default withTranslation()(Newsletter);
