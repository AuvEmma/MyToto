/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
(function( w ){
  var loadJS = function( src, cb ){
    "use strict";
    $('')
    $('.googlemap').remove()
    var ref = w.document.getElementsByTagName( "script" )[ 0 ];
    var script = w.document.createElement( "script" )
    script.src = src;
    script.async = true;
    script.className = "googlemap"
    ref.parentNode.insertBefore( script, ref );
    if (cb && typeof(cb) === "function") {
      script.onload = cb;
    }
    return script;
  };
  // commonjs
  if( typeof module !== "undefined" ){
    module.exports = loadJS;
  }
  else {
    w.loadJS = loadJS;
  }
}( typeof global !== "undefined" ? global : this ));
