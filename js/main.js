(() => {
  const leaflet = document.querySelector('.leaflet');
  const pageElems = document.querySelectorAll('.page');
  let pageCount = 0;

  function getTarget(elem, className) {
    while (!elem.classList.contains(className)) {
      elem = elem.parentNode;

      if (elem.nodeName == 'BODY') {
        elem = null;
        return;
      }
    }

    return elem;
  }

  function closeLeaflet() {
    pageCount = 0;
    document.body.classList.remove('leaflet-opened');
    pageElems[2].classList.remove('page-flipped');
    setTimeout(() => {
      pageElems[0].classList.remove('page-flipped');
    }, 500);
  }

  function zoomIn(elem) {
    const rect = elem.getBoundingClientRect();
    const dx = window.innerWidth / 2 - (rect.x + rect.width / 2);
    const dy = window.innerHeight / 2 - (rect.y + rect.height / 2);
    let angle;

    switch(elem.parentNode.parentNode.parentNode.dataset.page * 1) {
      case 1:
        angle = -30;
        break;
      case 2:
        angle = 0;
        break;
      case 3:
        angle = 30;
        break;
    }
    console.log(elem.parentNode.parentNode.parentNode.dataset.page);
    leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg)`;
  }

  leaflet.addEventListener('click', (e) => {
    let pageElem = getTarget(e.target, 'page');
    if (pageElem) {
      pageElem.classList.add('page-flipped');
      pageCount++;

      if (pageCount == 2) {
        document.body.classList.add('leaflet-opened');
      }
    }

    let closeBtnElem = getTarget(e.target, 'close-btn');
    if (closeBtnElem) {
      closeLeaflet();
    }

    let menuItemElem = getTarget(e.target, 'menu-item');
    if (menuItemElem) {
      zoomIn(menuItemElem);
    }
  });
})();
