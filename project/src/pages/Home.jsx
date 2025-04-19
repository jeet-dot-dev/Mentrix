import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Users, ArrowRight, BookOpen, Clock, BarChart3, Globe, Shield } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
              Elevate Your Learning Experience
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Create or join virtual rooms, take customized tests, and track your progress with our innovative education platform.
            </p>
            
            <div className="flex flex-wrap sm:flex-row justify-center gap-4">
              <Link to="/signup" className='flex justify-center'>
                <Button className='size-22' icon={<UserPlus size={20} />}>
                  Get Started
                </Button>
              </Link>
              <Link to="/test" className='flex justify-center'>
                <Button className='size-22'variant="outline" icon={<ArrowRight size={20} />}>
                  Try a Test
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Room Options Section */}
      <section className="py-10">
        <div className="container mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div variants={item}>
              <Card className="h-full flex flex-col">
                <div className="text-primary-500 mb-4">
                  <UserPlus size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Create Room</h2>
                <p className="text-gray-400 mb-6 flex-grow">
                  Create your own virtual classroom. Set custom topics, invite students, and manage your educational environment.
                </p>
                <Button 
                  variant="primary" 
                  className="w-full" 
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Create a Room
                </Button>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full flex flex-col">
                <div className="text-secondary-500 mb-4">
                  <Users size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Join Room</h2>
                <p className="text-gray-400 mb-6 flex-grow">
                  Join an existing room using a room code. Participate in tests, collaborate with peers, and enhance your learning.
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Join a Room
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Merntix?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform provides a comprehensive set of tools to enhance the learning experience for both educators and students.
            </p>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full flex flex-col">
                  <div className="text-primary-500 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Features data
const features = [
  {
    title: "Customized Testing",
    description: "Create tests based on specific subjects and topics to target the exact areas of study.",
    icon: <BookOpen size={28} />
  },
  {
    title: "Real-time Results",
    description: "Get immediate feedback on test performance with detailed analytics and insights.",
    icon: <Clock size={28} />
  },
  {
    title: "Progress Tracking",
    description: "Monitor improvement over time with comprehensive performance metrics and reports.",
    icon: <BarChart3 size={28} />
  },
  {
    title: "Collaborative Learning",
    description: "Join study rooms with peers to enhance the learning experience through collaboration.",
    icon: <Users size={28} />
  },
  {
    title: "Accessible Anywhere",
    description: "Access your educational materials from any device, anywhere in the world.",
    icon: <Globe size={28} />
  },
  {
    title: "Secure Environment",
    description: "Your educational data is protected with industry-standard security measures.",
    icon: <Shield size={28} />
  }
];

export default Home;