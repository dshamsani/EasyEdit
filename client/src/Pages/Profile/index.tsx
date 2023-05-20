import { FC, useEffect } from "react";
import { useProfile } from "../../Hooks/useProfile";

import "./styles.scss";
import { Button } from "@chakra-ui/react";

const ProfilePage: FC = () => {
  const { getCurrentUser, user, loading } = useProfile();
  console.log("user:", user);

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
          </div>
          <div className="easyedit-profile--user__item">
            <span className="easyedit-profile--user__item--text">surname: </span>
            <span>{user?.surname}</span>
          </div>
          <div className="easyedit-profile--user__item">
            <span className="easyedit-profile--user__item--text">age: </span>
            <span>{user?.age}</span>
          </div>
        </div>
        <div className="easyedit-profile--buttons">
          <Button style={{ width: "60%" }}>Edit</Button>
          <Button style={{ width: "60%" }}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
