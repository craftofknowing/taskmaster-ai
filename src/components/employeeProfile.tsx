"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Image from "next/image";

interface Skill {
  id: number;
  name: string;
}

interface ContactInfo {
  email: string;
  phone: string;
}

interface ProfileData {
  name: string;
  profileComplete: boolean;
  bio: string;
  skills: Skill[];
  contactInfo: ContactInfo;
}

export default function EmployeeProfile({ profile }: { profile: ProfileData }) {
  const [bio, setBio] = useState(profile.bio);
  const [skills, setSkills] = useState<Skill[]>(profile.skills);
  const [newSkill, setNewSkill] = useState("");
  const [email, setEmail] = useState(profile.contactInfo.email);
  const [phone, setPhone] = useState(profile.contactInfo.phone);

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || "");
      try {
        // Parse the stringified skills array
        const parsedSkills =
          typeof profile.skills === "string"
            ? JSON.parse(profile.skills)
            : profile.skills;

        setSkills(parsedSkills || []);
      } catch (err) {
        console.error("Failed to parse skills:", err);
        setSkills([]);
      }
      setEmail(profile.contactInfo.email || "");
      setPhone(profile.contactInfo.phone || "");
    }
  }, [profile]);

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, { id: Date.now(), name: newSkill.trim() }]);
      setNewSkill("");
    }
  };

  const removeSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const saveChanges = async () => {
    const payload = {
      bio,
      skills,
      contactInfo: { email, phone },
    };

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save profile changes");
      }

      const data = await response.json();
      console.log("Profile updated:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl tracking-tight font-semibold">
          Employee Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
              width={150}
              height={150}
            />
          </div>
          <h2 className="text-xl font-medium">{profile.name}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1">
              Bio/Description
            </label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium mb-1">
              Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {skill.name}
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex">
              <Input
                id="skills"
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                onClick={addSkill}
                variant="outline"
                className="ml-2"
                disabled={!newSkill.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>

          <Button
            onClick={saveChanges}
            className="w-full bg-[rgb(20,26,34)] hover:bg-[rgb(40,46,54)]"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
