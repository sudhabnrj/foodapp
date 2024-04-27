import { useState, useEffect } from 'react';
import { REST_CARD_API } from '../utils/constents.js';

const useCatCarousel = () => {

    const [originalCatCarousel, setOriginalCatCarousel] = useState([]);
    
    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const data = await fetch(REST_CARD_API);
            const json = await data.json();
            const cards = json?.data?.cards;
            //console.log(cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
            setOriginalCatCarousel(cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);

            //console.log(cards[0]?.card?.card?.gridElements?.infoWithStyle?.info[0]?.imageId);
        }
        catch(error){
            console.error('Error fetching data', error);
        }
    }

    return originalCatCarousel;
}