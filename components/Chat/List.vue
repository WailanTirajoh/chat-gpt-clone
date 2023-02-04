<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { ChatList } from "~~/types/chat";

// persist state in localStorage
const chatList: ChatList = [];
const chats = useLocalStorage("chat-list", chatList);
</script>
<template>
  <ul class="py-4">
    <li class="odd:bg-grey-700" v-for="chat in chats" :key="chat.id">
      <div class="p-4 tw-container">
        <div class="font-bold">
          {{ chat.from }}
        </div>
        <div class="" v-if="chat.loading">
          <SvgBounce class="w-14 h-14" />
        </div>
        <div
          class="break-words mt-2 whitespace-pre-line"
          v-else
          v-html="chat.message"
        ></div>
      </div>
    </li>
  </ul>
</template>
