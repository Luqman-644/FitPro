import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Fitness Stopwatch</h1>
          <p className="text-gray-400">
            Track your workout intervals, rest periods, and overall training time with our precision stopwatch.
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-mono font-bold mb-8">
              {formatTime(time)}
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={startStop}
                className={`px-8 ${isRunning ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                {isRunning ? 'Stop' : 'Start'}
              </Button>
              <Button
                onClick={recordLap}
                variant="secondary"
                disabled={!isRunning}
              >
                Lap
              </Button>
              <Button
                onClick={reset}
                variant="ghost"
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {laps.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Lap Times</h2>
            <div className="max-h-60 overflow-y-auto">
              {laps.map((lapTime, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0"
                >
                  <span className="text-gray-400">Lap {index + 1}</span>
                  <span className="font-mono">{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Workout Timer Tips</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Use the stopwatch for HIIT workouts - typically 30 seconds of high intensity followed by 30 seconds of rest</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Track your rest periods between sets - aim for 60-90 seconds for hypertrophy training</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Monitor your total workout time - effective sessions typically last 45-60 minutes</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Use lap times to track your performance improvements over time</span>
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
};

export default Stopwatch;