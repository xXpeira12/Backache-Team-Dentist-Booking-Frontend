'use client'
import { useSearchParams } from "next/navigation";

export default function editBookingPage({ params }: { params: { bid: string} }) {

    const urlParams = useSearchParams();
    const bookDate = urlParams.get('bookDate');

    return (
        <div>
            <div>Booking ID : {params.bid}</div>
            <div>Old Date : {bookDate}</div>
        </div>
    );
}
