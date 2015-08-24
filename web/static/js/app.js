// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import {Socket} from "deps/phoenix/web/static/js/phoenix"


let socket = new Socket("/socket");
socket.connect();
let chan = socket.channel("heatmap:data", {});
var heatmapCanvas = document.getElementById("heatmap");
var C_WIDTH = heatmapCanvas.offsetWidth;
var C_HEIGHT = heatmapCanvas.offsetHeight;
var MAX_VAL = 653;

chan.on("datapoint", dp => {
  console.log("Got datapoint");
  console.log(dp);
  addData(dp.distance/MAX_VAL*C_WIDTH, C_HEIGHT/2, 0.5);
});
	

chan.join().receive("ok", _chan => {
  console.log("Welcome to Phoenix Chat!");
 });

window.heatmap = h337.create({
  container: heatmapCanvas
});
window.data = [];

var randCoord = () => Math.round(Math.random()*800)

setInterval(()=>{
  data = data.map(({value: a, x: x,y: y} ) => { return {value: a * 0.98, x:x, y:y} });
  data = data.filter( (a)=> a.value > 0.3 );
  heatmap.setData({max: 5, data: data});
}, 500);

function addData(x, y, value){
  data.push( { value: value, x: x , y: y});
  heatmap.setData({max: 5, data: data});
}

