import React, { useState, useEffect } from "react";
import congratImg from "../assets/imgs/Emoji-Congrats.png";
import { useNavigate } from "react-router-dom";
import { questions } from "../utils/data";
import Swal from "sweetalert2";

function TestPage() {
  const history = useNavigate();
  const handleTest = () => {
    history("/home");
  };

  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);

  // Start the timer for each question
  useEffect(() => {
    if (isStarted && !isFinished) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        handleNextQuestion();
      }
    }
  }, [timeLeft, isStarted, isFinished]);

  // Handle the answer selection and check if it's correct
  const handleOptionClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  // Navigate to the next question or finish the exam
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30); // Reset the timer for the next question
    } else {
      setIsFinished(true); // End the exam
    }
  };

  // Start the exam
  const handleStart = () => {
    setIsStarted(true);
    setTimeLeft(30);
  };

  // Restart the exam (optional)
  const handleRestart = () => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  const cancelExam = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to quit the exam",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonAriaLabel: "Thumbs up, great!",
      //   cancelButtonText:"",
      preConfirm: () => {
        setIsFinished(true);
      },
    });
  };

  // Display the result screen
  if (isFinished) {
    return (
      <div className="max-w-lg mx-auto w-full">
        <div className="bg-white p-8 mt-10 md:mt-24">
          <h1 className="text-4xl text-center font-medium text-gray-500 mb-6">
            Congratulations!
          </h1>
          <img
            src={congratImg}
            alt="Congratulations image"
            className="w-40 h-40 object-cover mx-auto mt-10"
          />
          <p className="text-center text-gray-700 font-semibold text-lg py-8">
            Your Score: {score} / {questions.length}
          </p>
          <div className="flex justify-around items-center ">
            <button
              className="bg-gray-500 px-8 py-2 rounded-md text-white font-semibold"
              onClick={handleRestart}
            >
              Restart Test
            </button>
            <button
              className="bg-red-600 px-8 py-2 rounded-md text-white font-semibold"
              onClick={handleTest}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!isStarted ? (
        <div className="text-center max-w-5xl p-8 w-full mx-auto mt-10 bg-white shadow-md rounded-lg">
          <h1 className="text-4xl font-medium mb-6 leading-10">
            Welcome to the Exam
          </h1>
          <div className="text-left font-medium mb-6">
            <h4 className="text-3xl mb-3">Practice mode</h4>
            <p>Total Number of Questions: 50</p>
            <p>Total Time Given: 35 mins </p>
          </div>
          <div>
            <h4 className="text-3xl mb-3 text-left font-medium">
              CBT Instructions
            </h4>
            <p className="text-left font-medium">
              You will be given 20 questions in English Language and 10
              questions on each of the other subjects (a total of 50 questions).
              The questions will be presented 1 each in series starting with
              English Language. Once you have answered a question, you will be
              direct to the next question and click "Finish" when you are done
              with all questions. If at anytime, you can no longer continue, you
              can click on "Quit Exam" to see your performance analysis.
            </p>

            <p className="text-left font-medium py-4">
              You will be given 35 mins to answer all 50 questions and submit.
              If at any point, you're unable to finish on time, you will be
              automatically shown the summary of your performance.
            </p>
            <p className="text-left font-medium py-2">
              Your ranking will be based on a cumulative of all your scores this
              week and the number of free exams written. The time taken to
              finish each exam will also be taken into consideration. So you
              have to keep trying new exams for FRESH SET OF QUESTIONS to gain
              more points and rise in ranking. Keep trying everytime, everyday
              and your coming exam will be a walk-over for you. To start now,
              click on the "Start Exam" button below...
            </p>
          </div>
          <button
            onClick={handleStart}
            className="px-16 py-2 mt-8 bg-gray-600 text-white rounded hover:bg-gray-800 focus:outline-none"
          >
            Start Exam
          </button>
        </div>
      ) : (
        <div className="container mx-auto p-16 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="mb-6 font-serif font-medium">
            {questions[currentQuestionIndex].question}
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
              >
                {option}
              </button>
            ))}
          </div>

          <p className="mt-6 text-gray-600">Time Left: {timeLeft} seconds</p>

          <button
            className="bg-red-600 rounded px-4 py-2 mt-6"
            onClick={cancelExam}
          >
            Quit exam
          </button>
        </div>
      )}
    </div>
  );
}

export default TestPage;
