export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2 border-solid border-gray-200"></div>
        <div className="w-20 h-20 rounded-full animate-spin absolute border-2 border-solid border-indigo-500 border-t-transparent"></div>
      </div>
    </div>
  );
}
