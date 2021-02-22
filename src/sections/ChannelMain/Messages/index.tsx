import React from "react";
import { DocumentReference, Timestamp } from "@firebase/firestore-types";

import { Message } from "./Message";
import Loading from "../../../components/Loading";
import { shouldShowAvatar } from "../../../lib/shouldShowAvatar";
import { shouldShowDay } from "../../../lib/shouldShowDay";
import { useScrollerRef } from "../../../hooks/useScrollerRef";
import { db } from "../../../lib/firebase";
import { useCollection } from "../../../hooks/useCollection";

interface IMessage {
  text: string;
  created_at: Timestamp;
  id: string;
  user: DocumentReference;
}

interface Props {
  channelId: string;
}

export const Messages: React.FC<Props> = ({ channelId }) => {
  const scrollerRef = useScrollerRef();

  const query = React.useMemo(
    () => db.collection(`channels/${channelId}/messages`).orderBy("created_at"),
    [channelId]
  );

  const { data: messages, loading } = useCollection<IMessage>(query);

  if (loading) {
    return <Loading />;
  }

  return (
    <div ref={scrollerRef} className="Messages">
      <>
        <div className="EndOfMessages">That's every message!</div>
        {!loading &&
          messages.map((message, i) => {
            const prev = messages[i - 1];
            const showAvatar = shouldShowAvatar(prev, message);
            const showDay = shouldShowDay(prev, message);
            return (
              <div key={message.id}>
                <Message
                  showAvatar={showAvatar}
                  showDay={showDay}
                  message={message.text}
                  userRef={message.user}
                  created_at={message.created_at}
                />
              </div>
            );
          })}
      </>
    </div>
  );
};
