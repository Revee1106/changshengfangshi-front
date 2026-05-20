import { AttributeCard } from "@/components/game/attribute-card";
import { PageHeading } from "@/components/game/page-heading";
import { ResourceCard } from "@/components/game/resource-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { apiClient, fallbackData, readApi } from "@/lib/api-client";

export const dynamic = "force-dynamic";

export default async function CharacterPage() {
  const profile = await readApi(
    () => apiClient.characterProfile(),
    {
      character: fallbackData.character,
      attributes: fallbackData.attributes,
      resources: fallbackData.resources,
      growthStats: fallbackData.growthStats
    }
  );
  const { attributes, character, growthStats, resources } = profile;
  const cultivationProgress = Math.round(
    (character.cultivation / character.cultivationRequired) * 100
  );

  return (
    <>
      <PageHeading
        eyebrow="角色"
        title={`${character.name} 的修行档案`}
        description="集中展示基础信息、寿数命元、境界修为、四维属性、道心状态和本世成长统计。"
        badge={character.realm}
      />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Card className="bg-ink-800 text-rice-50">
          <CardBody>
            <p className="text-sm text-rice-200">基础信息</p>
            <h2 className="mt-2 text-3xl font-semibold">{character.name}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-rice-200">年龄</p>
                <p className="mt-1 font-semibold">{character.age} 岁</p>
              </div>
              <div>
                <p className="text-rice-200">当前境界</p>
                <p className="mt-1 font-semibold">{character.realm}</p>
              </div>
              <div>
                <p className="text-rice-200">创建时间</p>
                <p className="mt-1 font-semibold">{character.createdAt}</p>
              </div>
              <div>
                <p className="text-rice-200">本世周数</p>
                <p className="mt-1 font-semibold">{character.currentLifeWeeks} 周</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-ink-900">境界与修为</h2>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="jade">{character.realm}</Badge>
              <Badge tone="amber">目标 {character.nextRealm}</Badge>
              <Badge tone="muted">无伤</Badge>
            </div>
            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-stone-500">修为</p>
                <p className="mt-1 text-3xl font-semibold text-ink-900">
                  {character.cultivation}
                  <span className="text-base text-stone-400"> / {character.cultivationRequired}</span>
                </p>
              </div>
              <span className="text-sm font-semibold text-jade-700">{cultivationProgress}%</span>
            </div>
            <Progress value={cultivationProgress} className="mt-3" />
          </CardBody>
        </Card>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">寿数与命元</h2>
          <span className="text-xs text-stone-500">命元暂以 mock data 展示</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {resources.map((resource) => (
            <ResourceCard key={resource.key} resource={resource} />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-ink-900">四维属性</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {attributes.map((attribute) => (
            <AttributeCard key={attribute.key} attribute={attribute} />
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-ink-900">道心状态</h2>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-stone-500">当前道心</p>
                <p className="mt-1 text-3xl font-semibold text-ink-900">{character.daoHeart}</p>
              </div>
              <Badge tone="jade">{character.daoHeartState}</Badge>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-600">{character.daoHeartEffect}</p>
            <div className="mt-4 rounded-md bg-rice-100 px-3 py-2 text-sm text-stone-600">
              最近变化：观摩前人手札，道心维持平稳。
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-ink-900">成长统计</h2>
          </CardHeader>
          <CardBody>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {growthStats.map((stat) => (
                <div key={stat.label} className="rounded-md bg-rice-100 px-3 py-3">
                  <p className="text-xs text-stone-500">{stat.label}</p>
                  <p className="mt-1 text-lg font-semibold text-ink-900">{stat.value}</p>
                  <p className="mt-1 text-xs text-stone-500">{stat.detail}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
