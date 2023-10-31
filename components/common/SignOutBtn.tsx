"use client"
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
  import { Button } from '../ui/button'
  import { signOut } from "next-auth/react"

export default function SignOutBtn() {

  const logout = () => {
    signOut({callbackUrl:"/login",redirect:true})
  }

  return (
    <AlertDialog>
  <AlertDialogTrigger asChild>
  <Button size='sm' className='mr-10'>Sign out</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        Once you logged out.You can't access your profile to access it
         you have to login once again.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-400" onClick={logout}>Yes Continue!</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
