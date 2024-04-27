import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
const PrevArrow = ({ onClick }) => {
    return(
        <div className="bg-gray-300 dark:bg-slate-700 rounded-full w-8 h-8 text-slate-700 dark:text-slate-200 
        block cursor-pointer absolute top-[-50px] right-10" onClick={onClick}>
            <div className="flex justify-center items-center w-8 h-8">
                <ArrowBackOutlinedIcon/>
            </div>
        </div>
    );
};
export default PrevArrow;