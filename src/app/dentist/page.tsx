import DentistCard from "@/components/DentistCard";
import getDentists from "@/libs/getDentists";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import DentistCardForAdmin from "@/components/DentistCardfForAdmin";
import Link from "next/link";

export default async function DentistPage() {
    
    //console.log(dentist);

    const session = await getServerSession(authOptions);
    const dentist = await getDentists();
    const profile = await getUserProfile(session.user.token);

    return(
        <main>
            <div>DentistPage</div>
            {
                (profile.data.role == "admin") ?
                <div>
                    {
                        dentist.data.map((dentistItem:Object) => (
                            <DentistCardForAdmin dentName = {dentistItem.name} yearExp={dentistItem.year_exp} clinic={dentistItem.clinic} did={dentistItem._id}/> 
                        ))
                    }   
                    <Link href={"/dentist/createdentist"}>
                        <button className="bg-green-400">Create</button>
                    </Link>                         

                </div>
                :
                <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap",justifyContent:"space-around", alignContent:"space-around"}}>
                    {
                        dentist.data.map((dentistItem:Object) => (
                            <DentistCard dentName = {dentistItem.name} yearExp={dentistItem.year_exp} clinic={dentistItem.clinic} /> 
                        ))
                    }
                </div>
            }
            
        </main>
        
    );
}