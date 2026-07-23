const QUALITY = 85;
const WIDTHS = [400, 800, 1200] as const;

export function toThumbUrl(src: string, width: number, quality = QUALITY): string {
  return src.replace('/object/', '/render/image/') + `?width=${width}&quality=${quality}&format=origin`;
}

export function toSrcSet(src: string, widths: readonly number[] = WIDTHS, quality = QUALITY): string {
  return widths.map((w) => `${toThumbUrl(src, w, quality)} ${w}w`).join(', ');
}
