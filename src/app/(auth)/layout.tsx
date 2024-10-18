import AlreadyLoggedIn from '@/components/already-logged-in/already-logged-in'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children : React.ReactNode
}

const Layout = async({children}: Props) => {
    const user = await currentUser();
    // if(user) return <AlreadyLoggedIn />
    if(user) redirect('/dashboard')
  return (
    <>{children}</>
  )
}

export default Layout