import { useContext } from "react";

import { ChannelsContext } from "./context";

export const useChannels = () => {
  const data = useContext(ChannelsContext);

  return data;
};
