import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ListTodo, Clock, Heart, Target, ArrowRight, PlusCircle } from 'lucide-react';
import { useAuth } from '../../Hooks/UseAuth';

const Home = () => {
  const { user } = useAuth();
  
  const features = [
    {
      icon: <ListTodo size={24} className="text-blue-600" />,
      title: 'Task Management',
      description: 'Create, organize, and track your daily tasks with ease.',
    },
    {
      icon: <CheckCircle size={24} className="text-green-600" />,
      title: 'Track Completion',
      description: 'Mark tasks as completed and see your progress over time.',
    },
    {
      icon: <Heart size={24} className="text-pink-600" />,
      title: 'Wishlist',
      description: 'Keep track of things you want to buy or places to visit.',
    },
    {
      icon: <Target size={24} className="text-purple-600" />,
      title: 'Bucketlist',
      description: 'Document your lifetime goals and aspirations in one place.',
    },
    {
      icon: <Clock size={24} className="text-amber-600" />,
      title: 'Due Dates',
      description: 'Set deadlines for your tasks and never miss important dates.',
    },
    {
      icon: <ListTodo size={24} className="text-indigo-600" />,
      title: 'Categories',
      description: 'Organize your todos into different categories for easy access.',
    },
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Organize Your Life with <span className="text-primary">Todo Master</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 mx-auto max-w-3xl"
            >
              A beautiful, intuitive todo app to help you manage tasks, create wishlists, 
              and track your bucket list items all in one place.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              {user ? (
                <Link
                  to="/add-todo"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <PlusCircle size={20} />
                  <span>Add New Todo</span>
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </Link>
              )}
              
              <Link
                to={user ? "/my-todo" : "/login"}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-white text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
              >
                {user ? (
                  <>
                    <ListTodo size={20} />
                    <span>View My Todos</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                  </>
                )}
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
              <img
                src="https://placehold.co/1200x600/e9f6ff/004c8c?text=Todo+App+Dashboard"
                alt="Todo App Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to stay organized and productive in one simple app.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary rounded-xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Organized?
              </h2>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Join thousands of users who have transformed their productivity with Todo Master.
                Start organizing your life today!
              </p>
              <Link
                to={user ? "/add-todo" : "/register"}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-white text-primary font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
              >
                <span>{user ? "Add New Todo" : "Create Free Account"}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
