import React from "react";
import { DocumentReference, Timestamp } from "@firebase/firestore-types";
import { format } from "date-fns";
import { useLocalStorage } from "../../../hooks/useLocalSorage";

interface Props {
  message: string;
  showDay: boolean;
  userRef: DocumentReference;
  created_at: Timestamp;
}

interface IUser {
  id: string;
  username: string;
  photoURL: string;
}

export const MessageWithAvatar: React.FC<Props> = ({
  message,
  userRef,
  showDay,
  created_at,
}) => {
  const getUser = React.useCallback(async () => {
    const res = (await userRef.get()).data() as {
      username: string;
      photoURL: string;
    };

    return { ...res, id: userRef.id };
  }, [userRef]);

  const user = useLocalStorage<IUser>(userRef.id, getUser);

  return (
    <>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">{format(created_at.toDate(), "PPP")}</div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: `url(${
              user?.photoURL || "https://placekitten.com/64/64"
            })`,
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{user?.username}</span>
            <span> </span>
            <span className="TimeStamp">
              {format(created_at.toDate(), "hh:mm aaa")}
            </span>
          </div>
          <div className="MessageContent">{message}</div>
        </div>
      </div>
    </>
  );
};
