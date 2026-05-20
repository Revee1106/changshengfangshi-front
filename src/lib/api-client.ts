import {
  attributes as fallbackAttributes,
  character as fallbackCharacter,
  cultivationActions as fallbackCultivationActions,
  cultivationPlaces as fallbackCultivationPlaces,
  gatheringPlaces as fallbackGatheringPlaces,
  growthStats as fallbackGrowthStats,
  inventoryItems as fallbackInventoryItems,
  mindPracticeDirections as fallbackMindPracticeDirections,
  recentLogs as fallbackRecentLogs,
  resources as fallbackResources
} from "@/data/mock-player";
import type {
  Attribute,
  CharacterProfile,
  CultivationAction,
  CultivationPlace,
  GameLog,
  GatheringPlace,
  GrowthStat,
  InventoryItem,
  MindPracticeDirection,
  ResourceSummary
} from "@/types/game";

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
  requestId: string;
  serverTime: string;
}

interface PageResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

interface OverviewResponse {
  character: CharacterProfile;
  attributes: Attribute[];
  recentLogs: GameLog[];
}

interface CharacterProfileResponse {
  character: CharacterProfile;
  attributes: Attribute[];
  resources: ResourceSummary[];
  growthStats: GrowthStat[];
}

interface BreakthroughPill {
  id: string;
  name: string;
  quantity: number;
  successBonus: number;
  description: string;
}

interface BreakthroughCurrent {
  canBreakthrough: boolean;
  blockedReason?: string;
  currentRealm: string;
  currentRealmKey: string;
  targetRealm: string;
  targetRealmKey: string;
  cultivation: number;
  cultivationRequired: number;
  rates: {
    baseSuccessRate: number;
    daoHeartBonus: number;
    randomCorrectionMin: number;
    randomCorrectionMax: number;
    minFinalRate: number;
    maxFinalRate: number;
  };
  availablePills: BreakthroughPill[];
}

interface BreakthroughAttemptResult {
  success: boolean;
  resultText: string;
  character: CharacterProfile;
}

interface MutationResult {
  character: CharacterProfile;
  logs?: GameLog[];
}

export const fallbackData = {
  character: fallbackCharacter,
  attributes: fallbackAttributes,
  recentLogs: fallbackRecentLogs,
  cultivationActions: fallbackCultivationActions,
  cultivationPlaces: fallbackCultivationPlaces,
  mindPracticeDirections: fallbackMindPracticeDirections,
  gatheringPlaces: fallbackGatheringPlaces,
  inventoryItems: fallbackInventoryItems,
  resources: fallbackResources,
  growthStats: fallbackGrowthStats
};

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1"
).replace(/\/$/, "");

function normalizeLog(log: GameLog & { typeName?: string }): GameLog {
  return {
    ...log,
    type: (log.typeName ?? log.type) as GameLog["type"]
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || payload.code !== "OK") {
    throw new Error(payload.message || "API request failed");
  }

  return payload.data;
}

export async function readApi<T>(loader: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await loader();
  } catch {
    return fallback;
  }
}

export const apiClient = {
  login(account: string, password: string, remember: boolean) {
    return request<{
      accessToken: string;
      refreshToken: string;
      hasCharacter: boolean;
      characterId: string | null;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ account, password, remember })
    });
  },

  createCharacter(name: string) {
    return request<CharacterProfile>("/characters", {
      method: "POST",
      body: JSON.stringify({ name })
    });
  },

  characterSummary() {
    return request<CharacterProfile>("/characters/current/summary");
  },

  async overview(logLimit = 5): Promise<OverviewResponse> {
    const data = await request<OverviewResponse>(`/overview?logLimit=${logLimit}`);
    return {
      ...data,
      recentLogs: data.recentLogs.map(normalizeLog)
    };
  },

  characterProfile() {
    return request<CharacterProfileResponse>("/characters/current/profile");
  },

  cultivationActions() {
    return request<CultivationAction[]>("/cultivation/actions");
  },

  cultivationPlaces() {
    return request<CultivationPlace[]>("/cultivation/places");
  },

  startCultivation(actionId: string, placeId: string, energyWeeks: number) {
    return request<MutationResult>("/cultivation/start", {
      method: "POST",
      body: JSON.stringify({
        actionId,
        placeId,
        energyWeeks,
        idempotencyKey: crypto.randomUUID()
      })
    });
  },

  breakthroughCurrent() {
    return request<BreakthroughCurrent>("/breakthrough/current");
  },

  attemptBreakthrough(pillItemId?: string) {
    return request<BreakthroughAttemptResult>("/breakthrough/attempt", {
      method: "POST",
      body: JSON.stringify({
        pillItemId,
        idempotencyKey: crypto.randomUUID()
      })
    });
  },

  mindDirections() {
    return request<MindPracticeDirection[]>("/mind/directions");
  },

  gatheringPlaces() {
    return request<GatheringPlace[]>("/gathering/places");
  },

  attemptGathering(placeId: string) {
    return request<MutationResult>("/gathering/attempt", {
      method: "POST",
      body: JSON.stringify({
        placeId,
        idempotencyKey: crypto.randomUUID()
      })
    });
  },

  async inventoryItems(type?: string) {
    const query = type ? `?type=${encodeURIComponent(type)}` : "";
    const data = await request<PageResult<InventoryItem>>(`/inventory/items${query}`);
    return data.items;
  },

  useItem(inventoryItemId: string) {
    return request<MutationResult>(`/inventory/items/${inventoryItemId}/use`, {
      method: "POST",
      body: JSON.stringify({
        quantity: 1,
        context: "normal",
        idempotencyKey: crypto.randomUUID()
      })
    });
  },

  sellItem(inventoryItemId: string) {
    return request<MutationResult>(`/inventory/items/${inventoryItemId}/sell`, {
      method: "POST",
      body: JSON.stringify({
        quantity: 1,
        idempotencyKey: crypto.randomUUID()
      })
    });
  }
};
