import View from './View';
import icons from 'url:../../img/icons.svg'; //parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn--inline`);

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  //untuk render dan generate markup, setiap view, butuh generate Markup
  _generateMarkup() {
    //cara tau number of pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = this._data.page;

    //page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
    }
    //last page
    if (currPage === numPages && numPages > 1) {
      return `
    <button data-goto="${
      currPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>page ${currPage - 1}</span>
    </button>`;
    }
    // other page
    if (currPage < numPages) {
      return `<button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>page ${currPage - 1}</span>
  </button>
  <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span>page ${currPage + 1}</span>
    </button>
  `;
    }

    //page 1, no other pages
    return ``;
  }
}

export default new PaginationView();
