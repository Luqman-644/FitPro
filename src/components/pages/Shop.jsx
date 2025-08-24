import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';

const Shop = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Whey Protein',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToQ44vUHxUquGbR4ywyG3fpWh9T4zRsFfTsg&s',
      price: 49.99,
      description: 'High-quality whey protein isolate for muscle recovery and growth.',
      features: ['25g protein per serving', '5.5g BCAAs', 'Lactose-free', '4 delicious flavors'],
    },
    {
      id: 2,
      name: 'Pre-Workout Energizer',
      image:'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/veg/veg00734/y/34.jpg',
      price: 39.99,
      description: 'Boost your energy and focus for intense training sessions.',
      features: ['200mg caffeine', 'Beta-alanine', 'Creatine', 'No crash formula'],
    },
    {
      id: 3,
      name: 'BCAA Recovery Blend',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpx1EqrPeazRvmj9gXWvarMTgdEaaejVMcKw&s',
      price: 34.99,
      description: 'Essential amino acids to support muscle recovery and reduce soreness.',
      features: ['7g BCAAs per serving', 'Electrolyte blend', 'Zero sugar', 'Great taste'],
    },
    {
      id: 4,
      name: 'Multivitamin Complex',
      image:'https://my.nanosingaporeshop.com/cdn/shop/files/2_32ca66ba-16f7-499e-896f-bc4ed44c9acc.png?v=1754903026',
      price: 24.99,
      description: 'Complete daily nutrition with essential vitamins and minerals.',
      features: ['25+ vitamins & minerals', 'Immune support', 'Energy metabolism', 'Antioxidant blend'],
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
          <h1 className="text-4xl font-bold gradient-text mb-4">Fitness Shop</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Premium supplements and fitness gear to support your health and performance goals. All products are tested for quality and purity.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-xl overflow-hidden card-hover h-full flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="w-full h-70 rounded-lg mb-4 flex items-center justify-center">
                  <img className='rounded-lg' src={product.image} alt="" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-orange-500">${product.price}</span>
                </div>
                
                <p className="text-gray-400 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-orange-500 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-400">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <Button className="w-full">Add to Cart</Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shop Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full orange-gradient flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Quality Guaranteed</h3>
            </div>
            <p className="text-gray-400">
              All our products are third-party tested for purity and potency. We stand behind the quality of everything we sell.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full orange-gradient flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Fast Shipping</h3>
            </div>
            <p className="text-gray-400">
              Free shipping on orders over $50. Most orders are processed within 24 hours and delivered within 3-5 business days.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full orange-gradient flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Satisfaction Guarantee</h3>
            </div>
            <p className="text-gray-400">
              Not satisfied with your purchase? Return it within 30 days for a full refund. No questions asked.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Shop;