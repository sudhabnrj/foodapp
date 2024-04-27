const Banner = () => {
    return(
        <div className="sm:h-[300px] rounded-b-xl bg-gradient-to-b from-white to-slate-200 dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-800 mb-10">
            <div role="banner" className="container mx-auto px-4 lg:px-0">
                <div className="flex sm:flex-row flex-col items-center justify-between">
                    <div className=" pb-8 sm:pb-0">
                        <h1 className="text-slate-700 dark:text-slate-100 text-4xl lg:text-6xl font-black 
                        text-center sm:text-left pt-8 lg:pt-0">Restaurants <br/>Near Me</h1>
                    </div>
                    <div className="">
                        <img className="" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1002,h_600/v1678428358/portal/m/seo_web/dweb_header.png" width="501" height="300" alt="food" />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Banner;