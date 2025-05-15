"use strict";
console.log("::: Maze Loaded::: ");

function get_neighbours(cell, distance) {
  let up = [cell[0], cell[1] - distance];
  let right = [cell[0] + distance, cell[1]];
  let down = [cell[0], cell[1] + distance];
  let left = [cell[0] - distance, cell[1]];
  return [up, right, down, left];
}

function random_int(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function fill() {
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++) add_wall(i, j);
}

function fill_walls() {
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      if (i % 2 == 0 || j % 2 == 0) add_wall(i, j);
}

function enclose() {
  for (let i = 0; i < grid.length; i++) {
    add_wall(i, 0);
    add_wall(i, grid[0].length - 1);
  }

  for (let j = 0; j < grid[0].length; j++) {
    add_wall(0, j);
    add_wall(grid.length - 1, j);
  }
}


function test_gen() {
  console.log("calling test_gen() go generate maze");
}

function maze_generator() {
  let start_temp = start_pos;
  let target_temp = target_pos;
  // hidden_clear();
  generating = true;

  if (start_temp[0] % 2 == 0) {
    if (start_temp[0] == grid.length - 1) start_temp[0] -= 1;
    else start_temp[0] += 1;
  }

  if (start_temp[1] % 2 == 0) {
    if (start_temp[1] == 0) start_temp[1] += 1;
    else start_temp[1] -= 1;
  }

  if (target_temp[0] % 2 == 0) {
    if (target_temp[0] == grid.length - 1) target_temp[0] -= 1;
    else target_temp[0] += 1;
  }

  if (target_temp[1] % 2 == 0) {
    if (target_temp[1] == 0) target_temp[1] += 1;
    else target_temp[1] -= 1;
  }

  /*
	place_to_cell(start_pos[0], start_pos[1]).classList.remove("start");
	place_to_cell(start_temp[0], start_temp[1]).classList.add("start");
	place_to_cell(target_pos[0], target_pos[1]).classList.remove("target");
	place_to_cell(target_temp[0], target_temp[1]).classList.add("target");
	start_pos = start_temp;
	target_pos = target_temp;
	*/
  grid_clean = false;

  if (document.querySelector("#slct_2").value == "1") {
    console.log("calling reandomized_depth_first");
    randomized_depth_first();
  } else if (document.querySelector("#slct_2").value == "2") {
    console.log("calling test_gen()");
    test_gen();
  }
}

// randomized_depth_first();
