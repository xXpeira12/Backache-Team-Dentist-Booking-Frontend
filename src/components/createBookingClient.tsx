// CreateBookingClient.tsx
// "use client";

// import { createContext } from "react";
// import Link from "next/link";
// import BookingForm from "@/components/BookingForm";
// import { createBooking } from "@/app/booking/createbooking/createBooking";

// export const SessionContext = createContext<any>(null);

// export default function CreateBookingClient({ session, dentists }: { session: any; dentists: any[] }) {
//   if (!session || !session.user.token) {
//     return <Link href={"/api/auth/signin"}>Please Sign in</Link>;
//   }

//   return (
//     <SessionContext.Provider value={session}>
//       <div>
//         <h1>Create Booking</h1>
//         <BookingForm dentists={dentists} onSubmit={(data) => createBooking(data)} />
//       </div>
//     </SessionContext.Provider>
//   );
// }