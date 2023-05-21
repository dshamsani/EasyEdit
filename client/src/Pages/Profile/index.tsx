import { FC, useEffect } from "react";
import { useProfile } from "../../Hooks/useProfile";

import EditButton from "./Components/EditButton";

import "./styles.scss";
import DeleteButton from "./Components/DeleteButton";
import ChangePassword from "./Components/ChangePassword";

const ProfilePage: FC = () => {
  const { getCurrentUser, user } = useProfile();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="easyedit-profile">
      <div className="easyedit-profile--container">
        <h1>Information</h1>
        <div className="easyedit-profile--user">
          <div className="easyedit-profile--user__item">
            <span className="easyedit-profile--user__item--text">id: </span>
            <span>{user?.id}</span>
          </div>
          <div className="easyedit-profile--user__item">
            <span className="easyedit-profile--user__item--text">email: </span>
            <span>{user?.email}</span>
          </div>
          <div className="easyedit-profile--user__item">
            <span className="easyedit-profile--user__item--text">name: </span>
            <span>{user?.name}</span>
            <span>{user?.surname}</span>
          </div>
          <div className="easyedit-profile--user__item">
            <span className="easyedit-profile--user__item--text">age: </span>
            <span>{user?.age}</span>
          </div>
        </div>
        <div className="easyedit-profile--buttons">
          <EditButton />
          <ChangePassword />
          <DeleteButton />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
