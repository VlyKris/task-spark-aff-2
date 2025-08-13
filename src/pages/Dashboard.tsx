// TODO: THIS IS THE DEFAULT DASHBOARD PAGE THAT THE USER WILL SEE AFTER AUTHENTICATION. ADD MAIN FUNCTIONALITY HERE.
// This is the entry point for users who have just signed in

import { TodoForm } from "@/components/TodoForm";
import { TodoItem } from "@/components/TodoItem";
import { UserButton } from "@/components/auth/UserButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Protected } from "@/lib/protected-page";
import { motion } from "framer-motion";
import { CheckCircle, Filter, Plus } from "lucide-react";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const todos = useQuery(api.todos.list);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filteredTodos = todos?.filter((todo) => {
    const statusMatch = filter === "all" || 
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);
    
    const priorityMatch = priorityFilter === "all" || todo.priority === priorityFilter;
    
    return statusMatch && priorityMatch;
  }) || [];

  const completedCount = todos?.filter(todo => todo.completed).length || 0;
  const totalCount = todos?.length || 0;

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">TodoFlow</h1>
                  <p className="text-sm text-muted-foreground">
                    Welcome back, {user?.name || "there"}!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <TodoForm />
                <UserButton />
              </div>
            </div>
          </div>
        </motion.header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-card p-6 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">{totalCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{completedCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-2xl font-bold">{totalCount - completedCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Plus className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <Tabs value={filter} onValueChange={(value) => setFilter(value as "all" | "active" | "completed")}>
                <TabsList>
                  <TabsTrigger value="all">
                    All <Badge variant="secondary" className="ml-2">{totalCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="active">
                    Active <Badge variant="secondary" className="ml-2">{totalCount - completedCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed <Badge variant="secondary" className="ml-2">{completedCount}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Select value={priorityFilter} onValueChange={(value: "all" | "high" | "medium" | "low") => setPriorityFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Todo List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {filteredTodos.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {filter === "completed" ? "No completed tasks yet" :
                     filter === "active" ? "No active tasks" :
                     "No todos yet"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {filter === "completed" ? "Complete some tasks to see them here." :
                     filter === "active" ? "All your tasks are completed! 🎉" :
                     "Create your first todo to get started."}
                  </p>
                  {filter !== "completed" && (
                    <TodoForm trigger={
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Todo
                      </Button>
                    } />
                  )}
                </motion.div>
              ) : (
                filteredTodos.map((todo, index) => (
                  <motion.div
                    key={todo._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TodoItem todo={todo} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Protected>
  );
}