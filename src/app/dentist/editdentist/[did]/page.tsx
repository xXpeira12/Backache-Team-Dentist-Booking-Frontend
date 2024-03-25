import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Dentist from "@/db/models/Dentist";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function editDentistPage() {

    const editdentist = async (createDentistForm: FormData) => {
        'use server'
        const name = createDentistForm.get("name");
        const year_exp = createDentistForm.get("year_exp");
        const clinic = createDentistForm.get("clinic");

        try {
            await dbConnect();
            const dentist = await Dentist.create({
                "name": name,
                "year_exp": year_exp,
                "clinic": clinic
            })
        } catch(error) {
            console.log(error);
        }
        // revalidateTag('dentists');
        redirect("/dentist");
    }
    
    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) {
        return(
            <div>
                Please Sign-In
            </div>
        )
    }

    const profile = await getUserProfile(session.user.token);

    return(
        (profile.data.role != "admin") ?
        <div>
            You are not Admin
        </div> :
        <div>
            Create Dentists
            <form action={createDentist}>
                <div>
                    <label htmlFor="name">Dentist Name</label>
                    <input type="text" required id="name" name="name" placeholder="Name"/>
                </div>
                <div>
                    <label htmlFor="year_exp">Year Experience</label>
                    <input type="number" required id="year_exp" name="year_exp" placeholder="Year Experience"/>
                </div>
                <div>
                    <label htmlFor="clinic">Work At Clinic</label>
                    <input type="text" required id="clinic" name="clinic" placeholder="Clinic"/>
                </div>
                <button type="submit">
                    Create new Dentist
                </button>
            </form>
        </div>
    )
}
