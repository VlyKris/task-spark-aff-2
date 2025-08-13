import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

interface TodoItemProps {
  todo: Doc<"todos">;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(todo.priority);

  const toggleTodo = useMutation(api.todos.toggle);
  const updateTodo = useMutation(api.todos.update);
  const deleteTodo = useMutation(api.todos.remove);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
      if (!todo.completed) {
        toast.success("Woohoo! Another task conquered!", {
          icon: "🚀",
        });
      } else {
        toast.info("No worries! It's back on the list.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    try {
      await updateTodo({
        id: todo._id,
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      });

      toast.success("Todo updated successfully!");
      setEditOpen(false);
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({ id: todo._id });
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-primary/20 text-primary-foreground border-primary/30 shadow-[0_0_15px_oklch(var(--primary)/0.5)]";
      case "medium": return "bg-secondary/20 text-secondary-foreground border-secondary/30 shadow-[0_0_15px_oklch(var(--secondary)/0.5)]";
      case "low": return "bg-accent/20 text-accent-foreground border-accent/30 shadow-[0_0_15px_oklch(var(--accent)/0.5)]";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 0.5 }}
      className={cn(
        "group p-4 rounded-lg border bg-card/80 backdrop-blur-sm transition-all duration-200",
        "hover:shadow-xl",
        todo.completed && "opacity-50 blur-[1px]"
      )}
    >
      <div className="flex items-start gap-3">
        <motion.div whileTap={{ scale: 0.9 }}>
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            className="mt-1"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={cn(
                "font-medium text-sm",
                todo.completed && "line-through text-muted-foreground"
              )}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={cn(
                  "text-sm text-muted-foreground mt-1",
                  todo.completed && "line-through"
                )}>
                  {todo.description}
                </p>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                </Dialog>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className={getPriorityColor(todo.priority)}>
              {todo.priority}
            </Badge>
            
            {todo.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {format(new Date(todo.dueDate), "MMM d")}
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Todo</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}