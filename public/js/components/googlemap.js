const React = require('react');
const auth = require('../auth');

const GoogleMap = React.createClass({
  componentDidMount : function() {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyAnvLKsI283huNJkF51R_oEgTkxi8Di5e4&libraries=places&callback=initMap");
  },
  componentWillMount : function() {
    // moved deleteScript function from here
  },
  render : function() {
    return (
      <div>
        <div id="map">
        </div>
      </div>
    )
  }
});


module.exports = GoogleMap;
