import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import Main from "../../components/Main";
import ReviewList from "../../components/Reviewlist";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";


 
export function HomePage() {
return (
    <div className="overflow-x-hidden">
      <Navbar/>
      <Banner/>
      <Main/>
      <ReviewList/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default HomePage;
