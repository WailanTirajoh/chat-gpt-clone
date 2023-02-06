import { useLocalStorage } from "@vueuse/core";
import { Room, RoomList } from "~~/types/room";

const creatingRoom = ref(false);
export const useRoom = () => {
  const roomList: RoomList = [];
  const rooms = useLocalStorage("rooms", roomList);

  function addRoom(room: Room): void {
    rooms.value.push(room);
  }

  function removeRoom(roomId: string | Array<string>): void {
    switch (typeof roomId) {
      case "string": {
        const index = rooms.value.findIndex((room) => room.id === roomId);
        rooms.value.splice(index, 1);
        break;
      }
      case "object": {
        rooms.value
          .filter((room) => roomId.includes(room.id))
          .map((r) => {
            const index = rooms.value.findIndex((room) => room.id === r.id);
            rooms.value.splice(index, 1);
          });
        break;
      }
    }
  }

  function updateRoom(room: Room, roomId?: string): void {
    const index = rooms.value.findIndex((obj) => obj.id === roomId);
    rooms.value[index] = room;
  }

  function setCreateRoom(value: boolean): void {
    creatingRoom.value = value;
  }

  return {
    rooms,
    creatingRoom,
    addRoom,
    removeRoom,
    updateRoom,
    setCreateRoom,
  };
};
