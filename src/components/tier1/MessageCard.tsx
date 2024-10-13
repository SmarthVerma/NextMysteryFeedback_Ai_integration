import * as React from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DeleteMessageBtn from "../tier2/DeleteMessageBtn"

type MessageContent = {
    messageContent: String
    id: String
}

export function MessageCard({messageContent, id}: MessageContent) {
  return (
    <Card className="w-[350px]">
      <CardHeader className="p-4">
        <div className="flex w-full items-center justify-between">
        <CardTitle>Anonymous </CardTitle>
      <DeleteMessageBtn id={id}/>
        </div>
        <CardContent className="p-0">
            <p>{messageContent}</p>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
