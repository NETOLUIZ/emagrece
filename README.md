# Emagrece na Praia — Landing page

React + Vite + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis + Lucide + Firebase.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # typecheck + build de produção (pasta dist/)
```

## Painel administrativo (`/#/admin`)

Tela para a dona do negócio, sem precisar editar código:

- **Agendamentos**: pedidos de aula experimental enviados pelo site, com filtro por horário/data e botão para marcar como contatado.
- **Fotos**: adicionar, remover e reordenar as fotos da seção "Galeria".
- **Horários**: editar os horários de cada dia da semana (atualiza o site e o formulário automaticamente).

Acesse em `https://seudominio.com/#/admin` (ou `http://localhost:5173/#/admin` em desenvolvimento) e entre com a senha de acesso.

### Configurar o Firebase (necessário para o painel funcionar)

O site funciona normalmente sem isso (com o conteúdo estático de `src/data/content.ts`), mas o painel admin e o registro de agendamentos exigem um projeto Firebase gratuito (plano Spark):

1. Crie um projeto em [console.firebase.google.com](https://console.firebase.google.com).
2. Em **Build > Firestore Database**, clique em "Criar banco de dados" (modo produção) e depois cole o conteúdo de [`firestore.rules`](firestore.rules) em **Regras**.
3. Em **Build > Storage**, clique em "Começar" e depois cole o conteúdo de [`storage.rules`](storage.rules) em **Regras**.
4. Em **Build > Authentication > Sign-in method**, ative "E-mail/senha". Depois em **Users**, adicione um usuário com o e-mail que você vai colocar em `VITE_ADMIN_EMAIL` (ex.: `dona@emagrecenapraia.app`) e a senha que a dona vai usar para entrar no `/admin`.
5. Em **Configurações do projeto > Geral > Seus apps**, crie um "app da Web" e copie os valores do `firebaseConfig`.
6. Copie `.env.example` para `.env` e preencha com esses valores:

   ```bash
   cp .env.example .env
   ```

7. Rode `npm run dev` novamente — o painel em `/#/admin` já vai pedir a senha cadastrada no passo 4.

## O que ainda precisa da assessoria (⚠️)

Tudo editável está em `src/data/content.ts`.

| Item | Onde | Situação |
|---|---|---|
| Número do WhatsApp (DDI+DDD) | `SITE.whatsappNumber` | Sem ele, os botões abrem o link da bio e o formulário copia a mensagem |
| Preços e nomes dos planos | `PLANS` | Mostra "Valores pelo WhatsApp" |
| Frequência do plano Gold | `PLANS[1].frequency` | "A confirmar" |
| Depoimentos autorizados | `TESTIMONIALS` | Vazio: aparece convite para o Instagram. Preencha e o carrossel surge |
| História/missão com as palavras da marca | `components/sections/About.tsx` | Texto baseado só no que está no perfil |
| Horários vigentes | `SCHEDULE` (ou pelo painel `/#/admin`, veja abaixo) | Baseado no story de 5/out |
| Logotipo oficial | `components/ui/Logo.tsx` | Wordmark provisório |
| Domínio final | `index.html` (canonical, og:image) | — |

## Fotos (todas autorizadas pelos alunos)

As fotos da seção **Galeria** agora podem ser adicionadas direto pelo painel `/#/admin` (veja acima), sem precisar editar código. As demais fotos fixas (hero, sobre, treinos, aulão, corrida) ainda vêm de `public/images/` (WebP, ~1600px de largura, < 250 KB cada):

`hero.webp`, `sobre.webp`, `treino-funcional.webp`, `aulao.webp`, `corrida.webp`, `panoramica.webp`, `og.jpg` (1200×630).

Enquanto uma foto não existir, o site mostra um espaço reservado identificado.

## Animações

- `hooks/useScrollAnimations.ts`: um único mecanismo por atributos (`data-reveal`, `data-stagger-group`, `data-parallax`).
- `hooks/useSmoothScroll.ts`: Lenis só no desktop com mouse e sem "reduzir movimento".
- Com `prefers-reduced-motion`, nenhum conteúdo fica escondido e nada anima.
