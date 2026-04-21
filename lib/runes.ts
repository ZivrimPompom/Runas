export interface Rune {
  id: string;
  name: string;
  symbol: string;
  phonetic: string;
  meaning: string;
  description: string;
  keywords: string[];
  aett: 'Freyja' | 'Heimdall' | 'Tyr';
  history: string;
}

export const ELDER_FUTHARK: Rune[] = [
  {
    id: "fehu",
    name: "Fehu",
    symbol: "ᚠ",
    phonetic: "f",
    meaning: "Gado / Riqueza",
    description: "Representa riqueza móvel, posses e sucesso financeiro. Também simboliza fertilidade e o início de novos ciclos.",
    keywords: ["Riqueza", "Sucesso", "Fertilidade", "Posses"],
    aett: "Freyja",
    history: "Historicamente ligada ao gado, a principal forma de riqueza nas sociedades germânicas antigas. Representa o poder de criação e a responsabilidade de compartilhar a abundância."
  },
  {
    id: "uruz",
    name: "Uruz",
    symbol: "ᚢ",
    phonetic: "u",
    meaning: "Auroque / Força",
    description: "Simboliza força física, vitalidade, coragem e saúde. Representa o poder bruto da natureza e a capacidade de superação.",
    keywords: ["Força", "Saúde", "Vitalidade", "Coragem"],
    aett: "Freyja",
    history: "O Auroque era um boi selvagem extinto, símbolo de força indomável. Enfrentar um auroque era um rito de passagem para jovens guerreiros."
  },
  {
    id: "thurisaz",
    name: "Thurisaz",
    symbol: "ᚦ",
    phonetic: "th",
    meaning: "Gigante / Espinho",
    description: "Representa proteção, forças reativas e conflito. É um aviso para cautela ou uma indicação de que obstáculos estão sendo removidos.",
    keywords: ["Proteção", "Conflito", "Cautela", "Resistência"],
    aett: "Freyja",
    history: "Associada aos gigantes (Thurs) e ao martelo de Thor. Representa a força defensiva que protege contra o caos."
  },
  {
    id: "ansuz",
    name: "Ansuz",
    symbol: "ᚨ",
    phonetic: "a",
    meaning: "Deus / Mensagem",
    description: "Simboliza comunicação, sabedoria divina, inspiração e sinais. Representa a voz de Odin e a clareza mental.",
    keywords: ["Comunicação", "Sabedoria", "Sinais", "Inspiração"],
    aett: "Freyja",
    history: "A runa de Odin, o pai de todos. Representa o sopro da vida e a transmissão de conhecimento sagrado através da palavra."
  },
  {
    id: "raidho",
    name: "Raidho",
    symbol: "ᚱ",
    phonetic: "r",
    meaning: "Roda / Jornada",
    description: "Representa viagens (físicas ou espirituais), ritmo, ordem e destino. Simboliza o movimento correto e a justiça.",
    keywords: ["Jornada", "Movimento", "Ordem", "Destino"],
    aett: "Freyja",
    history: "Ligada à carruagem de Thor e ao movimento rítmico do cosmos. Representa a ordem social e a lei."
  },
  {
    id: "kenaz",
    name: "Kenaz",
    symbol: "ᚲ",
    phonetic: "k",
    meaning: "Tocha / Conhecimento",
    description: "Simboliza iluminação, criatividade, paixão e clareza. Representa o fogo que transforma e o conhecimento que guia.",
    keywords: ["Luz", "Criatividade", "Conhecimento", "Paixão"],
    aett: "Freyja",
    history: "Representa a tocha que ilumina a escuridão e o fogo controlado da forja, onde a matéria é transformada em arte."
  },
  {
    id: "gebo",
    name: "Gebo",
    symbol: "ᚷ",
    phonetic: "g",
    meaning: "Presente / Troca",
    description: "Representa generosidade, parcerias, equilíbrio e sacrifício. Simboliza a união entre pessoas e a harmonia nas relações.",
    keywords: ["Presente", "Parceria", "União", "Equilíbrio"],
    aett: "Freyja",
    history: "Reflete a ética nórdica de que 'um presente sempre espera outro'. Simboliza o contrato social e a conexão entre o divino e o humano."
  },
  {
    id: "wunjo",
    name: "Wunjo",
    symbol: "ᚹ",
    phonetic: "w",
    meaning: "Alegria / Glória",
    description: "Simboliza felicidade, harmonia, bem-estar e sucesso. Representa o fim de um período de dificuldades e a chegada da paz.",
    keywords: ["Alegria", "Sucesso", "Harmonia", "Paz"],
    aett: "Freyja",
    history: "Representa o estandarte da vitória e a satisfação de pertencer a uma comunidade próspera e em paz."
  },
  {
    id: "hagalaz",
    name: "Hagalaz",
    symbol: "ᚼ",
    phonetic: "h",
    meaning: "Granizo / Crise",
    description: "Representa mudanças súbitas, forças fora de controle e purificação através da destruição. É uma runa de transformação necessária.",
    keywords: ["Crise", "Mudança", "Destruição", "Purificação"],
    aett: "Heimdall",
    history: "O granizo é visto como o 'mais branco dos grãos' que cai do céu e se torna água, simbolizando a destruição que precede a renovação."
  },
  {
    id: "nauthiz",
    name: "Nauthiz",
    symbol: "ᚾ",
    phonetic: "n",
    meaning: "Necessidade / Restrição",
    description: "Simboliza carência, atrasos, resistência e a necessidade de paciência. Representa as lições aprendidas através da dificuldade.",
    keywords: ["Necessidade", "Atraso", "Paciência", "Resistência"],
    aett: "Heimdall",
    history: "Ligada ao fogo de fricção usado em tempos de necessidade. Representa a resistência que gera calor e luz na escuridão."
  },
  {
    id: "isa",
    name: "Isa",
    symbol: "ᛁ",
    phonetic: "i",
    meaning: "Gelo / Estagnação",
    description: "Representa pausa, introspecção, clareza através do silêncio e bloqueios temporários. Simboliza o momento de esperar.",
    keywords: ["Pausa", "Silêncio", "Bloqueio", "Introspecção"],
    aett: "Heimdall",
    history: "O gelo é uma ponte escorregadia, mas também um cristal que preserva. Representa o princípio da contração e do silêncio absoluto."
  },
  {
    id: "jera",
    name: "Jera",
    symbol: "ᛃ",
    phonetic: "j",
    meaning: "Colheita / Ano",
    description: "Simboliza o ciclo natural, resultados de esforços passados e abundância. Representa a recompensa pelo trabalho duro.",
    keywords: ["Colheita", "Ciclo", "Resultado", "Abundância"],
    aett: "Heimdall",
    history: "Representa o ciclo das estações e a promessa de que a terra dará frutos se for cultivada com paciência e honra."
  },
  {
    id: "eihwaz",
    name: "Eihwaz",
    symbol: "ᛇ",
    phonetic: "ei",
    meaning: "Teixo / Longevidade",
    description: "Representa resistência, proteção espiritual, continuidade e a conexão entre os mundos. Simboliza a força que perdura.",
    keywords: ["Resistência", "Proteção", "Continuidade", "Conexão"],
    aett: "Heimdall",
    history: "O teixo é a árvore da vida e da morte, perene e resistente. Seus ramos eram usados para fazer arcos, unindo proteção e caça."
  },
  {
    id: "perthro",
    name: "Perthro",
    symbol: "ᛈ",
    phonetic: "p",
    meaning: "Cálice / Mistério",
    description: "Simboliza o oculto, segredos, destino e a sorte. Representa o que ainda não foi revelado e as forças do acaso.",
    keywords: ["Mistério", "Segredo", "Sorte", "Destino"],
    aett: "Heimdall",
    history: "Associada ao copo de dados ou à matriz. Representa as leis do destino (Wyrd) que operam além da compreensão humana."
  },
  {
    id: "algiz",
    name: "Algiz",
    symbol: "ᛉ",
    phonetic: "z",
    meaning: "Alce / Proteção",
    description: "Representa proteção divina, conexão com o sagrado e defesa. Simboliza o escudo que afasta o mal e a orientação espiritual.",
    keywords: ["Proteção", "Defesa", "Espiritualidade", "Escudo"],
    aett: "Heimdall",
    history: "Representa os chifres do alce ou a mão aberta em sinal de proteção. É a runa do guardião e da conexão com os deuses."
  },
  {
    id: "sowilo",
    name: "Sowilo",
    symbol: "ᛊ",
    phonetic: "s",
    meaning: "Sol / Vitória",
    description: "Simboliza sucesso total, energia vital, clareza e poder. Representa a luz que dissipa as sombras e a vitória garantida.",
    keywords: ["Sucesso", "Energia", "Vitória", "Clareza"],
    aett: "Heimdall",
    history: "O sol é o escudo das nuvens e a esperança dos marinheiros. Representa a força vital que sustenta toda a vida."
  },
  {
    id: "tiwaz",
    name: "Tiwaz",
    symbol: "ᛏ",
    phonetic: "t",
    meaning: "Tyr / Justiça",
    description: "Representa honra, justiça, liderança e sacrifício pessoal por um bem maior. Simboliza a coragem do guerreiro espiritual.",
    keywords: ["Justiça", "Honra", "Liderança", "Sacrifício"],
    aett: "Tyr",
    history: "A runa do deus Tyr, que sacrificou sua mão para acorrentar o lobo Fenrir. Representa a lei cósmica e a vitória através da integridade."
  },
  {
    id: "berkano",
    name: "Berkano",
    symbol: "ᛒ",
    phonetic: "b",
    meaning: "Bétula / Nascimento",
    description: "Simboliza novos começos, crescimento, fertilidade e cura. Representa a energia feminina da criação e o cuidado.",
    keywords: ["Crescimento", "Nascimento", "Cura", "Fertilidade"],
    aett: "Tyr",
    history: "A bétula é a primeira árvore a brotar na primavera. Representa o útero da mãe terra e o processo de gestação e nascimento."
  },
  {
    id: "ehwaz",
    name: "Ehwaz",
    symbol: "ᛖ",
    phonetic: "e",
    meaning: "Cavalo / Parceria",
    description: "Representa movimento, progresso, confiança e cooperação. Simboliza a união harmoniosa entre duas forças que avançam juntas.",
    keywords: ["Progresso", "Confiança", "Cooperação", "Movimento"],
    aett: "Tyr",
    history: "Simboliza o vínculo sagrado entre o cavaleiro e seu cavalo. Representa a lealdade e o progresso compartilhado."
  },
  {
    id: "mannaz",
    name: "Mannaz",
    symbol: "ᛗ",
    phonetic: "m",
    meaning: "Homem / Humanidade",
    description: "Simboliza a mente humana, a sociedade, a inteligência e a autoconsciência. Representa a nossa conexão com os outros.",
    keywords: ["Humanidade", "Inteligência", "Sociedade", "Mente"],
    aett: "Tyr",
    history: "Representa a essência do ser humano e sua posição no cosmos. Simboliza a estrutura social e a mente racional."
  },
  {
    id: "laguz",
    name: "Laguz",
    symbol: "ᛚ",
    phonetic: "l",
    meaning: "Água / Intuição",
    description: "Representa o fluxo da vida, emoções, intuição e o inconsciente. Simboliza a capacidade de se adaptar e sentir.",
    keywords: ["Intuição", "Emoção", "Fluxo", "Adaptação"],
    aett: "Tyr",
    history: "Ligada às águas profundas e ao oceano primordial. Representa a força vital fluida e os poderes psíquicos latentes."
  },
  {
    id: "ingwaz",
    name: "Ingwaz",
    symbol: "ᛜ",
    phonetic: "ng",
    meaning: "Ing / Gestação",
    description: "Simboliza potencial latente, descanso necessário e a conclusão de uma fase. Representa a semente que espera o momento de brotar.",
    keywords: ["Potencial", "Descanso", "Conclusão", "Semente"],
    aett: "Tyr",
    history: "Dedicada ao deus Ing (Freyr). Representa a energia concentrada dentro da semente e a fertilidade masculina."
  },
  {
    id: "dagaz",
    name: "Dagaz",
    symbol: "ᛞ",
    phonetic: "d",
    meaning: "Dia / Despertar",
    description: "Representa a luz do dia, transformação radical, clareza e esperança. Simboliza o momento de virada e o despertar espiritual.",
    keywords: ["Despertar", "Clareza", "Esperança", "Transformação"],
    aett: "Tyr",
    history: "Simboliza o equilíbrio entre o dia e a noite. Representa a luz do Criador e a transformação súbita da consciência."
  },
  {
    id: "othala",
    name: "Othala",
    symbol: "ᛟ",
    phonetic: "o",
    meaning: "Herança / Lar",
    description: "Simboliza bens ancestrais, herança, tradição e o lar. Representa a conexão com as nossas raízes e o que nos pertence por direito.",
    keywords: ["Herança", "Lar", "Tradição", "Raízes"],
    aett: "Tyr",
    history: "Representa a terra ancestral e o legado espiritual e material deixado pelos antepassados. É o símbolo do clã e da pátria."
  }
];
