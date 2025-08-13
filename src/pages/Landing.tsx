import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Smile, Heart, Sun } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">HappyList</span>
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
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Turn Your Todos
            <span className="text-primary block">into To-das!</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A cheerful, intuitive todo app that makes productivity a joy. 
            Conquer your tasks with a smile and celebrate your progress.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Your Happy List
                </Button>
              }
            />
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
              See the Magic ✨
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
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smile className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Joyful Interface</h3>
            <p className="text-muted-foreground">
              A delightful and easy-to-use design that makes you want to get things done.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="h-8 w-8 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Brighten Your Day</h3>
            <p className="text-muted-foreground">
              Prioritize with happy colors and focus on what truly makes you shine.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Celebrate Wins</h3>
            <p className="text-muted-foreground">
              Feel the love for every task you complete and build positive momentum.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t mt-24 py-8"
      >
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 HappyList. Made with ❤️ to make you smile.</p>
        </div>
      </motion.footer>
    </div>
  );
}