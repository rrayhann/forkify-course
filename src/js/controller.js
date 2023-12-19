import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

import 'core-js/stable'; //polyfill async await
import 'regenerator-runtime/runtime'; //polyfill everything else
import { async } from 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// 1. loading recipe
const controlRecipes = async function () {
  try {
    //buat id
    const id = window.location.hash.slice(1);
    // console.log(id);
    //guard clause kalo gaada id
    if (!id) return;
    recipeView.renderSpinner();

    // 0) update results view, mark selected search results
    resultsView.update(model.getSearchResultsPage());

    // 1. render recipe
    await model.loadRecipe(id);

    // 2. rendering recipe
    recipeView.update(model.state.recipe);

    // console.log(data, recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
//call search results part 1
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) load search query
    await model.loadSearchResults(query);

    //3) render search results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    //4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1) render new results
  // resultsView.render(model.state.search.results)
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);

  //update the recipe view
  // recipeView.render(model.state.recipe);
  //update itu cuma update text ke dom biar ga kebanyakan render yg lain
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
