"use client";
import { useSearchParams } from "next/navigation";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs,{ Dayjs } from "dayjs";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function editBookingPage({
  params,
}: {
  params: { bid: string };
}) {
  const urlParams = useSearchParams();
  const bookDate = urlParams.get("bookDate");
  const [newBookDate, setNewBookDate] = useState<Dayjs|null>(null);
  const bookingId = params.bid;

  return (
    <div>
      <div className="flex flex-col justify-center items-center my-4 py-2 ">
        <div>Booking ID : {params.bid}</div>
        <div>Old Date : {bookDate}</div>
      </div>
      <div className="w-full h-[40%] text-center items-center justify-center flex flex-col my-4 py-4 space-y-2">
        <h1>Choose Date</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            views={["year", "month", "day", "hours", "minutes", "seconds"]}
            className="bg-white"
            value={newBookDate}
            format="YYYY/MM/DD HH:00:00"
            onChange={(value) => {
              setNewBookDate(value);
            }}
          />
        </LocalizationProvider>
        <Link
          href={`/dashboard/editbooking/choosedentist/${bookingId}?bid=${bookingId}&bookDate=${dayjs(newBookDate).format("YYYY-MM-DDTHH:00:00")}`}
        >
          <button className="bg-blue-300 m-2 p-2 rounded-lg hover:bg-indigo-500">
            next
          </button>
        </Link>
      </div>
    </div>
  );
}
