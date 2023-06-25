'use client'
import React, { useEffect, type Dispatch, type SetStateAction } from 'react'
import useSWR from 'swr'
import { type Message } from '@/types/messages';
import { type AxiosError } from 'axios';
import { MessagesService } from '@/services/messages.service';
import { MessageCard } from '../message/message-card';
import { useNewFirst } from '@/store/isNewFirstStore';

export const PageComponent = (
    {
        lastMessageId,
        oldMessages,
        uniqueId,
        setLastMessageId,
    }: {
        lastMessageId: string,
        uniqueId?: string,
        oldMessages: boolean,
        setLastMessageId: Dispatch<SetStateAction<number>>
    }
) => {

    const [isNewFirst] = useNewFirst((state) => [state.isNewFirst])
    const formData = new FormData();
    formData.append('actionName', 'MessagesLoad');
    formData.append('oldMessages', `${oldMessages}`)
    formData.append('messageId', `${lastMessageId}`);

    const { data: messagesData, isLoading } = useSWR<Message[], AxiosError>(`messages ${lastMessageId} ${oldMessages} ${uniqueId}`,
        async () => {
            const data = await MessagesService.GetMessages(formData);
            return data.Messages;
        }
    );
    useEffect(() => {
        if (messagesData) {
            setLastMessageId(lastMessageId => Math.max(lastMessageId, ...messagesData.map(item => +item.id)))
        }
    })

    if (isLoading) {
        return <div className="flex items-center justify-center w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 animate-spin stroke-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
        </div>;
    }

    if (messagesData == undefined) {
        return null
    }
    return (
        <div className={`flex ${isNewFirst ? 'flex-col-reverse' : 'flex-col'}`}>
            {messagesData?.map(item => <MessageCard key={item.id} message={item} />)}
        </div>
    );
}