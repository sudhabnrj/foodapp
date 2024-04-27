import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ListItem from './ListItem';
import { useState } from 'react';

const RestaurantsCategory = ({data, showItems, setShowIndex}) => {
    
    const handleClick = () => {
        setShowIndex();
        //console.log(!showItems);
    };
    return(
        <>
            <div className="pb-6 mt-5 mb-6 border-b-8 border-stone-200 dark:border-slate-800">
                <h2 className="w-full text-lg sm:text-2xl font-bold">
                    <button className="flex justify-between w-full items-center text-left" onClick={handleClick} type="button">
                        <span>{data.title} ({data.itemCards.length})</span>
                        {showItems === false ? <KeyboardArrowDownOutlinedIcon/> : <KeyboardArrowUpOutlinedIcon/>}
                        
                    </button>
                </h2>
                {showItems && <ListItem items={data.itemCards}/>}                
            </div>
        </>
    );
}

export default RestaurantsCategory;