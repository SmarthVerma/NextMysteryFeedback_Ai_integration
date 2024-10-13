// src/components/tier1/MessageCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteMessageBtn from "../tier2/DeleteMessageBtn";

type MessageContent = {
  messageContent: string; // Use lowercase 'string'
  id: string; // Use lowercase 'string'
};

const MessageCard: React.FC<MessageContent> = ({ messageContent, id }) => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="p-4">
        <div className="flex w-full items-center justify-between">
          <CardTitle>Anonymous</CardTitle>
          <DeleteMessageBtn id={id} />
        </div>
        <CardContent className="p-0">
          <p>{messageContent}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default MessageCard; // Ensure default export