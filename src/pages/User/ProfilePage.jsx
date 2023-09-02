import Profilebar from "../../components/Profilebar";
import Profilebox from "../../components/Profilebox";

export function ProfilePage(){
    return(
        <div className="overflow-x-hidden md:flex" >
            <div className="hidden lg:block">
            <Profilebar/>
            </div>
            <Profilebox/>
        </div>
    )
}

export default ProfilePage;