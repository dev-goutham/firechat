import { createContext } from "react";
import { useFetch } from "../../hooks/useFetch";

import { IChannel } from "./types";

export const ChannelsContext = createContext<IChannel[]>([]);

export const ChannelsProvider: React.FC = ({ children }) => {
  const { data } = useFetch<IChannel>({
    dbPath: "channels",
    // orderBy: ''
  });

  console.log(data);

  return (
    <ChannelsContext.Provider value={data}>{children}</ChannelsContext.Provider>
  );
};
