import Search from './models/Search';
import * as searchView from './views/searchView';
import {DOMelements, renderLoader, clearLoader} from './views/base'; 
const state = {};

const searchControl = async () => {
    const query = searchView.getInput();
    console.log(query);
    if (query){
        state.search = new Search(query);

        searchView.clearPrevInfo();
        renderLoader(DOMelements.results);
        await state.search.getResults();
        clearLoader();
        console.log(state.search.result);
        searchView.displayRecipes(state.search.result);
    }
}
DOMelements.searchForm.addEventListener('submit',element => {
    element.preventDefault();
    searchControl();
});
//const search = new Search('pizza');



