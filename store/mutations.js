const mutations = {
    UPDATE_SEARCH_WORD: (state, payload) => {
        state.searchWord = payload;
    },
    UPDATE_RECENT_SEARCHES: (state, payload) => {
        state.recentSearches= payload;
    },
    UPDATE_SEARCH_RESULT: (state, payload) => {
        state.searchResult = payload;
    },
    SORT_RECENT_SEARCHES: (state) => {
        state.recentSearches.sort((a,b) => b-a)
    }
}

export default mutations