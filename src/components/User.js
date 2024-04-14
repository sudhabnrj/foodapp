import {Link} from 'react-router-dom';
import './user.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const User = ({name, location, avatar_url, bio,company,email,public_repos, html_url, linkedin_url, following, followers }) => {
    return(
        <>
            <div className="rounded-full bg-slate-300 border border-slate-400 w-1/4 mb-5 sm:mb-0">
                <img src={avatar_url} alt="" className="rounded-full aspect-square object-cover" alt={name} />
            </div>
            <div className="flex flex-col bg-slate-100 dark:bg-slate-700 rounded-md w-full sm:w-[70%] p-5 shadow-md">
                <h2 className="text-2xl">{name}</h2>
                <p className='text-slate-200'>{bio}</p>
                <p><strong>Company: </strong><span className='text-slate-400'>{company}</span></p>
                <p><strong>Location: </strong><span className='text-slate-400'>{location}</span></p>
                <p><strong>Email: </strong><span className='text-slate-400'>{email}</span></p>
                <p><strong>Public repos: </strong><span className='text-slate-400'>{public_repos}</span></p>
                <div className='flex justify-start gap-1'>
                    <Link to={html_url} target="_blank"><GitHubIcon/></Link>
                    <Link to={linkedin_url} target="_blank"><LinkedInIcon/></Link>
                </div>
            </div>
        </>
    );
}
export default User;