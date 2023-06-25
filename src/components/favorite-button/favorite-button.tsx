import useLocalStorage from '@/hooks/useLocalStorage'
import { type Message } from '@/types/messages'
import React from 'react'

export const FavoriteButton = ({ MessageData }: { MessageData: Message }) => {
    const [favorites, setFavorites] = useLocalStorage<Message[]>('favoritesMessages')
    //ищем данное сообщение в избранном
    let currentCharacterIndex = favorites ? favorites.findIndex((item) => item.id == MessageData.id) : -1

    const handleAddToFavorites = () => {
        if (favorites) {
            setFavorites([...favorites, MessageData])
        } else {
            setFavorites([MessageData])
        }
    }

    const handleStarClick = () => {
        if (!favorites) {
            handleAddToFavorites();// если массив не существует, то сразу добавляем
        } else if (currentCharacterIndex === -1) {

            handleAddToFavorites();//если не найдено в избранном, то добавляем
        } else {
            const newFavorites = favorites.slice();
            newFavorites.splice(currentCharacterIndex, 1);//если сообщение найдено, то удаляем
            setFavorites(newFavorites);
        }
    }


    return (
        <svg viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleStarClick()}
            className={`cursor-pointer stroke-blue-500 transition-colors hover:animate-spin-slow
                        ${currentCharacterIndex > -1 ? 'fill-blue-500' : 'fill-none hover:fill-white/30'}`}
            width={30} height={30}
        >
            <path d="M10.3672 1.20312L7.82812 6.39844L2.08594 7.21875C1.07031 7.375 0.679688 8.625 1.42188 9.36719L5.52344 13.3906L4.54688 19.0547C4.39062 20.0703 5.48438 20.8516 6.38281 20.3828L11.5 17.6875L16.5781 20.3828C17.4766 20.8516 18.5703 20.0703 18.4141 19.0547L17.4375 13.3906L21.5391 9.36719C22.2812 8.625 21.8906 7.375 20.875 7.21875L15.1719 6.39844L12.5938 1.20312C12.1641 0.304688 10.8359 0.265625 10.3672 1.20312Z" />
        </svg>
    )
}