import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useChannels } from "../../store/Channels";

const ChannelNav: React.FC = () => {
  const location = useLocation();
  const channels = useChannels();

  return (
    <nav className="ChannelNav">
      {channels.map((channel) => {
        const pathname = `/channel/${channel.id}`;
        return (
          <Link
            key={channel.id}
            to={pathname}
            className={`${
              pathname === location.pathname ? "active" : "not-active"
            }`}
          >
            # {channel.id}
          </Link>
        );
      })}
    </nav>
  );
};

export default ChannelNav;
