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
var geocoder;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.740052999999996, lng: -73.9897012},
    zoom: 14,
    styles: styles,
    scrollwheel: false
  });
  var geoloccontrol = new klokantech.GeolocationControl(map, 16);

  // Search Bar on Map reference https://google-developers.appspot.com/maps/documentation/javascript/examples/geocoding-simple
  geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });

  var input = (document.getElementById('location'));
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    localStorage.lat = place.geometry.location.lat();
    localStorage.lng = place.geometry.location.lng();
  });

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('location').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })
  }
  setPublicMarker(map)
  function setPublicMarker(resultsMap){
    var ll        =[]
    var addresses = JSON.parse(localStorage.toiletAPI)
    addresses.forEach((el)=>{
      Geocode(el)
    })
    function Geocode(address){
      $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false', null, function (data) {
        if(data.status === "OK"){
          var p = data.results[0].geometry.location
          var latlng = new google.maps.LatLng(p.lat, p.lng);
          new google.maps.Marker({
            map: resultsMap,
            position: latlng,
            animation: google.maps.Animation.DROP,
            icon: '../img/bluemarker.png'
          });
        }else if(data.status === "OVER_QUERY_LIMIT"){
          setTimeout(function(){
            Geocode(address);
          }, 50)
        }else{
          alert("Geocode was not successful for the following reason:"
                + data.status);
        }
      })
    }
  }

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
        position: pos,
        icon: 'https://www.google.com/support/enterprise/static/geo/cdate/art/dots/blue_dot.png'
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
