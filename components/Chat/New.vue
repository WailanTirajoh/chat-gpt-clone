<script setup lang="ts">
const room = useRoom();
const creatingRoom = room.creatingRoom;
</script>
<template>
  <div class="grid place-items-center h-full">
    <div class="" v-if="creatingRoom">
      Please wait while generating room & conversation . . .
    </div>
    <div class="" v-else>Ask me anything</div>
  </div>
</template>
