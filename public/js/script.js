'use strict'
console.log('react hered');

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

const Login = require('./components/login.js');
const Signup = require('./components/signup.js');
const Logout = require('./components/logout.js');
const NotFound = require('./components/404.js');

const browserHistory = require('react-router').browserHistory;
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
const auth = require('./auth');




// initial state of the application
const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  // function to set loggedIn state
  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  // executes on app load, assigns auth.onChange to equal this.updateAuth
  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    if(this.state.loggedIn) {
      return (
          <div>
            <Link to ="/" ><h1>MyToto</h1></Link>
            <nav>
              <ul>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/find">Find</Link></li>
                <li><Link to="/mytoto">Profile</Link></li>
                <li><Link to="/logout">Logout</Link></li>
              </ul>
            </nav>
            {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
          </div>
      )
    } else {
      return (
        <div>
          <div>
            <h3>Welcome!</h3>
            <div>
              <Link to="/login"><button className="btn" data-toggle="modal" data-target="#myLogin">Log in</button></Link>
              <Link to="/signup"><button className="btn" data-toggle="modal" data-target="#mySignup">Signup</button></Link>
            </div>
          </div>
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
      )
    }
  }
})



ReactDOM.render((
  <Router history={browserHistory} >
    <Route path="/" component={App} >
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="logout" component={Logout} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'))
