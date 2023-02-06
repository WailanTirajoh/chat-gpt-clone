<script setup lang="ts">
const route = useRoute();

const roomId = route.params.id;
</script>

<template>
  <div class="h-full flex flex-col justify-between relative">
    <ChatList v-if="roomId" />
    <ChatNew v-else />
    <div class="contain-[content]" style="">
      <div
        class="fixed left-0 bottom-0 w-full md:w-[calc(100%-260px)] md:ml-[260px]"
        style="clip-path: inset(0 0 0 0)"
      >
        <ChatInput class="px-2" />
        <div class="bg-gradient-to-t from-grey-700 py-2"></div>
        <div class="bg-grey-700 text-grey-400 text-xs text-center pb-2 py-4">
          ChatGPT Clone by
          <a
            class="text-grey-300 underline"
            href="https://github.com/WailanTirajoh"
            target="_blank"
          >
            Wailan Tirajoh
          </a>. Powered by <b class="text-grey-300"> OPEN AI </b>
        </div>
      </div>
    </div>
  </div>
</template>
