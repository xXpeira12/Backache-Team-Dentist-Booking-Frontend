// createBooking.ts
import { redirect } from "next/navigation";
import Booking from "@/db/models/Booking";
import { dbConnect } from "@/db/dbConnect";

export async function createBooking(createBookingForm: FormData, session: any) {
  const user = session.user.name;
  const dentist = createBookingForm.get("dentist");
  const bookDate = createBookingForm.get("bookDate");
  const createdAt = new Date();

  try {
    await dbConnect();
    const booking = await Booking.create({
      user: user,
      dentist: dentist,
      bookDate: bookDate,
      createdAt: createdAt,
    });
  } catch (error) {
    console.log(error);
  }

  // revalidateTag('booking');
  redirect("/booking");
}