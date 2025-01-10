export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-20 h-20 rounded-full absolute border-2 border-solid border-gray-200"></div>
      <div className="w-20 h-20 rounded-full animate-spin absolute border-2 border-solid border-indigo-500 border-t-transparent"></div>
    </div>
  );
}
