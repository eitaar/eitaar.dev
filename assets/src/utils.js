function randInt() {
  return Math.floor(Math.random() * 100);
}
function openUrl(url) {
  window.open(url, "_blank");
};

export { randInt, openUrl };