import { LOGO_URL } from '../utils/constents';
import {Link} from 'react-router-dom';
const Footer = () => {
    return(
      <footer className="w-full bg-stone-900 mt-20 py-4">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link to="/"><img className="w-28" src={LOGO_URL} /></Link>
            <p className="text-stone-200 text-center">Design and Developed by @<Link className="text-rose-600 ">Sudha Chandan Banerjee</Link></p>
          </div>
        </div>
      </footer>
    );
}

export default Footer;