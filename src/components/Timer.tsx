import { useState, useEffect } from 'react';

interface TimerProps {
  workDuration: number;
  breakDuration: number;
}

export default function Timer({ workDuration = 25, breakDuration = 5 }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  useEffect(() => {
    let timer: number;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsWorkTime(!isWorkTime);
      setTimeLeft((isWorkTime ? breakDuration : workDuration) * 60);
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkTime, workDuration, breakDuration]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(workDuration * 60);
    setIsWorkTime(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isWorkTime ? 'Work Time' : 'Break Time'}
        </h2>
        <div className="text-6xl font-mono mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={toggleTimer}
            className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
} 