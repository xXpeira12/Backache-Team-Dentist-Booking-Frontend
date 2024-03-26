"use client"
import TopMenuItem from './TopMenuItem';
import Image from 'next/image'
import { Link } from '@mui/material';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

export default function TopMenu() {
    
    const [showMenu, setShowMenu] = useState(false); // State to control dropdown menu visibility

    const { data: session } = useSession();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return(
        <div className="font-[Poppins] bg-red-300 border-b border-gray-300 flex flex-row items-center justify-between md:h-[50px] px-4 md:px-0 md:justify-center">
            <div className="">
                <Link href='/'>
                    <Image src={'/img/medical.png'}
                    className="h-[40px] w-auto ml-4 md:ml-0 "
                    alt='logo'
                    width={0}
                    height={0}
                    sizes='100vh'/>
                </Link>

                {/* Hamburger menu icon for smaller screens */}
                <div className="md:hidden ml-auto" onClick={toggleMenu}>
                    {
                        showMenu ? <FaTimes className="text-gray-600 text-3xl"  /> : <FaBars className="text-gray-600 text-3xl" />
                    }
                </div>
            </div>

            {/* Navigation links */}
            <ul className={`md:flex items-center gap-12 ${showMenu ? 'block' : 'hidden'}`}>
                <li><TopMenuItem title='Reservations' pageRef='/reservations'/></li>
                <li><TopMenuItem title='Dentists' pageRef='/dentist'/></li>
                <li><TopMenuItem title='Dashboard' pageRef={`/dashboard/${session?.user._id}`}/></li>
                <li><TopMenuItem title='Booking' pageRef='/booking/choosedate'/></li>
                <li><TopMenuItem title='Register' pageRef='/register'/></li>
            </ul>

            {/* Sign-in/Sign-out button */}
            <div className="flex items-center ">
                {session ? 
                    <Link href="../api/auth/signout">
                        <div className="hidden left-0 md:flex items-center h-10 px-4 text-white text-sm bg-blue-300 hover:bg-blue-600 rounded-full">
                            Sign-Out of {session.user?.name}
                        </div>
                    </Link> :
                    <Link href="../api/auth/signin">
                        <div className="hidden md:flex items-center h-10 px-4 text-white text-sm bg-blue-300 hover:bg-blue-600 rounded-full">
                            Sign-In
                        </div>
                    </Link>
                }
            </div>
        </div>
    );
}