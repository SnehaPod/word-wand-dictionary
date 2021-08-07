const actions = {
    updateSearchWord: ({commit}, payload) => {
        commit('UPDATE_SEARCH_WORD', payload);
    },
    updateRecentSearches: ({commit}, payload) => {
        commit('UPDATE_RECENT_SEARCHES', payload);
    },
    updateSearchResult: ({commit}, payload) => {
        commit('UPDATE_SEARCH_RESULT',payload);
    },
    sortRecentSearches: ({commit}) => {
        commit('SORT_RECENT_SEARCHES');
    }
}

export default actions