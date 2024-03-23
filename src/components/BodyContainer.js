import ResturantCard from './ResturantCard.js';
import { REST_CARD_API } from '../utils/constents.js';
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer.js';
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
        const featureList = filteredResturant.filter((res)=> res.info.avgRating > 4.4);
        setFilteredResturant(featureList);
        //console.log(featureList);
    };

    if(resturantList.length === 0){
        return(
            <Shimmer/>
        )
    }

    const handleSearch = () => {
        const filteredResult = resturantList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));

        console.log(filteredResult);
        setFilteredResturant(filteredResult);
    }

    const onChangeHandler = (e) => {
        setSearchText(e.target.value);
        console.log(e.target.value);
    }


    return(
        <div className="body-container">
            <div className="container">
                <div className="filter-header d-flex justify-content-between">
                    <div className="search-filter">
                        <div className="search-container">
                            <input type="text" className="input-search" name="search" value={searchText} onChange={(e)=> {onChangeHandler(e)} } />
                            <button type="button" className="search-btn" onClick={()=> {handleSearch()}}>Search</button>
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