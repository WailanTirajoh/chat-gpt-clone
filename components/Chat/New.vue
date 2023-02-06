<script setup lang="ts">
const room = useRoom();
const creatingRoom = room.creatingRoom;
const composableChat = useChat();

const lists = [
  {
    svg: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
              `,
    title: "Examples",
    childs: [
      {
        message: "Explain quantum computing in simple",
      },
      {
        message: "Got any creative ideas for a 10 year old’s birthday?",
      },
      {
        message: "How do I make an HTTP request in Javascript?",
      },
    ],
  },
  {
    svg: `

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
    `,
    title: "Capabilities",
    childs: [
      {
        message: "Remembers what user said earlier in the conversation",
      },
      {
        message: "Allows user to provide follow-up corrections",
      },
      {
        message: "Trained to decline inappropriate requests",
      },
    ],
  },
  {
    svg: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
              `,
    title: "Limitations",
    childs: [
      {
        message: "May occasionally generate incorrect information",
      },
      {
        message:
          "May occasionally produce harmful instructions or biased content",
      },
      {
        message: "Limited knowledge of world and events after 2021",
      },
    ],
  },
];

function selectExample(text: string) {
  composableChat.chatInput.value = text;
}
</script>
<template>
  <div
    class="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col items-center my-auto mx-auto px-6 dark:text-gray-100"
  >
    <div class="" v-if="creatingRoom">
      Please wait while generating room & conversation . . .
    </div>
    <div class="p-4 my-auto" v-else>
      <div class="text-center grid gap-5">
        <div class="h-20">
          <h1 class="text-4xl font-semibold">ChatGPT</h1>
          <h2 class="text-2xl font-semibold">Clone</h2>
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col w-1/3 gap-2" v-for="list in lists">
            <div class="">
              <div
                class="flex items-center justify-center w-full"
                v-html="list.svg"
              ></div>
              <h4>{{ list.title }}</h4>
            </div>
            <div class="grid gap-3">
              <div
                :tabindex="list.title === 'Examples' ? 0 : undefined"
                :role="list.title === 'Examples' ? 'button' : undefined"
                class="bg-gray-50 dark:bg-grey-650 p-3 rounded-md"
                v-for="child in list.childs"
                :class="{
                  'hover:bg-gray-200 dark:hover:bg-grey-900 cursor-pointer':
                    list.title === 'Examples',
                }"
                :key="child.message"
                @click="
                  list.title === 'Examples'
                    ? selectExample(child.message)
                    : undefined
                "
              >
                <template v-if="list.title === 'Examples'">
                  "{{ child.message }}"
                  <br />
                  →
                </template>
                <template v-else>
                  {{ child.message }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
