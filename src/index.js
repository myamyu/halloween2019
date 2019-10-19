const d = document;
const myClass = 'myamyu-halloween-2019';

const svgDom = (str) => {
  const parser = new DOMParser();
  const domRoot = parser.parseFromString(str, 'image/svg+xml');
  const dom = domRoot.childNodes[0];
  dom.classList.add(myClass);
  return dom;
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
  div.appendChild(svgDom(require('../assets/svg/halloween-bg.svg')));

  // 背景
  body.appendChild(svgDom(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 320 320" class="halloween-bg">
      <defs>
        <linearGradient id="BGGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="rgb(4, 0, 8)" />
          <stop offset="30%" stop-color="rgb(10, 0, 20)" />
          <stop offset="100%" stop-color="rgb(108, 47, 138)" />
        </linearGradient>
      </defs>
      <use xlink:href="#halloweenBG" />
    </svg>`));

  // お化け動くよ
  const movingGhost = svgDom(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 320 320" class="moving-ghost">
    <g class="halloween-ghost-jack">
      <use xlink:href="#ghost" class="halloween-ghost" />
      <animateMotion 
        dur="100s" repeatCount="indefinite">
        <mpath xlink:href="#happyPath" />
      </animateMotion>
    </g>
    <g class="halloween-ghost-will">
      <use xlink:href="#ghost" class="halloween-ghost" />
      <animateMotion
        dur="140s" repeatCount="indefinite">
        <mpath xlink:href="#halloweenPath" />
      </animateMotion>
    </g>
  </svg>`);
  body.appendChild(movingGhost);

  movingGhost.addEventListener('click', () => {
    const es = d.querySelectorAll(`.${myClass}`);
    es.forEach((e) => {
      e.parentNode.removeChild(e);
    });
  });

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
