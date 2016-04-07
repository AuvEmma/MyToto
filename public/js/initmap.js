// Reference to Google Map Sample https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
var styles = [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    }
];

var marker;

function initMap() {
  var map = new google.maps.Map(document.getElementById('covermap'), {
    center: {lat: 40.740052999999996, lng: -73.9897012},
    zoom: 14,
    styles: styles,
    scrollwheel: false
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: pos,
        icon: 'img/bluemarker.png'
      });
      marker.addListener('click', toggleBounce);
    }, function() {
      handleLocationError(true, marker, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, marker, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  marker.setPosition(pos);
  marker.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}


function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function infoWindow(){

}
