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
          <div className="masthead">
          <Link to ="/" id="homepageLogo"><h1 className="text-muted">MyToto</h1></Link>
          <nav className="light-blue darken-4">
            <ul className="nav nav-justified light-blue accent-3">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/create">Create</Link></li>
              <li><Link to="/find">Find</Link></li>
              <li><Link to="/friends">Friends</Link></li>
              <li><Link to="/events">My Events</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/circles">Circles</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </nav>
          </div>
        </div>
      )

    } else {
      return (
        <div>
          <div className="row">
            <section className="col s12" style={{width: '100%', textAlign: 'center', marginTop: 70, position: 'relative'}}>
              <section className="col s5" style={{marginLeft: '30%'}}>
                <aside className="card-panel" style={{width: '100%', margin: 'auto', position: 'relative', marginTop: 7}}>
                  <form onSubmit={this.handleSubmit}>
                    <h3>Welcome!</h3>
                    <div className="row">
                      <Link to="/login"><button onClick={this.hideButtons} className="btn waves-effect waves-light col s6 light-blue darken-4">Log in</button></Link>
                      <Link to="/signup"><button onClick={this.hideButtons} className="btn waves-effect waves-light col s6 light-blue darken-4">Signup</button></Link>
                    </div>
                  </form>
                </aside>
              </section>
            </section>
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
