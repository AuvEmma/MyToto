'use strict'
console.log('react on');

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

const Login = require('./components/login.js');
const Signup = require('./components/signup.js');
const Logout = require('./components/logout.js');
const NotFound = require('./components/404.js');
const Create = require('./components/create.js');

const browserHistory = require('react-router').browserHistory;
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
const auth = require('./auth');
const GoogleMap = require('./components/googlemap.js');





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
  componentDidMount() {
  },
  // executes on app load, assigns auth.onChange to equal this.updateAuth
  componentWillMount() {
    auth.onChange = this.updateAuth
    $.ajax({
      url   : '/toto/public',
      type  : 'GET',
    })
    .done((data)=>{
      localStorage.publictoto = JSON.stringify(data)
    })
    .error((err)=>{
      console.log(err);
    })
  },

  render() {
    if(this.state.loggedIn) {
      return (
          <div style={{marginTop:"300px"}}>
            <div>
              <Link to="/create"><button className="btn btn-lg btn-info" data-toggle="modal" data-target="#myCreate"><span className="glyphicon glyphicon-tint" />Add My Own Secret TOTO</button></Link>
              <Link to="/logout"><button className="btn btn-lg btn-info"><span className="glyphicon glyphicon-off" />Logout</button></Link>
            </div>
            {this.props.children}
          </div>
      )
    } else {
      return (
        <div style={{marginTop:"300px"}}>
          <div>
            <div>
              <Link to="/login"><button className="btn btn-lg btn-info" data-toggle="modal" data-target="#myLogin"><span className="glyphicon glyphicon-send" />Log in</button></Link>
              <Link to="/signup"><button className="btn btn-lg btn-info" data-toggle="modal" data-target="#mySignup"><span className="glyphicon glyphicon-user" />Signup</button></Link>
            </div>
          </div>
          {this.props.children}
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
      <Route path="create" component={Create} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'))
