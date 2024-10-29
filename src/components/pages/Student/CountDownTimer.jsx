import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Link } from "react-router-dom";
dayjs.extend(duration);

function CountdownScreen({ examStartDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = dayjs();
    const diff = examStartDate.diff(now);
    const duration = dayjs.duration(diff);

    if (diff <= 0) {
      // Exam start date is in the past or right now
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex justify-center flex-col bg-white py-16">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          Countdown to Exam
        </h2>
        <p className="text-3xl mb-6">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </p>
        <Link
          to="/test"
          className="bg-blue-500 text-white text-xl py-2 px-8 rounded hover:bg-blue-600"
        >
          Practice CBT
        </Link>
      </div>
    </div>
  );
}

export default CountdownScreen;
