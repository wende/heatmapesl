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
import "deps/phoenix_html/web/static/js/phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import {Socket} from "deps/phoenix/web/static/js/phoenix";


let socket = new Socket("/socket");
socket.connect();
let chan = socket.channel("heatmap:data", {});
var heatmapCanvas = document.getElementById("heatmap");
window.heatmapCanvas = heatmapCanvas;
var heatmapContext = heatmapCanvas.getContext("webgl");
var C_WIDTH = heatmapCanvas.offsetWidth;
var C_HEIGHT = heatmapCanvas.offsetHeight;
var MAX_VAL = 350;
var CLEAR_FACTOR = 0.98;
var DP_FORCE = 0.1;

chan.on("datapoint", dp => {
  addData(dp.x*10, dp.y*10, (647 - dp.distance)/3 , DP_FORCE);
});
	

chan.join().receive("ok", _chan => {
  console.log("Welcome to Phoenix Chat!");
  window.heatmap = createWebGLHeatmap({canvas: heatmapCanvas});
  heatmap.display();
  init();
});


window.makeBase = function makeBase(){
  var base_image = new Image();
  base_image.src = 'images/espress.png';
  base_image.onload = function(){
    base_image.style.top = "100px"
    base_image.style.left = "100px"
    console.log("hmm?");
  };
}


window.data = [];

var randCoord = () => Math.round(Math.random()*800)

function init(){
  setInterval(()=>{
    //data = data.map(({value: a, x: x,y: y} ) => { return {value: a * CLEAR_FACTOR, x:x, y:y} });
    //data = data.filter( (a)=> a.value > 0.3 );
    //heatmap.setData({max: 5, data: data});
    //addData(Math.random()*100, 50, 0.1);
    heatmap.multiply(CLEAR_FACTOR);
    heatmap.update();
    heatmap.display();
  }, 30);
};


function addData(x, y, size,  value){
  heatmap.addPoint(x, y, size, value);
}

