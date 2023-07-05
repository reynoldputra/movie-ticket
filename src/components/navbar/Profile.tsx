import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { MdPayments } from 'react-icons/md'



export default function ProfileNavbar() {
  return (
    <div className="w-64">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                h-full flex items-center justify-center text-white gap-6`}
            >
              <p className="font-bold">Username</p>
              <div className="h-8 w-8 bg-white rounded-md flex justify-center items-center">
                <CgProfile className="h-6 w-auto text-gray-400/90" />
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-xs -translate-x-44 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-gray-50 p-4">
                    <div
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="block text-sm text-gray-500">
                        My balance
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        IDR 200.000
                      </span>
                    </div>
                  </div>
                  <div className='py-2 bg-white'>
                    <Link href="/topup">
                      <div
                        className="flex items-center px-4 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <MdPayments className="text-green-400 h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-black">
                            Top up
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div
                      className="flex items-center px-4 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                        <BiLogOut className="text-red-400 h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-black">
                          Log out
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
