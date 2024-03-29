//get query and listen to click event
class SearchView {
  _parentEl = document.querySelector(`.search`);

  getQuery() {
    const query = this._parentEl.querySelector(`.search__field`).value;
    this._clearInput();
    return query;
  }

  //clear input after search
  _clearInput() {
    this._parentEl.querySelector(`.search__field`).value = '';
  }

  //pake publisher subscriber pattern
  //handler search = publisher
  //control search = subscriber
  addHandlerSearch(handler) {
    this._parentEl.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
