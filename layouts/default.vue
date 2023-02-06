<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { ChatList } from "~~/types/chat";

const chat = useChat();
const chats = chat.chats;
const chatwrapper = ref();
watch(chats, async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  chatwrapper.value.scrollTop = chatwrapper.value.scrollHeight;
});
</script>
<template>
  <div class="dark:bg-grey-700 w-full h-[100vh] text-gray-800 dark:text-gray-200 md:pl-[260px]">
    <main
      ref="chatwrapper"
      class="chat-body h-full overflow-auto bg-grey relative scroll-smooth"
    >
      <slot />
    </main>
  </div>
  <AppNavbar />
</template>
