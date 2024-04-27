import { SINGLE_IMAGE } from '../utils/constents.js';
import { Link } from 'react-router-dom';
const CategoryCarousel = ({src, name}) => {
    
    return(
        <div className="p-0" aria-label={name}>
            <img className="rounded-lg w-[140px] border border-stone-300 dark:border-slate-700" src={SINGLE_IMAGE + src} alt={name} />
        </div>
        
    );
};

export default CategoryCarousel;