import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';

const Home = () => {
  const features = [
    {
      title: 'Custom Workouts',
      description: 'Access personalized workout plans tailored to your fitness goals.',
      icon: '💪',
      link: '/workouts',
    },
    {
      title: 'Nutrition Plans',
      description: 'Get customized diet plans for muscle gain, weight loss, or maintenance.',
      icon: '🥗',
      link: '/nutrition',
    },
    {
      title: 'Fitness Shop',
      description: 'Browse our collection of premium supplements and fitness gear.',
      icon: '🛒',
      link: '/shop',
    },
    {
      title: 'Training Tools',
      description: 'Use our stopwatch and other tools to enhance your workout experience.',
      icon: '⏱️',
      link: '/stopwatch',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div 
        className="text-center py-16 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">Transform Your Body</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Your ultimate fitness companion for achieving your health goals with personalized workouts, nutrition plans, and expert guidance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/workouts">
            <Button variant="secondary" size="lg">Explore Workouts</Button>
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Fit Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index}>
              <Card className="p-6 h-full">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="bg-gradient-to-r from-orange-900/20 to-orange-500/20 rounded-2xl p-8 md:p-12 my-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-gray-300 mb-8">
            Join thousands of users who have transformed their lives with Fit Guide.
          </p>
          <Link to="/signup">
            <Button size="lg">Sign Up Now</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;