function drawRectangle(bounds) {
  const options = {
    color: '#57068C',
    weight: 3,
    // fill: false,
    opacity: 0.85,
    dashArray: '10, 10'
  };
  var rect = L.rectangle(bounds, options);
  rect.addTo(drawnItems);
  rect.editing.enable();
  isDrawn = true;
  map.addLayer(drawnItems);

  updateQuery(rect);
}

function summerFilter() {
  tsGroup.call(tsbrush.move, [
    xScale(new Date(2018, 5, 1)),
    xScale(new Date(2018, 7, 30))
  ]);
}

function flyToChicago() {
  map.flyTo([41.850376606731345, -87.7395806558948], 8.5, {duration: 2.0, easeLinearity: 0.25});
}

function filterChicago() {
  const bounds = [
    [41.52435315354458, -88.2789981365204],
    [42.48723007613234, -87.06316351890565]
  ];
  drawRectangle(bounds);
}

function removeLayer() {
  map.removeLayer(drawnItems);
  isDrawn = false;
  isFinal = false;
}

function winterFilter() {
  tsGroup.call(tsbrush.move, [
    xScale(new Date(2018, 0, 1)),
    xScale(new Date(2018, 2, 30))
  ]);
}

function flyToNYC() {
  map.flyTo([40.78026588955549, -73.9819128269509], 10.25, {duration: 2.0, easeLinearity: 0.25});
}

function filterNYC() {
  const bounds = [
    [40.563497956609, -74.07237778666895],
    [40.95010298458138, -73.6749296568978]
  ];
  drawRectangle(bounds);
}

function fallFilter() {
  tsGroup.call(tsbrush.move, [
    xScale(new Date(2018, 8, 1)),
    xScale(new Date(2018, 10, 30))
  ]);
}

function flyToCali() {
  map.flyTo([37.25045457212557, -118.08569182384369], 6, {duration: 2.0, easeLinearity: 0.25});
}

function filterCali() {
  const bounds = [
    [42.002255167799774, -114.45079538541926],
    [32.69966754507937, -124.67127266352006]
  ];
  drawRectangle(bounds);
}

function changeK() {
  k = document.querySelector('#k');
  k.value = 70;
  sendQuery();
}

function waitFinish() {
  if (isDrawn && !isFinal) {
    console.log("waiting... ")
    return delay(500).then(waitFinish);
  }
  return delay(1500).then(next);
}

// fillter function
function next() {
  console.log("next triggered");
}

function superBowl() {
  tsGroup.call(tsbrush.move, [
    xScale(new Date(2018, 1, 2)),
    xScale(new Date(2018, 1, 6))
  ]);
}

function pride() {
  tsGroup.call(tsbrush.move, [
    xScale(new Date(2018, 5, 23)),
    xScale(new Date(2018, 5, 25))
  ]);
}

function thanksgiving() {
  tsGroup.call(tsbrush.move, [
    xScale(new Date(2018, 10, 22)),
    xScale(new Date(2018, 10, 23))
  ]);
}

function flyToSFO() {
  map.flyTo([37.66461324818748, -122.33268504547702], 10.25, {duration: 2.0, easeLinearity: 0.25});
}

// For storytelling 
// Promise.delay(superBowl, 1000)
//   .delay(waitFinish, 15000)
//   .delay(removeLayer, 3000)
//   .delay(flyToSFO, 500)
//   .delay(pride, 1000)
//   .delay(waitFinish, 8000)
//   .delay(removeLayer, 3000)
//   .delay(flyToNYC, 500)
//   .delay(thanksgiving, 1000)

// For experiment comparison
// Promise.delay(flyToChicago, 1000)
//   .delay(summerFilter, 1000)
//   .delay(filterChicago, 3000)
//   .delay(waitFinish, 1500)
//   .delay(removeLayer, 5000)
//   .delay(flyToNYC, 500)
//   .delay(winterFilter, 1000)
//   .delay(filterNYC, 3000)
//   .delay(waitFinish, 1500)
//   .delay(removeLayer, 5000)
//   .delay(flyToCali, 800)
//   .delay(fallFilter, 1000)
//   .delay(filterCali, 3000)

  // .delay(waitFinish, 1500)
  // .delay(changeK, 500)

  // .delay(winterFilter, 1500)
  // .delay(flyToNYC, 500)
  // .delay(filterNYC, 1500);
