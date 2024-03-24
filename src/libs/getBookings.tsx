export default async function getBookings(token:string) {

    await new Promise( (resolve) => {
        setTimeout(resolve, 500);
    } )

    const response = await fetch("http://localhost:5000/api/v1/bookings", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    if(!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    return await response.json();
}