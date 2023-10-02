import Navbar from "../../components/user/Navbar";
import LiveCam from "../../components/user/LiveCam";
import Profilebar from "../../components/user/Profilebar";
import Profilebox from "../../components/user/Profilebox";

export function ProfilePage() {
  return (
    <div>
      <div className="overflow-x-hidden md:flex">
        {/* <Navbar/> */}
        <div className="hidden lg:block">
          <Profilebar />
        </div>
        <Profilebox />
      </div>

    </div>
  );
}

export default ProfilePage;
