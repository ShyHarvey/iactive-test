import { Message } from "@/types/messages";
import { apiInstance } from "./axiosInstance"

export type GetMessagesResponse = {
    Messages: Message[]
    likeImages: []
    dislikeImages: []
}

export const MessagesService = {
    async GetMessages(formData: FormData) {
        const messages = await apiInstance<GetMessagesResponse>({
            method: 'post',
            data: formData,
            headers: { 'Content-Type': `multipart/form-data` }
        })
        return messages.data
    },
}