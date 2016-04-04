const React = require('react');
const auth = require('../auth');
const $     = require('jquery');

const Signup = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit : function(event) {
    event.preventDefault()
    const email = this.refs.email.value
    const password  = this.refs.password.value

    const signupInfo = {
      email: email,
      password: password
    }
    if(password === this.refs.confirmPassword.value){
      $.post('/guests', signupInfo)
      .done((data) => {
        if(data) {
          alert('Signup Error, Email Already Exists!')
        }else {
        }
      })
      .error((error) => {
        console.log('Successfully signup!', error);
        $(".modal-backdrop").fadeOut(500);
        this.context.router.replace('/')
      })
    }else{
      alert('password does not match confirmPassword')
    }
  },

  render : function() {
    return (
      <div id="mySignup" role="dialog" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">×</button>
              <h4><span className="glyphicon glyphicon-heart" /> Signup</h4>
            </div>

            <div className="modal-body" id="signupform">
              <form role="form" ref="formSignup" onSubmit={this.handleSubmit}>
              
                <div className="input-group input-group-md col-md-6" style={{marginBottom: 10}}>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-envelope"></span>
                  </span>
                  <input ref="email" type="email" id="inputEmail" className="form-control" placeholder="Email address"/>
                </div>
                <div className="input-group input-group-md col-md-6" style={{marginBottom: 10}}>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-lock"></span>
                  </span>
                  <input ref="password"  type="password" id="inputPassword" className="form-control" placeholder="Password" />
                </div>
                <div className="input-group input-group-md col-md-6" style={{marginBottom: 10}}>
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-lock"></span>
                  </span>
                  <input ref="confirmPassword"  type="password" id="inputPassword" className="form-control" placeholder="Type your password again" />
                </div>
                <button type="submit" className="btn btn-block">Signup
                  <span className="glyphicon glyphicon-ok" />
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-danger btn-default pull-left" data-dismiss="modal">
                <span className="glyphicon glyphicon-remove" /> Cancel
              </button>
              <p>Need <a href="#">help?</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Signup;
