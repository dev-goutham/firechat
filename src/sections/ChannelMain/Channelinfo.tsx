import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChannels } from "../../store/Channels";
import { IChannel } from "../../store/Channels/types";

export const ChannelInfo: React.FC = () => {
  const [channel, setChannel] = useState<IChannel | null>(null);

  const { id } = useParams() as { id: string };

  const channels = useChannels();

  useEffect(() => {
    const ch = channels.find((ch) => ch.id === id);
    if (!ch) {
      return;
    }
    setChannel(ch);
  }, [channels, id]);

  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{" "}
        <div className="TopicInput">{channel ? channel.topic : "Unknown"}</div>
      </div>
      <div className="ChannelName">#{id}</div>
    </div>
  );
};
