import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Booking from "@/db/models/Booking";
import { dbConnect } from "@/db/dbConnect";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CreateBookingPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    return <Link href={"/api/auth/signin"}>Please Sign in</Link>;
  }
  const profile = await getUserProfile(session.user.token);
  const createBooking = async (createBookingForm: FormData) => {
    "use server";
    const user = profile.data._id;
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
  };

  return (
    <div>
      Create Booking
      <form action={createBooking}>
        <div>
          {/* waiting for dentist first */}
          <label htmlFor="dentist">Dentist ID</label>
          <input
            type="text"
            required
            id="dentist"
            name="dentist"
            placeholder="Doctor ID"
          />
        </div>
        <div>
          <label htmlFor="bookDate">Booking Date</label>
          <input type="datetime-local" required id="bookDate" name="bookDate" />
        </div>
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}
