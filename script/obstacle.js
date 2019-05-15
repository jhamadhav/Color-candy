function Obstacle(r, a1, a2, color) {
  this.r = r;
  this.a1 = a1;
  this.a2 = a2;
  this.color = color;

  this.draw = function() {
    draw_circle(
      0,
      0,
      this.r,
      this.a1,
      this.a2,
      "transparent",
      this.color,
      obs_width
    );
  };

  this.update = function() {
    if (this.r > 0) {
      this.r -= 1.5;
    }
  };

  this.coll = function() {
    if (this.r <= game_stop) {
      let p = {
        x: game_stop * Math.cos(angle),
        y: game_stop * Math.sin(angle)
      };
      let a = {
        x: game_stop * Math.cos(this.a1),
        y: game_stop * Math.sin(this.a1)
      };
      let b = {
        x: game_stop * Math.cos(this.a2),
        y: game_stop * Math.sin(this.a2)
      };
      //console.log(get_dis(p, a) + get_dis(p, b));
      if (get_dis(a, b) < get_dis(p, a) + get_dis(p, b) - 15) {
        clearInterval(run);
        game_end(level);
      }
    }
  };
}

function get_dis(a, b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}
