import DentistCard from "@/components/DentistCard";
import getDentists from "@/libs/getDentists";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import DentistCardForAdmin from "@/components/DentistCardfForAdmin";
import Link from "next/link";
import { dbConnect } from "@/db/dbConnect";
import Dentist from "@/db/models/Dentist";
import deleteDentist from "@/libs/deleteDentist";

export default async function DentistPage() {
  //console.log(dentist);

  const session = await getServerSession(authOptions);
  const dentists = await getDentists();
  const profile = await getUserProfile(session.user.token);
  const token = session?.user.token as string;

  const DeleteDentist = async (deleteForm: FormData) => {
    "use server";
    try {
      //   await dbConnect();
      //   var dentist = await Dentist.deleteOne({_id: deleteForm.get("did")})
      await deleteDentist(token, deleteForm.get("did") as string);
      //   window.location.reload();
      console.log("Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  // const DeleteDentist = async(did: string) => {
  //     try{
  //             await deleteDentist(token, did);
  //             window.location.reload();
  //             console.log("Deleted");
  //     } catch(error) {
  //         console.log("Cannot Delete",error);
  //     }
  // }

  return (
    <main>
      <div className="text-center text-lg font-bold my-4 ">DentistPage</div>
      {profile.data.role == "admin" ? (
        <div className="flex flex-col space-y-5 m-4 p-4 items-center justify-center">
          {dentists.data.map((dentistItem: Object) => (
            <div className="bg-sky-200 p-4 border border-sky-600 rounded-md">
              <DentistCardForAdmin
                dentName={dentistItem.name}
                yearExp={dentistItem.year_exp}
                clinic={dentistItem.clinic}
                did={dentistItem._id}
              />
              <div className="flex flex-row space-x-2 justify-end pt-4">
                <Link href={`/dentist/editdentist/${dentistItem._id}`}>
                  <button className="bg-orange-200 border border-orange-600 hover:bg-yellow-400 hover:border-transparent rounded-lg px-2 py-1 text-sm">Edit</button>
                </Link>
                <form action={DeleteDentist}>
                  <input
                    type="text"
                    hidden
                    required
                    id="did"
                    name="did"
                    value={dentistItem._id}
                  />
                  <button className="bg-red-300 border border-red-600 hover:bg-red-600 hover:border-transparent rounded-lg px-2 py-1 text-sm">Delete</button>
                </form>
              </div>
            </div>
          ))}
          <Link href={"/dentist/createdentist"}>
            <button className="bg-green-400 border border-green-800 rounded-lg px-2 py-1 absolute right-2 bottom-2">
              Create
            </button>
          </Link>
        </div>
      ) : (
        <div
          style={{
            margin: "20px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "space-around",
          }}
        >
          {dentists.data.map((dentistItem: Object) => (
            <DentistCard
              dentName={dentistItem.name}
              yearExp={dentistItem.year_exp}
              clinic={dentistItem.clinic}
            />
          ))}
        </div>
      )}
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
