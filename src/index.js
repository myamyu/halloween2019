const d = document;

const svgDom = (str) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(str, 'image/svg+xml');
  return dom.childNodes[0];
};

const halloween = () => {
  const div = d.createElement('div');
  div.style = 'display:none;';
  d.getElementsByTagName('body')[0].appendChild(div);

  div.appendChild(svgDom(require('../assets/svg/ghost.svg')));
  div.appendChild(svgDom(require('../assets/svg/pumpkin.svg')));
  div.appendChild(svgDom(require('../assets/svg/pumpkin2.svg')));
};

(() => {
  try {
    if (d.readyState === "complete") {
      halloween();
      return;
    }
  } catch (e) {
    console.error('ごめん。エラー。', e);
  };

  d.addEventListener('readystatechange', () => {
    if (d.readyState === "complete") {
      halloween();
    }
  });
})();
