import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // In a real app, you would handle form submission here
      console.log('Form submitted:', formData);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }, 1500);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'support@fitpro.com',
    },
    {
      icon: '📱',
      title: 'Phone',
      details: '+9212345678',
    },
    {
      icon: '🏢',
      title: 'Address',
      details: '123 Fitness Street, Health City, HC 12345',
    },
    {
      icon: '🕒',
      title: 'Hours',
      details: 'Mon-Fri: 9am-6pm PKT',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-900/30 border border-green-500/30 rounded-lg p-6 text-center"
                >
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Message Sent!</h3>
                  <p className="text-gray-300">
                    Thank you for contacting us. We've received your message and will get back to you shortly.
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Luqmn"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      className={`input-orange rounded-lg px-4 py-3 w-full focus:outline-none ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Information */}
          <div>
            <Card className="p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-2xl mr-4">{info.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold">{info.title}</h3>
                      <p className="text-gray-400">{info.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Location</h2>
              <div className="rounded-lg overflow-hidden h-64 bg-gradient-to-br from-orange-900/20 to-orange-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">📍</div>
                  <p className="text-gray-400">123 Fitness Street, Health City</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-lg font-semibold mb-2">How do I reset my password?</h3>
              <p className="text-gray-400">
                Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.
              </p>
            </div>
            
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-lg font-semibold mb-2">Can I change my subscription plan?</h3>
              <p className="text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time from your account settings.
              </p>
            </div>
            
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-lg font-semibold mb-2">How do I cancel my subscription?</h3>
              <p className="text-gray-400">
                You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-400">
                We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactUs;