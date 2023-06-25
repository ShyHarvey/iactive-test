'use client'

import { useEffect, useState } from "react";
import { PageComponent } from "@/components/page-component/page-component";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { nanoid } from "nanoid";
import { useNewFirst } from "@/store/isNewFirstStore";

export default function Home() {

  const [lastMessageId, setLastMessageId] = useState(0)
  const [isNewFirst, setIsNewFirst] = useNewFirst((state) => [state.isNewFirst, state.setIsNewFirst])
  const [pages, setPages] = useState<JSX.Element[]>([])

  const formData = new FormData();
  formData.append('actionName', 'MessagesLoad');
  formData.append('messageId', '0');

  useEffect(() => {
    setPages(pages => [...pages,
    <PageComponent
      lastMessageId={lastMessageId.toString()}
      setLastMessageId={setLastMessageId}
      oldMessages={false}
      key={nanoid()} />])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPages])

  useEffect(() => {

    const refetch = setInterval(() => {
      setPages(pages => {
        const uniqueId = nanoid()
        const newPages = [
          ...pages,
          <PageComponent
            lastMessageId={lastMessageId.toString()}
            setLastMessageId={setLastMessageId}
            oldMessages={false}
            uniqueId={uniqueId}
            key={uniqueId}
          />
        ].filter(Boolean);
        return newPages;
      });
    }, 5000)

    return () => clearInterval(refetch)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  // useEffect(() => {
  //   console.log(lastMessageId)
  // }, [lastMessageId])

  // console.log(pages)

  return (
    <main className={`container flex gap-10 py-4 ${isNewFirst ? 'flex-col-reverse' : 'flex-col'}`}>
      <div className="flex gap-3">
        <Button
          className="flex-1"
          onClick={() => {
            const uniqueId = nanoid()
            setPages(pages => [
              <PageComponent
                key={uniqueId}
                uniqueId={uniqueId}
                lastMessageId={lastMessageId.toString()}
                setLastMessageId={setLastMessageId}
                oldMessages={true} />,
              ...pages
            ])
          }}>
          ЗАГРУЗИТЬ ПРЕДЫДУЩИЕ
        </Button>
        <div className="flex items-center gap-2">
          <Switch checked={isNewFirst} onCheckedChange={() => setIsNewFirst(!isNewFirst)} />
          <p className="text-blue-600">Новые сверху</p>
        </div>

      </div>
      {pages}
      <div className="flex items-center justify-end gap-2">
        <Switch checked={isNewFirst} onCheckedChange={() => setIsNewFirst(!isNewFirst)} />
        <p className="text-blue-600">Новые сверху</p>
      </div>
    </main>
  )
}
