import React, { useEffect } from 'react';
import { MdCalendarToday, MdTimer } from 'react-icons/md';

export default function TimeLog({ clock, breakClock, totalHours }) {

  return (
    <section className="w-full bg-white py-8 ">

      <div className="max-w-4xl mx-auto px-4 overflow-x-auto">

        <div className="grid grid-cols-4 text-center text-sm text-gray-600 gap-20 md:gap-0">
          <div>
            <p className="text-blue-600 font-bold text-base">{`${Math.floor(
              clock / 3600
            )
              .toString()
              .padStart(2, "0")}:${Math.floor(
                (clock % 3600) / 60
              )
                .toString()
                .padStart(2, "0")}`}</p>
            <p>Scheduled</p>
          </div>
          <div>
            <p className="text-blue-600 font-bold text-base">{`${Math.floor(
              breakClock / 3600
            )
              .toString()
              .padStart(2, "0")}:${Math.floor(
                (breakClock % 3600) / 60
              )
                .toString()
                .padStart(2, "0")}`}</p>
            <p>Break</p>
          </div>
          <div>
            <p className="text-blue-600 font-bold text-base">{`${Math.floor(
              (32400 - clock) / 3600
            )
              .toString()
              .padStart(2, "0")}:${Math.floor(
                ((32400 - clock) % 3600) / 60
              )
                .toString()
                .padStart(2, "0")}`}</p>
            <p>Balance</p>
          </div>
        </div>


        <div className="border-t mt-6 pt-4">
          <h3 className="text-md font-medium text-gray-500 mb-4">This month</h3>

          <div className="flex items-center">
            <div className="bg-emerald-600 text-white p-2 rounded-md shadow mr-3">
              <MdTimer className="w-5 h-5" />
            </div>
            <p className="text-base text-gray-800">{totalHours || (Math.floor(clock / 3600))} {(totalHours || (Math.floor(clock / 3600))) <= 1 ? "Hour" : "Hours"}</p>
          </div>
        </div>
      </div>

    </section>
  );
}
