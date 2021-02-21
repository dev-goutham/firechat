import { Timestamp, DocumentReference } from "@firebase/firestore-types";

export interface IMessage {
  text: string;
  created_at: Timestamp;
  id: string;
  user: DocumentReference;
}

export interface IMessagesRootState {
  [key: string]: IMessage[];
}

class IAction {
  readonly type: string;
}

export class FetchingMessages implements IAction {
  readonly type = "FETCHING_MESSAGES";
}

export class AddMessages implements IAction {
  readonly type = "ADD_MESSAGES";

  constructor(public payload: { channelId: string; messages: IMessage[] }) {}
}
