/** Same layout-grid mark as `apps/web/app/icon.svg` (navbar logo). */
export const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" role="img" aria-label="API">
  <rect width="32" height="32" rx="8" fill="oklch(0.6716 0.1368 48.5130 / 0.15)"/>
  <g fill="none" stroke="oklch(0.6716 0.1368 48.5130)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 4)">
    <rect width="7" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="14" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
  </g>
</svg>
`

export const FAVICON_HEADERS = {
  'Content-Type': 'image/svg+xml; charset=utf-8',
  'Cache-Control': 'public, max-age=86400, immutable',
} as const
