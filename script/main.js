var canvas, ctx, h, w, game_stop, run, score_keeper;
var angle = 0;
var fps = 60;
var r = 50,
  playerR = r / 4,
  gap = 22;
var obs_width = 20,
  obs_angle_gap,
  bet_gap;
var obstacle = [];
var colors = [
  "#F25652",
  "#3E4E59",
  "#903B42",
  "#00ADA9",
  "#FFC636",
  "darkpink"
];
var bg;
var music, vibration, level;
var hscore = { easy: 0, medium: 0, hard: 0 },
  score = { easy: 0, medium: 0, hard: 0 };

/* event listeners  */

//function to change visual when window is resized and on loading
window.addEventListener("load", init);
window.addEventListener("resize", init);

// control player by mousemovement
window.onmousemove = function(e) {
  e.preventDefault();
  angle = (e.clientY / (h / 3)) * 2 * Math.PI;
};
window.ontouchmove = function(e) {
  e.preventDefault();
  angle = (e.touches[e.touches.length - 1].pageY / (h / 3)) * 2 * Math.PI;
};

// initial function
function init() {
  //establishing some stuff
  score_keeper = document.getElementById("score_keeper");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  h = canvas.height = window.innerHeight;
  w = canvas.width = window.innerWidth;
  ctx.translate(w / 2, h / 2);

  //to set background image and paint the canvas
  ctx.rect(-w / 2, -h / 2, w, h, "#262626");
  ctx.fill();
  bg = new Image();
  bg.src = "color-candy_img/game_backdround.jpg";
  bg.onload = function() {
    ctx.drawImage(bg, -w / 2, -h / 2, w, h);

    //to cut off the loader once it is loaded
    document.getElementById("cont").style.display = "none";
  };

  //game functions
  reset_game();

  //events for animating back button
  let back = document.getElementsByClassName("back_icon");
  for (let i = 0; i < back.length; i++) {
    back[i].addEventListener("click", animate_tabs);
  }
}

//function to draw
function draw() {
  //to paint the whole canvas
  ctx.rect(-w / 2, -h / 2, w, h, "#262626");
  ctx.fill();
  ctx.drawImage(bg, -w / 2, -h / 2, w, h);

  //to update obstacles
  for (let i = 0; i < obstacle.length; i++) {
    if (obstacle[i].r > r - obs_width) {
      obstacle[i].update();
      obstacle[i].draw();
    }
    obstacle[i].coll();
  }
  if (obstacle[0].r < r) {
    switch (level) {
      case "easy":
        score.easy++;
        score_keeper.innerText = score.easy;
        if (score_keeper.value == 40) {
          level = medium;
          game_end();
        }
        break;
      case "medium":
        score.medium++;
        score_keeper.innerText = score.medium;
        if (score_keeper.value == 40) {
          level = hard;
          game_end();
        }
        break;
      case "hard":
        score.hard++;
        score_keeper.innerText = score.hard;
        if (score_keeper.value == 40) {
          level = easy;
          game_end();
          if (score.easy == 40 && score.medium == 40 && score.hard == 40) {
            document.getElementById("msg").innerText =
              "Yay!! Candy land is safe now ! wanna restart ?";
          }
        }
        break;
    }
    create_obs();
    obstacle.shift();
  }
  let x = (r + gap) * Math.cos(angle);
  let y = (r + gap) * Math.sin(angle);
  game_stop = r + gap + 2 * playerR;

  //player circle
  draw_circle(x, y, playerR, 0, 2 * Math.PI, "#262626", "cyan", 0);
}

function create_obs() {
  let obs_r = obstacle[obstacle.length - 1].r + bet_gap;
  let ran = Math.floor(Math.random() * colors.length);
  let v1 = Math.floor(Math.random() * 2 * Math.PI);
  let angle1 = (obs_angle_gap / 2 + v1) % (2 * Math.PI);
  let angle2 = (2 * Math.PI - obs_angle_gap / 2 + v1) % (2 * Math.PI);
  let ob = new Obstacle(obs_r, angle1, angle2, colors[ran]);
  obstacle.push(ob);
}

//to draw circles
function draw_circle(
  x,
  y,
  radius,
  angle_from,
  angle_to,
  fill_color,
  stroke_color,
  line_width
) {
  ctx.beginPath();
  ctx.fillStyle = fill_color;
  ctx.strokeStyle = stroke_color;
  ctx.lineWidth = line_width;
  ctx.lineCap = "round";
  ctx.arc(x, y, radius, angle_from, angle_to, false);
  ctx.fill();
  if (line_width != 0) {
    ctx.stroke();
  }

  ctx.closePath();
}

/* View in fullscreen */
function openFullscreen() {
  var elem = document.documentElement;
  if (document.fullscreenElement == null) {
    // it's  not fullscreen so make it
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  } else {
    // if fullscreen then exit it!
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}
