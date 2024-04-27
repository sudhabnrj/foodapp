import { LOGO_URL } from '../utils/constents';
import {Link} from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
    return(
      <footer className="w-full bg-stone-900 dark:bg-slate-800 mt-20 py-4">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link to="/"><img className="w-28" src={LOGO_URL} alt="Shopee Food" /></Link>
            <div className="flex justify-start items-center">
              <p className="text-stone-200 text-center mr-4">Design and Developed by @<Link className="text-rose-600 ">Sudha Chandan Banerjee</Link></p>
              <Link to="https://github.com/sudhabnrj" target="_blank" className="mr-4"><GitHubIcon className="text-slate-300 dark:text-slate-50" /></Link>
              <Link to="https://www.linkedin.com/in/sudhachandan-banerjee" target="_blank"><LinkedInIcon className="text-slate-300 dark:text-slate-50" /></Link>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;