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

//Load the font
async function loadFonts(fonts) {
  (function () {
    const wf = document.createElement('script');
    wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
      }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = 'text/javascript';
    wf.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
  window.WebFontConfig = {
    google: {
      families: fonts,
    },
  };
}

export { randInt, openUrl, hexToRgb, loadFonts };