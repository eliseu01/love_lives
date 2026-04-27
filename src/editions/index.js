import valentinesConfig  from './valentines/config'
import mothersDayConfig  from './mothers-day/config'

const editions = {
  valentines:    valentinesConfig,
  'mothers-day': mothersDayConfig,
}

const editionId = import.meta.env.VITE_EDITION || 'valentines'
const config = editions[editionId]

if (!config) {
  throw new Error(`Edição "${editionId}" não encontrada. Verifique VITE_EDITION no .env`)
}

export default config
