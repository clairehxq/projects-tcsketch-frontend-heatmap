
// const dformat = timeFormat("%m-%Y");

// import mapboxgl from 'mapbox-gl';
// Create WebSocket connection.
const socket = new WebSocket('ws://xh895-01.cusp.nyu.edu:443/ws');
// const socket = new WebSocket('ws://localhost:8080/ws');
var wordcloud;
var circlegjson;
var rectangleWidth;
var rectangleHeight;
var rectangleUpdated;
var stopReceive = false;
// var sendTime;
var isDrawn = false;
var zoom = 12;
var userId;
var g;
var tagCloud;
var brushArea;
var minTime, maxTime;
var updateWordCloud = true;
var updateCount = 0;
var callReceive = 0;
var counter = 1;
var isFinal = false;
var request;
var timeoutId;
var progress = 0;

const MIN_FONT_SIZE = 16;
const MAX_FONT_SIZE = 50;
const MAX_STEP_WAIT = 3000;

// Get the input field
var input = document.getElementById("keyword");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    sendQuery();
  }
});

var tsdata = [{"date": "2018-01-02", "count":  222663}, {"date": "2018-01-03", "count":  1604041}, {"date": "2018-01-04", "count":  1637743}, {"date": "2018-01-05", "count":  1595590}, {"date": "2018-01-06", "count":  1569463}, {"date": "2018-01-07", "count":  1621923}, {"date": "2018-01-08", "count":  1620394}, {"date": "2018-01-09", "count":  1733234}, {"date": "2018-01-10", "count":  1526435}, {"date": "2018-01-11", "count":  1542071}, {"date": "2018-01-12", "count":  1335930}, {"date": "2018-01-13", "count":  1507461}, {"date": "2018-01-14", "count":  1623508}, {"date": "2018-01-15", "count":  1557924}, {"date": "2018-01-16", "count":  1570435}, {"date": "2018-01-17", "count":  1608364}, {"date": "2018-01-18", "count":  1544663}, {"date": "2018-01-19", "count":  1572592}, {"date": "2018-01-20", "count":  1590479}, {"date": "2018-01-21", "count":  1623109}, {"date": "2018-01-22", "count":  1575242}, {"date": "2018-01-23", "count":  1550048}, {"date": "2018-01-24", "count":  1555387}, {"date": "2018-01-25", "count":  1534235}, {"date": "2018-01-26", "count":  1547189}, {"date": "2018-01-27", "count":  1404501}, {"date": "2018-01-28", "count":  1414933}, {"date": "2018-01-29", "count":  1578590}, {"date": "2018-01-30", "count":  1525122}, {"date": "2018-01-31", "count":  1689042}, {"date": "2018-02-01", "count":  1561212}, {"date": "2018-02-02", "count":  1468487}, {"date": "2018-02-03", "count":  1412297}, {"date": "2018-02-04", "count":  1525037}, {"date": "2018-02-05", "count":  1769537}, {"date": "2018-02-06", "count":  1463455}, {"date": "2018-02-07", "count":  1590078}, {"date": "2018-02-08", "count":  1580544}, {"date": "2018-02-09", "count":  1531817}, {"date": "2018-02-10", "count":  1444067}, {"date": "2018-02-11", "count":  1390478}, {"date": "2018-02-12", "count":  1413620}, {"date": "2018-02-13", "count":  1484405}, {"date": "2018-02-14", "count":  220229}, {"date": "2018-02-15", "count":  1066675}, {"date": "2018-02-16", "count":  1466016}, {"date": "2018-02-17", "count":  1423355}, {"date": "2018-02-18", "count":  1434994}, {"date": "2018-02-19", "count":  1493901}, {"date": "2018-02-20", "count":  1530608}, {"date": "2018-02-21", "count":  1565429}, {"date": "2018-02-22", "count":  1642367}, {"date": "2018-02-23", "count":  1568155}, {"date": "2018-02-24", "count":  1456967}, {"date": "2018-02-25", "count":  1415613}, {"date": "2018-02-26", "count":  1465403}, {"date": "2018-02-27", "count":  1499803}, {"date": "2018-02-28", "count":  1547778}, {"date": "2018-03-01", "count":  1559694}, {"date": "2018-03-02", "count":  1550113}, {"date": "2018-03-03", "count":  1413841}, {"date": "2018-03-04", "count":  1398706}, {"date": "2018-03-05", "count":  1514870}, {"date": "2018-03-06", "count":  1509835}, {"date": "2018-03-07", "count":  1559305}, {"date": "2018-03-08", "count":  1545013}, {"date": "2018-03-09", "count":  1552030}, {"date": "2018-03-10", "count":  1448867}, {"date": "2018-03-11", "count":  1478050}, {"date": "2018-03-12", "count":  1483389}, {"date": "2018-03-13", "count":  1599286}, {"date": "2018-03-14", "count":  1648276}, {"date": "2018-03-15", "count":  1628885}, {"date": "2018-03-16", "count":  1595668}, {"date": "2018-03-17", "count":  1584410}, {"date": "2018-03-18", "count":  1471811}, {"date": "2018-03-19", "count":  1518477}, {"date": "2018-03-20", "count":  1585939}, {"date": "2018-03-21", "count":  1612099}, {"date": "2018-03-22", "count":  1567736}, {"date": "2018-03-23", "count":  1594577}, {"date": "2018-03-24", "count":  1483898}, {"date": "2018-03-25", "count":  1472441}, {"date": "2018-03-26", "count":  1488667}, {"date": "2018-03-27", "count":  1510604}, {"date": "2018-03-28", "count":  1445644}, {"date": "2018-03-29", "count":  1587984}, {"date": "2018-03-30", "count":  1533833}, {"date": "2018-03-31", "count":  1447288}, {"date": "2018-04-01", "count":  1438370}, {"date": "2018-04-02", "count":  1423836}, {"date": "2018-04-03", "count":  1590151}, {"date": "2018-04-04", "count":  1561408}, {"date": "2018-04-05", "count":  1538898}, {"date": "2018-04-06", "count":  1493432}, {"date": "2018-04-07", "count":  1446192}, {"date": "2018-04-08", "count":  1438859}, {"date": "2018-04-09", "count":  1486091}, {"date": "2018-04-10", "count":  1539007}, {"date": "2018-04-11", "count":  1549981}, {"date": "2018-04-12", "count":  1568429}, {"date": "2018-04-13", "count":  1542476}, {"date": "2018-04-14", "count":  1462242}, {"date": "2018-04-15", "count":  1492029}, {"date": "2018-04-16", "count":  1509677}, {"date": "2018-04-17", "count":  1531757}, {"date": "2018-04-18", "count":  1572579}, {"date": "2018-04-19", "count":  1572789}, {"date": "2018-04-20", "count":  1556549}, {"date": "2018-04-21", "count":  1390525}, {"date": "2018-04-22", "count":  1396179}, {"date": "2018-04-23", "count":  1474094}, {"date": "2018-04-24", "count":  1572881}, {"date": "2018-04-25", "count":  1613048}, {"date": "2018-04-26", "count":  1692902}, {"date": "2018-04-27", "count":  1710167}, {"date": "2018-04-28", "count":  1499812}, {"date": "2018-04-29", "count":  1467735}, {"date": "2018-04-30", "count":  1473022}, {"date": "2018-05-01", "count":  1557310}, {"date": "2018-05-02", "count":  1598765}, {"date": "2018-05-03", "count":  1580848}, {"date": "2018-05-04", "count":  1572930}, {"date": "2018-05-05", "count":  1433084}, {"date": "2018-05-06", "count":  1418146}, {"date": "2018-05-07", "count":  1463418}, {"date": "2018-05-08", "count":  1557022}, {"date": "2018-05-09", "count":  1532819}, {"date": "2018-05-10", "count":  1551267}, {"date": "2018-05-11", "count":  1522360}, {"date": "2018-05-12", "count":  1373037}, {"date": "2018-05-13", "count":  1369376}, {"date": "2018-05-14", "count":  1414087}, {"date": "2018-05-15", "count":  1542910}, {"date": "2018-05-16", "count":  1568903}, {"date": "2018-05-17", "count":  1516053}, {"date": "2018-05-18", "count":  1483120}, {"date": "2018-05-19", "count":  1360652}, {"date": "2018-05-20", "count":  1278914}, {"date": "2018-05-21", "count":  1386390}, {"date": "2018-05-22", "count":  1440187}, {"date": "2018-05-23", "count":  1505796}, {"date": "2018-05-24", "count":  1526406}, {"date": "2018-05-25", "count":  1507688}, {"date": "2018-05-26", "count":  1358941}, {"date": "2018-05-27", "count":  1311442}, {"date": "2018-05-28", "count":  588042}, {"date": "2018-05-29", "count":  629821}, {"date": "2018-05-30", "count":  1584737}, {"date": "2018-05-31", "count":  1543091}, {"date": "2018-06-01", "count":  1659342}, {"date": "2018-06-02", "count":  1323961}, {"date": "2018-06-03", "count":  1306786}, {"date": "2018-06-04", "count":  897697}, {"date": "2018-06-05", "count":  748416}, {"date": "2018-06-06", "count":  1475913}, {"date": "2018-06-07", "count":  1562650}, {"date": "2018-06-08", "count":  1611978}, {"date": "2018-06-09", "count":  1503351}, {"date": "2018-06-10", "count":  1396148}, {"date": "2018-06-11", "count":  1499939}, {"date": "2018-06-12", "count":  1583695}, {"date": "2018-06-13", "count":  1541370}, {"date": "2018-06-14", "count":  1564304}, {"date": "2018-06-15", "count":  1587375}, {"date": "2018-06-16", "count":  1434398}, {"date": "2018-06-17", "count":  1475383}, {"date": "2018-06-18", "count":  1526278}, {"date": "2018-06-19", "count":  1585922}, {"date": "2018-06-20", "count":  1620220}, {"date": "2018-06-21", "count":  1629260}, {"date": "2018-06-22", "count":  1601902}, {"date": "2018-06-23", "count":  1481763}, {"date": "2018-06-24", "count":  1399592}, {"date": "2018-06-25", "count":  1487608}, {"date": "2018-06-26", "count":  1550718}, {"date": "2018-06-27", "count":  1637827}, {"date": "2018-06-28", "count":  1565969}, {"date": "2018-06-29", "count":  1640978}, {"date": "2018-06-30", "count":  1456770}, {"date": "2018-07-01", "count":  1474922}, {"date": "2018-07-02", "count":  1675713}, {"date": "2018-07-03", "count":  1605205}, {"date": "2018-07-04", "count":  1467154}, {"date": "2018-07-05", "count":  1385149}, {"date": "2018-07-06", "count":  1576110}, {"date": "2018-07-07", "count":  1452076}, {"date": "2018-07-08", "count":  1388394}, {"date": "2018-07-09", "count":  1435676}, {"date": "2018-07-10", "count":  1574624}, {"date": "2018-07-11", "count":  1583489}, {"date": "2018-07-12", "count":  1543061}, {"date": "2018-07-13", "count":  1547642}, {"date": "2018-07-14", "count":  1393013}, {"date": "2018-07-15", "count":  1443877}, {"date": "2018-07-16", "count":  1502465}, {"date": "2018-07-17", "count":  1584663}, {"date": "2018-07-18", "count":  1561220}, {"date": "2018-07-19", "count":  1520597}, {"date": "2018-07-20", "count":  1506264}, {"date": "2018-07-21", "count":  1378114}, {"date": "2018-07-22", "count":  1358535}, {"date": "2018-07-23", "count":  1432784}, {"date": "2018-07-24", "count":  1501830}, {"date": "2018-07-25", "count":  1498253}, {"date": "2018-07-26", "count":  1485384}, {"date": "2018-07-27", "count":  1436289}, {"date": "2018-07-28", "count":  1327003}, {"date": "2018-07-29", "count":  1318592}, {"date": "2018-07-30", "count":  1372211}, {"date": "2018-07-31", "count":  1474265}, {"date": "2018-08-01", "count":  1510424}, {"date": "2018-08-02", "count":  1490594}, {"date": "2018-08-03", "count":  1471928}, {"date": "2018-08-04", "count":  552617}, {"date": "2018-08-07", "count":  631601}, {"date": "2018-08-08", "count":  1489478}, {"date": "2018-08-09", "count":  1490438}, {"date": "2018-08-10", "count":  1523935}, {"date": "2018-08-11", "count":  1349454}, {"date": "2018-08-12", "count":  1359969}, {"date": "2018-08-13", "count":  1372508}, {"date": "2018-08-14", "count":  1447844}, {"date": "2018-08-15", "count":  1470340}, {"date": "2018-08-16", "count":  1496998}, {"date": "2018-08-17", "count":  1454088}, {"date": "2018-08-18", "count":  1355772}, {"date": "2018-08-19", "count":  1320325}, {"date": "2018-08-20", "count":  1359549}, {"date": "2018-08-21", "count":  1495417}, {"date": "2018-08-22", "count":  1454700}, {"date": "2018-08-23", "count":  1459367}, {"date": "2018-08-24", "count":  1438794}, {"date": "2018-08-25", "count":  1342249}, {"date": "2018-08-26", "count":  1357284}, {"date": "2018-08-27", "count":  1379771}, {"date": "2018-08-28", "count":  1423654}, {"date": "2018-08-29", "count":  1472000}, {"date": "2018-08-30", "count":  1451707}, {"date": "2018-08-31", "count":  1501561}, {"date": "2018-09-01", "count":  1486702}, {"date": "2018-09-02", "count":  1363965}, {"date": "2018-09-03", "count":  1376023}, {"date": "2018-09-04", "count":  1497672}, {"date": "2018-09-05", "count":  1527063}, {"date": "2018-09-06", "count":  1545068}, {"date": "2018-09-07", "count":  1669717}, {"date": "2018-09-08", "count":  1504282}, {"date": "2018-09-09", "count":  1605932}, {"date": "2018-09-10", "count":  1519338}, {"date": "2018-09-11", "count":  1529688}, {"date": "2018-09-12", "count":  1504711}, {"date": "2018-09-13", "count":  1506640}, {"date": "2018-09-14", "count":  1514819}, {"date": "2018-09-15", "count":  1474652}, {"date": "2018-09-16", "count":  1579027}, {"date": "2018-09-17", "count":  1477981}, {"date": "2018-09-18", "count":  1520103}, {"date": "2018-09-19", "count":  1490583}, {"date": "2018-09-20", "count":  1477413}, {"date": "2018-09-21", "count":  1545808}, {"date": "2018-09-22", "count":  1450054}, {"date": "2018-09-23", "count":  1510111}, {"date": "2018-09-24", "count":  1471709}, {"date": "2018-09-25", "count":  1529899}, {"date": "2018-09-26", "count":  1545528}, {"date": "2018-09-27", "count":  1699377}, {"date": "2018-09-28", "count":  1459841}, {"date": "2018-09-29", "count":  1443648}, {"date": "2018-09-30", "count":  1535238}, {"date": "2018-10-01", "count":  1486171}, {"date": "2018-10-02", "count":  1501265}, {"date": "2018-10-03", "count":  1225742}, {"date": "2018-10-04", "count":  1576152}, {"date": "2018-10-05", "count":  1568982}, {"date": "2018-10-06", "count":  1531982}, {"date": "2018-10-07", "count":  1576659}, {"date": "2018-10-08", "count":  1466556}, {"date": "2018-10-09", "count":  1487747}, {"date": "2018-10-10", "count":  1506964}, {"date": "2018-10-11", "count":  1479547}, {"date": "2018-10-12", "count":  1505109}, {"date": "2018-10-13", "count":  1421233}, {"date": "2018-10-14", "count":  1416969}, {"date": "2018-10-15", "count":  1416001}, {"date": "2018-10-16", "count":  1487910}, {"date": "2018-10-17", "count":  1535720}, {"date": "2018-10-18", "count":  1484175}, {"date": "2018-10-19", "count":  563017}, {"date": "2018-10-24", "count":  622209}, {"date": "2018-10-25", "count":  1488014}, {"date": "2018-10-26", "count":  1470088}, {"date": "2018-10-27", "count":  1483241}, {"date": "2018-10-28", "count":  1442098}, {"date": "2018-10-29", "count":  1298717}, {"date": "2018-10-30", "count":  1465802}, {"date": "2018-10-31", "count":  1481386}, {"date": "2018-11-01", "count":  1425851}, {"date": "2018-11-02", "count":  1446352}, {"date": "2018-11-03", "count":  1391899}, {"date": "2018-11-04", "count":  1413769}, {"date": "2018-11-05", "count":  1420217}, {"date": "2018-11-06", "count":  1627267}, {"date": "2018-11-07", "count":  1705983}, {"date": "2018-11-08", "count":  1517795}, {"date": "2018-11-09", "count":  1510565}, {"date": "2018-11-10", "count":  1401295}, {"date": "2018-11-11", "count":  1398748}, {"date": "2018-11-12", "count":  1433206}, {"date": "2018-11-13", "count":  1437213}, {"date": "2018-11-14", "count":  1434196}, {"date": "2018-11-15", "count":  1477838}, {"date": "2018-11-16", "count":  1432284}, {"date": "2018-11-17", "count":  1349740}, {"date": "2018-11-18", "count":  1354227}, {"date": "2018-11-19", "count":  1327185}, {"date": "2018-11-20", "count":  1452920}, {"date": "2018-11-21", "count":  1378385}, {"date": "2018-11-22", "count":  1444492}, {"date": "2018-11-23", "count":  1219869}, {"date": "2018-11-24", "count":  1347072}, {"date": "2018-11-25", "count":  1382395}, {"date": "2018-11-26", "count":  1351236}, {"date": "2018-11-27", "count":  1407538}, {"date": "2018-11-28", "count":  1445375}, {"date": "2018-11-29", "count":  1417197}, {"date": "2018-11-30", "count":  1529936}, {"date": "2018-12-01", "count":  1425036}, {"date": "2018-12-02", "count":  1432862}, {"date": "2018-12-03", "count":  1357041}, {"date": "2018-12-04", "count":  1397292}, {"date": "2018-12-05", "count":  1415571}, {"date": "2018-12-06", "count":  1374882}, {"date": "2018-12-07", "count":  1436984}, {"date": "2018-12-08", "count":  1289405}, {"date": "2018-12-09", "count":  1371123}, {"date": "2018-12-10", "count":  1373110}, {"date": "2018-12-11", "count":  1394580}, {"date": "2018-12-12", "count":  1397577}, {"date": "2018-12-13", "count":  1395599}, {"date": "2018-12-14", "count":  1376305}, {"date": "2018-12-15", "count":  1227368}, {"date": "2018-12-16", "count":  1260511}, {"date": "2018-12-17", "count":  1263294}, {"date": "2018-12-18", "count":  1304399}, {"date": "2018-12-19", "count":  1311757}, {"date": "2018-12-20", "count":  1329464}, {"date": "2018-12-21", "count":  1384261}, {"date": "2018-12-22", "count":  1246773}, {"date": "2018-12-23", "count":  1271008}, {"date": "2018-12-24", "count":  1286187}, {"date": "2018-12-25", "count":  1217589}, {"date": "2018-12-26", "count":  1114699}, {"date": "2018-12-27", "count":  1248650}, {"date": "2018-12-28", "count":  1322105}, {"date": "2018-12-29", "count":  1313733}, {"date": "2018-12-30", "count":  1419397}, {"date": "2018-12-31", "count":  1396391}, {"date": "2019-01-01", "count":  385447}]
var timeResMapper = {"hour": 1, "day":2, "week": 3, "month":4};
// import {tokens} from "./tokens.js";
function convert2temp(data){
  var res = [];
  data.map(x => res.push({'date': new Date(x[0]*(15*60*1000)), 'y': x[1]}));
  return res;
}

function projectMap(data){
  // console.log(data);
  var gj = {
    "name":"Feature",
    "type":"FeatureCollection",
    "features":[]
  };
  data.spatio.map(x => gj.features.push({ "type": "Feature",
    "geometry": {"type": "Point","coordinates": []},
    "properties": {"quantile": null, 'size': null, 'count': null} 
  }));

  var weights = data.spatio.map(x=> parseInt(x[1]));
  var max = weights[0];
  var min = weights[weights.length-1];
  console.log(weights, min, max);
  for (let i=0, len=data.spatio.length; i<len; i++){
    let [lat, lon] = data.spatio[i][0].split(",");
    // let s = parseInt(data.top[i][1]);

    gj.features[i].geometry.coordinates.push(parseFloat(lon));
    gj.features[i].geometry.coordinates.push(parseFloat(lat)); 
    gj.features[i].properties.quantile = Math.min(3, Math.floor(i / Math.floor(len/4)));
    gj.features[i].properties.size = ((weights[i] - min) / (max-min)) * 7 + 1;
    gj.features[i].properties.count = weights[i]
    console.log((weights[i] - min) / (max-min) * 7 + 3);
  }
  return gj;
  // mapAddSƒcatter(gj);
  // data.map(gj.features[0].geometry.coordinates.push([lon,lat]));
}

function mapAddScatter(){
  map.addSource('scatter', {
    'type': 'geojson',
    'data': circlegjson
  });
  map.addLayer({
    'id': 'scatter',
    'type': 'circle',
    'source': 'scatter',
    'paint': {
      'circle-radius': 4,
      'circle-stroke-width': 2,
      'circle-color': 'red',
       'circle-stroke-color': 'white'
    }
  });
}

var ID = function() {
  // Gets a random integer between 0 - 100
  return Math.floor(Math.random() * Math.floor(100));
};

socket.onopen = function(event) {
  // socket.send("1A37F239BC1");
  userId = ID();
};

// Listen for messages
socket.onmessage = function(event) {
  console.log(event.data);
  var data = JSON.parse(event.data);
  console.log(data);
  callReceive++;
  console.log("Message received", callReceive);
  progress = Math.round(1 * 100);
  updateProgress();

  var keyword = $('#keyword').val();
  if (data.spatio){
    console.log('1');
    map.removeLayer(layerGeojson);
    circlegjson = projectMap(data);
    console.log(circlegjson);
    layerGeojson = L.geoJSON(circlegjson, {
        coordsToLatLng: function(coords){
          return new L.LatLng(coords[1], coords[0]);
        },
        pointToLayer: function(feature, latlng){
          var color;
          switch (feature.properties.quantile){
            case 0: color = "#CD5C5C";
            case 1: color = "#F08080";
            case 2: color = "#FA8072";
            case 3: color = "#E9967A";
          }

          return L.circleMarker(latlng, 
            {color: color, radius: feature.properties.size});
        },
        onEachFeature: function (feature, layer){
          layer.bindPopup('<p>count: '+feature.properties.count + 'size: '+feature.properties.size+'</p>')
        }

    }).addTo(map);

    var tempData = convert2temp(data.temporal);
    updateLinear(tempData);
    // layerGeojson.addData(circlegjson);
    // layerGeojson.addTo(map);
    // mapAddScatter();
    return;
  }
  // Temporarily remove for new behavior
  // If wordcloud has already been populated before
  // Check first if there's any changes in the top K
  // if (wordcloud !== undefined) {
  //   checkTopK(data);
  // }

  // set to data variable to update the tag cloud

  map.removeLayer(layerGeojson);
  wordcloud = data.top.map(function(d) {
    return {
      text: d[0],
      value: d[1],
    }
  });

  if (data.final == 1) {
    // If final, update global flag to stop timer
    isFinal = true;
    counter = 1;
  } else {
    isFinal = false;
  }


  // All messages received will update the word cloud now
  // Since snapshot is requested
  if (wordcloud.length > 0 && !stopReceive) {
      // update the tag cloud
      tagCloud = wordCloud(g);
      tagCloud.update(wordcloud, [rectangleWidth, rectangleHeight]);

      // update the bar chart
      updateChart(wordcloud);
      progress = Math.round(1 * 100);
      updateProgress();
  }

  // update only when the tag is true
  // and there's top K tags
  // if (updateWordCloud && wordcloud.length > 0 && !stopReceive) {
  //   updateCount++;
  //   // update the tag cloud
  //   tagCloud = wordCloud(g);
  //   tagCloud.update(wordcloud, [rectangleWidth, rectangleHeight]);
  //
  //   // update the bar chart
  //   updateChart(wordcloud);
  //   console.log("Update", updateCount);
  // }
};

initParams();
initTimeSeries();
// initChart();
initTsChart();
setupWatchers();
initProgress();

// function checkTopK(data) {
//   // Check the flag first
//   if (data.final == 1) {
//     // If true, just update already
//     updateWordCloud = true;
//     return;
//   }
//
//   // First level of filter - if there's a new word in the topK
//   words = data.top.map(function(d) {
//     return d[0];
//   });
//
//   var size = words.length;
//
//   for (i = 0; i < size; i++) {
//     var result = wordcloud.filter(function(word) {
//       return word.text == words[i];
//     });
//
//     if (result.length == 0) {
//       updateWordCloud = true;
//       console.log("New word", words[i]);
//       break;
//     } else {
//       updateWordCloud = false;
//     }
//   }
// }

// Initialize the map
var baseLight = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=' + 'pk.eyJ1IjoiY2xhaXJlaHdhbmciLCJhIjoiY2tla2R5NHVpMGE0YjJ3cGJqZTI0YzRsZCJ9.L9c-hWenTRGkH6NxfCGqiQ', {
   attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
   tileSize: 512,
   zoomOffset: -1,
   id: 'light-v9'
});

var map = L.map('map', {
  center: [40.71, -74],
  zoom: 9,
  zoomSnap: 0.25,
  layers: [baseLight],
  editable: true,
  editOptions: {
    dashArray: "10, 10",
    fill: true,
    fillColor: "#7A7A7A",
    fillOpacity: 0.1,
    maintainColor: true
  },
});

function reloadGeoJson(){
  map.removeLayer();

}
var layerGeojson = L.geoJSON(circlegjson, {
  coordsToLatLng: function(coords){
  return new L.LatLng(coords[1], coords[0]);
}
}).addTo(map);

// realtime.on('update');


var drawnItems = new L.FeatureGroup();
// map.addLayer(drawnItems);

var options = {
  shapeOptions: {
    showArea: true,
    clickable: true,
  },
  draw: {
    polygon: false,
    polyline: false,
    circle: false,
    marker: false,
    circlemarker: false,
  },
  metric: true,
  edit: false,
};

L.control.layers({
  "Base": baseLight
}, {
  "Selection": drawnItems
}).addTo(map);

var rectDrawer = new L.Draw.Rectangle(map);
rectDrawer.setOptions({
  shapeOptions: {
    color: '#57068C',
    weight: 3,
    fill: false,
    opacity: 0.85,
  }
});

var editTool = new L.EditToolbar.Edit(map, {
                featureGroup: drawnItems,
                selectedPathOptions: {
                  dashArray: "10, 10",
                  fill: true,
                  fillColor: "#7A7A7A",
                  fillOpacity: 0.1,
                  maintainColor: true
                },
            });

// Create the svg
var svg = d3.select(map.getPanes().overlayPane).append("svg");
// initial SVG setup: it should be exactly on top of the map (same size and position)
// svg.attr("width", $("#map").width())
//   .attr("height", $("#map").height())
//   .style("left", "0px")
//   .style("top", "0px");

// Add the g for the word cloud
g = svg.append("g").attr("class", "leaflet-zoom-hide");

// map.on('load', ()=>{
//   map.getSource('scatter').setData(circlegjson);
//   console.log('scatter data set');
// });

map.on('overlayadd', function(e) {
  rectDrawer.enable(); // Commented for demo
  stopReceive = false;
  // drawnItems.addLayer(rectDrawer);
});

map.on('overlayremove', function(e) {
  editTool.disable();
  drawnItems.clearLayers();
  // Call the update
  tagCloud = wordCloud(g);
  tagCloud.update([], [0, 0]);

  d3.select("#chart > *").remove();
  initChart();
  wordcloud = undefined;

  stopReceive = true;
})

// map.on('sourcedata', mapAddScatter);
// Once the rectangle's created, send the parameters to the websocket
map.on('draw:created', function(e) {
  var type = e.layerType,
    layer = e.layer;

  // Old version using L.Draw
  // drawnItems.addLayer(layer);
  // map.removeControl(drawControl); // Remove the draw control from the map to stop people from drawing
  // map.addControl(drawControlEditOnly); // Add edit only mode

  // layer.options.editing || (layer.options.editing = options);
  // layer.editing.enable();
  drawnItems.addLayer(layer);
  rectDrawer.disable();
  editTool.enable();
  // console.log(layer._bounds);
  // console.log(map._zoom);
  // console.log(map._lastCenter);

  isDrawn = true;
  updateQuery(layer);
});

map.on(L.Draw.Event.EDITMOVE, function (e) {
  layer = e.layer;
  var { _southWest, _northEast } = layer._bounds;

  // Make the tag cloud move as the rectangle is dragged
  updateQueryStatus(e);
  moveSVG(layer, _northEast, _southWest);
  // updateQuery(layer);
});

map.on(L.Draw.Event.EDITRESIZE, function (e) {
  // layer = e.layer;
  // var { _southWest, _northEast } = layer._bounds;
  updateQueryStatus(e);
  // updateQuery(layer);
});

function updateQueryStatus(e) {
  rectangleUpdated = true;
  // updateCaption();
}

map.on('sourcedata', ()=> {console.log("data changes")});

map.on('mouseup', function(e) {
  if (rectangleUpdated) {
      rectangleUpdated = false;
      updateCount = 0;
      callReceive = 0;
      sendQuery();
    }
})

// Handling when rectangle is edited
// map.on('draw:edited', function(e) {
//   var layers = e.layers;
//   updateCount = 0;
//   callReceive = 0;
//   layers.eachLayer(function(layer) {
//     updateQuery(layer);
//   });
// });

map.on('draw:deleted', function(e) {
  // Call the update
  tagCloud = wordCloud(g);
  tagCloud.update([], [0, 0]);

  // map.removeControl(drawControlEditOnly); // Remove the edit only mode
  // map.addControl(drawControl); // Add draw only mode
  isDrawn = false;
  map.options.minZoom = 4.25;
});

 // Stop the requests when zoom starts
map.on('zoomstart', stopTimer);

map.on('zoomend', updateSVGZoom);

map.on('moveend', resetSVG);

// map.getSource('scatter').setData(circlegjson);

// map.once('style.load', (event)=>{
//   map.addSource('scatter', {
//     'type': 'geojson',
//     'data': circlegjson
//   });
//   map.addLayer({
//     'id': 'scatter',
//     'type': 'circle',
//     'source': 'scatter',
//     'paint': {
//       'circle-radius': 4,
//       'circle-stroke-width': 2,
//       'circle-color': 'red',
//        'circle-stroke-color': 'white'
//     }
//   });
//   map.getSource('scatter').setData(circlegjson);
// })

function moveSVG(layer, _northEast, _southWest) {
  // Gets the width, height and centroid of the drawn rectangle
  let ne = map.latLngToLayerPoint(_northEast),
      sw = map.latLngToLayerPoint(_southWest);
  rectangleWidth = Math.abs(ne.x - sw.x),
  rectangleHeight = Math.abs(ne.y - sw.y);

  updateMinZoom();

  var zoom_level;
  zoom_level = Math.pow(2, (map.getZoom() - zoom));

  // if (isDrawn) {
  //   zoom_level = Math.pow(2, (map.getZoom() - zoom));
  // } else {
  //   zoom_level = 1;
  //   zoom = Math.round(map.getZoom(), 0)
  // }

  // Move according to the edit
  // var ctopleft = map.containerPointToLatLng(L.point(0, 0));
  // var ltopleft = map.latLngToLayerPoint(ctopleft);
  // // the SVG moves when the user pans, so put it back to being exactly on top of the map
  // svg.style("left", ltopleft.x + "px")
  //   .style("top", ltopleft.y + "px");

  // // g.attr("transform", "translate(" + (word_center.x / zoom_level) + "," + (word_center.y / zoom_level) + ")");
  // g.attr("transform", "translate(" + (word_center.x) + "," + (word_center.y) + ")");
  svg.style("width", rectangleWidth)
    .style("height", rectangleHeight)
    .style("left", sw.x)
    .style("top", ne.y);
  svg.attr("viewBox", `${-rectangleWidth*0.5} ${-rectangleHeight*0.5} ${rectangleWidth} ${rectangleHeight}`);
}

function resetSVG() {
  // Scales the svg according to the zoom_level
  drawnItems.eachLayer(function(layer) {
    var {
      _southWest,
      _northEast
    } = layer._bounds;

    moveSVG(layer, _northEast, _southWest);
  });
}

function updateSVGZoom() {
  // Scales the svg according to the zoom_level
  drawnItems.eachLayer(function(layer) {
    var {
      _southWest,
      _northEast
    } = layer._bounds;

    moveSVG(layer, _northEast, _southWest);

    // update the tag cloud
    tagCloud = wordCloud(g);
    tagCloud.update(wordcloud, [rectangleWidth, rectangleHeight]);
    startTimer();
  });
}

function updateMinZoom() {
  // If the width of the rectangle is 72 - 104px,
  // set the minZoom of the map
  if (Math.floor(rectangleWidth / MAX_FONT_SIZE) == 2) {
    map.options.minZoom = map.getZoom();
  } else {
    map.options.minZoom = 4.25;
  }
}

function updateQueryKeyword(keyword){
  progress = Math.round(0 * 100);
  updateProgress();
  var bounds = map.getBounds();
  console.log(bounds);
  var {
    _southWest,
    _northEast
  } = bounds;
  request = {
    k: parseInt($('#k').val()),
    new: 1,
    userID: userId,
    minLat: _southWest.lat.toFixed(4),
    minLon: _southWest.lng.toFixed(4),
    maxLat: _northEast.lat.toFixed(4),
    maxLon: _northEast.lng.toFixed(4),
    minTime: minTime,
    maxTime: maxTime,
    keyword: keyword,
    timeResolution: timeResMapper[$('#timeResolution').val()],
    exp: 12,
    width: 1024,
    depth: 4
  }
  socket.send(JSON.stringify(request));

  // moveSVG(layer, _northEast, _southWest);
  stopTimer();
  startTimer();
}

function updateQuery(layer) {
  progress = Math.round(0 * 100);
  updateProgress();
  var {
    _southWest,
    _northEast
  } = layer._bounds;

  updateCount = 0;
  callReceive = 0;
  progress = 0;

  request = {
    k: parseInt($('#k').val()),
    new: 1,
    userID: userId,
    minLat: _southWest.lat.toFixed(4),
    minLon: _southWest.lng.toFixed(4),
    maxLat: _northEast.lat.toFixed(4),
    maxLon: _northEast.lng.toFixed(4),
    minTime: minTime,
    maxTime: maxTime,
    exp: 11,
    width: 1024,
    depth: 4
  };
  // Put function call to the backend here based on the bounds
  socket.send(JSON.stringify(request));

  moveSVG(layer, _northEast, _southWest);
  stopTimer();
  startTimer();
}

function initParams() {
  k = document.querySelector('#k');
  // Set the date
  // minDate.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
  //   '-' + date.getDate().toString().padStart(2, 0);
  k.value = 50;

  // var minDate = document.querySelector('#minDate');
  // var date = new Date();
  // // Set the date
  // // minDate.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
  // //   '-' + date.getDate().toString().padStart(2, 0);
  // minDate.value = '2014-04-01';
  //
  // var maxDate = document.querySelector('#maxDate');
  // // Set the date
  // // maxDate.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
  // //   '-' + (date.getDate() + 10).toString().padStart(2, 0);
  // maxDate.value = '2014-04-10';
}

function initProgress() {
  var progressSVG = d3.select("#progress").append("svg")
    .attr("height", 30)
    .attr("width", 210);

  progressScale = d3.scaleLinear()
                        .domain([0, 100])
                        .range([0, 200]);

  progressSVG.append("rect")
    .attr("class", "bg-rect")
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("fill", "#cccccc")
    .attr("height", 18)
    .attr("width", 200)
    .attr("x", 5)
    .attr("y", 5);

  progressRect = progressSVG.append("rect")
    .datum(progress)
    .attr("class", "progress-rect")
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("fill", "#57068C")
    .attr("height", 18)
    .attr("width", function() {
      return progressScale(progress);
    })
    .attr("x", 5)
    .attr("y", 5);

  percentageText = progressSVG.append("text")
      .attr("class", "percentage")
      .text(progress + "%")
      .attr("x", 200/2)
      .attr("y", 18)
      .attr("font-size", 12)
      .attr("fill", "#ffffff");
}

function updateProgress() {
  // progressRect.data(progress).enter();
  progressRect.transition().duration(500).attr("width", function() {
    return progressScale(progress);
  });

  percentageText.transition().duration(500).text(progress + "%");
}

function initTimeSeries() {
  var ts_width = $("#ts").width(),
    ts_height = $("#ts").height();

  var margin = {top: 0, right: 30, bottom: 30, left: 80},
    width = ts_width - margin.left - margin.right,
    height = ts_height - margin.top - margin.bottom;

  var tweetcounts = tsdata.sort(function(a, b) { return d3.ascending(moment.utc(a.date), moment.utc(b.date)); });
  // tweetcounts = tweetcounts.filter(function(d) {
  //   return moment.utc(d.date).isSameOrAfter(moment.utc("2019-01-01"));
  // });
  minTime = d3.min(tweetcounts, function(d) { return moment.utc(d.date); });
  maxTime = d3.max(tweetcounts, function(d) { return moment.utc(d.date); });

  d3.select("#minTime").html(moment(minTime).format('MMM DD, YYYY HH:mm'));
  d3.select("#maxTime").html(moment(maxTime).format('MMM DD, YYYY HH:mm'));

  // Initialize the scales
  xScale = d3.scaleUtc()
                .domain([d3.min(tweetcounts,
                          function(d) { return moment.utc(d.date); }),
                        d3.max(tweetcounts,
                          function(d) { return moment.utc(d.date); })])
                .range([0, width]);
  var yScale = d3.scaleLinear()
                .domain([0,
                        d3.max(tweetcounts,
                          function(d) { return d.count; })+1e5])
                .range([height, 0]);

  var line = d3.line()
      .x(function(d) { return xScale(moment.utc(d.date)); }) // set the x values for the line generator
      .y(function(d) { return yScale(d.count); }) // set the y values for the line generator
      .curve(d3.curveMonotoneX); // apply smoothing to the line

  areaGenerator = d3.area()
      .curve(d3.curveMonotoneX)
      .x(function(d) { return xScale(moment.utc(d.date)); })
      .y0(yScale(0))
      .y1(function(d) { return yScale(d.count) });

  // Initialize the axis objects
  xAxis = d3.axisBottom(xScale)
      .ticks(10)
      .tickSizeOuter(0);

  yAxis = d3.axisLeft(yScale)
      .ticks(4)
      .tickSizeOuter(0);

  // Setup the tsSVG
  tsSVG = d3.select("#ts")
    .append("svg")
      .attr("width", ts_width)
      .attr("height", ts_height)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Add a clipPath: everything out of this area won't be drawn.
  var tsclip = tsSVG.append("defs").append("svg:clipPath")
      .attr("id", "tsclip")
      .append("svg:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0)
      .attr("y", 0);

  // Create the area variable: where both the area and the brush take place
  brushArea = tsSVG.append("g")
    .attr("clip-path", "url(#tsclip)");

  tsSVG.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "ts-axis--x")
    .call(xAxis);

  tsSVG.append("g")
    .attr("class", "ts-axis--y")
    .call(yAxis);

  tsSVG.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1.25em")
      .style("font-size", "10px")
      .style("text-anchor", "middle")
      .text("No. of Tweets");

  // Add brushing
  tsbrush = d3.brushX()                   // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("brush", updateTSChart)// Each time the brush selection changes, trigger the 'updateChart' function
      .on("end", sendTime);

  // tsSVG.append("rect")
  //     .attr("class", "zoom")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .style("cursor", "move")
  //     .style("fill", "none")
  //     .style("pointer-events", "all")
  //     .call(tszoom);

  // Add the area
  brushArea.append("path")
      .datum(tweetcounts)
      .attr("class", "tsarea")  // I add the class myArea to be able to modify it later on.
      .attr("fill", "#57068C")
      .attr("fill-opacity", .3)
      .attr("stroke", "#57068C")
      .attr("stroke-width", 1)
      .attr("d", areaGenerator);

  // Add the brushing
  tsGroup = brushArea
    .append("g")
      .attr("class", "tsbrush")
      .call(tsbrush);

  // create a tooltip
  // tooltip = tsSVG.append("div")
  //   .style("opacity", 0)
  //   .attr("class", "tooltip")
  //   .style("background-color", "white")
  //   .style("border", "solid")
  //   .style("border-width", "2px")
  //   .style("border-radius", "5px")
  //   .style("padding", "5px")

  // tsSVG.append("g")
  //   .selectAll("circle")
  //   .data(tweetcounts)
  //   .enter()
  //   .append("circle")
  //     .attr("cx", function (d) { return xScale(moment.utc(d.date)); } )
  //     .attr("cy", function (d) { return yScale(d.count); } )
  //     .attr("r", 2)
  //     .style("fill", "#57068C");
      // .style("stroke", "#FFFFFF");

  var tszoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed)
    .on("end", sendZoom);
}

function wordCloud(selector) {
  // draw the word cloud
  function drawCloud(words, size) {
    var cloud = selector.selectAll("text").data(words);

    function transform() {
      let bb = g.node().getBBox(),
          sx = size[0]*0.95/bb.width,
          sy = size[1]*0.95/bb.height,
          tx = -bb.x-bb.width*0.5,
          ty = -bb.y-bb.height*0.5;
      g.attr('transform', `scale(${sx},${sy})translate(${tx},${ty})`);
    }

    // Entering the words
    cloud.enter()
      .append("text")
      .text(function(d) {
        return d.text;
      })
      .style("font-size", function(d) {
        return d.size + "px";
      })
      .style("font-family", "Exo")
      .style("fill", '#57068C')
      .style("stroke-width", '0.5')
      .style("stroke", '#FFFFFF')
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .call(transform);

    cloud
      // .transition()
      // .duration(500)
      .text(function(d) {
        return d.text;
      })
      .style("font-size", function(d) {
        return d.size + "px";
      })
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .style("fill-opacity", 1)
      .call(transform);;

    //Exiting words
    cloud.exit()
      // .transition()
      // .duration(100)
      .style('fill-opacity', 1e-6)
      .attr('font-size', 1)
      .remove();
  }

  //Use the module pattern to encapsulate the visualisation code. We'll
  // expose only the parts that need to be public.
  return {
    //Recompute the word cloud for a new set of words. This method will
    // asycnhronously call draw when the layout has been computed.
    //The outside world will need to call this function, so make it part
    // of the wordCloud return value.
    update: function(words, size) {
      var fontScale = d3.scaleLinear().domain(d3.extent(words, function(d) {
        return d.value;
      })).range([MIN_FONT_SIZE, MAX_FONT_SIZE]);
      // var color = d3.scaleLinear()
      //             .domain(d3.extent(words, function(d) { return d.value; }))
      //             .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

      let ar = size[0]/size[1];
      d3.layout.cloud()
        .stop()
        .size([1000*ar, 1000])
        .words(words)
        .text(function(d) {
          return d.text;
        })
        .random(function(d) {
          return 0.5;
        })
        .padding(1)
        .rotate(0)
        .font("Exo")
        .timeInterval(1)
        .fontSize(function(d) {
          return fontScale(d.value);
        })
        .spiral("rectangular")
        .on("end", (words) => drawCloud(words, size))
        // .on("end", function(output) {
        //   if (words.length !== output.length) {
        //     wordsRemoved = true;
        //     drawCloud(output);
        //   } else {
        //     wordsRemoved = false;
        //     drawCloud([]);
        //     drawCloud(output);
        //   }
        // })
        .start();
    }
  }
}

function initChart() {
  // Initialize size of the chart
  var chart_width = $("#chart").width(),
    chart_height = $("#chart").height();
  var main_margin = { top: 10, right: 10, bottom: 30, left: 80 },
      main_width = (0.85 * chart_width) - main_margin.left - main_margin.right,
      main_height = chart_height - main_margin.top - main_margin.bottom,
      mini_margin = { top: 10, right: 10, bottom: 30, left: 5 },
      mini_height = chart_height - mini_margin.top - mini_margin.bottom;
  mini_width = (0.15 * chart_width) - mini_margin.left - mini_margin.right;

  //Added only for the mouse wheel
  var zoomer = d3.zoom()
    .on("zoom", null);

  // Initialize the scales
  main_xScale = d3.scaleLinear().range([0, main_width]);
  mini_xScale = d3.scaleLinear().range([0, mini_width]);

  main_yScale = d3.scaleBand().range([0, main_height]).paddingInner(0.15).paddingOuter(0);
  mini_yScale = d3.scaleBand().range([0, mini_height]).paddingInner(0.15).paddingOuter(0);

  textScale = d3.scaleLinear()
      .domain([5, 50])
      .range([14, 6])
      .clamp(true);

  main_yZoom = d3.scaleLinear()
      .range([0, main_height])
      .domain([0, main_height]);

  // Initialize the axis objects
  main_xAxis = d3.axisBottom(main_xScale)
      .ticks(4)
      .tickSizeOuter(0);

  main_yAxis = d3.axisLeft(main_yScale)
      .tickSize(0)
      .tickSizeOuter(0);

  chartSVG = d3.select("#chart").append("svg")
            .attr("width", chart_width)
            .attr("height", chart_height)
            .style("position", "relative")
            .call(zoomer)
            .on("wheel.zoom", scroll)

  chartSVG.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
      .attr("x", -main_margin.left)
      .attr("width", main_width + main_margin.left)
      .attr("height", main_height);

  var mainGroup = chartSVG.append("g")
        .attr("class", "mainGroupWrapper")
        .attr("transform", "translate(" + main_margin.left + "," + main_margin.top + ")")
        .append("g")
        .attr("clip-path", "url(#clip)")
        .style("clip-path", "url(#clip)")
        .attr("class", "mainGroup");

  var miniGroup = chartSVG.append("g")
        .attr("class", "miniGroup")
        .attr("transform", "translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

  d3.select(".mainGroupWrapper")
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + 0 + "," + (main_height + 5) + ")");

  //Add group for the y axis
  mainGroup.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(-5,0)");

  var brushGroup = chartSVG.append("g")
      .attr("class", "brushGroup")
      .attr("transform", "translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

  brush = d3.brushY()
    .extent([[0,0], [mini_width, mini_height]])
    .handleSize(2)
    .on("brush", brushmove);

  //Set up the visual part of the brush
  gBrush = d3.select(".brushGroup").append("g")
    .attr("class", "brush")
    .call(brush)
    .call(function(g) {
      g.select(".overlay")
        .datum({type: "selection"})
        // .on("mousedown touchstart", brushcenter)
    });

  handle = gBrush.selectAll(".handle--custom")
    .data([{type: "n"}, {type: "s"}])
    .enter().append("path")
      .attr("class", "handle--custom")
      .attr("cursor", "ns-resize")
      .attr("d", d3.symbol().type(d3.symbolTriangle).size(20));
}

function initTsChart() {
  // Initialize size of the chart
  // var svg = d3.select("#chart");
  var chart_width = $("#chart").width(),
    chart_height = $("#chart").height();
  var main_margin = { top: 10, right: 10, bottom: 30, left: 80 },
      main_width = (0.85 * chart_width) - main_margin.left - main_margin.right,
      main_height = chart_height - main_margin.top - main_margin.bottom,
      mini_margin = { top: 10, right: 10, bottom: 30, left: 5 },
      mini_height = chart_height - mini_margin.top - mini_margin.bottom;
  mini_width = (0.15 * chart_width) - mini_margin.left - mini_margin.right;

  //Added only for the mouse wheel
  // var zoomer = d3.zoom()
  //   .on("zoom", null);

  // Initialize the scales
  main_xScale = d3.scaleTime().domain([new Date('2018-01-01'), new Date('2018-12-31')]).range([0, chart_width]);// .paddingInner(0.15).paddingOuter(0);
  main_yScale = d3.scaleLinear().domain([0, 100]).range([main_height,0]); //.paddingInner(0.15).paddingOuter(0);
  //paddingInner(0.15).paddingOuter(0);

  // main_yZoom = d3.scaleLinear()
  //     .range([0, main_height])
  //     .domain([0, main_height]);

  // Initialize the axis objects
  // main_xAxis = d3.axisBottom(main_xScale)
  //     .ticks(4)
  //     .tickSizeOuter(0);

  // main_yAxis = d3.axisLeft(main_yScale)
  //     .tickSize(0)
  //     .tickSizeOuter(0);

  chartSVG = d3.select("#chart").append("svg")
            .attr("width", chart_width)
            .attr("height", chart_height)
            .style("position", "relative")
            // .call(zoomer)
            // .on("wheel.zoom", scroll)
  var xAxis = chartSVG.append("g")
    .attr("transform", "translate(0," + chart_height + ")")
    .attr("class", "x-axis")
    .call(d3.axisTop(main_xScale).ticks(d3.timeMonth));
  var yAxis = chartSVG.append("g")
    .attr("class", "y-axis")
    .call(d3.axisRight(main_yScale));
}

function updateLinear(data){
  // initTsChart();
  // var parseDate = d3.time.format("%m-%Y").parse;
  var xaxisRes = d3.timeDay;
  switch (timeResMapper[$('#timeResolution').val()]){
    case 0:
      xaxisRes = d3.timeHour;
      break;
    case 1:
      xaxisRes = d3.timeDay;
      break;
    case 2:
      xaxisRes = d3.timeWeek;
      break;
    case 3:
      xaxisRes = d3.timeMonth;
      break;    
  }

  console.log("temp data len ", data.length);
  // chartSVG.selectAll(".tick text").remove();
  main_xScale.domain([minTime, maxTime]);
  main_yScale.domain([0, d3.max(data, function(d) { return d.y; })]);
  // xAxis.transition().duration(10).call(d3.axisBottom(main_xScale));
  // yAxis.transition().duration(10).call(d3.axisBottom(main_yScale));
  chartSVG.selectAll(".y-axis")
    .transition().duration(1000)
    .call(d3.axisRight(main_yScale));

  chartSVG.selectAll(".x-axis")
    .transition().duration(1000)
    .call(d3.axisTop(main_xScale).ticks(xaxisRes));

  chartSVG.selectAll('circle').remove();
  chartSVG.exit().remove();
  chartSVG
    .selectAll('.circle')
    .data(data)
    .join(
      enter => enter
        .append('circle')
        .attr('r', 5)
        .attr('fill', "#69b3a2")
        .call(
          enter => enter
            // .style("fill-opacity", 0.2)
            .transition()
            .attr('cx', d => main_xScale(d.date))
            .attr('cy', d => main_yScale(d.y))
        ),
      update => update
        .call(
          update => update
            .style("fill-opacity", 0.2)
            .attr("fill", "brown")
            .transition()
            .attr('cx', d => main_xScale(d.date))
            .attr('cy', d => 0)
        ),
      exit => exit.attr("fill", "brown").call(
        exit=>exit
          .style("fill-opacity", 0.2)
          .transition(d3.transition().duration(850))
          .attr("cx", 0)
          .attr("cy", 0)
          .remove())
    )
}

function updateChart(data) {
  initChart();
  // Update the scales
  main_xScale.domain([0, d3.max(data, function(d) { return d.value; })]);
  mini_xScale.domain([0, d3.max(data, function(d) { return d.value; })]);
  main_yScale.domain(data.map(function(d) { return d.text; }));
  mini_yScale.domain(data.map(function(d) { return d.text; }));


  d3.select(".mainGroup")
    .select(".y.axis")
    .transition().duration(50)
    .call(main_yAxis);

  //Update the x axis of the big chart
  d3.select(".mainGroupWrapper")
    .select(".x.axis")
    .transition().duration(50)
    .call(main_xAxis);

  var mainBar = d3.select(".mainGroup").selectAll(".bar")
    .data(data);

  // Update
  mainBar.attr("y", function(d, i) { return main_yScale(d.text); })
    .attr("height", main_yScale.bandwidth())
    .attr("x", 0)
    .transition().duration(50)
    .attr("width", function(d) { return main_xScale(d.value); });

  // Enter
  mainBar.enter().append("rect")
    .attr("class", "bar")
    .style("fill", "#57068C")
    .attr("y", function(d, i) { return main_yScale(d.text); })
    .attr("height", main_yScale.bandwidth())
    .attr("x", 0)
    .transition().duration(50)
    .attr("width", function(d) { return main_xScale(d.value); });

  mainBar.exit()
    .remove();

  var miniBar = d3.select(".miniGroup").selectAll(".bar")
    .data(data);

  // Update
  miniBar.attr("width", function(d) { return mini_xScale(d.value); })
    .attr("y", function(d, i) { return mini_yScale(d.text); })
    .attr("height", mini_yScale.bandwidth());

  // Enter
  miniBar.enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("width", function(d) { return mini_xScale(d.value); })
    .attr("y", function(d, i) { return mini_yScale(d.text); })
    .attr("height", mini_yScale.bandwidth())
    .style("fill", "#57068C");

  // Exit
  miniBar.exit()
    .remove();

  // Start the brush
  // var brushExtent = Math.max( 1, Math.min( 30, Math.round(data.length*0.5) ) );
  var brushExtent = 12;
  gBrush.call(brush.move, [mini_yScale(wordcloud[0].text), mini_yScale(wordcloud[brushExtent].text)]);
}

function brushmove() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  var s = d3.event.selection || mini_yScale.range();

  var selected = wordcloud.filter(function(d) {
      var y = mini_yScale(d.text);

      // check if the start of the brush is before the band
      // and if the end of the brush is after the end of the band
      return (s[0] - mini_yScale.bandwidth() + 1e-2 <= y) && (s[1] - 1e-2 >= y);
  });

  d3.select(".miniGroup").selectAll('.bar')
    .style("fill", function(d, i) {
      return selected.map(function(d) { return d.text; }).indexOf(d.text) > -1 ? "#57068C" : "#e0e0e0";
    });

  //Update the label size
  d3.selectAll(".y.axis text")
    .style("font-size", textScale(selected.length));

  //Reset the part that is visible on the big chart
  var originalRange = main_yZoom.range();
  main_yZoom.domain( s );

  //Update the domain of the x & y scale of the big bar chart
  main_yScale.domain(wordcloud.map(function(d) { return d.text; }));
  main_yScale.range( [ main_yZoom(originalRange[0]), main_yZoom(originalRange[1]) ]).padding(0.15);

  //Update the y axis of the big chart
  d3.select(".mainGroup")
    .select(".y.axis")
    .call(main_yAxis);

  //Find the new max of the bars to update the x scale
  // var newMaxXScale = d3.max(wordcloud, function(d) { return selected.map(function(d) { return d.text; }).indexOf(d.text) > -1 ? d.value : 0; });
  // main_xScale.domain([0, newMaxXScale]);
  // //Update the x axis of the big chart
  // d3.select(".mainGroupWrapper")
  //   .select(".x.axis")
  //   .transition().duration(50)
  //   .call(main_xAxis);

  handle.attr("fill", "#7A7A7A")
    .attr("fill-opacity", "1")
    .attr("stroke", "#7A7A7A")
    .attr("stroke-width", "2px")
    .attr("transform", function(d, i) {
      var transform = "translate(" + [ mini_width/2, s[i]-3] + ")"
      if (i) {
        transform = "translate(" + [ mini_width/2, s[i]+3] + ") rotate(180)";
      }
      return transform;
    });

  // d3.select(this).call(brushHandle, s);

  updateMainChart();
}

function updateMainChart() {
  /////////////////////////////////////////////////////////////
  ////////// Update the bars of the main bar chart ////////////
  /////////////////////////////////////////////////////////////
  //DATA JOIN
  var bar = d3.select(".mainGroup").selectAll(".bar")
      .data(wordcloud);
  //UPDATE
  bar
    .attr("y", function(d,i) { return main_yScale(d.text); })
    .attr("height", main_yScale.bandwidth())
    .attr("x", 0)
    .transition().duration(50)
    .attr("width", function(d) { return main_xScale(d.value); });
  //ENTER
  bar.enter().append("rect")
    .attr("class", "bar")
    .style("fill", "#57068C")
    .attr("y", function(d,i) { return main_yScale(d.text); })
    .attr("height", main_yScale.bandwidth())
    .attr("x", 0)
    .transition().duration(50)
    .attr("width", function(d) { return main_xScale(d.value); });
  //EXIT
  bar.exit()
    .remove();
}//updateMainChart

//Based on http://bl.ocks.org/mbostock/6498000
//What to do when the user clicks on another location along the brushable bar chart
function brushcenter() {
  const [Y0, Y1] = mini_yScale.range();
  const [cx, cy] = d3.mouse(this);
  const dy = mini_yScale(wordcloud[5].text) - mini_yScale(wordcloud[0].text);
  const [y0, y1] = [cy - dy / 2, cy + dy / 2];

  d3.event.stopPropagation();

  d3.select(this.parentNode)
    .call(brush.move, y1 > Y1 ? [Y1 - dy, Y1]
        : y0 < Y0 ? [Y0, Y0 + dy]
        : [y0, y1]);
}//brushcenter

function scroll() {
  //Mouse scroll on the mini chart
  var [y0, y1] = d3.brushSelection(gBrush.node()),
    size = y1 - y0,
    [Y0, Y1] = mini_yScale.range(),
    dy = d3.event.deltaY,
    topSection;

  if ( y0 - dy < Y0 ) { topSection = Y0; }
  else if ( y1 - dy > Y1 ) { topSection = Y1 - size; }
  else { topSection = y0 - dy; }

  gBrush.call(brush.move, [topSection, topSection + size]);
}//scroll

function updateTSChart() {
  // What are the selected boundaries?
  extent = d3.event.selection

  // Get the datetime based on the selection
  if (extent) {
    minTime = xScale.invert(extent[0]);
    maxTime = xScale.invert(extent[1]);

    d3.select("#minTime").html(moment(minTime).format('MMM DD, YYYY HH:mm'));
    d3.select("#maxTime").html(moment(maxTime).format('MMM DD, YYYY HH:mm'));
  }
}

function sendTime() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore zoom-by-brush
  // What are the selected boundaries?
  extent = d3.event.selection

  // Get the datetime based on the selection
  if (extent) {
    minTime = xScale.invert(extent[0]);
    maxTime = xScale.invert(extent[1]);
  }

  sendQuery();
}

function zoomed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
  var t = d3.event.transform;

  var updatedScale = t.rescaleX(xScale);
  xAxis.scale(updatedScale);
  tsSVG.select(".ts-axis--x").call(xAxis);

  brushArea.select(".tsarea").attr("d", areaGenerator.x(function(d) { return updatedScale(moment.utc(d.date))}));
}

function sendZoom() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
  var t = d3.event.transform;

  var updatedScale = t.rescaleX(xScale);
  var domain = updatedScale.domain();
  minTime = domain[0];
  maxTime = domain[1];

  sendQuery();
}

function sendQuery() {
  var keyword = $('#keyword').val();
  if (keyword){
    updateQueryKeyword(keyword);
  }
  else{
  drawnItems.eachLayer(function(layer) {
    updateQuery(layer);
  });
  }
}

function checkFinal() {
  if (isDrawn && !isFinal) {
    timeoutId = window.setTimeout(checkFinal, Math.min(MAX_STEP_WAIT, Math.pow(2, ++counter) * 100));
    window.setTimeout(requestSnapshot, 0);
  }
}

function requestSnapshot() {
  request.new = 0;
  // socket.send(JSON.stringify(request));
}

function setupWatchers() {
  // document.addEventListener("mousemove", resetTimer, false);
  // document.addEventListener("mouseup", startTimer, false);
  document.addEventListener("mousedown", stopTimer, false);
  // document.addEventListener("keypress", stopTimer, false);
  // document.addEventListener("touchmove", resetTimer, false);
}

function startTimer() {
  counter = 1;
  timeoutId = window.setTimeout(checkFinal, Math.min(MAX_STEP_WAIT, 1000 + Math.pow(2, ++counter) * 100));
}

function stopTimer() {
  window.clearTimeout(timeoutId);
  counter = 1;
}
