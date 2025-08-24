import { motion } from 'framer-motion';
import Card from '../ui/Card';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Fitness enthusiast with over 15 years of experience in health and wellness.',
      image: 'AJ',
    },
    {
      name: 'Sarah Williams',
      role: 'Head Trainer',
      bio: 'Certified personal trainer specializing in strength and conditioning.',
      image: 'SW',
    },
    {
      name: 'Michael Chen',
      role: 'Nutrition Expert',
      bio: 'Registered dietitian with a focus on sports nutrition and meal planning.',
      image: 'MC',
    },
    {
      name: 'Emma Rodriguez',
      role: 'App Developer',
      bio: 'Full-stack developer passionate about creating intuitive fitness applications.',
      image: 'ER',
    },
  ];

  const timelineEvents = [
    {
      year: '2018',
      title: 'Fit Guide Founded',
      description: 'Started with a simple vision: to make fitness accessible to everyone.',
    },
    {
      year: '2019',
      title: 'First App Launch',
      description: 'Released our mobile app with basic workout tracking features.',
    },
    {
      year: '2020',
      title: 'Nutrition Plans Added',
      description: 'Expanded our offerings to include personalized nutrition plans.',
    },
    {
      year: '2021',
      title: 'Reached 10K Users',
      description: 'Milestone achieved with users from over 50 countries.',
    },
    {
      year: '2022',
      title: 'Shop Feature Launched',
      description: 'Introduced our fitness shop with premium supplements and gear.',
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded services to new markets with localized content.',
    },
  ];

  const values = [
    {
      title: 'Personalization',
      description: 'We believe fitness is personal. Our plans are tailored to individual goals and preferences.',
      icon: '👤',
    },
    {
      title: 'Accessibility',
      description: 'Fitness should be for everyone. We design our platform to be inclusive and easy to use.',
      icon: '🌍',
    },
    {
      title: 'Science-Backed',
      description: 'Our methods are based on scientific research and proven fitness principles.',
      icon: '🔬',
    },
    {
      title: 'Community',
      description: 'We foster a supportive community where members motivate and inspire each other.',
      icon: '🤝',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">About FitPro Guide</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make fitness accessible, personalized, and enjoyable for everyone, everywhere.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At FitPro Guide, we believe that everyone deserves access to quality fitness guidance regardless of their experience level, location, or budget. Our mission is to democratize fitness by providing personalized workout and nutrition plans that adapt to individual needs and goals.
              </p>
              <p className="text-gray-300">
                We combine cutting-edge technology with proven fitness principles to create an experience that's both effective and enjoyable. Whether you're a beginner taking your first steps into fitness or an experienced athlete looking to optimize your performance, Fit Guide is designed to support your journey.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-orange-900/30 to-orange-500/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <p className="text-gray-300">Your Fitness Journey Starts Here</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 h-full">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-900/30"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <Card className="p-6">
                      <div className="text-orange-500 font-bold text-lg mb-2">{event.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-gray-400">{event.description}</p>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full orange-gradient border-4 border-black z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-24 h-24 rounded-full orange-gradient flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">{member.image}</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-orange-500 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <Card className="p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">100+</div>
              <div className="text-gray-400">Workout Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">50+</div>
              <div className="text-gray-400">Nutrition Plans</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">25</div>
              <div className="text-gray-400">Team Members</div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-orange-900/20 to-orange-500/20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-300 mb-8">
              Become part of the Fit Guide family and start your transformation journey today.
            </p>
            <a href="/signup" className="inline-block px-6 py-3 rounded-lg orange-gradient text-black font-medium hover:orange-gradient-hover transition-all duration-300">
              Get Started
            </a>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AboutUs;