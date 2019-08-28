function setRem() {
  const scale = document.documentElement.clientWidth / 10;
  document.documentElement.style.fontSize = scale + "px";
}
setRem();
window.onresize = function () {
  setRem();
};