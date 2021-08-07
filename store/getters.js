const getters = {
    getRecentSearches: (state) => {
        return state.recentSearches
    },
    getSearchWord: (state) => {
        return state.searchWord
    },
    getSearchResult: (state) => {
        return state.searchResult
    },
}

export default getters