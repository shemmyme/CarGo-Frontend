import Banner from "../../components/user/Banner";
import Navbar from "../../components/user/Navbar";
import Main from '../../components/user/Main'
import ReviewList from '../../components/user/ReviewList'
import Faq from '../../components/user/Faq'
import Footer from '../../components/user/Footer'
import Offers from "../../components/user/Offers";


 
export function HomePage() {
  const token = localStorage.getItem('authToken')
return (

    <div className="overflow-x-hidden">
      <Navbar/>
      <Banner/>
      <Main/>
      <ReviewList/>
      <Offers/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default HomePage;
