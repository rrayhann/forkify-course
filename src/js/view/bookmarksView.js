import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; //parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `No bookmarks yet, find a nice recipce and bookmark it :)`;
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join(``);
  }
}

export default new BookmarksView();
