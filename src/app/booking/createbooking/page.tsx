// "use client"
// import { DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { Dayjs } from "dayjs";
// import { Select, MenuItem, TextField, Menu } from "@mui/material";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import getUserProfile from "@/libs/getUserProfile";
// import getDentists from "@/libs/getDentists";
// import Booking from "@/db/models/Booking";
// import { dbConnect } from "@/db/dbConnect";
// import { redirect } from "next/navigation";
// import Link from "next/link";

// export default async function CreateBookingPage() {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user.token) {
//     return <Link href={"/api/auth/signin"}>Please Sign in</Link>;
//   }
//   const createBooking = async (createBookingForm: FormData) => {
//     "use server"
//     const user = session.user.name;
//     const dentist = createBookingForm.get("dentist");
//     const bookDate = createBookingForm.get("bookDate");
//     const createdAt = new Date();
    
//     try {
//       await dbConnect();
//       const booking = await Booking.create({
//         user: user,
//         dentist: dentist,
//         bookDate: bookDate,
//         createdAt: createdAt,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     // revalidateTag('booking');
//     redirect("/booking");
//   };

//   const dentistsJson = await getDentists();
  
//   return (
//     <div>
//       Create Booking
//       <form action={createBooking}>
//         <div>
//           {/* waiting for dentist first */}
//           <label htmlFor="dentist">Dentist ID</label>
//           <Select id="dentist" name="dentist">
//             {
//             dentistsJson.map((dentist: any) => (
//               <MenuItem value={dentist.id}>{dentist.name}</MenuItem>
//             ))}
//           </Select>
//         </div>
//         <div>
//           <label htmlFor="bookDate">Booking Date</label>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               className="bg-white"
//               value={new Date()}
//             />
//           </LocalizationProvider>
//         </div>
//         <button type="submit">Create Booking</button>
//       </form>
//     </div>
//   );
// }
// page.tsx
"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getDentists from "@/libs/getDentists";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { createBooking } from "./createBooking";

export default async function CreateBookingPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    return <Link href={"/api/auth/signin"}>Please Sign in</Link>;
  }

  const dentistsJson = await getDentists();

  return (
    <div>
      <h1>Create Booking</h1>
      <BookingForm dentists={dentistsJson} onSubmit={(data) => createBooking(data, session)} />
    </div>
  );
}