import type { SVGProps } from "react";

export type GameIconProps = SVGProps<SVGSVGElement>;

function StrokeIcon({ children, ...props }: GameIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function FillIcon({ children, ...props }: GameIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function LotusIcon(props: GameIconProps) {
  return (
    <FillIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4c.672 0 1.235.44 1.599.805c.414.415.813.978 1.16 1.63c.448.845.836 1.89 1.054 3.058a9.4 9.4 0 0 1 1.898-.74c.493-.129.973-.2 1.399-.19c.37.009.934.082 1.34.488c.421.421.512 1.047.483 1.617c-.028.528-.163 1.138-.385 1.769a10.6 10.6 0 0 1-1.088 2.197a7.3 7.3 0 0 1 1.23.6c.62.386 1.31.969 1.31 1.766c0 .355-.143.642-.269.83c-.411.62-1.119 1.025-1.777 1.328c-1.028.473-2.42.842-3.954.842c-1.55 0-2.96-.376-4-.863c-1.04.487-2.45.863-4 .863c-1.534 0-2.926-.369-3.954-.842c-.658-.303-1.366-.708-1.777-1.327A1.5 1.5 0 0 1 2 17c0-.797.69-1.38 1.31-1.765a7.3 7.3 0 0 1 1.23-.601a10.6 10.6 0 0 1-1.088-2.197c-.222-.631-.357-1.24-.385-1.769c-.03-.57.061-1.196.483-1.617c.406-.406.97-.48 1.34-.488c.426-.01.906.061 1.399.19a9.4 9.4 0 0 1 1.898.74a10.8 10.8 0 0 1 1.055-3.058c.346-.652.745-1.215 1.16-1.63C10.765 4.44 11.327 4 12 4m6.145 12.301A11.2 11.2 0 0 1 16.072 18c1.198-.012 2.278-.305 3.045-.658c.255-.118.462-.235.62-.342c-.48-.324-1.037-.54-1.592-.699m-12.29 0c-.555.16-1.111.375-1.592.699c.158.107.365.224.62.342c.767.353 1.847.646 3.045.658a11.2 11.2 0 0 1-2.073-1.7Zm6.328-10.084c-.17-.17-.196-.17-.366 0c-.242.243-.53.632-.809 1.156A9 9 0 0 0 10 11.5a9 9 0 0 0 1.008 4.127c.279.524.568.914.81 1.156c.169.17.195.17.365 0c.242-.242.53-.632.809-1.156A9 9 0 0 0 14 11.5a9 9 0 0 0-1.008-4.127c-.279-.524-.568-.913-.81-1.156Zm-7.118 4.348c.015.288.096.704.273 1.208c.354 1.006 1.043 2.23 2.101 3.288a9.2 9.2 0 0 0 1.723 1.351a11 11 0 0 1-1.16-4.721c-.8-.51-1.586-.838-2.219-1.003a3.7 3.7 0 0 0-.718-.123m13.87 0c-.18.01-.422.046-.718.123c-.633.165-1.419.493-2.219 1.003a11 11 0 0 1-1.16 4.72a9.2 9.2 0 0 0 1.723-1.35c1.058-1.058 1.747-2.282 2.1-3.288c.178-.504.259-.92.274-1.208"
      />
    </FillIcon>
  );
}

export function DaoHeartIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a4.25 4.25 0 0 0 0 8.5a4.25 4.25 0 0 1 0 8.5" />
      <circle cx="12" cy="7.7" r=".7" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16.3" r=".7" fill="currentColor" stroke="none" />
    </StrokeIcon>
  );
}

export function ScrollIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
      <path d="M10 7h5M10 11h5" strokeWidth="1.4" />
    </StrokeIcon>
  );
}

export function GemIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M10.5 3L8 9l4 13l4-13l-2.5-6" />
      <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3zM2 9h20" />
    </StrokeIcon>
  );
}

export function MountainIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m8 3l4 8l5-5l5 15H2z" />
    </StrokeIcon>
  );
}

export function FlameIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3q1 4 4 6.5t3 5.5a7 7 0 0 1-14 0a5 5 0 0 1 1-3a1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
    </StrokeIcon>
  );
}

export function HomeIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </StrokeIcon>
  );
}

export function PackageIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
      <path d="M12 22V12M3.29 7L12 12l8.71-5M7.5 4.27l9 5.15" />
    </StrokeIcon>
  );
}

export function UserRoundIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </StrokeIcon>
  );
}

export function CultivationIcon(props: GameIconProps) {
  return <FlameIcon {...props} />;
}

export function LifespanIcon(props: GameIconProps) {
  return <ScrollIcon {...props} />;
}

export function EnergyIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3q1 4 4 6.5t3 5.5a7 7 0 0 1-14 0a5 5 0 0 1 1-3a1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
      <path d="M9.2 16.5c1.5 1 4.1 1 5.6 0" strokeWidth="1.4" />
    </StrokeIcon>
  );
}

export function MindIcon(props: GameIconProps) {
  return <LotusIcon {...props} />;
}

export function SpiritStoneIcon(props: GameIconProps) {
  return <GemIcon {...props} />;
}

export function InjuryIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3l6 3v5.2c0 4-2.4 7.2-6 9.3c-3.6-2.1-6-5.3-6-9.3V6z" />
      <path d="M12 8.3v6.4M8.8 11.5h6.4" />
    </StrokeIcon>
  );
}

export function ManaIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3c3 3.4 4.5 6.3 4.5 9.2A4.5 4.5 0 0 1 12 17a4.5 4.5 0 0 1-4.5-4.8C7.5 9.3 9 6.4 12 3z" />
      <path d="M8 19c2.3 1 5.7 1 8 0" />
    </StrokeIcon>
  );
}

export function DivineSenseIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M2.8 12s3.4-5.5 9.2-5.5s9.2 5.5 9.2 5.5s-3.4 5.5-9.2 5.5S2.8 12 2.8 12z" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 3.5v1.4M12 19.1v1.4" strokeWidth="1.4" />
    </StrokeIcon>
  );
}

export function BodyIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 3l6 3v5.2c0 4-2.4 7.2-6 9.3c-3.6-2.1-6-5.3-6-9.3V6z" />
      <path d="M9.2 12h5.6M12 9.2v5.6" strokeWidth="1.4" />
    </StrokeIcon>
  );
}

export function MovementIcon(props: GameIconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 17c4.6-7.4 9.8-10.8 16-11" />
      <path d="M5 10h6M3 14h7M15 6l5 .1l-.8 4.8" />
      <path d="M8 19c2.2.8 5.9.9 8.3.2" strokeWidth="1.4" />
    </StrokeIcon>
  );
}
