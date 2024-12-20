"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface DeleteMessageBtnProps {
  id?: string; // Use lowercase 'string' for TypeScript
}

function DeleteMessageBtn({ id }: DeleteMessageBtnProps) {
  // const [isMounted, setIsMounted] = useState(false);

  const handleDelete= () => {
    
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="h-max p-1">
            <X className="cursor-pointer w-4 h-4 p-0" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this feedback? This action cannot be undone and will permanently remove this feedback from our records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="p-0">
              <Button onClick={handleDelete} variant={"destructive"}>Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteMessageBtn;