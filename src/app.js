import { mapListToDOMElements } from './domInteractions.js';

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

    console.log(this.showNameBtns);
  };

  setupListeners = () => {
    Object.keys(this.showNameBtns).forEach((showName) => {
      this.showNameBtns[showName].addEventListener(
        'click',
        this.setCurrentNameFilter
      );
    });
  };

  setCurrentNameFilter = () => {
    this.selectedName = event.target.dataset.showName;
  }
}

document.addEventListener('DOMContentLoaded', new TvApp());
