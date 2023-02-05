<template>
  <nav
    class="bg-grey-900 fixed hidden md:flex md:flex-col bottom-0 w-full md:top-0 md:w-[260px] bg-grey-2 h-12 md:h-full text-gray-200"
  >
    <div class="h-16 md:flex items-center p-2">
      <button
        class="border-grey-200 border p-3 w-full text-sm rounded-md flex gap-3 items-center"
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
      </button>
    </div>
    <div class="h-[calc(100vh-4rem-3rem)] p-4 border-b border-grey-200">
      [List Here]
    </div>
    <div class="h-10 p-4 md:flex items-center">[Footer]</div>
  </nav>
</template>
