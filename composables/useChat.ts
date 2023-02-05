import { useLocalStorage } from "@vueuse/core";
import { Chat, ChatList } from "~~/types/chat";

export const useChat = () => {
  const chatList: ChatList = [];
  const chats = useLocalStorage("chat-list", chatList);

  function addMessage(chat: Chat) {
    chats.value.push(chat);
  }

  function removeMessage(chatId: string) {
    const index = chats.value.findIndex((obj) => obj.id === chatId);
    chats.value.splice(index, 1);
  }

  function updateMessage(chat: Chat, chatId?: string) {
    const index = chats.value.findIndex((obj) => obj.id === chatId);
    console.log(index)
    chats.value[index] = chat;
  }

  return {
    chats,
    addMessage,
    removeMessage,
    updateMessage,
  };
};
