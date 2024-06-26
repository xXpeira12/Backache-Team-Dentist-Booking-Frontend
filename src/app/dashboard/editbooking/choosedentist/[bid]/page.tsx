"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dayjs ,{ Dayjs } from "dayjs";
import Link from "next/link";
import getUserProfile from "@/libs/getUserProfile";
import { useRouter } from "next/navigation";
import getBooking from "@/libs/getBooking";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";

interface Dentist {
  _id: string,
  name: string,
  year_exp: number,
  clinic: string,
  createdAt: string,
  bookings: any[],
}


export default function ChooseDentistPage() {
  const { data: session } = useSession();
  const token = session?.user.token;
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [remaindentist, setRemaindentist] = useState<Set<Dentist>>(new Set());
  const [booking, setBooking] = useState<any>(null);
  const searchParams = useSearchParams();
  const bookDate = searchParams.get("bookDate");
  // const token = searchParams.get("token");
  const bookingId = searchParams.get("bid");
  const router = useRouter();

    

    useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBooking(token as string, bookingId as string);
        console.log(data)
        setBooking(data.data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };
    
    fetchBooking();
  }, []);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists`);
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
    console.log("check : " + dentists);
    
    dentists.map((dentist: Dentist) => {
      console.log(dentist)
      let isOut = false;
      if (dentist.bookings.length === 0) {
        console.log("Dentist not have Booking")
        filteredDentists.add(dentist);
      } else {
        console.log("Check Dentist have already booked?")
        dentist.bookings.forEach((booking: any) => {
          console.log(booking.bookDate);
          console.log((booking.bookDate).substring(0,19));
          console.log(bookDate);
          if ((booking.bookDate).substring(0,19) == bookDate) {
            isOut = true;
          }
        }
        );
        if (isOut) {
          filteredDentists.delete(dentist);
        } else {
          filteredDentists.add(dentist);
        }
      }
    });
    
    setRemaindentist(filteredDentists);
  }, [dentists]); 
  
  
  
  
  
  const handleBooking = async (dentistId: string) => {
    
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          "dentist": dentistId,
          "bookDate": bookDate,
          "user": booking.user
        })
      });

      if (response.ok) {
        // Handle success, maybe show a success message
        console.log("Booking created successfully!");
        revalidateTag('bookings');
      } else {
        // Handle error response from the server
        console.error("Failed to create booking:", response.statusText);
        alert("Failed create booking, Please try again");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      // alert("Failed create booking, Please try again");
    }
  };

//   console.log(dayjs(bookDate).format("YYYY-MM-DDTHH:mm:ss"))
//   console.log(token)
//   console.log(booking)
console.log(bookDate);
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
                <button className="bg-blue-300 m-2 p-2 rounded-lg hover:bg-indigo-500" 
                  onClick={() => {
                    handleBooking(dentist._id);
                    router.push(`/dashboard/${session?.user._id}`);
                  }}>
                  Select
                </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}