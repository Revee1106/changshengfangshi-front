import type { LucideIcon } from "lucide-react";

export type ResourceKey =
  | "寿数"
  | "命元"
  | "心神"
  | "道心"
  | "修为"
  | "法力"
  | "神识"
  | "体魄"
  | "遁法"
  | "灵石";

export type Tone = "jade" | "ink" | "amber" | "cinnabar" | "muted";

export interface CharacterProfile {
  name: string;
  age: number;
  realm: string;
  nextRealm: string;
  createdAt: string;
  currentLifeWeeks: number;
  lifespanYearsMax: number;
  lifespanText: string;
  remainingLifespanWeeks: number;
  lifespanWeeks: number;
  energy: number;
  energyMax: number;
  energyNextRecoveryIn: string;
  energyRecovery: string;
  energyFullIn: string;
  mind: number;
  daoHeart: number;
  daoHeartState: string;
  daoHeartEffect: string;
  spiritStones: number;
  injuryState: string;
  cultivation: number;
  cultivationRequired: number;
  bagUsed: number;
  bagMax: number;
}

export interface Attribute {
  key: Extract<ResourceKey, "法力" | "神识" | "体魄" | "遁法">;
  value: number;
  description: string;
  recentGain: string;
}

export interface ResourceSummary {
  key: ResourceKey;
  value: string;
  detail: string;
  progress?: number;
  tone: Tone;
}

export interface Goal {
  title: string;
  required: string;
  suggestions: string[];
}

export interface GameLog {
  id: string;
  type: "修炼" | "采集" | "系统" | "突破" | "坊市";
  time: string;
  content: string;
  delta?: string;
}

export interface AlertItem {
  title: string;
  description: string;
  tone: Tone;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export type PlaceType = "safe" | "wild";

export interface CultivationPlace {
  id: string;
  name: string;
  type: PlaceType;
  unlocked: boolean;
  multiplier: string;
  description: string;
  requirement?: string;
  cost?: string;
  risk?: string;
  daoHeartChange?: string;
}

export interface CultivationAction {
  id: string;
  name: string;
  description: string;
  focus: string;
  baseYield: string;
  sideYield: string;
  recommended?: boolean;
}

export interface GrowthStat {
  label: string;
  value: string;
  detail: string;
}
