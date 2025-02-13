"use client"
import { ClerkLoaded, SignedIn, SignIn, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import React from 'react'
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import { User } from '@clerk/nextjs/server';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Header() {
  const { user } = useUser();
  console.log(user);

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.error("Error", JSON.stringify(error, null, 2));
    }

  }

  return (
    <header className='flex flex-wrap justify-between items-center px-4 py-2 w-full'>
      {/* Top row */}
      <div className='flex flex-wrap  w-full items-center gap-4'>

        {/* Logo */}
        <Link className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer flex-shrink-0' href='/'>
          Shopr
        </Link>

        {/* Search Bar */}
        <Form action={'/search'} className='flex-1 min-w-[300px] md:w-full'>
          <Input
            type='text'
            name='query'
            placeholder='Search'
            className='border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                 focus:border-transparent w-full rounded'
          />
        </Form>

        {/* Right Side (Basket, Orders, User) */}
        <div className='flex items-center space-x-2 sm:space-x-4 w-auto justify-center sm:justify-start flex-shrink-0'>
          <Link
            href='/basket'
            className='flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded font-bold min-w-max'
          >
            <TrolleyIcon className='w-6 h-6' />
            <span>Basket</span>
          </Link>

          <ClerkLoaded>
            <SignedIn>
              <Link
                href='/orders'
                className='flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded font-bold min-w-max'
              >
                <PackageIcon className='w-6 h-6' />
                <span>Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className='flex items-center space-x-2'>
                <UserButton />
                <div className='hidden sm:block text-xs'>
                  <p className='text-gray-400'>Welcome back, {user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode='modal' />
            )}

            {user?.passkeys.length === 0 && (
              <Button variant={"outline"} onClick={createClerkPasskey} className='text-blue-500 underline min-w-max'>
                Create a passkey
              </Button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>


  )
}
