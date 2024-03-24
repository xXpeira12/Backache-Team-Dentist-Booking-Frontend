import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getBookings from "@/libs/getBookings"
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";

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
                            <button className="bg-blue-300">Edit</button>
                            <button className="bg-blue-300 ml-2">Delete</button>
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
                            <button className="bg-blue-300">Edit</button>
                            <button className="bg-blue-300 ml-2">Delete</button>
                        </div>
                        ))
                    }
                </div> :
                null
            }
        </main>
    )
}