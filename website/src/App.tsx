/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Icon } from '@iconify/react';

function App() {
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month());
  const [calendar, setCalendar] = useState<number[][]>([]);

  useEffect(() => {
    const cal = [];

    const date = moment()
      .year(year)
      .month(month)
      .date(1)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);

    const startDay = date.day();
    const daysInMonth = date.daysInMonth();

    let row = [];
    for (let j = 0; j < startDay; j++) {
      row.push(0);
    }

    for (let j = 1; j <= daysInMonth; j++) {
      row.push(j);
      if ((j + startDay) % 7 === 0) {
        cal.push(row);
        row = [];
      }
    }

    if (row.length > 0) {
      cal.push(row);
    }

    setCalendar(cal);
  }, [year, month]);

  return (
    <div className="w-full select-none h-screen flex items-start pt-32 justify-center sm:text-lg bg-slate-300 text-slate-700">
      <div className="p-12 nice-shadow rounded-2xl mx-8">
        <div className="flex w-full items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => {
              if (month === 0) {
                setYear(year - 1);
                setMonth(11);
              } else {
                setMonth(month - 1);
              }
            }}
          >
            <Icon icon="uil:angle-left" className="text-3xl" />
          </button>
          <h2 className="text-center font-semibold text-2xl">
            {moment().month(month).format('MMMM')} {year}
          </h2>
          <button
            type="button"
            onClick={() => {
              if (month === 11) {
                setYear(year + 1);
                setMonth(0);
              } else {
                setMonth(month + 1);
              }
            }}
          >
            <Icon icon="uil:angle-right" className="text-3xl" />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th className="font-bold">Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((row, i) => (
              <tr key={i}>
                {row.map((day, j) => (
                  <td className={`text-center ${!j && 'font-bold'}`} key={j}>
                    {day || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="absolute w-full text-center px-8 bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium">
        Made with 💖 by Melvin, MRGA. Project under MIT license.
      </p>
    </div>
  );
}

export default App;
