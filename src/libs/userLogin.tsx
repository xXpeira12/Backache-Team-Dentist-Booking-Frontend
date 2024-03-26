export default async function userLogin(userEmail:string, userPassword: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    });

    if(!response.ok) {
        throw new Error('Failed to log-in');
    } else {
        return await response.json();
    }
}