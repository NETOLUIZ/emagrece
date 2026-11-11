/**
 * Todo o conteúdo editável do site fica aqui.
 *
 * ✅ VERIFICADO  = visto no perfil @emagrecenapraia (prints de 08/11/2026)
 * ⚠️ PENDENTE    = precisa ser confirmado/enviado pela assessoria
 */

export const SITE = {
  name: "Emagrece na Praia",
  tagline: "Saúde • Movimento • Resultados", // ✅ lema do logo
  bio: "O funcional mais animado da Praia de Iracema", // ✅ bio
  bio2: "Treine pra se tornar alguém melhor pra você", // ✅ bio
  instagram: "https://www.instagram.com/emagrecenapraia", // ✅
  instagramHandle: "@emagrecenapraia",
  /** ✅ link de WhatsApp da bio do Instagram */
  whatsappLink: "https://bit.ly/WppEmagreceNaPraia",
  /**
   * ⚠️ PENDENTE: número com DDI+DDD, só dígitos (ex.: "5585999999999").
   * Com o número, a mensagem da aula experimental já vai preenchida no WhatsApp.
   * Sem ele, o site abre o link da bio e copia a mensagem para a área de transferência.
   */
  whatsappNumber: "",
  address: {
    street: "Av. Historiador Raimundo Girão, 1002", // ✅
    district: "Meireles",
    city: "Fortaleza",
    state: "CE",
    reference: "Em frente ao Magna Praia Hotel", // ✅
  },
} as const;

export const MAPS = {
  embed:
    "https://www.google.com/maps?q=Av.+Historiador+Raimundo+Gir%C3%A3o,+1002,+Fortaleza,+CE&output=embed",
  route:
    "https://www.google.com/maps/dir/?api=1&destination=Av.+Historiador+Raimundo+Gir%C3%A3o,+1002,+Fortaleza,+CE",
};

/** ✅ Story "Nossos horários" de 5/out. ⚠️ confirmar se segue vigente. */
export const SCHEDULE = [
  { day: "Segunda", short: "Seg", slots: ["6h", "17h", "18h"] },
  { day: "Terça", short: "Ter", slots: ["17h", "18h"] },
  { day: "Quarta", short: "Qua", slots: ["6h", "17h", "18h"] },
  { day: "Quinta", short: "Qui", slots: ["17h", "18h"] },
  { day: "Sexta", short: "Sex", slots: ["6h"] },
  { day: "Sábado", short: "Sáb", slots: [], note: "Uma vez ao mês" },
] as const;

export const NAV = [
  { href: "#sobre", label: "A assessoria" },
  { href: "#treinos", label: "Treinos" },
  { href: "#planos", label: "Planos e horários" },
  { href: "#galeria", label: "Galeria" },
  { href: "#local", label: "Onde estamos" },
] as const;

export const BENEFITS = [
  { icon: "activity", title: "Condicionamento físico", text: "Treino funcional que melhora fôlego, mobilidade e disposição no dia a dia." },
  { icon: "dumbbell", title: "Fortalecimento muscular", text: "Exercícios com peso do corpo e acessórios, com orientação dos professores." },
  { icon: "heart", title: "Bem-estar", text: "Cuidar da mente também é treino: movimento, sol e boas energias." },
  { icon: "sparkles", title: "Qualidade de vida", text: "Mais saúde e mais autoestima, no seu ritmo e com segurança." },
  { icon: "users", title: "Motivação em grupo", text: "Aqui você faz parte de uma família: turma animada que puxa um ao outro." },
  { icon: "sun", title: "Ambiente ao ar livre", text: "Areia, mar e céu aberto na Praia de Iracema, longe da rotina de academia." },
] as const;

/** ✅ Modalidades/atividades vistas no perfil */
export const TRAININGS = [
  {
    id: "funcional",
    title: "Funcional na praia",
    tag: "Treino de rotina",
    text: "O funcional mais animado da Praia de Iracema. Aulas em turmas, com treino seguro e time de professores acompanhando.",
    meta: "Manhã, fim de tarde e noite",
    image: "/images/treino-funcional.jpg",
  },
  {
    id: "aulao",
    title: "Aulões temáticos",
    tag: "Eventos abertos",
    text: "Aulões especiais como Outubro Rosa, Novembro Azul e Túnel do Tempo Flashback, com música, animação e café coletivo pós-treino.",
    meta: "Aos sábados, 6h15",
    image: "/images/aulao.jpg",
  },
  {
    id: "corrida",
    title: "Corrida é na areia",
    tag: "Evento anual",
    text: "A corrida de pé na areia da Praia de Iracema, com percursos de 2, 3 e 5 km, kit, medalha e muita festa. A 3ª edição foi em setembro de 2026.",
    meta: "2 km • 3 km • 5 km",
    image: "/images/corrida.jpg",
  },
] as const;

/** ✅ Textos dos posts de Wellhub e "Turno da manhã" */
export const PLANS = [
  {
    id: "manha",
    name: "Turno da manhã",
    badge: "Oferta do perfil",
    frequency: "3x na semana",
    perks: ["Acelera o emagrecimento", "Mais autoestima", "Treino com segurança", "Ao ar livre", "Mais saúde e bem-estar"],
    price: null as string | null, // ⚠️ PENDENTE
    highlight: false,
  },
  {
    id: "gold",
    name: "Plano Gold",
    badge: "Aceita Wellhub",
    frequency: "A confirmar",
    perks: ["Treinamento funcional na praia", "Turmas incríveis", "Saúde, bem-estar e resultados", "Wellhub aceito a partir do Gold"],
    price: null as string | null, // ⚠️ PENDENTE
    highlight: true,
  },
] as const;

export const EVENTS_NOTE =
  "Mais que treino: corridas, aulões temáticos e datas especiais que viram festa na areia.";

/**
 * ⚠️ PENDENTE: depoimentos reais com autorização por escrito.
 * Preencha e o carrossel aparece sozinho. Formato:
 * { name: "Maria S.", text: "…", photo: "/images/depoimento-1.webp" }
 */
export const TESTIMONIALS: { name: string; text: string; photo?: string }[] = [];

/** ⚠️ Coloque as fotos autorizadas em /public/images/galeria-N.webp (ou .jpg) */
const GALLERY_EXT: Record<number, string> = { 1: "jpg", 2: "jpg", 3: "jpg", 4: "png", 5: "png", 6: "png", 7: "png" };
export const GALLERY = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/galeria-${i + 1}.${GALLERY_EXT[i + 1] ?? "webp"}`,
  alt: `Treino do Emagrece na Praia na Praia de Iracema, foto ${i + 1}`,
}));
