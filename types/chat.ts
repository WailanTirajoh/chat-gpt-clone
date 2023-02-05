export type Sender = "bot" | "human";

export type Chat = {
  id: string;
  replyId?: string;
  roomId: string;
  from: string;
  message: string;
  loading: boolean;
  sender: Sender;
  createdAt: number;
  updatedAt?: number;
};

export type ChatList = Array<never | Chat>;
