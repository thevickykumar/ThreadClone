"use client"

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
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

  
export default function DeletePostBtn({id}:{id:number}) {
   
    const {toast}= useToast()
    const router=useRouter()

    const deletePost = () => {
        axios.delete(`/api/post/${id}`)
        .then((res) => {
            const response =res.data
            if(response.status==200){
                router.refresh();
                toast({
                    title:"Deleted",
                    description:response.message,
                    className:"bg-green-500"
                })
            }
        })
        .catch((err) => 
        console.log("the error is",err))
    }
 
    return (
    <AlertDialog>
  <AlertDialogTrigger asChild>
  <Trash2 height={22} width={22} className='text-red-400 cursor-pointer'/>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your post
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deletePost}>
        Continue
        </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
