import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

    constructor() {
        super();
        this.data = new Data();
    }

    login(token, email, tokenExpiration) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('tokenExpiration', tokenExpiration);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('tokenExpiration');
    }

    render() {
        const value = {
            data: this.data,
            login: this.login,
            logout: this.logout
        };
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;

/**
 * Компонент первого порядка, который содержит компонент контекстного потребления
 * @param {class} Component - компонент React.
 * @returns {function} коомпонент первого порядка.
 */
export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}

