export default function DentistCard({ dentName, yearExp, clinic }: { dentName: string; yearExp: number; clinic: string; }) {

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
      </div>
    );
  }
  