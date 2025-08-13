import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Moon, Star, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-white">TodoFlow</span>
          </div>
          <AuthButton />
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Organize Your Life
            <span className="text-red-400 block">Beautifully</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A dark, intuitive todo app that helps you stay focused and productive. 
            Prioritize tasks, set deadlines, and achieve your goals with ease.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 text-white border-red-600">
                  Get Started Free
                </Button>
              }
            />
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto"
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Lightning Fast</h3>
            <p className="text-gray-300">
              Add, edit, and organize your todos instantly with our responsive interface.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Priority System</h3>
            <p className="text-gray-300">
              Set priorities and focus on what matters most with our intuitive system.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Moon className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Due Dates</h3>
            <p className="text-gray-300">
              Never miss a deadline with our smart date tracking and reminders.
            </p>
          </div>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <div className="bg-slate-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-center mb-8 text-white">
              Simple. Clean. Effective.
            </h2>
            <div className="space-y-4">
              {[
                { title: "Review quarterly goals", priority: "high", completed: true },
                { title: "Prepare presentation slides", priority: "medium", completed: false },
                { title: "Call dentist for appointment", priority: "low", completed: false },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${
                    item.completed ? "opacity-60 bg-slate-700/50" : "bg-slate-700/30"
                  } border-gray-600`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    item.completed ? "bg-red-500 border-red-500" : "border-gray-400"
                  }`}>
                    {item.completed && <Heart className="h-3 w-3 text-white" />}
                  </div>
                  <span className={`flex-1 ${item.completed ? "line-through text-gray-400" : "text-gray-200"}`}>
                    {item.title}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.priority === "high" ? "bg-red-900/50 text-red-300 border border-red-700" :
                    item.priority === "medium" ? "bg-yellow-900/50 text-yellow-300 border border-yellow-700" :
                    "bg-green-900/50 text-green-300 border border-green-700"
                  }`}>
                    {item.priority}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t border-gray-700 mt-24 py-8"
      >
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 TodoFlow. Built with 💔 for productivity.</p>
        </div>
      </motion.footer>
    </div>
  );
}