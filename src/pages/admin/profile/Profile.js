import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SET_USER } from "../../../redux/auth/authSlice";
import { SET_FIRSTNAME } from "../../../redux/auth/authSlice";
import Spinner from "../../../components/Loader/Spinner";
import { getUser } from "../../../services/authServices";
// import useRedirectLoggedOutUsers from "../../customHooks/useRedirectLoggedOutUsers";

function Profile() {
  // useRedirectLoggedOutUsers("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Getting user data");
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_FIRSTNAME(data?.firstname));
    }
    getUserData();
  }, [dispatch]);
  return (
    <div className="flex flex-col lg:flex-row max-w-[700px] gap-2 shadow-lg shadow-indigo-500/50 bg-white p-2 lg:p-4">
      {isLoading && <Spinner />}
      <div className="flex flex-col gap ">
        {profile?.photo && (
          <div className="image-preview transition flex items-center justify-center md:items-center md:justify-center lg:items-start lg:justify-start flex-wrap  py-3 mb-3 ">
            <img
              src={profile?.photo}
              alt="profile"
              className="max-w-full h-auto  shadow-lg"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-2 lg:p-4">
        <hr className="text-[4px] font-bold  " />
        <div className="flex flex-col md:flex-row lg:flex-row text-start gap-2 items-center lg:text-center md:text-center ">
          <label className=" uppercase tracking-wid font-bold text-lg font-serif flex-shrink-0 py-1 px-2  ">
            Firstname :
          </label>
          <p className=" text-slate-500 text-lg  ">
            <b> {profile?.firstname} </b>
          </p>
        </div>

        <div className="flex flex-col md:flex-row lg:flex-row text-start gap-2 items-center lg:text-center md:text-center ">
          <label className=" uppercase tracking-wid font-bold text-lg font-serif flex-shrink-0 py-1 px-2  ">
            Lastname :
          </label>
          <p className=" text-slate-500 text-lg  ">
            <b> {profile?.lastname} </b>
          </p>
        </div>

        <hr className="text-[4px] font-bold  " />
        <div className="flex flex-col md:flex-row lg:flex-row text-start gap-2 items-center lg:text-center md:text-center ">
          <label className=" uppercase tracking-wid font-bold text-lg font-serif flex-shrink-0 py-1 px-2  ">
            Email :
          </label>
          <p className=" text-slate-500 text-lg  ">
            <b> {profile?.email} </b>
          </p>
        </div>
        <hr className="text-[4px] font-bold  " />
        <div className="flex flex-col md:flex-row lg:flex-row text-start gap-2 items-center lg:text-center md:text-center ">
          <label className=" uppercase tracking-wid font-bold text-lg font-serif flex-shrink-0 py-1 px-2  ">
            Phone :
          </label>
          <p className=" text-slate-500 text-lg  ">
            <b> {profile?.phone} </b>
          </p>
        </div>

        <Link
          to="/edit-profile"
          className="m-auto items-center justify-center lg:m-0"
        >
          <button
            type="submit"
            className="flex-shrink-0 max-w-[150px]  bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
