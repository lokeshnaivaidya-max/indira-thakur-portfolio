export function getBlurDataURL(color: string): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="rgb(${r},${g},${b})"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

interface Breakpoints {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export function getImageSizes(breakpoints: Breakpoints): string {
  const parts: string[] = [];

  if (breakpoints.sm) parts.push(`(min-width: 640px) ${breakpoints.sm}px`);
  if (breakpoints.md) parts.push(`(min-width: 768px) ${breakpoints.md}px`);
  if (breakpoints.lg) parts.push(`(min-width: 1024px) ${breakpoints.lg}px`);
  if (breakpoints.xl) parts.push(`(min-width: 1280px) ${breakpoints.xl}px`);

  parts.push('100vw');
  return parts.join(', ');
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
