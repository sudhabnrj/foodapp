import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
const NextArrow = ({ onClick }) => {
    return(
        <div className="bg-gray-300 dark:bg-slate-700 rounded-full w-8 h-8 text-slate-700 dark:text-slate-200 
        block cursor-pointer absolute top-[-50px] right-0" onClick={onClick}>
            <div className="flex justify-center items-center w-8 h-8">
                <ArrowForwardOutlinedIcon/>
            </div>
        </div>
    );
}
export default NextArrow;