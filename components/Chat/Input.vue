<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { ChatList } from "~~/types/chat";

const chatList: ChatList = [];
const chatListStore = useLocalStorage("chat-list", chatList);
const textinput = ref();
const inputValue = ref();
const isFetching = ref(false);

function inputHandler() {
  inputHeightHandler();
}

async function sendMessage() {
  if (!inputValue.value) return;

  const questionId = generateId();
  chatListStore.value.push({
    id: questionId,
    from: "Wailan",
    message: inputValue.value,
    loading: false,
  });

  const payload = {
    message: inputValue.value,
  };

  inputValue.value = null;

  const botid = generateId();
  chatListStore.value.push({
    id: botid,
    from: "OpenAI",
    message: "",
    loading: true,
    questionId: questionId,
  });

  isFetching.value = true;
  try {
    const response = await $fetch("/api/openai/post-message", {
      method: "POST",
      body: payload,
    });

    const index = chatListStore.value.findIndex((obj) => obj.id === botid);
    chatListStore.value[index].message = response.data?.message!;
    chatListStore.value[index].loading = false;
  } catch {
    // TODO: Add logic to handle
  } finally {
    isFetching.value = false;
  }
}

function inputHeightHandler() {
  const maxHeight = 150;
  textinput.value.style.height = 20;

  if (textinput.value.scrollHeight > maxHeight)
    textinput.value.style.height = maxHeight + "px";
  else textinput.value.style.height = textinput.value.scrollHeight + "px";
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
</script>

<template>
  <div class="bg-grey-700 rounded-t-lg shadow-sm tw-container">
    <textarea
      class="chat-input duration-200 bg-grey-800 text-white p-2 rounded focus:outline-gray-400 focus:outline-2 focus:outline-dashed w-full resize-none disabled:bg-gray-700"
      ref="textinput"
      v-bind="$attrs"
      v-model="inputValue"
      type="text"
      :placeholder="isFetching ? 'Thinking . . .' : 'Type something...'"
      :disabled="isFetching"
      @input="inputHandler"
      @keydown.enter.exact.prevent="sendMessage"
    />
  </div>
</template>
