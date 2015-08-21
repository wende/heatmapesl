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
let chan = socket.channel("rooms:lobby", {});
chan.join().receive("ok", chan => {
  console.log("Welcome to Phoenix Chat!");
});

window.heatmap = h337.create({
  container: document.getElementById("heatmap")
});
window.data = [{ x: 10, y: 15, value: 5}];
heatmap.setData({
  max: 5,
  data: data
});

var randCoord = () => Math.round(Math.random()*800)

setInterval(()=>{
  data = data.map(({value: a, x: x,y: y} ) => { return {value: a * 0.996, x:x, y:y} });
  data.push( { value: 4, x: randCoord() , y: randCoord()});
  heatmap.setData({max: 5, data: data});
}, 30);