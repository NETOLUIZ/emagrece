import { Activity, Dumbbell, Heart, Sparkles, Users, Sun, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";

const MAP: Record<string, ComponentType<LucideProps>> = {
  activity: Activity,
  dumbbell: Dumbbell,
  heart: Heart,
  sparkles: Sparkles,
  users: Users,
  sun: Sun,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = MAP[name] ?? Sparkles;
  return <C aria-hidden="true" strokeWidth={2} {...props} />;
}
