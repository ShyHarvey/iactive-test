export type Message = {
    author: string;
    content?: string;
    channel: string;
    date: string;
    id: string;
    region: string;
    senderNumber: string;
    attachments?: Attachment[];
}

export type Attachment = {
    type: 'video' | 'image';
    url: string;
}
