import ResturantCard from './ResturantCard.js';
import { REST_CARD_API } from '../utils/constents.js';
import { useState, useEffect } from 'react';
import Shimmer from '../components/Shimmer.js';
import { Link } from 'react-router-dom';
// import Search from './Search.js';


const BodyContainer = () => {

   const [resturantList, setResturantList] = useState([]);

   const [filteredResturant, setFilteredResturant] = useState([]);

   const [searchText, setSearchText] = useState('');
    
    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(REST_CARD_API);

        const json = await data.json();

        //console.log(json);
        setResturantList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const handleFilter = () => {
        const featureList = resturantList.filter((res)=> res.info.avgRating > 4.2);
        setFilteredResturant(featureList);
        //console.log(featureList);
    };

    

    //Onclick Search Function
    // const handleSearch = () => {
    //     const filteredResult = resturantList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));

    //     console.log(filteredResult);
    //     setFilteredResturant(filteredResult);
    // }

    //On Change Search Function
    const onChangeHandler = (e) => {
        const inputValue = e.target.value;
        setSearchText(inputValue);

        if(inputValue.trim() === '' && inputValue.length === 0) {
            setFilteredResturant(resturantList);
        }else{
            const filteredResult = resturantList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
            console.log(filteredResult);
            setFilteredResturant(filteredResult);
        }
    };

    const clearSearch = () => {
        setSearchText('');
        setFilteredResturant(resturantList);
    };

    if(resturantList.length === 0){
        return(
            <Shimmer/>
        );
    };

    return(
        <div className="body-container">
            <div className="container">
                <div className="filter-header d-flex justify-content-between">
                    <div className="search-filter">
                        <div className="search-container">
                            <input type="text" className="input-search" name="search" value={searchText} onChange={(e)=> {onChangeHandler(e)} } placeholder='Search Restaurants...' />
                            {searchText? (
                                <button className="search-btn btn-icon clear-btn" onClick={clearSearch}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                    </svg>
                                </button>
                            ): (
                                <button className="search-btn btn-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="filter-container">Filter: 
                        <button className="filter-btn" type="button" onClick={()=> handleFilter()}>
                            Top Resturants
                        </button>
                    </div>
                </div>
                <div className="">
                    <h2 className="title h2-title">Top restaurant chains in Kolkata</h2>
                    <div className="res-container">                        
                        {
                          filteredResturant.map(resturants => (
                            <Link key={resturants.info.id} to={"/restaurants/" + resturants.info.id}><ResturantCard resData={resturants} /></Link>
                          ))  
                        }                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyContainer;