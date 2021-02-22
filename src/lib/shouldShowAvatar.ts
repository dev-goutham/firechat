import { Timestamp, DocumentReference } from "@firebase/firestore-types";

interface IMessage {
  text: string;
  created_at: Timestamp;
  id: string;
  user: DocumentReference;
}

export const shouldShowAvatar = (
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
