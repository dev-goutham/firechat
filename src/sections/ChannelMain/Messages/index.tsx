import React, { useEffect, useRef } from "react";
import { DocumentReference, Timestamp } from "@firebase/firestore-types";
import { isSameDay } from "date-fns";

import { useFetch } from "../../../hooks/useFetch";
import { Message } from "./Message";
import Loading from "../../../components/Loading";

interface IMessage {
  text: string;
  created_at: Timestamp;
  id: string;
  user: DocumentReference;
}

interface Props {
  channelId: string;
}

const shouldShowAvatar = (
  prevMessage: IMessage | undefined,
  message: IMessage
) => {
  const firstMessage = !prevMessage;
  if (firstMessage) {
    return true;
  }

  const differentUser = prevMessage?.user.id !== message.user.id;
  if (differentUser) {
    return true;
  }

  const timeBetweenMessages =
    message.created_at.seconds - prevMessage!.created_at.seconds;
  if (timeBetweenMessages > 60) {
    return true;
  }

  return false;
};

const shouldShowDay = (
  prevMessage: IMessage | undefined,
  message: IMessage
) => {
  const firstMessage = !prevMessage;
  if (firstMessage) {
    return true;
  }

  const isNewDay = !isSameDay(
    prevMessage!.created_at.toDate(),
    message.created_at.toDate()
  );

  console.log(`${isNewDay} ${message.text}`);

  return isNewDay;
};

export const Messages: React.FC<Props> = ({ channelId }) => {
  const { data: messages, loading } = useFetch<IMessage>({
    dbPath: `channels/${channelId}/messages`,
    orderBy: "created_at",
  });

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollerRef.current) {
      return;
    }

    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div ref={scrollerRef} className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, i) => {
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
    </div>
  );
};
