function nav(x) {
  let tab = document.getElementsByClassName("tab");
  for (let i = 0; i < tab.length; i++) {
    tab[i].style.left = "-40px";
    tab[i].style.display = "none";
  }

  tab[0].style.left = 0;
  tab[0].style.display = "none";
  tab[x].style.left = 0;
  tab[x].style.display = "flex";
  //music and vibration on click
  if (music) {
    let click = document.getElementById("click");
    click.currentTime = 0;
    click.play();
  }
}

function animate_tabs() {
  let tab = document.getElementsByClassName("tab");
  for (let i = 0; i < tab.length; i++) {
    tab[i].style.left = "-40px";
    tab[i].style.display = "none";
  }
  tab[0].style.left = 0;
  tab[0].style.display = "flex";
  //music and vibration on click
  if (music) {
    let click = document.getElementById("click");
    click.currentTime = 0;
    click.play();
  }
}
