const React = require('react');
const auth = require('../auth');

const Logout = React.createClass({
  componentDidMount : function() {
    $('.googlemap').remove()
    auth.logout()
  },

  render : function() {
    return <p></p>
  }
})

module.exports = Logout;
