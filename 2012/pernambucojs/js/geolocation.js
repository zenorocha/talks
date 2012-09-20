var map;
var marker;
var positionId;
var currentLocation;

function moveMap(position) {

  currentLocation = new GLatLng(position.coords.latitude, position.coords.longitude);

  marker = new GMarker(new GLatLng(position.coords.latitude, position.coords.longitude));
  
  GEvent.addListener(marker,"click", function() {
    var myHtml = "Você está mais ou menos aqui.";
    map.openInfoWindowHtml(currentLocation, myHtml);
  });

  map.addOverlay(marker);
  map.setZoom(15);
  map.panTo(new GLatLng(position.coords.latitude, position.coords.longitude));

}

function handleError(error) {
  console.log(error.message);
}

function initialize() {
  if (GBrowserIsCompatible()) {
    map = new GMap2(document.getElementById("mapcanvas"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    map.addControl(new GSmallMapControl());
    positionId = navigator.geolocation.watchPosition(moveMap, handleError);
  }
}