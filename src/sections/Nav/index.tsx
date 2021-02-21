import React from "react";
import ChannelNav from "./ChannelsNav";
import UserMeta from "./UserMeta";

const Nav: React.FC = () => {
  return (
    <div className="Nav">
      <UserMeta />
      <ChannelNav />
    </div>
  );
};

export default Nav;
