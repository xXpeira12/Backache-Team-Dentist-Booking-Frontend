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
// console.log(token);

    return (
        <div className="w-full h-[40%] text-center items-center justify-center flex flex-col my-4 py-4 space-y-2">
            <h1>Choose Date</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                    className="bg-white"
                    value={bookDate}
                    format="YYYY/MM/DD HH:00:00"
                    onChange={(value) => {setBookDate(value)}}
                />
            </LocalizationProvider>
            <Link href={`/booking/choosedentist/?token=${token}&bookDate=${bookDate}`} >
            <button className="bg-blue-300 m-2 p-2 rounded-lg hover:bg-indigo-500">next</button>
            </Link>
        </div>
    )
}