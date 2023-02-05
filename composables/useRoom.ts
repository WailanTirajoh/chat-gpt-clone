import { useLocalStorage } from "@vueuse/core";
import { Room, RoomList } from "~~/types/room";

const creatingRoom = ref(false);
export const useRoom = () => {
  const roomList: RoomList = [];
  const rooms = useLocalStorage("rooms", roomList);

  function addRoom(room: Room) {
    rooms.value.push(room);
  }

  function removeRoom(roomId: string) {
    const index = rooms.value.findIndex((obj) => obj.id === roomId);
    rooms.value.splice(index, 1);
  }

  function updateRoom(room: Room, roomId?: string) {
    const index = rooms.value.findIndex((obj) => obj.id === roomId);
    console.log(index);
    rooms.value[index] = room;
  }

  function setCreateRoom(value: boolean) {
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
