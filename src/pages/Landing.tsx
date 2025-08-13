import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Smile, Heart, Sun, Waves } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen animate-kaleidoscope">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 4 }}>
              <Waves className="h-8 w-8 text-primary" />
            </motion.div>
            <span className="text-xl font-bold">TodoTrip</span>
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
            Expand Your Mind
            <motion.span 
              className="text-primary block"
              animate={{ color: ["oklch(var(--primary))", "oklch(var(--secondary))", "oklch(var(--accent))", "oklch(var(--primary))"] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              and Your To-Do List
            </motion.span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Journey through your tasks on a wave of cosmic energy. 
            Manifest your goals. Vibe with your productivity.
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
                  Start the Trip
                </Button>
              }
            />
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
              Explore the Void ✨
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
          <p>&copy; 2024 TodoTrip. Ride the wave.</p>
        </div>
      </motion.footer>
    </div>
  );
}