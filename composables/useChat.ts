import { useLocalStorage } from "@vueuse/core";
import { Chat, ChatList } from "~~/types/chat";

export const useChat = () => {
  const route = useRoute();
  const chatList: ChatList = [];
  const chats = useLocalStorage("chats", chatList);
  const list = computed(() => {
    return chats.value.filter(
      (chat) => chat.roomId === route.params.id.toString()
    );
  });

  function addMessage(chat: Chat) {
    chats.value.push(chat);
  }

  function removeMessage(chatId: string) {
    const index = chats.value.findIndex((obj) => obj.id === chatId);
    chats.value.splice(index, 1);
  }

  function updateMessage(chat: Chat, chatId?: string) {
    const index = chats.value.findIndex((obj) => obj.id === chatId);
    chats.value[index] = chat;
  }

  async function sendChatToBot(message: string, roomId: string) {
    const id = useId();
    const questionId = id.generateId();
    const humanChat: Chat = {
      id: id.generateId(),
      from: "Wailan",
      message: message,
      loading: false,
      sender: "human",
      createdAt: new Date().getTime(),
      roomId: roomId.toString(),
    };

    addMessage(humanChat);
    const prompMessage = generatePrompt(roomId)
    const botChat: Chat = {
      id: id.generateId(),
      from: "OpenAI",
      message: "",
      loading: true,
      replyId: questionId,
      sender: "bot",
      createdAt: new Date().getTime(),
      roomId: roomId.toString(),
    };
    addMessage(botChat);

    try {
      const payload = {
        message: prompMessage,
      };
      const response = await $fetch("/api/openai/post-message", {
        method: "POST",
        body: payload,
      });

      botChat.message =
        response.data?.message || "Could not detect any message";
      botChat.loading = false;
      updateMessage(botChat, botChat.id);
    } catch {
      // TODO: Add logic to handle
      if (botChat) {
        botChat.message = "There's an issue while generating message";
        botChat.loading = false;
        updateMessage(botChat, botChat.id);
      }
    }
  }

  function generatePrompt(roomId: string) {
    let promptResult = "";
    const chatLists = chats.value
      .filter((chat) => chat.roomId === roomId)
      .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
      .map((sortedChat) => {
        return {
          from: sortedChat.sender === "bot" ? "You" : "Me",
          type: sortedChat.sender === "bot" ? "Answer" : "Question",
          message: sortedChat.message,
        };
      });

    for(const chatlist of chatLists) {
      promptResult += `
        From: ${chatlist.from}
        ${chatlist.type}: ${chatlist.message}
      `
    }

    promptResult += `
      Answer the last question based on that "Me (Question) and You (Answer)" provided below. Dont use From: You And Answer. Dont use Answer:
    `

    return promptResult
  }

  return {
    chats,
    list,
    addMessage,
    removeMessage,
    updateMessage,
    sendChatToBot,
  };
};
