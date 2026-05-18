import {
  Flame,
  Home,
  UserRound
} from "lucide-react";

import type {
  Attribute,
  CharacterProfile,
  CultivationAction,
  CultivationPlace,
  GameLog,
  GrowthStat,
  NavigationItem,
  ResourceSummary
} from "@/types/game";

export const character: CharacterProfile = {
  name: "王长生",
  age: 16,
  realm: "练气三层",
  nextRealm: "练气四层",
  createdAt: "长生历元年春",
  currentLifeWeeks: 18,
  lifespanYearsMax: 80,
  lifespanText: "63年42周",
  remainingLifespanWeeks: 3310,
  lifespanWeeks: 3328,
  energy: 100,
  energyMax: 100,
  energyNextRecoveryIn: "08:12",
  energyRecovery: "每 10 分钟恢复 4 周",
  energyFullIn: "约 5天14时",
  mind: 250,
  daoHeart: 0,
  daoHeartState: "平稳",
  daoHeartEffect: "修炼稳定，无额外修正",
  spiritStones: 128,
  injuryState: "无伤",
  cultivation: 320,
  cultivationRequired: 500,
  bagUsed: 24,
  bagMax: 60
};

export const attributes: Attribute[] = [
  {
    key: "法力",
    value: 128,
    description: "影响法术威力、护体灵力和法宝驱动能力",
    recentGain: "+6"
  },
  {
    key: "神识",
    value: 96,
    description: "影响感知、命中、识破与心魔抗性",
    recentGain: "+4"
  },
  {
    key: "体魄",
    value: 110,
    description: "影响气血、防御、抗伤与突破承受能力",
    recentGain: "+5"
  },
  {
    key: "遁法",
    value: 88,
    description: "影响先手、闪避、追击与逃离能力",
    recentGain: "+3"
  }
];

export const resources: ResourceSummary[] = [
  {
    key: "寿数",
    value: character.lifespanText,
    detail: "剩余寿数稳定",
    progress: 94,
    tone: "ink"
  },
  {
    key: "命元",
    value: `${character.energy} / ${character.energyMax}`,
    detail: character.energyRecovery,
    progress: Math.round((character.energy / character.energyMax) * 100),
    tone: "jade"
  },
  {
    key: "心神",
    value: String(character.mind),
    detail: "事务与技艺资源",
    progress: 42,
    tone: "amber"
  },
  {
    key: "灵石",
    value: String(character.spiritStones),
    detail: "坊市交易货币",
    tone: "muted"
  }
];

export const recentLogs: GameLog[] = [
  {
    id: "log-1",
    type: "修炼",
    time: "刚刚",
    content: "你在静心草庐中修炼 10 周，修为 +10，心神 +50。",
    delta: "命元 -10"
  },
  {
    id: "log-2",
    type: "采集",
    time: "12分钟前",
    content: "你在青芽坡采得青芽草 x2。",
    delta: "心神 -20"
  },
  {
    id: "log-3",
    type: "系统",
    time: "30分钟前",
    content: "命元自然恢复 4 周。",
    delta: "命元 +4"
  },
  {
    id: "log-4",
    type: "坊市",
    time: "昨日",
    content: "出售无用碎石 x6，获得灵石 12。",
    delta: "灵石 +12"
  },
  {
    id: "log-5",
    type: "突破",
    time: "三日前",
    content: "观摩前人手札，道心维持平稳。",
    delta: "道心 +0"
  }
];

export const cultivationPlaces: CultivationPlace[] = [
  {
    id: "quiet-hut",
    name: "静心草庐",
    type: "safe",
    unlocked: true,
    multiplier: "1.0x",
    description: "最基础的安全修炼场所，收益稳定，适合日常积累。",
    daoHeartChange: "道心趋稳"
  },
  {
    id: "stone-cave",
    name: "青石洞府",
    type: "safe",
    unlocked: false,
    multiplier: "1.2x",
    description: "灵气更厚的闭关之所，适合中期积累。",
    requirement: "累计消耗命元 1000 周",
    cost: "解锁需灵石 500"
  },
  {
    id: "wild-vein",
    name: "荒山灵脉",
    type: "wild",
    unlocked: true,
    multiplier: "0.8x - 1.2x",
    description: "无人看守的山间灵脉，收益浮动，可能扰动道心。",
    risk: "可能轻伤",
    daoHeartChange: "-2 至 +2"
  }
];

export const cultivationActions: CultivationAction[] = [
  {
    id: "focus",
    name: "专心修炼",
    description: "主要提升修为，适合推进境界。",
    focus: "修为",
    baseYield: "修为 +1 / 周",
    sideYield: "心神 +5 / 周",
    recommended: true
  },
  {
    id: "mana",
    name: "法力训练",
    description: "强化法力根基，附带少量修为。",
    focus: "法力",
    baseYield: "法力 +0.8 / 周",
    sideYield: "修为 +0.45 / 周"
  },
  {
    id: "sense",
    name: "神识训练",
    description: "提升感知和心魔抗性，突破前更稳。",
    focus: "神识",
    baseYield: "神识 +0.7 / 周",
    sideYield: "修为 +0.40 / 周"
  },
  {
    id: "body",
    name: "体魄训练",
    description: "提升抗伤能力，降低失败承受压力。",
    focus: "体魄",
    baseYield: "体魄 +0.75 / 周",
    sideYield: "修为 +0.35 / 周"
  },
  {
    id: "movement",
    name: "遁法训练",
    description: "提升身法与逃离能力，适合野外行动前准备。",
    focus: "遁法",
    baseYield: "遁法 +0.65 / 周",
    sideYield: "修为 +0.35 / 周"
  }
];

export const growthStats: GrowthStat[] = [
  { label: "累计消耗命元", value: "680 周", detail: "本世修行投入" },
  { label: "累计获得心神", value: "3,420", detail: "由修炼转化" },
  { label: "累计修炼次数", value: "42 次", detail: "含四维训练" },
  { label: "累计采集次数", value: "18 次", detail: "青芽坡为主" },
  { label: "累计炼丹次数", value: "7 次", detail: "成功 5 次" },
  { label: "累计突破次数", value: "2 次", detail: "失败 0 次" }
];

export const navigationItems: NavigationItem[] = [
  { label: "总览", href: "/", icon: Home },
  { label: "修炼", href: "/cultivation", icon: Flame },
  { label: "角色", href: "/character", icon: UserRound }
];

export const mobileNavigationItems: NavigationItem[] = navigationItems;
