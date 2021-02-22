import { createContext, useMemo } from "react";
import { useCollection } from "../../hooks/useCollection";
import { db } from "../../lib/firebase";

import { IChannel } from "./types";

export const ChannelsContext = createContext<IChannel[]>([]);

export const ChannelsProvider: React.FC = ({ children }) => {
  const getChannelsQuery = useMemo(() => db.collection("channels"), []);

  const { data } = useCollection<IChannel>(getChannelsQuery);

  return (
    <ChannelsContext.Provider value={data}>{children}</ChannelsContext.Provider>
  );
};
