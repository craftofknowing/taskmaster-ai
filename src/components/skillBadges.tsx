import { Badge } from "@/components/ui/badge";

interface SkillBadgesProps {
  skills: string[];
}

export default function SkillBadges({ skills }: SkillBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.length > 0 ? (
        skills.map((skill, index) => (
          <Badge key={index} variant={"secondary"}>
            {skill}
          </Badge>
        ))
      ) : (
        <p className="text-gray-500">No new skills this month</p>
      )}
    </div>
  );
}
