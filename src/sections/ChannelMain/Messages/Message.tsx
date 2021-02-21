import { DocumentReference, Timestamp } from "@firebase/firestore-types";
import React from "react";
import { MessageWithAvatar } from "./MessageWithAvatar";
import { MessageWithNoAvatar } from "./MessageWithNoAvatar";

interface Props {
  showAvatar: boolean;
  showDay: boolean;
  userRef: DocumentReference;
  message: string;
  created_at: Timestamp;
}

export const Message: React.FC<Props> = ({
  showAvatar,
  message,
  showDay,
  userRef,
  created_at,
}) => {
  return (
    <>
      {showAvatar ? (
        <MessageWithAvatar
          message={message}
          showDay={showDay}
          userRef={userRef}
          created_at={created_at}
        />
      ) : (
        <MessageWithNoAvatar message={message} />
      )}
    </>
  );
};
