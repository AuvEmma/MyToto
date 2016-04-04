const React = require('react');
const auth = require('../auth');

const Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState : function() {
    return {
      error: false
    }
  },
  handleSubmit : function(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const password = this.refs.password.value

    auth.login(email, password, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })
      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    })
    $('#myLogin').modal('hide')
  },
  render : function() {
    return (
      <div id="myLogin" role="dialog" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">×</button>
              <h4><span className="glyphicon glyphicon-lock" /> Login</h4>
            </div>

            <div className="modal-body" id="loginform">
              <form role="form" onSubmit={this.handleSubmit}>

              <div className="form-group">
                <label htmlFor="inputEmail"><span className="glyphicon glyphicon-shopping-cart" />Email address</label>
                <input ref="email" type="email" id="inputEmail" className="form-control"  placeholder="Email address" autofocus />

                <label htmlFor="inputPassword"><span className="glyphicon glyphicon-shopping-cart" />Password</label>
                <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" />

                <button type="submit" className="btn btn-block">Login
                  <span className="glyphicon glyphicon-ok" />
                </button>
              </div>

              </form>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-danger btn-default pull-left" data-dismiss="modal">
                <span className="glyphicon glyphicon-remove" /> Cancel
              </button>
              <p>Need <a href="#">help?</a></p>
            </div>
            {this.state.error && (
            <p>Password and email do not match</p>
            )}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Login;
