import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState('muscle');

  const nutritionTypes = [
    { id: 'muscle', name: 'Muscle Gain' },
    { id: 'weightloss', name: 'Weight Loss' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'athletic', name: 'Athletic Performance' },
  ];

  const nutritionPlans = {
    muscle: [
      {
        title: 'High Protein Muscle Builder',
        duration: '8 weeks',
        calories: '3000-3500 kcal/day',
        protein: '180-220g',
        description: 'Designed to maximize muscle growth with high protein intake and strategic carb timing.',
        features: ['High protein foods', 'Strategic carb timing', 'Calorie surplus', '5-6 meals per day'],
      },
      {
        title: 'Lean Muscle Plan',
        duration: '12 weeks',
        calories: '2500-3000 kcal/day',
        protein: '160-200g',
        description: 'Build lean muscle with minimal fat gain through balanced macros and nutrient timing.',
        features: ['Balanced macros', 'Nutrient timing', 'Moderate calorie surplus', 'Whole foods focus'],
      },
      {
        title: 'Bulking Phase Diet',
        duration: '16 weeks',
        calories: '3500-4000 kcal/day',
        protein: '200-250g',
        description: 'Aggressive muscle building plan for those looking to gain size and strength quickly.',
        features: ['High calorie intake', 'Maximum protein', 'Complex carbs', 'Healthy fats'],
      },
      {
        title: 'Beginner Muscle Gain',
        duration: '6 weeks',
        calories: '2300-2800 kcal/day',
        protein: '140-180g',
        description: 'Perfect for beginners looking to build muscle foundation without overwhelming complexity.',
        features: ['Simple meal structure', 'Moderate protein', 'Easy to follow', 'Flexible options'],
      },
    ],
    weightloss: [
      {
        title: 'Rapid Fat Loss',
        duration: '8 weeks',
        calories: '1500-1800 kcal/day',
        protein: '120-150g',
        description: 'Accelerated fat loss plan with high protein to preserve muscle during calorie deficit.',
        features: ['Low calorie', 'High protein', 'Intermittent fasting', 'Meal timing'],
      },
      {
        title: 'Sustainable Weight Loss',
        duration: '16 weeks',
        calories: '1800-2100 kcal/day',
        protein: '110-140g',
        description: 'Gradual approach to weight loss that focuses on long-term habits and sustainability.',
        features: ['Moderate calorie deficit', 'Balanced nutrition', 'Flexible dieting', 'Lifestyle integration'],
      },
      {
        title: 'Keto Fat Burner',
        duration: '12 weeks',
        calories: '1600-2000 kcal/day',
        protein: '100-130g',
        description: 'Low-carb, high-fat diet designed to shift your body into ketosis for efficient fat burning.',
        features: ['Very low carbs', 'High healthy fats', 'Ketosis state', 'Reduced hunger'],
      },
      {
        title: 'Plant-Based Weight Loss',
        duration: '10 weeks',
        calories: '1700-2000 kcal/day',
        protein: '90-120g',
        description: 'Vegan and vegetarian approach to weight loss with plant-based protein sources.',
        features: ['Plant-based proteins', 'High fiber', 'Nutrient dense', 'Sustainable approach'],
      },
    ],
    maintenance: [
      {
        title: 'Balanced Maintenance',
        duration: 'Ongoing',
        calories: '2200-2500 kcal/day',
        protein: '100-130g',
        description: 'Maintain your current weight with a balanced approach to all macronutrients.',
        features: ['Calorie maintenance', 'Macro balance', 'Food variety', 'Sustainable habits'],
      },
      {
        title: 'Active Lifestyle',
        duration: 'Ongoing',
        calories: '2500-2800 kcal/day',
        protein: '120-150g',
        description: 'For those with active lifestyles who need more energy to support their activities.',
        features: ['Higher calorie intake', 'Performance focus', 'Energy optimization', 'Activity adjustments'],
      },
      {
        title: 'Mediterranean Style',
        duration: 'Ongoing',
        calories: '2100-2400 kcal/day',
        protein: '90-120g',
        description: 'Heart-healthy approach inspired by Mediterranean dietary patterns.',
        features: ['Healthy fats', 'Whole foods', 'Moderate protein', 'Antioxidant rich'],
      },
      {
        title: 'Flexible Dieting (IIFYM)',
        duration: 'Ongoing',
        calories: '2200-2500 kcal/day',
        protein: '110-140g',
        description: 'If It Fits Your Macros approach that allows for flexibility while hitting targets.',
        features: ['Macro tracking', 'Food flexibility', 'No restrictions', 'Sustainable long-term'],
      },
    ],
    athletic: [
      {
        title: 'Endurance Athlete',
        duration: 'Ongoing',
        calories: '3000-3500 kcal/day',
        protein: '140-170g',
        description: 'High-carb plan designed to fuel endurance activities and improve performance.',
        features: ['High carbohydrate', 'Strategic fueling', 'Performance timing', 'Recovery focus'],
      },
      {
        title: 'Strength Athlete',
        duration: 'Ongoing',
        calories: '3200-3700 kcal/day',
        protein: '180-220g',
        description: 'Nutrition plan optimized for strength training and power sports.',
        features: ['Very high protein', 'Strength support', 'Recovery optimization', 'Performance foods'],
      },
      {
        title: 'Team Sport Performance',
        duration: 'Ongoing',
        calories: '2800-3300 kcal/day',
        protein: '150-180g',
        description: 'Balanced approach for multi-directional sports requiring both strength and endurance.',
        features: ['Sport-specific fueling', 'Hydration focus', 'Recovery nutrition', 'Performance timing'],
      },
      {
        title: 'Combat Sports Diet',
        duration: 'Ongoing',
        calories: '2600-3100 kcal/day',
        protein: '160-190g',
        description: 'Specialized nutrition for combat sports with weight management considerations.',
        features: ['Weight management', 'Power-to-weight ratio', 'Recovery focus', 'Cutting strategies'],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Nutrition Plans</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our science-backed nutrition plans are designed to support your fitness goals, whether you want to build muscle, lose weight, maintain your current physique, or optimize athletic performance.
          </p>
        </div>

        {/* Nutrition Type Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {nutritionTypes.map((type) => (
            <Button
              key={type.id}
              variant={activeTab === type.id ? 'primary' : 'secondary'}
              onClick={() => setActiveTab(type.id)}
            >
              {type.name}
            </Button>
          ))}
        </div>

        {/* Nutrition Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nutritionPlans[activeTab].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-xl overflow-hidden card-hover h-full flex flex-col"
            >
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                
                <div className="flex items-center text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="mr-4">{plan.duration}</span>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{plan.calories}</span>
                </div>
                
                <div className="flex items-center text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Protein: {plan.protein}</span>
                </div>
                
                <p className="text-gray-400 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-orange-500 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-400">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <Button className="w-full">View Plan</Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nutrition Tips */}
        <Card className="p-6 mt-12">
          <h2 className="text-2xl font-bold mb-4">Nutrition Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-2">General Guidelines</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Stay hydrated by drinking at least 8 glasses of water daily</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Prioritize whole, unprocessed foods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Include a variety of fruits and vegetables for micronutrients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Be consistent with your eating schedule</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-2">Supplement Recommendations</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Protein powder for convenient protein intake</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Creatine for strength and power athletes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Fish oil for omega-3 fatty acids</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Vitamin D3, especially if you have limited sun exposure</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Nutrition;