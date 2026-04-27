import envelopeClosed  from './assets/envelope_closed.webp'
import envelopeOpening from './assets/envelope_opening.webp'
import MothersDayDecoration from './MothersDayDecoration'

export default {
  id: 'mothers-day',

  // Placeholder — será substituído na Fase 4 por decoração de flores
  Decoration: MothersDayDecoration,

  assets: {
    envelopeClosed,
    envelopeOpening,
  },

  copy: {
    landing: {
      heroTitle: 'Faça sua mãe se emocionar 💐',
      heroSubtitle: 'Crie um presente personalizado e inesquecível para a mulher mais importante da sua vida.',
      heroCtaPrimary: 'Criar meu presente →',
      heroCtaSecondary: 'Ver demo →',
      ctaFinalEmoji: '💐',
      ctaFinalTitle: 'Crie o presente da sua mãe agora',
    },

    editor: {
      step1Title: 'Sua mãe e você',
      step1NameLabel1: 'Seu nome',
      step1NameLabel2: 'Nome da sua mãe',
      step1DateLabel: 'Data de nascimento',
    },

    counter: {
      title: 'te amo a ❤️',
      subtitle: 'te amo há',
    },

    letter: {
      headerTemplate: 'há {duration} eu te amo',
      tapToOpen: 'toque para abrir',
    },
  },
}
