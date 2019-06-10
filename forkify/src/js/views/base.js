export const DOMelements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    result_list: document.querySelector('.results__list'),
    results: document.querySelector('.results')
};
export const renderLoader = parent => {
    const loader = `<div class= "loader">
    <svg>
        <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if(loader)
        loader.parentElement.removeChild(loader);

}