import DentistCard from "@/components/DentistCard";
import getDentists from "@/libs/getDentists";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import DentistCardForAdmin from "@/components/DentistCardfForAdmin";
import Link from "next/link";
import { dbConnect } from "@/db/dbConnect";
import Dentist from "@/db/models/Dentist";

export default async function DentistPage() {
    
    //console.log(dentist);

    const session = await getServerSession(authOptions);
    const dentists = await getDentists();
    const profile = await getUserProfile(session.user.token);

  
    const deleteDentist = async (deleteForm: FormData ) =>{
    'use server'
    try{
      await dbConnect();
      var dentist = await Dentist.deleteOne({_id: deleteForm.get("did")})
      window.location.reload();
    } 
    catch(error){
      console.log(error);
    }
  }

    return(
        <main>
            <div>DentistPage</div>
            {
                (profile.data.role == "admin") ?
                <div>
                    {
                        dentists.data.map((dentistItem:Object) => (
                            <div>
                            <DentistCardForAdmin dentName = {dentistItem.name} yearExp={dentistItem.year_exp} clinic={dentistItem.clinic} did={dentistItem._id}/> 
                               <form action = {deleteDentist} >
                                    <input type="text" hidden required id="did" name="did" value={dentistItem._id}/>
                                    <button className="ml-2 bg-red-400">Delete</button>
                                </form>
                            </div>
                        ))
                    }   
                    <Link href={"/dentist/createdentist"}>
                        <button className="bg-green-400">Create</button>
                    </Link>                         

                </div>
                :
                <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap",justifyContent:"space-around", alignContent:"space-around"}}>
                    {
                        dentists.data.map((dentistItem:Object) => (
                            <DentistCard dentName = {dentistItem.name} yearExp={dentistItem.year_exp} clinic={dentistItem.clinic} /> 
                        ))
                    }
                </div>
            }
            
        </main>
        
    );
}

// 'use client'

// import DentistCard from "@/components/DentistCard";
// import getDentists from "@/libs/getDentists";
// import { useState, useEffect } from "react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import getUserProfile from "@/libs/getUserProfile";
// import DentistCardForAdmin from "@/components/DentistCardfForAdmin";
// import Link from "next/link";
// import { dbConnect } from "@/db/dbConnect";
// import Dentist from "@/db/models/Dentist";

// export default function DentistPage() {
//     const [dentists, setDentists] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [session, setSession] = useState(null);
//     const [profile, setProfile] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const session = await getServerSession(authOptions);
//                 const profile = await getUserProfile(session.user.token);
//                 const dentistsData = await getDentists();
//                 setSession(session);
//                 setProfile(profile);
//                 setDentists(dentistsData.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const deleteDentist = async (dentistId: any) => {
//         try {
//             await dbConnect();
//             await Dentist.findByIdAndDelete({ _id: dentistId });
//             const updatedDentists = dentists.filter((dentist) => dentist._id !== dentistId);
//             setDentists(updatedDentists);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     if (loading) return <div>Loading...</div>;

//     return (
//         <main>
//             <div>DentistPage</div>
//             {profile.data.role === "admin" ? (
//                 <div>
//                     {dentists.map((dentistItem) => (
//                         <div key={dentistItem._id}>
//                             <DentistCardForAdmin dentName={dentistItem.name} yearExp={dentistItem.year_exp} clinic={dentistItem.clinic} did={dentistItem._id} />
//                             <button className="ml-2 bg-red-400" onClick={() => deleteDentist(dentistItem._id)}>Delete</button>
//                         </div>
//                     ))}
//                     <Link href={"/dentist/createdentist"}>
//                         <button className="bg-green-400">Create</button>
//                     </Link>
//                 </div>
//             ) : (
//                 <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
//                     {dentists.map((dentistItem) => (
//                         <DentistCard key={dentistItem._id} dentName={dentistItem.name} yearExp={dentistItem.year_exp} clinic={dentistItem.clinic} />
//                     ))}
//                 </div>
//             )}
//         </main>
//     );
// }

