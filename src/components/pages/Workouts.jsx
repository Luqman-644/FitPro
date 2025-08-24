import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';

const Workouts = () => {
  const [activeTab, setActiveTab] = useState('strength');

  const workoutTypes = [
    { id: 'strength', name: 'Strength Training' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'flexibility', name: 'Flexibility' },
    { id: 'hiit', name: 'HIIT' },
  ];

  const workouts = {
    strength: [
      {
        title: 'Full Body Strength',
        duration: '45 min',
        difficulty: 'Intermediate',
        exercises: 8,
        description: 'Build overall strength with compound movements targeting all major muscle groups.',
      },
      {
        title: 'Upper Body Blast',
        duration: '40 min',
        difficulty: 'Advanced',
        exercises: 10,
        description: 'Focus on chest, back, shoulders, and arms with this intense upper body routine.',
      },
      {
        title: 'Lower Body Power',
        duration: '50 min',
        difficulty: 'Intermediate',
        exercises: 9,
        description: 'Develop powerful legs and glutes with squats, lunges, and deadlift variations.',
      },
      {
        title: 'Core Strength',
        duration: '30 min',
        difficulty: 'Beginner',
        exercises: 7,
        description: 'Strengthen your core with targeted exercises for stability and definition.',
      },
    ],
    cardio: [
      {
        title: 'Fat Burning Cardio',
        duration: '35 min',
        difficulty: 'Intermediate',
        exercises: 1,
        description: 'Continuous moderate-intensity cardio to maximize fat burning and improve endurance.',
      },
      {
        title: 'Dance Cardio',
        duration: '40 min',
        difficulty: 'Beginner',
        exercises: 1,
        description: 'Fun and energetic dance routine that gets your heart rate up and burns calories.',
      },
      {
        title: 'Stair Climber Challenge',
        duration: '30 min',
        difficulty: 'Advanced',
        exercises: 1,
        description: 'Intense stair climbing workout to build leg strength and cardiovascular fitness.',
      },
      {
        title: 'Low Impact Cardio',
        duration: '45 min',
        difficulty: 'Beginner',
        exercises: 1,
        description: 'Joint-friendly cardio workout perfect for beginners or those with injuries.',
      },
    ],
    flexibility: [
      {
        title: 'Morning Stretch',
        duration: '20 min',
        difficulty: 'Beginner',
        exercises: 12,
        description: 'Start your day with this gentle stretching routine to improve flexibility and circulation.',
      },
      {
        title: 'Yoga Flow',
        duration: '45 min',
        difficulty: 'Intermediate',
        exercises: 15,
        description: 'Dynamic yoga sequence to enhance flexibility, balance, and mind-body connection.',
      },
      {
        title: 'Deep Stretch',
        duration: '30 min',
        difficulty: 'All Levels',
        exercises: 10,
        description: 'Targeted stretches to release tension and improve range of motion in tight muscles.',
      },
      {
        title: 'Post-Workout Recovery',
        duration: '15 min',
        difficulty: 'All Levels',
        exercises: 8,
        description: 'Essential stretches to aid recovery and prevent muscle soreness after intense workouts.',
      },
    ],
    hiit: [
      {
        title: 'Full Body HIIT',
        duration: '25 min',
        difficulty: 'Advanced',
        exercises: 8,
        description: 'High-intensity intervals with minimal rest to maximize calorie burn and fitness gains.',
      },
      {
        title: 'HIIT Cardio Blast',
        duration: '20 min',
        difficulty: 'Intermediate',
        exercises: 6,
        description: 'Cardio-focused HIIT workout to boost endurance and melt away fat.',
      },
      {
        title: 'Beginner HIIT',
        duration: '20 min',
        difficulty: 'Beginner',
        exercises: 6,
        description: 'Introduction to high-intensity training with modified exercises and longer rest periods.',
      },
      {
        title: 'Tabata Challenge',
        duration: '16 min',
        difficulty: 'Advanced',
        exercises: 4,
        description: 'Classic Tabata protocol: 20 seconds of maximum effort followed by 10 seconds of rest.',
      },
    ],
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-yellow-500';
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-orange-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Workout Programs</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our variety of workout programs designed to help you achieve your fitness goals, whether you want to build strength, improve endurance, increase flexibility, or burn fat.
          </p>
        </div>

        {/* Workout Type Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {workoutTypes.map((type) => (
            <Button
              key={type.id}
              variant={activeTab === type.id ? 'primary' : 'secondary'}
              onClick={() => setActiveTab(type.id)}
            >
              {type.name}
            </Button>
          ))}
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workouts[activeTab].map((workout, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-xl overflow-hidden card-hover h-full flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{workout.title}</h3>
                  <span className={`text-sm font-medium ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="mr-4">{workout.duration}</span>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span>{workout.exercises} {workout.exercises === 1 ? 'exercise' : 'exercises'}</span>
                </div>
                
                <p className="text-gray-400 mb-6">{workout.description}</p>
              </div>
              
              <div className="px-6 pb-6">
                <Button className="w-full">Start Workout</Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workout Tips */}
        <Card className="p-6 mt-12">
          <h2 className="text-2xl font-bold mb-4">Workout Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-2">Before Your Workout</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Stay hydrated by drinking water throughout the day</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Eat a light meal or snack 1-2 hours before exercising</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Warm up with 5-10 minutes of light cardio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Prepare your workout space and equipment in advance</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-2">After Your Workout</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Cool down with 5-10 minutes of stretching</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Replenish fluids and electrolytes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Consume protein within 30 minutes to aid muscle recovery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Get adequate rest to allow your body to recover and grow stronger</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Workouts;