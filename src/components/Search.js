import React from 'react';
const Search = ({ searchText, onChangeHandler, clearSearch }) => {
    return(
        <div className="w-full sm:w-96 mb-3 lg:mb-0">
            <div className="flex items-stretch justify-between relative">
                <input type="text" className="bg-white dark:bg-slate-800 border border-solid border-stone-300 dark:border-slate-700 outline-none px-4 py-2 w-full rounded-s" name="search" value={searchText} onChange={onChangeHandler} placeholder='Search Restaurants...' />
                {searchText? (
                    <button className="text-red-500 absolute top-1/2 right-4 -translate-y-1/2" onClick={clearSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                ): (
                    <button className="text-red-500 absolute top-1/2 right-4 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Search;