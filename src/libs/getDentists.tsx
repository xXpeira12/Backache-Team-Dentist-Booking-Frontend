export default async function getDentists() {

    await new Promise( (resolve) => {
        setTimeout(resolve, 500);
    } )

    const response = await fetch("http://localhost:5000/api/v1/dentists");
    if(!response.ok) {
        throw new Error("Failed to fetch dentists");
    }
    return await response.json();
}