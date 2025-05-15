"use strict";
console.log("::: script Loaded::: ");

slider = document.getElementById("slider_value");
output = document.getElementById("set_value");

window.onload = function () {
  // functions calls.
  generate_grid();
  visualizer_event_listeners();

  console.log("value output " + output);
  output.innerHTML = slider.value + " :M/s";
  menu_event_listeners();
};

slider.oninput = function () {
  output.innerHTML = slider.value + " :M/s";
  maze_solver_algo_speed = slider.value;
};
