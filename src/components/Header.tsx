"use client"
import { ClerkLoaded, SignedIn, SignIn, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import React from 'react'
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import { User } from '@clerk/nextjs/server';

export default function Header() {
  const { user } = useUser();
  console.log(user);

  const createClerkPasskey = async () => { }

  return (
    <header className='flex flex-wrap  justify-between items-center px-4 py-2'>
      {/* Top row */}
      <div className='flex flex-wrap w-full justify-between items-center'>
        <Link className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0' href='/'>
          Shopr
        </Link>
        <Form action={'/search'}>
          <input type='text' name='query' placeholder='Search' className='border border-gray-300  p-1
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-w-4xl w-full rounded' />

        </Form>
        <div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
          <Link href='/basket' className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded font-bold'>
            <TrolleyIcon className='w-6 h-6' />
            <span className=''>Basket</span>
          </Link>
          <ClerkLoaded>
            <SignedIn>

              <Link href='/orders' className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded font-bold'>
                <PackageIcon className='w-6 h-6' />
                <span>Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className='flex items-center space-x-2'>
                <UserButton />
                <div className='hidden sm:block text-xs'>
                  <p className='text-gray-400'>
                    Welcome back, {user.fullName}
                  </p>
                </div>
              </div>
            ) : (
              <SignInButton mode='modal' />
            )}

            {user?.passkeys.length === 0 && (
              <button onClick={createClerkPasskey} className='text-blue-500 underline'>Create a passkey</button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  )
}
