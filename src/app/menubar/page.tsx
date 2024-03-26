import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import  React from 'react'

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Team', href: '/', current: false },
  { name: 'Projects', href: '/', current: false },
  { name: 'Calendar', href: '/', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          
        </>
      )}
    </Disclosure>
  )
}