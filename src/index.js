const d = document;

const svgDom = (str) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(str, 'image/svg+xml');
  return dom.childNodes[0];
};

const halloween = () => {
  require('./halloween.css');
  const body = d.getElementsByTagName('body')[0];
  const div = d.createElement('div');
  div.style = 'display:none;';
  body.appendChild(div);

  div.appendChild(svgDom(require('../assets/svg/ghost.svg')));
  div.appendChild(svgDom(require('../assets/svg/pumpkin.svg')));
  div.appendChild(svgDom(require('../assets/svg/pumpkin2.svg')));
  div.appendChild(svgDom(require('../assets/svg/happy-halloween.svg')));

  body.appendChild(svgDom(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 320 320" class="moving-ghost">
      <use xlink:href="#ghost" class="halloween-ghost halloween-ghost-jack">
        <animateMotion 
          dur="30s" repeatCount="indefinite">
          <mpath xlink:href="#happyPath" />
        </animateMotion>
      </use>
      <use xlink:href="#ghost" class="halloween-ghost halloween-ghost-will">
        <animateMotion 
          dur="50s" repeatCount="indefinite">
          <mpath xlink:href="#halloweenPath" />
        </animateMotion>
      </use>
    </svg>`));

  // listの頭にカボチャ
  const lis = d.getElementsByTagName('li');
  const pumpkins = ['pumpkin', 'pumpkin2'];
  Array.from(lis).forEach((li) => {
    const pumpkinDom = svgDom(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 320 280"
      class="halloween-pumpkin">
        <use xlink:href="#${pumpkins[0|Math.random()*pumpkins.length]}" />
      </svg>`);
    li.insertBefore(pumpkinDom, li.firstChild);
  });

  // hタグの後ろにカボチャ
  const hs = d.querySelectorAll('h1,h2,h3,h4,h5,h6');
  Array.from(hs).forEach((h) => {
    const pumpkinDom = svgDom(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 480 320"
      class="halloween-pumpkins">
        <use xlink:href="#${pumpkins[0|Math.random()*pumpkins.length]}"
          x="0" y="0" />
        <use xlink:href="#${pumpkins[0|Math.random()*pumpkins.length]}"
          transform="scale(0.7)"
          x="220" y="160" />
      </svg>`);
    h.appendChild(pumpkinDom);
  });
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
