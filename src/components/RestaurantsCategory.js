import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ListItem from './ListItem';
import { useState } from 'react';

const RestaurantsCategory = ({data}) => {
    const [toggleAccordian, setToggleAccordian] = useState(false);
    const handleClick = () => {
        setToggleAccordian(!toggleAccordian);
        console.log('clicked!');
    };
    //console.log(data.itemCards);
    return(
        <>
            <div className="pb-6 mt-5 mb-6 border-b-8 border-stone-200 dark:border-slate-800">
                <h2 className="w-full text-lg sm:text-2xl font-bold">
                    <button className="flex justify-between w-full items-center text-left" onClick={handleClick} type="button">
                        <span>{data.title} ({data.itemCards.length})</span>
                        {toggleAccordian === false ? <KeyboardArrowDownOutlinedIcon/> : <KeyboardArrowUpOutlinedIcon/>}
                        
                    </button>
                </h2>
                {toggleAccordian && <ListItem items={data.itemCards}/>}                
            </div>
        </>
    );
}

export default RestaurantsCategory;