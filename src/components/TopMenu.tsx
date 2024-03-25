"use client"

import TopMenuItem from './TopMenuItem';
import styles from './topmenu.module.css'
import Image from 'next/image'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';
import Head from 'next/head';
import { IonIcon } from '@ionic/react';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';



export default async function TopMenu() {
    

    const [showMenu, setShowMenu] = useState(false); // State to control dropdown menu visibility

    const session = await getServerSession(authOptions)

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return(
        <div className="font-[Poppins] bg-white border-t border-b border-gray-300 flex flex-row items-center justify-between md:h-[50px] px-4 md:px-0 md:justify-center">
            <div className="flex items-center">
                <Link href='/'>
                    <Image src={'/img/medical.png'}
                    className="h-[50px] w-auto ml-4 md:ml-0 "
                    alt='logo'
                    width={0}
                    height={0}
                    sizes='100vh'/>
                </Link>

                {/* Hamburger menu icon for smaller screens */}
                <div className="md:hidden ml-auto" onClick={toggleMenu}>
                    {showMenu ? <FaTimes className="text-gray-600 text-3xl" /> : <FaBars className="text-gray-600 text-3xl" />}
                </div>
            </div>

            {/* Navigation links */}
            <ul className={`md:flex items-center gap-4 ${showMenu ? 'block' : 'hidden'}`}>
                <li className="hover:text-gray-500"><TopMenuItem title='Reservations' pageRef='/reservations'/></li>
                <li><TopMenuItem title='Dentists' pageRef='/dentist'/></li>
                <li><TopMenuItem title='Dashboard' pageRef={`/dashboard/${session?.user._id}`}/></li>
                <li><TopMenuItem title='Booking' pageRef={`/booking/choosedate/?token=${session?.user.token}&uid=${session?.user._id}`}/></li>
                <li><TopMenuItem title='Register' pageRef='/register'/></li>
            </ul>

            {/* Sign-in/Sign-out button */}
            <div className="flex items-center">
                {session ? 
                    <Link href="../api/auth/signout">
                        <div className="hidden md:flex items-center h-10 px-4 text-white text-sm bg-blue-300 hover:bg-blue-600 rounded-full">
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




// import TopMenuItem from './TopMenuItem';
// import styles from './topmenu.module.css'
// import Image from 'next/image'
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { Link } from '@mui/material';
// import Head from 'next/head';

// export default async function TopMenu() {


//     const session = await getServerSession(authOptions)
    

//     return(
//             <div className="font-[Poppins] h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row items-center">
                
//                 <div>
//                     <Link href='/'>
//                         <Image src={'/img/medical.png'}
//                         className="h-[50px] w-auto ml-[10px]"
//                         alt='logo'
//                         width={0}
//                         height={0}
//                         sizes='100vh'/>
//                     </Link>
//                 </div>
                

//                 <div className = "flex justify-between items-center w-[92%] mx-auto">
//                     <ul className='flex items-center gap-[4vw]  justify-center'>
//                         <li>
//                             <div className='hover:text-gray-500'><TopMenuItem title='Reservations' pageRef='/reservations'/></div>
//                         </li>
//                         {/* <TopMenuItem title='About' pageRef='/about'/> */}
//                         <li>
//                             <TopMenuItem title='Dentists' pageRef='/dentist'/>
//                         </li>
//                         <li>
//                             <TopMenuItem title='Dashboard' pageRef={`/dashboard/${session?.user._id}`}/>
//                         </li>
//                         <li>
//                             <TopMenuItem title='Booking' pageRef={`/booking/choosedate/?token=${session?.user.token}&uid=${session?.user._id}`}/>
//                         </li>
//                         <li>
//                             <TopMenuItem title='Register' pageRef='/register'/>
//                         </li>
//                     </ul>
//                 </div>
                
//                 <div className='absolute right-0 h-full flex flex-row'>
//                 {
//                     session ? <Link href="../api/auth/signout">
//                         <div className='flex items-center h-[30px] my-[5px] mx-[60px] px-[20px] py-[20px] text-white text-sm right-0 hover:bg-blue-600 rounded-full bg-blue-300'>
//                         Sign-Out of {session.user?.name}</div></Link> :
//                     <Link href="../api/auth/signin"><div className='flex items-center h-[30px] my-[5px] mx-[60px] px-[20px] py-[20px] text-white text-sm right-0 hover:bg-blue-600 rounded-full bg-blue-300'>
//                         Sign-In</div></Link>
//                 }
                
//                 </div>

                
//             </div>

//     );
// }