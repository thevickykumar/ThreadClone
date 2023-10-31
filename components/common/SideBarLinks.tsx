import React from 'react'
import Link from 'next/link'
import { Bell, Home, Search, User2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import ThemeToggleBtn from './ThemeToggleBtn'
import SignOutBtn from './SignOutBtn'

export default function SideBarLinks() {
  const pathName=usePathname();
  return (
    <ul className='mt-10'>
    <li>
        <Link href="/" className={`flex items-center justify-start space-x-4 hover:font-bold 
            ${pathName=='/' ? "font-bold":""}`}>
            <Home height={25} width={25}/>
            <h3 className='text-lg lg:text-xl'>Home</h3>
        </Link>
    </li>
    <li>
    <Link href="/explore" className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold 
          ${pathName=='/explore' ? "font-bold":""}`}>
            <Search height={25} width={25}/>
            <h3 className='text-lg lg:text-xl '>Explore</h3>
        </Link>
    </li>
    <li>
    <Link href="/notification" className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold 
          ${pathName=='/notification' ? "font-bold":""}`}>
            <Bell height={25} width={25}/>
            <h3 className='text-lg lg:text-xl'>Notifications</h3>
    </Link>
    </li>
    <li>
    <Link href="/profile" className={`flex items-center justify-start space-x-4 mt-6 hover:font-bold 
          ${pathName=='/profile' ? "font-bold":""}`}>
            <User2 height={25} width={25}/>
            <h3 className='text-lg lg:text-xl'>Profile</h3>
      </Link> 
    </li> 
    <li className='flex items-center absolute bottom-10'>
       <SignOutBtn/>
       <ThemeToggleBtn/>
    </li>
 </ul>
  )
}
