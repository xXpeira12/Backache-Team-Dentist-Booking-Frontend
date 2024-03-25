"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dayjs ,{ Dayjs } from "dayjs";
import Link from "next/link";
import getUserProfile from "@/libs/getUserProfile";
import { useRouter } from "next/navigation";

interface Dentist {
  _id: string,
  name: string,
  year_exp: number,
  clinic: string,
  createdAt: string,
  bookings: any[],
}


export default function ChooseDentistPage() {
  // const session = getServerSession(authOptions);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [remaindentist, setRemaindentist] = useState<Set<Dentist>>(new Set());
  const searchParams = useSearchParams();
  const bookDate = searchParams.get("bookDate");
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const [profile, setProfile] = useState();
  const router = useRouter();
  
  
  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const data = await getUserProfile(token as string);
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
  
  
  
  // console.log(dayjs(bookDate).format("YYYY-MM-DDTHH:mm:ss"))
  // console.log(token)
  // console.log(userId)
  
  const handleBooking = async (event: React.FormEvent<HTMLFormElement>, dentistId: string) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/api/v1/dentists/${dentistId}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          "user": userId,
          "bookDate": dayjs(bookDate).format("YYYY-MM-DDTHH:mm:ss")
        })
      });

      if (response.ok) {
        // Handle success, maybe show a success message
        console.log("Booking created successfully!");
      } else {
        // Handle error response from the server
        console.error("Failed to create booking:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };
  
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
                <button className="bg-blue-300 m-2 p-2 rounded-lg hover:bg-indigo-500" 
                  onClick={(event) => {
                    handleBooking(event, dentist._id);
                    router.push(`/dashboard/${userId}`);
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