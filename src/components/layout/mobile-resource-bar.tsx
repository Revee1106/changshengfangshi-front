import type { CharacterProfile } from "@/types/game";

interface MobileResourceBarProps {
  character: CharacterProfile;
}

export function MobileResourceBar({ character }: MobileResourceBarProps) {
  const items = [
    { label: "境界", value: character.realm },
    { label: "命元", value: `${character.energy}/${character.energyMax}` },
    { label: "心神", value: character.mind },
    { label: "灵石", value: character.spiritStones }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-stone-200 bg-rice-50/95 px-3 py-2 backdrop-blur">
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 rounded-md bg-white/80 px-2 py-1.5">
            <div className="truncate text-[11px] text-stone-500">{item.label}</div>
            <div className="truncate text-xs font-semibold text-ink-900">{item.value}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
