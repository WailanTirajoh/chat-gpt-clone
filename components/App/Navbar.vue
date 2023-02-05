<script setup lang="ts">
const composableRoom = useRoom();
const { rooms } = composableRoom;
</script>
<template>
  <nav
    class="bg-grey-900 fixed hidden md:flex md:flex-col bottom-0 w-full md:top-0 md:w-[260px] bg-grey-2 h-12 md:h-full text-gray-200"
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
      <li class="" v-for="room in rooms">
        <NuxtLink
          class="flex gap-3 items-center p-3 hover:bg-grey-800 rounded"
          :to="`/chat/${room.id}`"
          exact-active-class="bg-grey-800"
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
          <div class="">
            {{ room.title }}
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div class="h-32 p-4 md:flex items-center">[Footer]</div>
  </nav>
</template>
