export default function RegisterTab () {
  return (
    <div className="bg-white p-8 flex justify-center h-96 items-center">
      <div>
        <p className="font-bold mt-2">Name</p>
        <input className="bg-gray-200 px-4 py-1 rounded-md" />
        <p className="font-bold mt-2">Age</p>
        <input className="bg-gray-200 px-4 py-1 rounded-md" />
        <p className="font-bold mt-2">Email</p>
        <input className="bg-gray-200 px-4 py-1 rounded-md" />
        <p className="font-bold mt-2">Password</p>
        <input className="bg-gray-200 px-4 py-1 rounded-md" />
        <div className="bg-blue-600 text-white text-center font-bold py-1 mt-4">Register</div>
      </div>
    </div>
  )
}
