<script setup lang="ts">
import { Room } from "~~/types/room";

const { rooms, removeRoom, updateRoom } = useRoom();
const { list: chatList, removeMessage } = useChat();
const route = useRoute();

const selectedRoom: {
  room: null | Room;
} = reactive({
  room: null,
});

function deleteRoom(room: Room) {
  const chatIds = chatList.value
    .filter((chat) => chat.roomId === room.id)
    .map((chat) => chat.id);

  removeMessage(chatIds);
  removeRoom(room.id);
}

async function renameRoom(room: Room) {
  selectedRoom.room = structuredClone(toRaw(room));

  nextTick(async () => {
    document.getElementById("selectedRoomInput")?.focus();
  });
}

function confirmRenameRoom() {
  if (!selectedRoom.room) return;
  updateRoom(selectedRoom.room, selectedRoom.room.id);
  clearSelectedRoom();
}

function cancelRenameRoom() {
  clearSelectedRoom();
}

function clearSelectedRoom() {
  selectedRoom.room = null;
}

// Clear selected room whenever root changes
watch(
  () => route.params,
  async () => {
    clearSelectedRoom();
  }
);
</script>
<template>
  <li class="relative overflow-hidden rounded" v-for="room in rooms">
    <NuxtLink
      class="flex gap-3 items-center p-3 hover:bg-grey-800"
      :to="`/chat/${room.id}`"
      exact-active-class="bg-grey-800 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
      <div class="" v-if="room.id === selectedRoom.room?.id">
        <input
          id="selectedRoomInput"
          ref="selectedRoomInput"
          type="text"
          class="bg-transparent max-w-[130px]"
          v-model="selectedRoom.room.title"
        />
      </div>
      <div class="whitespace-nowrap overflow-ellipsis overflow-hidden" v-else>
        {{ room.title }}
      </div>
    </NuxtLink>
    <div
      v-if="route.params.id === room.id"
      class="absolute right-0 top-0 h-full flex items-center"
    >
      <div class="bg-gradient-to-l from-grey-800 w-30 h-full px-2"></div>
      <div class="bg-grey-800">
        <template v-if="selectedRoom.room == null">
          <button class="p-2 hover:text-white" @click="renameRoom(room)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button class="p-2 hover:text-white" @click="deleteRoom(room)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </template>
        <template v-else>
          <button class="p-2 hover:text-white" @click="confirmRenameRoom()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
          <button class="p-2 hover:text-white" @click="cancelRenameRoom()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </template>
      </div>
    </div>
  </li>
</template>
