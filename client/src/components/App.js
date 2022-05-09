import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import Favicon from 'react-favicon'


import withContext from '../Context';

import Navbar from './Navbar';
import Jumbotron from './Jumbotron';
import BangoodAffiliate from './BangoodAffiliate';
import Content from './Content';
import Review from './Review';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';
import Cabinet from './Cabinet';
import Footer from './Footer';

const NavbarWithContext = withContext(Navbar);
const ContentWithContext = withContext(Content);
const RegistertWithContext = withContext(Register);
const LoginWithContext = withContext(Login);

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path='*' element={
                        <React.Fragment>
                            <Favicon url='https://i.imgur.com/GENnjcm.png' />
                            <NavbarWithContext />
                            <Jumbotron />
                            <NotFound />
                            <Footer />
                        </React.Fragment>
                    } />
                    <Route path="/" element={
                        <React.Fragment>
                            <Favicon url='https://i.imgur.com/GENnjcm.png' />
                            <NavbarWithContext />
                            <Jumbotron />
                            <ContentWithContext />
                            <BangoodAffiliate />
                            <Footer />
                        </React.Fragment>
                    } />
                    <Route path="/review" element={
                        <React.Fragment>
                            <Favicon url='https://i.imgur.com/GENnjcm.png' />
                            <NavbarWithContext />
                            <Jumbotron />
                            <Review />
                            <BangoodAffiliate />
                            <Footer />
                        </React.Fragment>
                    } />
                    <Route path="/register" element={
                        !localStorage.getItem('token') ?
                        <React.Fragment>
                            <Favicon url='https://i.imgur.com/GENnjcm.png' />
                            <NavbarWithContext />
                            <RegistertWithContext />
                            <BangoodAffiliate />
                            <Footer />
                        </React.Fragment> : <Navigate to="/" />
                    } />
                    <Route path="/login" element={
                        !localStorage.getItem('token') ?
                        <React.Fragment>
                            <Favicon url='https://i.imgur.com/GENnjcm.png' />
                            <NavbarWithContext />
                            <LoginWithContext />
                            <BangoodAffiliate />
                            <Footer />
                        </React.Fragment> : <Navigate to="/" />
                    } />
                    <Route path="/cabinet" element={
                        localStorage.getItem('token') ?
                        <React.Fragment>
                            <Favicon url='https://i.imgur.com/GENnjcm.png' />
                            <NavbarWithContext />
                            <Cabinet />
                            <BangoodAffiliate />
                            <Footer />
                        </React.Fragment> : <Navigate to="/" />
                    } />
                </Routes>
            </Router>
        );
    }
}

export default App;