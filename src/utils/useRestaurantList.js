// import { useEffect, useState } from 'react';

// const useRestaurantMenu = (API_URL) => {

//     const [resturantList, setResturantList] = useState([]);
//     const [filteredResturant, setFilteredResturant] = useState([]);

//     useEffect(()=> {
//         fecthData();
//     },[API_URL]);

//     const fetchData = async () => {
//         const data = await fetch(API_URL);
//         const json = await data.json();
//         //console.log(json);
//         setResturantList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
//         setFilteredResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
//     };

//     return  { resturantList, filteredResturant, setFilteredResturant};

// };
// export default useRestaurantMenu;