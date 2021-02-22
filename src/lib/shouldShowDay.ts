import { Timestamp, DocumentReference } from "@firebase/firestore-types";
import { isSameDay } from "date-fns";

interface IMessage {
  text: string;
  created_at: Timestamp;
  id: string;
  user: DocumentReference;
}

export const shouldShowDay = (
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

  return isNewDay;
};
