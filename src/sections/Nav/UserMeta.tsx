import React from "react";
import { useAuth } from "../../store/Auth";

const UserMeta: React.FC = () => {
  const { data, signout } = useAuth();

  return (
    <div className="User">
      <img
        className="UserImage"
        alt="whatever"
        src={data?.photoURL || "https://placekitten.com/64/64"}
      />
      <div>
        <div>{data?.displayName}</div>
        <div>
          <button onClick={signout} className="text-button">
            log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMeta;
