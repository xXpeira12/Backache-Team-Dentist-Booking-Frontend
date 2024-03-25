// import { useSearchParams } from "next/navigation";
// import getDentists from "@/libs/getDentists";


// export default async  function ChooseDentistPage({ params }: { params: any}) {
//     const dentists = await getDentists();
//     const remaindentist = new Set<Object>();
//     const urlParams = useSearchParams();
//     const bookDate = urlParams.get("bookDate");

//     // console.log(dentists.data);

//     // dentists.data.map((dentist: Object) => {
//     //     // console.log(dentist.bookings)
//     //     const remaindentist = dentist.bookings.filter((booking: Object) => {
//     //         console.log(booking.dentist)
//     //         console.log(booking.bookDate)
//     //     })
//     // })


  
//     dentists.data.map((dentist: any) => {
//         if(dentist.bookings.length === 0){
//             remaindentist.add(dentist)
//         }else
//         dentist.bookings.filter((booking: any) => {
//         //         console.log(booking.bookDate.toString())
//                 if(booking.bookDate.toString() !== bookDate){
//                 remaindentist.add(dentist)
//                 }
//             })
//         })

//     // console.log(remaindentist);


//     return (
//         <>
//             <h1>Choose Dentist</h1>
//             <div>
//                 <h2>Available Dentists</h2>
//                 <div>
//                     {Array.from(remaindentist).map((dentist: any) => (
//                         <div key={dentist._id}>
//                             <h3>{dentist.name}</h3>
//                             <p>Experience: {dentist.year_exp}</p>
//                             <p>Clinic: {dentist.clinic}</p>
//                             <p>CreatedAt: {dentist.createdAt}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }

"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dayjs ,{ Dayjs } from "dayjs";
import Link from "next/link";
import createBooking from "@/libs/createBooking";
import Booking from "@/db/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { set } from "mongoose";
import getUserProfile from "@/libs/getUserProfile";

interface Dentist {
  _id: string,
  name: string,
  year_exp: number,
  clinic: string,
  createdAt: string,
  bookings: any[],
}

interface profile {
  _id: string,
  name: string,
  email: string,
  tel: string,
  role: string,
  createdAt: string,
}


export default function ChooseDentistPage() {
  // const session = getServerSession(authOptions);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [remaindentist, setRemaindentist] = useState<Set<Dentist>>(new Set());
  const searchParams = useSearchParams();
  const bookDate = searchParams.get("bookDate");
  const token = searchParams.get("token");
  const [profile, setProfile] = useState(null);
  
  console.log("--------------------")
  console.log(token)
  console.log(profile)
  
  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const response = await getUserProfile(token);
        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [])

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/dentists");
        const data = await response.json();
        setDentists(data.data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };
    
    fetchDentists();
  }, []);
  
  useEffect(() => {
    const filteredDentists = new Set<Dentist>();
    
    dentists.map((dentist: Dentist) => {
      if (dentist.bookings.length === 0) {
        filteredDentists.add(dentist);
      } else {
        dentist.bookings.filter((booking: any) => {
          if (booking.bookDate !== bookDate) {
            filteredDentists.add(dentist);
          }
        });
      }
    });
    
    setRemaindentist(filteredDentists);
  }, [dentists]);



  
  // async function createBooking(userId: string, dentistId: string, bookDate: Date) {
  //   'use server'
  //   const booking = new Booking({userId, dentistId, bookDate });
  //   await booking.save();
  // }
  
  return (
    <>
      <h1 className="text-center m-2 text-xl font-semibold">Choose Dentist</h1>
      <div>
        <h2 className="text-center m-2 text-md font-semibold">Available Dentists</h2>
        <div className="w-full items-center justify-center flex flex-row m-2">
          {Array.from(remaindentist).map((dentist: Dentist) => (
            <div key={dentist._id} className="m-8 p-4 border border-green-600 bg-green-200 rounded-lg justify-start items-start">
              <h3 className="text-lg">Dr. {dentist.name}</h3>
              <h1>Experience: {dentist.year_exp} Years</h1>
              <h1>Clinic: {dentist.clinic}</h1>
              <h1>CreatedAt: {dentist.createdAt} </h1>
              <Link href={"/booking/dashboard"}
              // href={`/booking/dashboard/?dentist=${dentist._id}&bookDate=${bookDate}`}
              >
                <button className="bg-blue-300 m-2 p-2 rounded-lg hover:bg-indigo-500" 
                  onClick={() => createBooking(profile._id, dentist._id, dayjs(bookDate).toDate())}
                >Select</button>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}