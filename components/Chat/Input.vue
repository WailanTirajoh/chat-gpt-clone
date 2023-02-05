<script setup lang="ts">
import { Chat } from "~~/types/chat";

const room = useRoom();
const chat = useChat();
const route = useRoute();
const router = useRouter();

const textinput = ref();
const inputValue = ref();
const isFetching = ref(false);

function inputHandler() {
  inputHeightHandler();
}

async function sendMessage() {
  if (!inputValue.value) return;

  let roomId = route.params.id;
  const id = useId();

  // Create room if room doesnt exists
  if (!roomId) {
    room.setCreateRoom(true);
    roomId = id.generateId();
    room.addRoom({
      id: roomId,
      title: `New room ${room.rooms.value.length + 1}`,
      createdAt: new Date().getTime(),
    });
  }
  const message = inputValue.value;
  inputValue.value = null;

  try {
    await chat.sendChatToBot(message, roomId.toString());
  } catch {
  } finally {
    isFetching.value = false;
    room.setCreateRoom(false);
    nextTick(() => {
      textinput.value.focus();
    });
    if (!route.params.id) router.push(`/chat/${roomId}`);
  }
}

function inputHeightHandler() {
  const maxHeight = 150;
  textinput.value.style.height = 0;

  if (textinput.value.scrollHeight > maxHeight)
    textinput.value.style.height = maxHeight + "px";
  else textinput.value.style.height = textinput.value.scrollHeight + "px";
}
</script>

<template>
  <div>
    <div class="tw-container grid gap-2">
      <form
        @submit.prevent="sendMessage"
        class="bg-grey-500 border-grey-900 shadow-lg rounded-lg relative"
      >
        <textarea
          v-bind="$attrs"
          v-model="inputValue"
          type="text"
          class="chat-input bg-grey-500 text-white p-2 rounded focus:outline-none focus:outline-2 w-full resize-none disabled:bg-gray-700"
          ref="textinput"
          rows="1"
          :placeholder="isFetching ? 'Thinking . . .' : 'Type something...'"
          :disabled="isFetching"
          @keydown.enter.exact.prevent="sendMessage"
          @input="inputHandler"
        />

        <button class="absolute right-2 bottom-3 text-grey-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 animate-spin"
            v-if="isFetching"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            v-else
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
      <div class="text-grey-400 text-xs text-center pb-2">
        ChatGPT Clone. Powered by <b class="text-grey-300"> OPEN AI </b>
      </div>
    </div>
  </div>
</template>
