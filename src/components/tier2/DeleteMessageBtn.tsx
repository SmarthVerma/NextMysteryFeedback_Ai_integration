import React from 'react'
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
} from "@/components/ui/alert-dialog"
import { X } from 'lucide-react'
import { Button } from '../ui/button'


function DeleteMessageBtn({id}: {id: String}) {
    const temp = id
  return (
    <div>
      <AlertDialog>
  <AlertDialogTrigger> 
    <Button variant={'destructive'} className=' h-max p-1'>
    <X className='cursor-pointer w-4 h-4 p-0' />
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
      <AlertDialogAction className='p-0'> <Button variant={'destructive'}> Continue</Button>  </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default DeleteMessageBtn
