export type Sender = "bot" | "human";

export type Chat = {
  id: string;
  replyId?: string;
  groupId: string;
  from: string;
  message: string;
  loading: boolean;
  sender: Sender;
};

export type ChatList = Array<never | Chat>;
