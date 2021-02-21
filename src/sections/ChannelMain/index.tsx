import React from "react";
import { useParams } from "react-router-dom";
import { ChannelInfo } from "./Channelinfo";
import { ChatInputBox } from "./ChatInputBox";
import { Messages } from "./Messages";

const ChannelMain: React.FC = () => {
  const { id } = useParams() as { id: string };
  return (
    <div className="ChannelMain">
      <ChannelInfo />
      <Messages channelId={id} />
      <ChatInputBox />
    </div>
  );
};

export default ChannelMain;
