import { Button } from "@/components/ui/button";
import { logout } from "@/redux/user/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const onLogOut = async () => {
    try {
      await axios.post("http://localhost:3000/auth/signout");
      dispatch(logout());
      toast.success("logout successful!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col gap-4">
      Welcome user!
      <Button onClick={onLogOut}>Logout</Button>
    </div>
  );
}

export default Home;
