function nav(x) {
  let tab = document.getElementsByClassName("tab");
  for (let i = 0; i < tab.length; i++) {
    tab[i].style.left = "-40px";
    tab[i].style.visibility = "hidden";
  }

  tab[0].style.left = "0";
  tab[0].style.visibility = "hidden";
  tab[x].style.left = 0;
  tab[x].style.visibility = "visible";
  //music and vibration on click
  if (music) {
    let click = document.getElementById("click");
    click.currentTime = 0;
    click.play();
  }
}

function animate_tabs() {
  let tab = document.getElementsByClassName("tab");
  for (let i = 1; i < tab.length; i++) {
    tab[i].style.left = "-40px";
    tab[i].style.visibility = "hidden";
  }
  tab[0].style.left = "0";
  tab[0].style.visibility = "visible";
  //music and vibration on click
  if (music) {
    let click = document.getElementById("click");
    click.currentTime = 0;
    click.play();
  }
}
