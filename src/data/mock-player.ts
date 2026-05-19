import {
  Brain,
  Flame,
  Home,
  Package,
  Leaf,
  UserRound
} from "lucide-react";

import type {
  Attribute,
  CharacterProfile,
  CultivationAction,
  CultivationPlace,
  GameLog,
  GrowthStat,
  GatheringPlace,
  InventoryItem,
  MindPracticeDirection,
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
  energy: 72,
  energyMax: 100,
  energyNextRecoveryIn: "08:12",
  energyRecoveryRemainingSeconds: 512,
  energyRecoveryAmountWeeks: 4,
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

export const mindPracticeDirections: MindPracticeDirection[] = [
  {
    id: "gathering",
    name: "采集",
    description: "消耗心神，采集灵草、灵矿和低阶杂物。",
    unlocked: true
  },
  {
    id: "alchemy",
    name: "炼丹",
    description: "开炉炼制丹药，消耗材料与心神。",
    unlocked: false,
    requirement: "丹炉与基础丹方未解锁"
  },
  {
    id: "crafting",
    name: "炼器",
    description: "制作工具和器物，首版暂未开放。",
    unlocked: false,
    requirement: "炼器台未解锁"
  },
  {
    id: "talisman",
    name: "符道",
    description: "绘制符箓，处理一次性增益与防护。",
    unlocked: false,
    requirement: "符纸来源未解锁"
  }
];

export const gatheringPlaces: GatheringPlace[] = [
  {
    id: "green-sprout-slope",
    name: "青芽坡",
    unlocked: true,
    description: "坊市外最常见的灵草坡地，适合练气初期采集。",
    mindCost: 20,
    mainYield: "青芽草、甘露花",
    rareYield: "凝露叶",
    risk: "无明显风险"
  },
  {
    id: "mist-bamboo-grove",
    name: "雾竹林",
    unlocked: true,
    description: "晨雾不散的竹林，常有清心类草药生长。",
    mindCost: 30,
    mainYield: "雾竹叶、清心草",
    rareYield: "玉节竹芯"
  },
  {
    id: "broken-stone-beach",
    name: "碎石滩",
    unlocked: true,
    description: "溪边碎石中偶有低阶灵矿，杂物也不少。",
    mindCost: 25,
    mainYield: "碎灵矿、无用碎石",
    rareYield: "水纹石"
  },
  {
    id: "cold-dew-valley",
    name: "寒露谷",
    unlocked: false,
    description: "谷内寒露凝结，适合寻找阴寒类材料。",
    mindCost: 45,
    mainYield: "寒露草、霜纹叶",
    requirement: "练气四层后开放"
  },
  {
    id: "red-sand-ridge",
    name: "赤砂岭",
    unlocked: false,
    description: "赤砂中藏有火性矿物，但容易消耗更多心神。",
    mindCost: 50,
    mainYield: "赤砂矿、火纹石",
    risk: "轻微灼伤风险",
    requirement: "体魄 130 后开放"
  },
  {
    id: "old-medicine-field",
    name: "旧药田",
    unlocked: false,
    description: "废弃药田仍有残存灵苗，偶见稀有草种。",
    mindCost: 60,
    mainYield: "残灵苗、旧药根",
    rareYield: "回春芽",
    requirement: "完成坊市委托后开放"
  }
];

export const inventoryItems: InventoryItem[] = [
  {
    id: "minor-cultivation-pill",
    name: "小培元丹",
    type: "丹药",
    grade: "凡品",
    quantity: 3,
    description: "低阶修为丹药，适合练气初期服用。",
    usable: true,
    sellable: true
  },
  {
    id: "healing-pill",
    name: "止血散",
    type: "丹药",
    grade: "凡品",
    quantity: 2,
    description: "处理轻微伤势的常见药散。",
    usable: true,
    sellable: true
  },
  {
    id: "green-sprout-grass",
    name: "青芽草",
    type: "灵草",
    grade: "一阶",
    quantity: 12,
    description: "最常见的低阶灵草，可作为炼丹辅材。",
    usable: false,
    sellable: true
  },
  {
    id: "sweet-dew-flower",
    name: "甘露花",
    type: "灵草",
    grade: "一阶",
    quantity: 5,
    description: "花瓣含有清甜灵露，常用于温养类丹方。",
    usable: false,
    sellable: true
  },
  {
    id: "spirit-ore-chip",
    name: "碎灵矿",
    type: "灵矿",
    grade: "一阶",
    quantity: 8,
    description: "含少量灵气的矿石碎片，可用于炼器入门。",
    usable: false,
    sellable: true
  },
  {
    id: "herb-hoe",
    name: "药锄",
    type: "工具",
    grade: "凡器",
    quantity: 1,
    description: "采集灵草时使用的基础工具。",
    usable: false,
    sellable: false
  },
  {
    id: "stone-dust",
    name: "无用碎石",
    type: "杂物",
    grade: "杂物",
    quantity: 16,
    description: "采集时混入背包的普通碎石，坊市仍可低价收购。",
    usable: false,
    sellable: true
  }
];

export const navigationItems: NavigationItem[] = [
  { label: "总览", href: "/", icon: Home },
  { label: "修炼", href: "/cultivation", icon: Flame },
  { label: "心神", href: "/mind", icon: Brain },
  { label: "行囊", href: "/inventory", icon: Package },
  { label: "角色", href: "/character", icon: UserRound }
];

export const mobileNavigationItems: NavigationItem[] = [
  navigationItems[0],
  navigationItems[1],
  { label: "心神", href: "/mind", icon: Leaf },
  navigationItems[3],
  navigationItems[4]
];
