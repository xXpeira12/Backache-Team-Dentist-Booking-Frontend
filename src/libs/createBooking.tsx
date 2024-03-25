

export default async function createBooking(uid: string, did: string, bookDate: Date) {
    const response = await fetch(`http://localhost:5000/api/v1/dentists/${did}/bookings`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        user: uid,
        dentist: did,
        bookDate: bookDate,
        createdAt: new Date(),
        }),
    });
    const data = await response.json();
    return data;
}