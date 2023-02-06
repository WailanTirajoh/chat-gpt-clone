<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const { removeAllRooms } = useRoom();
const { removeAllMessages } = useChat();
const toggleDark = useToggle(isDark);
const isClearConversation = ref(false);
function confirmClearConversation() {
  removeAllMessages();
  removeAllRooms();
  isClearConversation.value = false;
}
</script>
<template>
  <nav
    class="bg-grey-900 fixed hidden md:flex md:flex-col bottom-0 w-full md:top-0 md:w-[260px] bg-grey-2 h-12 md:h-full text-gray-300"
  >
    <div class="h-16 md:flex items-center p-2">
      <NuxtLink
        to="/chat"
        class="border-grey-200 border p-3 w-full text-sm rounded-md flex gap-3 items-center hover:bg-grey-100 duration-200"
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>

        New chat
      </NuxtLink>
    </div>
    <ul
      class="h-[calc(100vh-4rem-8rem)] p-2 border-b border-grey-200 text-sm overflow-auto gap-2 flex flex-col duration-200"
    >
      <RoomList />
    </ul>
    <ul
      class="h-32 p-2 border-b border-grey-200 text-sm overflow-auto gap-2 flex flex-col duration-200"
    >
      <li class="overflow-hidden rounded">
        <button
          class="flex gap-3 items-center p-3 hover:bg-grey-800 w-full"
          @click="confirmClearConversation()"
          v-if="isClearConversation"
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
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          Confirm clear Conversations
        </button>
        <button
          class="flex gap-3 items-center p-3 hover:bg-grey-800 w-full"
          @click="isClearConversation = true"
          v-else
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Clear Conversations
        </button>
      </li>
      <li class="overflow-hidden rounded">
        <button
          @click="toggleDark()"
          class="flex gap-3 items-center p-3 hover:bg-grey-800 w-full"
        >
          <template v-if="isDark">
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
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
            Light Mode
          </template>
          <template v-else>
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
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
            Dark Mode
          </template>
        </button>
      </li>
    </ul>
  </nav>
</template>
