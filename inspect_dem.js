var alos = ee.Image("JAXA/ALOS/AW3D30_V1_1");
// Make UI components.
var label = ui.Label('Click for elevation');
var inspector = ui.Panel([label]);

// Define callback functions.
function showElevation(elevation) {
  inspector.clear();
  var elevationLabel = ui.Label('Elevation: ' + elevation);
  inspector.add(elevationLabel);
}

function inspect(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var elevation = alos.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30
  }).get('AVE');
  elevation.evaluate(showElevation);
}

// Setup.
var visParams = {min: 0, max: 3000};
Map.setCenter(138.7271, 35.3644, 10);
Map.addLayer(alos.select('AVE'), visParams, 'Elevation');
Map.add(inspector);
Map.onClick(inspect);
