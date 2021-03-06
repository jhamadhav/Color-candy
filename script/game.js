function play_game() {
  let home = document.getElementsByClassName("home");
  home[0].style.display = "none";
  let tab = document.getElementsByClassName("tab");
  tab[0].style.display = "none";
  let game = document.getElementsByClassName("container");
  game[0].style.display = "block";
  play_again();
}

function set_param() {
  music = document.getElementById("sound").checked;
  vibration = document.getElementById("vibra").checked;
  level = document.getElementById("level").value;

  switch (level) {
    case "easy":
      fps = 30;
      obs_angle_gap = Math.PI / 2;
      bet_gap = 120;

      break;

    case "medium":
      fps = 40;
      obs_angle_gap = Math.floor(Math.PI / 2 - Math.PI / 10);
      bet_gap = 100;
      break;

    case "hard":
      fps = 60;
      obs_angle_gap = Math.floor(Math.PI / 3);
      bet_gap = 100;
      break;
  }
}
function play_again() {
  document.getElementById("end_card").style.display = "none";
  canvas.style.filter = "blur(0)";
  reset_game();
  run = setInterval(draw, 1000 / fps);

  //music and vibration on click

  if (music) {
    let click = document.getElementById("click");
    let game_music = document.getElementById(level);
    game_music.currentTime = 0;
    game_music.play();
    click.currentTime = 0;
    click.play();
  }
}
function reset_game() {
  obstacle = [];
  set_param();
  score.easy = 0;
  score.medium = 0;
  score.hard = 0;
  score_keeper.innerText = 0;

  //making of initial obstacles
  obstacle[0] = new Obstacle(
    r + playerR + gap + 140,
    obs_angle_gap / 2,
    2 * Math.PI - obs_angle_gap / 2,
    "cyan"
  );
  while ((h > w ? h : w) > obstacle[obstacle.length - 1].r) {
    create_obs();
  }

  draw();
}

function game_end(level) {
  canvas.style.filter = "blur(5px)";
  document.getElementById("end_card").style.display = "flex";
  let level_show = document.getElementById("level_show");
  level_show.innerText = level;
  let hscore_show = document.getElementById("hscore_show");
  let score_show = document.getElementById("score_show");
  let msg = document.getElementById("msg");
  let temp;
  switch (level) {
    case "easy":
      if (score.easy >= hscore.easy) {
        hscore.easy = score.easy;
      }
      hscore_show.innerText = hscore.easy;
      score_show.innerText = score.easy;
      temp = score.easy;
      break;
    case "medium":
      if (score.medium >= hscore.medium) {
        hscore.medium = score.medium;
      }
      hscore_show.innerText = hscore.medium;
      score_show.innerText = score.medium;
      temp = score.medium;
      break;
    case "hard":
      if (score.hard >= hscore.hard) {
        hscore.hard = score.hard;
      }
      hscore_show.innerText = hscore.hard;
      score_show.innerText = score.hard;
      temp = score.hard;
      break;
  }
  if (temp < 40) {
    msg.innerText = "Try again !";
  } else {
    msg.innerText = "Play next level !";
    //music and vibration on winning
    if (music) {
      let win = document.getElementById("win");
      win.currentTime = 0;
      win.play();
      let game_music = document.getElementById(level);
      game_music.pause();
    }
  }

  //music and vibration
  if (music) {
    let lose = document.getElementById("lose");
    lose.currentTime = 0;
    lose.play();

    let game_music = document.getElementById(level);
    game_music.pause();
  }
  if (vibration) {
    window.navigator.vibrate(400);
  }
}
function main_menu() {
  let game = document.getElementsByClassName("container");

  document.getElementById("end_card").style.display = "none";
  game[0].style.display = "none";
  let home = document.getElementsByClassName("home");
  home[0].style.display = "flex";
  let tab = document.getElementsByClassName("tab");
  tab[0].style.display = "flex";

  //music and vibration on click
  if (music) {
    let click = document.getElementById("click");
    click.currentTime = 0;
    click.play();
  }
}
