import envelopeClosed  from './assets/envelope_closed.webp'
import envelopeOpening from './assets/envelope_opening.webp'
import KissesDecoration from './KissesDecoration'

export default {
  id: 'valentines',

  // Componente decorativo renderizado dentro do PaperTexture
  Decoration: KissesDecoration,

  assets: {
    envelopeClosed,
    envelopeOpening,
  },

  copy: {
    landing: {
      heroTitle: 'Surpreenda quem você ama ♥',
      heroSubtitle: 'Crie um presente personalizado e inesquecível para a pessoa que você ama.',
      heroCtaPrimary: 'Criar meu presente →',
      heroCtaSecondary: 'Ver demo →',
      ctaFinalEmoji: '💌',
      ctaFinalTitle: 'Crie seu presente agora',
      socialProof: '+2.800 casais surpreendidos',
      statsLabel: 'casais felizes',
    },

    editor: {
      step1Title: 'Nomes do casal',
      step1NameLabel1: 'Seu nome',
      step1NameLabel2: 'Nome do seu amor',
      step1DateLabel: 'Data de início do relacionamento',
    },

    counter: {
      title: 'te amo a ❤️',
      subtitle: 'juntos há',
    },

    letter: {
      // {duration} é substituído por "X anos e Y meses" em runtime
      headerTemplate: 'há {duration} eu te amo',
      tapToOpen: 'toque para abrir',
    },
  },
}
