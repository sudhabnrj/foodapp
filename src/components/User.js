import {Link} from 'react-router-dom';
import './user.css';
import GitHubIcon from '@mui/icons-material/GitHub';

const User = ({name, location, avatar_url, bio,company,email,public_repos, html_url  }) => {
    return(
        <>
            <div className="rounded-full bg-slate-300 border border-slate-400 w-1/4">
                <img src={avatar_url} alt="" className="rounded-full aspect-square object-cover" alt={name} />
            </div>
            <div className="flex flex-col bg-slate-100 dark:bg-slate-700 rounded-md w-[70%] p-5 shadow-md">
                <h2 className="text-2xl">{name}</h2>
                <h3>{bio}</h3>
                <p><strong>Company: </strong>{company}</p>
                <p><strong>Location: </strong>{location}</p>
                <p><strong>Email: </strong>{email}</p>
                <p><strong>Public repos: </strong>{public_repos}</p>
                <Link to={html_url} target="_blank"><GitHubIcon/></Link>
            </div>
        </>
    );
}
export default User;