export default function TimerTable() {
    return (
      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div>

            {/* Input */}
            <input
              type="text"
              placeholder="Today's task"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           
            <div className="flex sm:flex-row gap-2.5 sm:gap-5 text-center justify-center mb-5">
  <div className="bg-gray-100 p-4 rounded-md w-full sm:w-24 max-w-full sm:max-w-24">
    <p className="text-2xl font-bold">00</p>
    <p className="text-gray-600 text-sm">Hours</p>
  </div>
  <div className="bg-gray-100 p-4 rounded-md w-full sm:w-24 max-w-full sm:max-w-24">
    <p className="text-2xl font-bold">00</p>
    <p className="text-gray-600 text-sm">Minutes</p>
  </div>
  <div className="bg-gray-100 p-4 rounded-md w-full sm:w-24 max-w-full sm:max-w-24">
    <p className="text-2xl font-bold">00</p>
    <p className="text-gray-600 text-sm">Seconds</p>
  </div>
</div>

  
            {/* Buttons */}
            <div className="flex justify-center gap-4">
            
            <button className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all text-center">
  <svg
    className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m4 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
  <span className="truncate">Check-in</span>
</button>


<button className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all text-center">
  <svg
    className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m4 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
  <span className="truncate">Check-out</span>
</button>

            </div>
          </div>
        </div>
      </section>
    );
  }
  