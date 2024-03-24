import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getBookings from "@/libs/getBookings"
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { dbConnect } from "@/db/dbConnect";
import Booking from "@/db/models/Booking";

export default async function dashBoardPage( {params} : {params:{uid:string}} ) {

    const session = await getServerSession(authOptions);

    if(!session || !session.user.token) {
        return(
            <div>
                Please Sign-In
            </div>
        )
    }

    const bookings = await getBookings(session.user.token);
    const filteredBookings = bookings.data.filter((bookItem: Object) => bookItem.user == params.uid);

    const profile = await getUserProfile(session.user.token);

    const deleteBooking = async (deleteForm: FormData) => {
        'use server'
        try {
            await dbConnect();
            const booking = await Booking.deleteOne({_id: deleteForm.get("bid")})
        } catch(error) {
            console.log(error);
        }
    };

    return(
        <main>
            <div>Your Bookings</div>
            {
                (filteredBookings.length == 0) ?
                <div>
                    You don't have any booking
                </div> :
                (
                    filteredBookings.map((bookItem: Object) => (
                        <div key={bookItem._id}>
                            <div>Booking ID : {bookItem._id}</div>
                            <div>Booking Date : {bookItem.bookDate}</div>
                            <div>Dentist : {bookItem.dentist.name}</div>
                            <Link href={`/dashboard/editbooking/${bookItem._id}?bookDate=${encodeURIComponent(bookItem.bookDate)}`}>
                                <button className="bg-blue-300">Edit</button>
                            </Link>
                            <form action={deleteBooking}>
                                <input type="text" hidden required id="bid" name="bid" value={bookItem._id}/>
                                <button type="submit" className="bg-blue-300 ml-2">Delete</button>
                            </form>
                        </div>
                    ))
                )

            }
            {
                (profile.data.role == "admin") ?
                <div>
                    <hr/>
                    All Bookings
                    {
                        bookings.data.map((bookItem: Object) => (
                            <div key={bookItem._id}>
                            <div>Booking ID : {bookItem._id}</div>
                            <div>Booking Date : {bookItem.bookDate}</div>
                            <div>User ID : {bookItem.user}</div>
                            <div>Dentist : {bookItem.dentist.name}</div>
                            <Link href={`/dashboard/editbooking/${bookItem._id}?bookDate=${encodeURIComponent(bookItem.bookDate)}`}>
                                <button className="bg-blue-300">Edit</button>
                            </Link>
                            <form action={deleteBooking}>
                                <input type="text" hidden required id="bid" name="bid" value={bookItem._id}/>
                                <button type="submit" className="bg-blue-300 ml-2">Delete</button>
                            </form>
                        </div>
                        ))
                    }
                </div> :
                null
            }
        </main>
    )
}