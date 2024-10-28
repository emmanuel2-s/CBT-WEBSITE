import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs, { duration } from "dayjs";
import CountdownScreen from "./CountDownTimer";
import WelcomeScreen from "./WelcomeScreen";

dayjs.extend(duration);
function Dashboard() {
  const [status, setStatus] = useState("");
  const examStartDate = dayjs("2024-10-28T12:28");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs();

      if (now.isBefore(examStartDate)) {
        // setTimeLeft(calculateTimeLeft());
        setStatus("countdown");
      } else if (now.isSame(examStartDate, "minute")) {
        setStatus("exam"); // Display exam page when the current time matches the start time
      } else {
        setStatus("expired"); // Show "Time Expired" if the time has passed
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {status === "countdown" && (
        <CountdownScreen examStartDate={examStartDate} />
      )}

      {status === "exam" && <WelcomeScreen />}

      {status === "expired" && (
        <div className="w-full fade-in">
          <div className="bg-white py-16 rounded flex flex-col justify-center items-center">
            <h2 className="text-center font-medium text-3xl md:text-4xl mb-8 font-serif">
              Time Expired
            </h2>
            <p className="text-center font-medium text-xl font-serif mb-6">
              The exam time has passed. You can no longer access the exam.
            </p>

            <Link
              to="/test"
              className="bg-blue-500 text-white text-xl py-2 px-8 rounded hover:bg-blue-600"
            >
              Practice CBT
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
