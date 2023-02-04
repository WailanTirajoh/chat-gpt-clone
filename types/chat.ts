export type ChatList = Array<
  | never
  | {
      id: string;
      from: string;
      message: string;
      loading: boolean;
      questionId?: string;
    }
>;
