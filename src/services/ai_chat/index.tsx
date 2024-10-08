import instance from "@/lib/axios/instance";

const aiChatServices = {
  openAIChat: (data: any) => instance.post("/api/ai_chat/openai", data),
  groqAIChat: (data: any) => instance.post("/api/ai_chat/groqai", data),
};

export default aiChatServices;