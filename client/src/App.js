import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Alert from './components/Alert/Alert';
import Footer from './components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import StatsPage from './Pages/StatsPage/StatsPage';
import TeamPage from './Pages/TeamPage/TeamPage';
import StorePage from './Pages/StorePage/StorePage';
import AdministratorPage from './Pages/AdministratorPage/AdministratorPage';
import SignInSignUpPage from './Pages/SignInSignUpPage/SignInSignUpPage';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage';

const App = () => {
  return (
    <div className='page-container'>
      <div className='content-wrapper'>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/stats' component={StatsPage} />
          <Route path='/team' component={TeamPage} />
          <Route path='/store' component={StorePage} />
          <Route path='/admin' component={AdministratorPage} />
          <Route path='/signin' component={SignInSignUpPage} />
          <Route path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
