import React, {Component} from 'react';
import {HomePage} from './HomePage';
import {PersonProfileNewPage} from './PersonProfileNewPage';
import {PersonProfileUpdatePage} from './PersonProfileUpdatePage';
import {CompanyProfileNewPage} from './CompanyProfileNewPage';
import {CompanyProfileUpdatePage} from './CompanyProfileUpdatePage';
import {SignInPage} from './SignInPage';
import {SignUpPage} from './SignUpPage';
import {NavBar} from './NavBar';
import {AuthRoute} from './AuthRoute';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';


class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: null
    };
    this.signIn = this.signIn.bind(this);
  }

  signIn () {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({user: payload});
    }
  }

  signOut () {
    localStorage.removeItem('jwt');
    this.setState({
      user: null
    })
  }




  componentDidMount () {
    this.signIn();
  }

  isAuth () {
    return !!this.state.user
  }

  render () {
    const {user} = this.state;
    return (
      <Router >
        <div className="App">
          <NavBar user={user} onSignOut={this.signOut} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/sign_up" component={SignUpPage} />
            <Route path="/sign_in" render={props => {
              return <SignInPage {...props} onSignIn={this.signIn} />
            }} />

            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/person_profiles/new"
              component={PersonProfileNewPage}
            />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/person_profiles/update"
              component={PersonProfileUpdatePage}
            />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/company_profiles/new"
              component={CompanyProfileNewPage}
            />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/company_profiles/update"
              component={CompanyProfileUpdatePage}
            />


          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
