const React = require('react');
const auth = require('../auth');
const $     = require('jquery');

const Signup = React.createClass({

handleSubmit : function(event) {
    event.preventDefault()
    const email = this.refs.email.value
    const password  = this.refs.password.value

    const signupInfo = {
      email: email,
      password: password
    }

    $.post('/guests', signupInfo)
      .done((data) => {
        console.log(data);
        if(data) {
          alert('Signup Error, Email Already Exists!')
        }else {
        }
      })
      .error((error) => {
        console.error(error);
      })
  },

  render : function() {
    return (
      <div>
        <div id="signupform" style={{width: '30%', margin: 'auto', marginTop: '10px'}}>
          <aside className="card-panel">
            <form ref="formSignup" onSubmit={this.handleSubmit}>
              <h2 className="form-signin-heading">Please sign up</h2>
              <label htmlFor="inputEmail" >Email address</label>
              <input ref="email" type="email" id="inputEmail" className="form-control"  placeholder="Email address" autofocus />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input ref="password"  type="password" id="inputPassword" placeholder="Password" />
              <button type="submit" onClick={this.hideForm} className="btn waves-effect waves-light light-blue darken-4">Submit</button>
            </form>
          </aside>
        </div>
      </div>
    )
  }
});

module.exports = Signup;
