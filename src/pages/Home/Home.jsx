import Banner from "./Banner";
import PopularItems from "./PopularItems/PopularItems";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Banner />
            <PopularItems/>
        </div>
    );
};

export default Home;