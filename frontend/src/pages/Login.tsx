import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Key, Mail, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // In a real app, we would handle login logic here
    console.log('Login attempt with:', { email });
    
    // For demo purposes, just show an alert
    alert(`Login attempt successful with email: ${email}`);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
        <p className="text-gray-400">
          Sign in to continue your learning journey
        </p>
      </motion.div>
      
      <Card animate={false}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="form-input pl-10"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 bg-gray-700 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-primary-400 hover:text-primary-300">
                Forgot password?
              </a>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            icon={<LogIn size={18} />}
          >
            Sign In
          </Button>
          
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-400 hover:text-primary-300">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Card>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gray-800/50 border border-gray-700 rounded-lg p-4"
      >
        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
          <ArrowRight size={16} className="text-primary-400" />
          New to Merntix?
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Create an account to start your learning journey, access personalized tests, and track your progress.
        </p>
        <Link to="/signup">
          <Button variant="outline" size="sm" className="w-full">
            Create Account
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Login; 