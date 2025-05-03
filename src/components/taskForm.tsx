"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

interface AddTaskFormProps {
  employees: { user_id: number; name: string }[];
}

export default function AddTaskForm({ employees }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>();
  const [isMandatory, setIsMandatory] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!date) {
      newErrors.date = "Deadline is required";
    }

    if (isMandatory && !assignedTo) {
      newErrors.assignedTo = "Please assign this mandatory task to an employee";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/create/task`,
        {
          title: title,
          description: description,
          deadline: date,
          mandatory: isMandatory,
          assigned_to: assignedTo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setDate(undefined);
      setIsMandatory(false);
      setAssignedTo("");
      setIsSubmitting(false);

      alert("Task created successfully!");
    } catch (err) {
      setErrors(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Failed to fetch Employees"
          : "Failed to fetch Employees"
      );
      console.error("Error fetching Employees:", errors);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
        <CardDescription>
          Fill out the form below to create a new task.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className={cn(errors.title && "text-red-500")}
            >
              Task Title
            </Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(errors.title && "border-red-500")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className={cn(errors.description && "text-red-500")}
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(errors.description && "border-red-500")}
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="deadline"
              className={cn(errors.date && "text-red-500")}
            >
              Deadline
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    errors.date && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="mandatory"
              checked={isMandatory}
              onCheckedChange={setIsMandatory}
            />
            <Label htmlFor="mandatory">Mandatory Task</Label>
          </div>

          {isMandatory && (
            <div className="space-y-2 transition-all duration-300 ease-in-out">
              <Label
                htmlFor="assignTo"
                className={cn(errors.assignedTo && "text-red-500")}
              >
                Assign To
              </Label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger
                  className={cn(errors.assignedTo && "border-red-500")}
                >
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem
                      key={employee.user_id}
                      value={employee.user_id.toString()}
                    >
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.assignedTo && (
                <p className="text-red-500 text-sm">{errors.assignedTo}</p>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[rgb(20,26,34)] hover:bg-[rgb(40,46,54)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Task..." : "Create Task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
