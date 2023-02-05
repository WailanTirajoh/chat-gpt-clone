<script setup lang="ts">
const route = useRoute();

const roomId = route.params.id;
</script>

<template>
  <div class="h-full flex flex-col justify-between relative">
    <ChatList v-if="roomId" />
    <ChatNew v-else />
    <div class="sticky bottom-0" style="clip-path: inset(0 0 0 0)">
      <div class="bg-gradient-to-t from-grey-700 py-4"></div>
      <ChatInput class="bg-grey-700" />
    </div>
  </div>
</template>
