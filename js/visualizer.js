"use strict";

console.log("::: visualizer Loaded::: ");

function generate_grid() {
  grid_size_x = 40;
  grid_size_y = 40;

  // create new table and assign "my_table" id to table;
  let table = document.createElement("table");
  table.id = "my_table";

  for (let i = 0; i < grid_size_y; i++) {
    // create a new table row
    let row = document.createElement("tr");
    for (let j = 0; j < grid_size_x; j++) {
      // create a new table data;
      let cell = document.createElement("td");
      let class_name = "";

      if ((i + j) % 2 == 0) {
        class_name = "cell cell_1"; 
      } else {
        class_name = "cell cell_2";
      }

      class_name += " x_" + j.toString(10) + " y_" + i.toString(10);
      cell.className = class_name;

      row.append(cell);
    }

    table.appendChild(row);
  }

  document.querySelector("#grid").appendChild(table); 

  grid = new Array(grid_size_x)
    .fill(0)
    .map(() => new Array(grid_size_y).fill(0)); 

  start_pos = [Math.floor(grid_size_x / 4), Math.floor(grid_size_y / 2)];


  target_pos = [Math.floor((3 * grid_size_x) / 4), Math.floor(grid_size_y / 2)];

 

  // adjust start pos, targe pos, in odd.
  if (start_pos[0] % 2 == 0) {
    start_pos[0] += 1;
  }
  if (start_pos[1] % 2 == 0) {
    start_pos[1] -= 1;
  }

  if (target_pos[0] % 2 == 0) {
    target_pos[0] += 1;
  }
  if (target_pos[1] % 2 == 0) {
    target_pos[1] -= 1;
  }

  // place the :start point:
  place_to_cell(start_pos[0], start_pos[1]).classList.add("start"); 

  // place the :target poing:
  place_to_cell(target_pos[0], target_pos[1]).classList.add("target"); 
}

// to place the element;
function place_to_cell(x, y) {
  return document.querySelector(
    ".x_" + x.toString(10) + ".y_" + y.toString(10)
  );
}

function delete_grid() {
  document.querySelector("#my_table").remove();
}

function cell_to_place(cell) {
  let text_x = cell.classList[2];
  let text_y = cell.classList[3];

  console.log("cell = " + cell);

  text_x = text_x.split("x_")[1];
  text_y = text_y.split("y_")[1];

  return [parseInt(text_x, 10), parseInt(text_y, 10)];
}

// adding wall;
function add_wall(x, y) {
  let cell = place_to_cell(x, y);

  if (!cell.classList.contains("start") && !cell.classList.contains("target")) {
    grid[x][y] = -1;

    cell.classList.add("cell_wall");
  }
}

// removing wall;
function remove_wall(x, y) {
  grid[x][y] = 0;
  place_to_cell(x, y).classList.remove("cell_wall");
}

function clear_grid() {
  if (!grid_clean) {
    for (let i = 0; i < timeouts.length; i++) clearTimeout(timeouts[i]);

    timeouts = [];
    clearInterval(my_interval);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] > -1) {
          remove_wall(i, j);
          
          place_to_cell(i, j).classList.remove("cell_algo");
          place_to_cell(i, j).classList.remove("cell_path");
        } else if (grid[i][j] < -1) {
          add_wall(i, j); 
        }

        // remove visisted_cell
        place_to_cell(i, j).classList.remove("visited_cell");
      }
    }
    grid_clean = true; 
  }
}

function get_node(x, y) {
  if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
    return grid[x][y];
  }
  return -2;
}

function click_event(event) {
 
  event.preventDefault();

  if (clicking && event.target.classList.contains("cell")) {
    clear_grid(); 
    let place = cell_to_place(event.target); 
    console.log("targed node: " + place);

    

    if (moving_start && !event.target.classList.contains("target")) {
      start_pos = place; 

      document.querySelector(".start").classList.remove("start");
      event.target.classList.add("start"); 

      if (grid[place[0]][place[1]] < 0) {
        document.querySelector("#slct_2").value = "0"; 
        remove_wall(place[0], place[1]); 
      }

      if (generating) {
        
        document.querySelector("#slct_2").value = "0";
      }
      generating = false;
    } else if (moving_target && !event.target.classList.contains("start")) {
      target_pos = place;
      document.querySelector(".target").classList.remove("target");
      event.target.classList.add("target");

      if (grid[place[0]][place[1]] < 0) {
        document.querySelector("#slct_2").value = "0";
        remove_wall(place[0], place[1]);
      }

      if (generating) {
        document.querySelector("#slct_2").value = "0";
      }

      generating = false;
    } else {
      document.querySelector("#slct_2").value = "0";

      if (grid[place[0]][place[1]] == 0) {
        add_wall(place[0], place[1]);
      } else {
        remove_wall(place[0], place[1]);
      }
    }
  }
}

function visualizer_event_listeners() {
  document.querySelector("#my_table").addEventListener("mousedown", (event) => {
    event.preventDefault();
    clicking = true;

    if (event.target.classList.contains("start")) moving_start = true;

    if (event.target.classList.contains("target")) moving_target = true;

    click_event(event);
  });

  document.querySelector("#my_table").addEventListener("mouseup", (event) => {
    event.preventDefault();
    clicking = false;
    moving_start = false;
    moving_target = false;
  });

  document.querySelector("#my_table").addEventListener("mouseover", (event) => {
    click_event(event);
  });

  document
    .querySelector("#my_table")
    .addEventListener("mouseleave", (event) => {
      event.preventDefault();
      clicking = false;
      moving_start = false;
      moving_target = false;
    });
}

