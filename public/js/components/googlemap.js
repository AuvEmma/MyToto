const React = require('react');
const auth = require('../auth');

const GoogleMap = React.createClass({
  componentDidMount : function() {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyAuWgEGIdwbYOz6G3o5fj8ELY4nomJPoB0&libraries=places&callback=initMap");
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
