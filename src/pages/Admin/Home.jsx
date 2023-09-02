import DetailBox from "../../components/admin/DashboardBox";
import Navbar from "../../components/admin/Navbar";


const Home =  () => {
    return(
        <>
        <Navbar/>
        <div className="flex">
        <DetailBox/>

        </div>
        </>
    )
}


export default Home;