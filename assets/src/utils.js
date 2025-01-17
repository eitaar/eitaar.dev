function randInt() {
  return Math.floor(Math.random() * 100);
}
function openUrl(url) {
  window.open(url, "_blank");
};

function hexToRgb(hex){
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const [r, g, b] = [0, 2, 4].map(offset => parseInt(hex.slice(offset, offset + 2), 16));
  return { r, g, b };
};
export { randInt, openUrl, hexToRgb };