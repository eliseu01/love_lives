// URLs base de cada edição — usadas para back_urls do MP e links de share.
// Em produção, lidas das env vars do projeto Vercel correspondente.
// Em desenvolvimento local, ambas apontam para localhost.

const EDITION_URLS = {
  valentines:    import.meta.env.VITE_VALENTINES_URL  || 'http://localhost:5173',
  'mothers-day': import.meta.env.VITE_MOTHERS_DAY_URL || 'http://localhost:5173',
}

export function getEditionUrl(editionId) {
  return EDITION_URLS[editionId] || EDITION_URLS.valentines
}
