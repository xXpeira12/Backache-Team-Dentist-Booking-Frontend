import Link from "next/link";

export default function DentistCardForAdmin({ dentName, yearExp, clinic, did }: { dentName: string; yearExp: number; clinic: string, did: string }) {

    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className='mb-2'>
          <strong className="font-bold">Name:</strong> {dentName}
        </div>
        <div className='mb-2'>
          <strong className="font-bold">Years of Experience:</strong> {yearExp}
        </div>
        <div>
          <strong className="font-bold">Clinic:</strong> {clinic}
        </div>
        <Link href={`/dentist/editdentist/${did}`}>
          <button className="bg-yellow-200">Edit</button>
        </Link>
        
        <Link href={""}>
        <button className="ml-2 bg-red-400">Delete</button>
        </Link>
      </div>
    );
  }
  