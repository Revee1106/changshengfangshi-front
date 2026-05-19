import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function LifespanIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path fill="currentColor" d="M7.1 2.7h9.8c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2H7.1c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2ZM7.1 18.9h9.8c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2H7.1c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2Z" />
      <path fill="currentColor" d="M8.2 5.6h2.4c0 2.5.2 4-1.6 5.9 1.8 1.9 1.6 3.4 1.6 6H8.2c0-2.6.8-4.1 2.4-5.9-1.6-1.8-2.4-3.3-2.4-6ZM13.4 5.6h2.4c0 2.7-.8 4.2-2.4 6 1.6 1.8 2.4 3.3 2.4 5.9h-2.4c0-2.6-.2-4.1 1.6-6-1.8-1.9-1.6-3.4-1.6-5.9Z" />
      <path fill="#b8892d" d="M9.5 16.6c1.5-1.4 3.6-1.4 5 0H9.5ZM10.1 8.2c1.1.7 2.7.7 3.8 0-1.1 1.3-2.7 1.3-3.8 0Z" />
      <circle cx="12" cy="7.1" r="0.8" fill="#b8892d" />
      <circle cx="12" cy="10.2" r="0.65" fill="#b8892d" />
      <circle cx="12" cy="13.2" r="0.55" fill="#b8892d" />
    </IconBase>
  );
}

export function CultivationIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path fill="currentColor" d="M11.1 2.8c1.4 2.6.8 4.4-.8 6.2-1.7 1.9-3.7 3.6-3.7 6.4 0 3.4 2.6 5.7 5.7 5.7 3.4 0 6-2.5 6-6 0-2.1-1-3.8-2.4-5.2-.4 1.5-1.1 2.6-2 3.3.4-2.7 0-5.1-2.8-10.4Z" />
      <path fill="#b8892d" d="M9.1 14.6c1.5.8 4.4.8 5.8 0-.6 1.8-1.7 3-3.1 3-1.3 0-2.4-1.2-2.7-3Z" />
      <path fill="currentColor" d="M5.4 20.1c3.6 1.3 9.6 1.3 13.2 0-.9 1.1-3.3 1.8-6.6 1.8s-5.7-.7-6.6-1.8Z" opacity=".72" />
      <circle cx="17.7" cy="12.2" r="0.8" fill="#b8892d" />
      <circle cx="6.2" cy="13.1" r="0.65" fill="#b8892d" />
    </IconBase>
  );
}

export function EnergyIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path fill="currentColor" d="M18.6 5.3c-4.4.2-8.3 2.6-9.8 6.3-1.1 2.8-.4 5.6 1.4 7.6-4.1-1.1-6-4.9-4.4-8.7 1.7-4 6.7-6.6 12.8-5.2Z" />
      <path fill="currentColor" d="M5.5 18.9c4.5-.2 8.6-2.6 10-6.4 1-2.8.2-5.6-1.6-7.5 4.2 1.2 6.3 4.9 4.6 8.8-1.7 4-6.8 6.6-13 5.1Z" opacity=".78" />
      <circle cx="12" cy="12" r="3.3" fill="currentColor" />
      <path fill="#f4dfb3" d="m12.5 9.4.9 1.8 1.9.7-1.9.8-.9 1.8-.9-1.8-1.9-.8 1.9-.7.9-1.8Z" />
      <circle cx="19" cy="8" r="1" fill="#b8892d" />
      <circle cx="5" cy="16" r="0.9" fill="#b8892d" />
    </IconBase>
  );
}

export function MindIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path fill="currentColor" d="M12 7.2c2.8-2.4 6.6-.2 6.6 3.3 0 3.8-4 6.1-6.6 8.3-2.6-2.2-6.6-4.5-6.6-8.3 0-3.5 3.8-5.7 6.6-3.3Z" />
      <path fill="currentColor" d="M4.1 16.2c3.1 1.1 4.9 2.7 7.9 5.2 3-2.5 4.8-4.1 7.9-5.2-1.1 2.3-4.2 4.8-7.9 6-3.7-1.2-6.8-3.7-7.9-6Z" opacity=".66" />
      <path fill="#b8892d" d="M12 2.4c.8 1.1.8 2.2 0 3.3-.8-1.1-.8-2.2 0-3.3ZM12 18.4c.5.8.5 1.6 0 2.4-.5-.8-.5-1.6 0-2.4Z" />
      <circle cx="12" cy="5.9" r="0.7" fill="#b8892d" />
    </IconBase>
  );
}

export function SpiritStoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path fill="currentColor" d="m12 2.3 5.8 5.1-2 12.6H8.2l-2-12.6L12 2.3Z" />
      <path fill="#f4dfb3" d="m12 2.3.8 8.1 5-3-5.8-5.1ZM6.2 7.4l5.8 3-3.8 9.6-2-12.6Z" opacity=".5" />
      <path fill="#ffffff" d="m9.2 8.8 2.8 1.6 3.1-1.9.5.9-3.1 1.9v4h-1v-4L8.7 9.7l.5-.9Z" opacity=".72" />
      <path fill="#b8892d" d="m4.9 15.2.8 1.5 1.6.7-1.6.7-.8 1.5-.8-1.5-1.6-.7 1.6-.7.8-1.5ZM18.8 11.4l.6 1.1 1.2.5-1.2.5-.6 1.1-.6-1.1-1.2-.5 1.2-.5.6-1.1Z" />
    </IconBase>
  );
}

export function DaoHeartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path fill="currentColor" d="M12 3.2c4 0 7.3 3.3 7.3 7.3 0 3.7-2.6 6.8-7.3 10.3-4.7-3.5-7.3-6.6-7.3-10.3 0-4 3.3-7.3 7.3-7.3Zm0 3c-2 0-3.6 1.6-3.6 3.6 0 1.4.8 2.5 1.9 3.1.6-2.3 2.1-3.9 4.2-5-.6-1-1.5-1.7-2.5-1.7Z" />
      <path fill="currentColor" d="M9.4 18.7c-2.4-.4-4.7-1.1-6.7-2.2 2.7 2.6 5.6 3.8 9.3 4.3-1-.7-1.8-1.4-2.6-2.1ZM14.6 18.7c2.4-.4 4.7-1.1 6.7-2.2-2.7 2.6-5.6 3.8-9.3 4.3 1-.7 1.8-1.4 2.6-2.1Z" opacity=".68" />
      <circle cx="12" cy="2.8" r="0.8" fill="#b8892d" />
      <circle cx="12" cy="20.9" r="0.7" fill="#b8892d" />
    </IconBase>
  );
}

export function InjuryIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path fill="currentColor" d="M12 2.8 18.4 6v5.3c0 4.2-2.6 7.5-6.4 9.8-3.8-2.3-6.4-5.6-6.4-9.8V6L12 2.8Z" />
      <path fill="#f4dfb3" d="M10.9 7.8h2.2v3h3v2.2h-3v3h-2.2v-3h-3v-2.2h3v-3Z" />
    </IconBase>
  );
}
