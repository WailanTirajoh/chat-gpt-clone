export type Room = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt?: number;
};

export type RoomList = Array<Room>;
