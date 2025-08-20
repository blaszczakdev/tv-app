import { mapListToDOMElements, createDOMElem } from './domInteractions.js';
import { getShowsByKey } from './request.js';

class TvApp {
  constructor() {
    this.viewElems = {};
    this.showNameBtns = {};
    this.selectedName = 'harry';
    this.initializeApp();
  }

  initializeApp = () => {
    this.connectDOMElements();
    this.setupListeners();
    this.fetchAndDisplayShows();
  };

  connectDOMElements = () => {
    const listOfIds = Array.from(document.querySelectorAll('[id]')).map(
      (elem) => elem.id
    );
    const listOfShowNames = Array.from(
      document.querySelectorAll('[data-show-name]')
    ).map((elem) => elem.dataset.showName);

    this.viewElems = mapListToDOMElements(listOfIds, 'id');
    this.showNameBtns = mapListToDOMElements(listOfShowNames, 'data-show-name');
  };

  setupListeners = () => {
    Object.keys(this.showNameBtns).forEach((showName) => {
      this.showNameBtns[showName].addEventListener(
        'click',
        this.setCurrentNameFilter
      );
    });
  };

  setCurrentNameFilter = (event) => {
    this.selectedName = event.target.dataset.showName;
    this.fetchAndDisplayShows();
  };

  fetchAndDisplayShows = () => {
    getShowsByKey(this.selectedName).then((shows) => this.renderCards(shows));
  };

  renderCards = (shows) => {
    for (const { show } of shows) {
      this.createShowCard(show);
    }
  };

  createShowCard = (show) => {
    const divCard = createDOMElem('div', 'card');
    const divCardBody = createDOMElem('div', 'card-body');

    if (show.image?.medium) {
      const img = createDOMElem('img', 'card-img-top', null, show.image.medium);
      divCard.appendChild(img);
    }

    const h5 = createDOMElem('h5', 'card-title', show.name);
    divCardBody.appendChild(h5);

    if (show.summary) {
      const p = createDOMElem('p', 'card-text', show.summary);
      divCardBody.appendChild(p);
    }

    const btn = createDOMElem('button', 'btn btn-primary', 'Show details');
    divCardBody.appendChild(btn);

    divCard.appendChild(divCardBody);
    this.viewElems.showsWrapper.appendChild(divCard);
  };
}

document.addEventListener('DOMContentLoaded', new TvApp());
