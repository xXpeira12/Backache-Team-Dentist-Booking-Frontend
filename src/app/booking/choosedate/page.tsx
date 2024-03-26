"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { TimePicker } from "@mui/x-date-pickers"
import { DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { Dayjs } from "dayjs"
import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"


export default function ChooseDatePage() {

const [bookDate, setBookDate] = useState<Dayjs|null>(null);
const urlParams = useSearchParams();
const token = urlParams.get("token");
const userId = urlParams.get("uid");

    return (
        <div className="bg-blue-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="w-full text-center items-center justify-center flex flex-col my-4 py-4 space-y-2">
            <h1 className="text-2xl font-semibold text-blue-700">Choose Date</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                className="bg-white border border-blue-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={bookDate}
                format="YYYY/MM/DD HH:00:00"
                onChange={(value) => {
                  setBookDate(value);
                }}
              />
            </LocalizationProvider>
            <Link
              href={`/booking/choosedentist/?token=${token}&userId=${userId}&bookDate=${bookDate}`}
            >
              <button className="bg-blue-300 m-2 p-2 rounded-lg hover:bg-indigo-500 text-white">
                next
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
}