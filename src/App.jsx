import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  Anchor, ArrowRight, ArrowUpRight, BadgeCheck, Calendar, Check, ChevronDown,
  Crown, Download, Gift, Handshake, Lock, Mail, MapPin, Mic, Minus, Plus,
  Quote, Sailboat, ShieldCheck, Sparkles, Sun, Ticket, Trophy, Users, Utensils,
  Waves, Wine, X,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════════
   NEXT.io Retreats 2027 — partner brochure

   Two destinations, one product set. Every figure below traces to one of:
     · NEXT.io_Retreats_2027_Drive_1.pptx  (2027 inventory, dates, format,
       audience targets, selection method, positioning)
     · Retreat_Cyprus_2026 / Retreat_LATAM_2026 partner brochures
       (deliverables, audience split, attendee logos, C-level feedback)
     · Attendee snapshots, 21 Aug 2026 (job titles in the room — aggregated
       here to titles only, never paired back to a company)

   Deliberately excluded: revenue/profit/commission targets, cost lines,
   marketing budget, internal KPIs and delegate-acquisition milestones.
   This file is a client-facing document.
   ═══════════════════════════════════════════════════════════════════════════ */

const asset = (p) => `${import.meta.env.BASE_URL}${p}`
const eur = (n) => '€' + n.toLocaleString('en-US')

/* ─── Destinations ──────────────────────────────────────────────────────── */

const DESTINATIONS = {
  europe: {
    id: 'europe',
    theme: 'theme-europe',
    tag: 'Europe',
    flag: '🇨🇾',
    place: 'Cyprus',
    venue: 'Cap St Georges Hotel & Resort',
    venueShort: 'Cap St Georges',
    dates: '11 – 13 October 2027',
    datesTight: '11–13 Oct 2027',
    monthLine: 'October 2027',
    edition: '4th edition',
    sea: 'Mediterranean',
    // Audience focus, verbatim from the 2027 plan
    focus: 'Senior iGaming executives with a direct interest in the emerging verticals and crypto in Europe.',
    lede: 'Three days on the western tip of Cyprus, where the Mediterranean does the work of a hundred introductions.',
    hero: 'images/cyprus-networking-dinner.jpg',
    heroAlt: 'Delegates at a long table dinner overlooking the sea at Cap St Georges, Cyprus',
    resortShots: [
      { src: 'images/cyprus-dinner-table.jpg', alt: 'Table set for a networking dinner at Cap St Georges' },
      { src: 'images/cyprus-suite.jpg', alt: 'Sea-view suite at Cap St Georges Hotel & Resort' },
    ],
    lifeShots: [
      { src: 'images/cyprus-wine-tasting.jpg', alt: 'Delegates at a hosted wine tasting under olive trees, Cyprus 2026' },
      { src: 'images/cyprus-networking-dinner.jpg', alt: 'Networking dinner by the sea, NEXT Retreat Europe' },
    ],
    // Target composition of the 50 C-level delegates
    target: [
      { n: 35, label: 'Operators', note: '15 operators · 20 crypto operators' },
      { n: 10, label: 'Affiliates', note: 'European affiliate leadership' },
      { n: 5, label: 'Advisory board & influencers', note: 'Nominated, not applied' },
    ],
    // C-level survey scores as published in the 2026 partner brochure.
    // The question wording dates these to the Retreat Europe 2024 edition.
    feedback: {
      source: 'C-level delegate survey · NEXT Retreat Europe 2024, as published in the 2026 partner brochure',
      headline: { score: '9.32', label: 'Would recommend to an industry friend' },
      rows: [
        ['Would recommend to an industry friend', '9.32'],
        ['Communication from the NEXT.io team', '9.35'],
        ['Cap St Georges as a resort', '9.32'],
        ['Activities during the retreat', '9.27'],
        ['Likelihood of returning', '9.24'],
        ['Overall experience', '9.11'],
        ['Opportunities to network', '9.00'],
      ],
    },
    titles: [
      'CEO', 'COO', 'CFO', 'CTO', 'CMO', 'CPO', 'CCO', 'Managing Director',
      'Board Member', 'Head of Trading', 'Head of Affiliates',
      'Head of Business Development', 'Director of Gaming', 'Senior Director of Sales',
    ],
    logoDir: 'logos/attendees/cyprus',
    attendees: [
      ['1win', '1win'], ['7bet', '7bet'], ['888africa', '888 Africa'],
      ['bckend', 'BCKEND Innovations'], ['bet365', 'bet365'], ['betb2b', 'BetB2B'],
      ['coolbet', 'Coolbet'], ['entain', 'Entain'], ['flutter', 'Flutter Entertainment'],
      ['gamingtec', 'Gamingtec'], ['highbet', 'Highbet'], ['immense', 'Immense'],
      ['kingmakers', 'KingMakers'], ['ll-europe', 'L&L Europe'], ['leon', 'LEON'],
      ['lottoland', 'Lottoland'], ['midnite', 'Midnite'], ['odds96', 'odds96'],
      ['play-north', 'Play North'], ['super-group', 'Super Group'], ['tipico', 'Tipico'],
      ['tonybet', 'Tonybet'], ['wildz', 'Wildz Group'], ['yolo-group', 'Yolo Group'],
    ],
    days: [
      {
        n: 1, date: 'Monday 11 October',
        items: ['Delegates check in', 'Golf tournament or boat day (if sold)', 'Welcome reception'],
      },
      {
        n: 2, date: 'Tuesday 12 October',
        items: ['Networking breakfast', 'Educational content', 'Networking lunch', 'Leisure activities', 'Networking dinner'],
      },
      {
        n: 3, date: 'Wednesday 13 October',
        items: ['Networking breakfast', 'Educational content', 'Delegates check out', 'Networking lunch'],
      },
    ],
    activities: {
      'yacht-golf': {
        title: 'Golf or padel tournament, or a day on the water',
        blurb: 'The flagship leisure slot. A tournament on the Cap St Georges course or a boat day along the Akamas coast — your brand hosts it end to end.',
        imgs: [{ src: 'images/cyprus-padel.jpg', alt: 'Padel tournament at Cap St Georges' }],
      },
      tasting: {
        title: 'Wine tasting in the hills, buggies through the Akamas',
        blurb: 'Two curated experiences off the resort — a hosted tasting at a Cypriot vineyard and an off-road buggy run. Small groups, long conversations.',
        imgs: [
          { src: 'images/cyprus-wine-vineyard.jpg', alt: 'Wine tasting overlooking a Cypriot vineyard' },
          { src: 'images/cyprus-buggies.jpg', alt: 'Off-road buggy on a coastal trail in Cyprus' },
        ],
      },
      pool: {
        title: 'Sport and slow hours by the pool',
        blurb: 'The most relaxed real estate at the retreat. Poolside sessions, padel, sunrise swims — branded, hosted and impossible to walk past.',
        imgs: [],
      },
    },
  },

  latam: {
    id: 'latam',
    theme: 'theme-latam',
    tag: 'LatAm',
    flag: '🇲🇽',
    place: 'Cancún, Mexico',
    venue: 'Secrets Maroma Beach Riviera Cancun',
    venueShort: 'Secrets Maroma Beach',
    // The 2027 plan's summary slide reads 15–18 November; its own day-by-day
    // schedule and the "3 days & 2 nights" format both land on 15–17, which is
    // also the shape of the 2026 edition (17–19 Nov). Using 15–17 here.
    dates: '15 – 17 November 2027',
    datesTight: '15–17 Nov 2027',
    monthLine: 'November 2027',
    edition: '4th edition',
    sea: 'Caribbean',
    focus: 'Senior iGaming executives with a direct interest in the Latin American market.',
    lede: 'Three days on what is regularly voted the best stretch of beach in Mexico, with the region\'s operators in the room.',
    hero: 'images/cancun-yacht.jpg',
    heroAlt: 'The bow of a yacht on the open Caribbean off Riviera Maya',
    resortShots: [
      { src: 'images/cancun-aerial.jpg', alt: 'Aerial view of Secrets Maroma Beach and the Caribbean shoreline' },
      { src: 'images/cancun-pool-dusk.jpg', alt: 'Infinity pool at Secrets Maroma Beach at dusk' },
    ],
    lifeShots: [
      { src: 'images/cancun-networking-dinner.jpg', alt: 'Long-table networking dinner under palms, NEXT Retreat LatAm' },
      { src: 'images/cancun-tequila-tasting.jpg', alt: 'Hosted tequila tasting for delegates at Secrets Maroma Beach' },
    ],
    target: [
      { n: 30, label: 'Operators', note: 'LatAm operator leadership' },
      { n: 10, label: 'Affiliates', note: 'Mexico, Brazil, Colombia, Peru, Chile' },
      { n: 10, label: 'Advisory board & influencers', note: 'Nominated, not applied' },
    ],
    feedback: {
      source: 'C-level delegate survey · NEXT Retreat LatAm, as published in the 2026 partner brochure',
      headline: { score: '9.90', label: 'Likelihood of returning' },
      rows: [
        ['Likelihood of returning', '9.90'],
        ['Would recommend to an industry friend', '9.86'],
        ['Communication from the NEXT.io team', '9.79'],
        ['Overall experience', '9.76'],
        ['Quality of food and beverage', '9.76'],
        ['Opportunities to network', '9.45'],
        ['Secrets Maroma Beach as a resort', '9.41'],
        ['Activities during the event', '9.10'],
        ['Quality of conference content', '8.83'],
        ['Found qualified leads and new connections', '8.62'],
      ],
    },
    titles: [
      'CEO', 'COO', 'CCO', 'Chief Strategy Officer', 'Chief Corporate Development Officer',
      'CBDO', 'Founder', 'Founding Partner', 'Managing Partner', 'Country Manager',
      'Director LatAm', 'Regional Markets Director', 'Director de Operaciones',
      'VP LatAm', 'Legal Director', 'Investor',
    ],
    logoDir: 'logos/attendees/latam',
    attendees: [
      ['1xbet', '1xBet'], ['aieja', 'AIEJA'], ['anakatech', 'Anakatech'],
      ['apostou', 'Apostou'], ['apuestagana', 'ApuestaGana'], ['apuestatotal', 'Apuesta Total'],
      ['apuesteria', 'Apuestería'], ['bandbet', 'BandBet'], ['betcris', 'Betcris'],
      ['betjara', 'Betjara'], ['betplay', 'BetPlay'], ['betsul', 'Betsul'],
      ['betsw', 'BetSW'], ['better-collective', 'Better Collective'], ['betxico', 'BetXico'],
      ['brazino777', 'Brazino777'], ['caliente', 'Caliente Interactive'],
      ['casa-de-apostas', 'Casa de Apostas'], ['casino-club', 'Casino Club'],
      ['draftkings', 'DraftKings'], ['estoril-sol-digital', 'Estoril Sol Digital'],
      ['estrelabet', 'EstrelaBet'], ['golden-lion', 'Golden Lion'],
      ['hard-rock-digital', 'Hard Rock Digital'], ['highbet', 'Highbet'],
      ['island-luck', 'Island Luck'], ['jokerbet', 'Jokerbet'], ['js', 'JS'],
      ['kto', 'KTO'], ['latamwin', 'Latamwin'], ['logrand', 'Logrand'],
      ['nossabet', 'NossaBet'], ['novibet', 'Novibet'], ['orenes', 'Orenes Grupo'],
      ['rubyplay', 'RubyPlay'], ['rushbet', 'Rushbet'], ['stake', 'Stake'],
      ['tinbet', 'Tinbet'],
    ],
    days: [
      {
        n: 1, date: 'Monday 15 November',
        items: ['Delegates check in', 'Golf tournament or boat day (if sold)', 'Welcome reception'],
      },
      {
        n: 2, date: 'Tuesday 16 November',
        items: ['Networking breakfast', 'Educational content', 'Networking lunch', 'Leisure activities', 'Networking dinner'],
      },
      {
        n: 3, date: 'Wednesday 17 November',
        items: ['Networking breakfast', 'Educational content', 'Delegates check out', 'Networking lunch'],
      },
    ],
    activities: {
      'yacht-golf': {
        title: 'A private yacht day on the Caribbean',
        blurb: 'The flagship leisure slot, and the one delegates talk about afterwards. Your brand hosts the boat, the guest list and the whole afternoon.',
        imgs: [{ src: 'images/cancun-yacht.jpg', alt: 'Yacht bow on the open Caribbean' }],
      },
      tasting: {
        title: 'Tequila tasting and the cenotes',
        blurb: 'Two curated experiences with a local anchor — a hosted tasting at the resort and a guided swim in a Yucatán cenote. Small groups, long conversations.',
        imgs: [
          { src: 'images/cancun-tequila-tasting.jpg', alt: 'Hosted tequila tasting for delegates' },
          { src: 'images/cancun-cenote.jpg', alt: 'Delegates at a Yucatán cenote' },
        ],
      },
      pool: {
        title: 'Beach volleyball and slow hours by the pool',
        blurb: 'Sunset volleyball on Maroma beach and the poolside hours either side of it. The most relaxed real estate at the retreat, hosted by you.',
        imgs: [{ src: 'images/cancun-volleyball.jpg', alt: 'Beach volleyball at sunset on Maroma beach' }],
      },
    },
  },
}

/* ─── Product inventory · identical across both retreats ────────────────── */

const PACKAGES = [
  {
    id: 'headline',
    name: 'Headline Partner',
    price: 85000,
    avail: 1,
    passes: 4,
    exclusive: true,
    kicker: 'One per retreat',
    line: 'The retreat carries your name.',
    deliverables: [
      'NEXT Retreat “presented by…” — your name on the event itself',
      'Speaker opportunity',
      'Headline branding pre, during and post event',
      '4 all-inclusive tickets',
      'Delegate list pre-event (job title + company)',
      'Opportunity to contribute a gift to other attendees',
      'Invite up to 5 operator professionals (by approval)',
    ],
  },
  {
    id: 'general',
    name: 'General Partner',
    price: 35000,
    avail: 10,
    passes: 2,
    kicker: 'Ten per retreat',
    line: 'Two of your people in a room of a hundred.',
    deliverables: [
      'Branding pre, during and post event',
      '2 all-inclusive tickets',
      'Delegate list pre-event (job title + company)',
      'Opportunity to contribute a gift to other attendees',
      'Invite up to 5 operator professionals (by approval)',
    ],
  },
  {
    id: 'individual',
    name: 'Individual Ticket',
    price: 15000,
    avail: 21,
    passes: 1,
    kicker: 'Twenty-one per retreat',
    line: 'One pass. The full three days.',
    deliverables: [
      '1 all-inclusive delegate pass',
      'Two nights at the host resort',
      'Full programme: content sessions, networking breakfasts, lunches and dinners',
      'Leisure programme alongside the rest of the room',
      'No branding or speaking rights — those sit with the partnerships above',
    ],
  },
]

const ADDONS = [
  {
    id: 'yacht-golf', name: 'Yacht / Golf', price: 20000, avail: 1,
    icon: Sailboat, kicker: 'One per retreat',
  },
  {
    id: 'tasting', name: 'Tasting & Adventure', price: 15000, avail: 2,
    icon: Wine, kicker: 'Two per retreat',
  },
  {
    id: 'pool', name: 'Sport & Relaxation by the Pool', price: 10000, avail: 2,
    icon: Sun, kicker: 'Two per retreat',
  },
]

const ADDON_CONDITION =
  'Leisure activities are sold only alongside a Headline or General Partnership.'

/* Shared audience data — from the 2026 partner brochures */
const SENIORITY = [
  { label: 'C-level', pct: 83 },
  { label: 'Senior management', pct: 17 },
]
const COMPOSITION = [
  { label: 'Operators', pct: 52 },
  { label: 'Service providers', pct: 35 },
  { label: 'Investors', pct: 10 },
  { label: 'Associations', pct: 3 },
]
const DELEGATE_BUILD = [
  { n: 50, label: 'Complimentary operators, affiliates and influencers', tone: 'accent' },
  { n: 24, label: 'Partner passes', tone: 'gold' },
  { n: 21, label: 'Individual tickets', tone: 'sand' },
  { n: 5, label: 'Advisory board', tone: 'muted' },
]

const SELECTION = [
  { n: '01', title: 'Blask data', body: 'Market-share ranking across the region, so the invitation list starts with who actually matters.' },
  { n: '02', title: 'Relationships', body: 'Existing NEXT relationships and trusted operator contacts built over three editions.' },
  { n: '03', title: 'Advisory board', body: 'Nominations and validation from advisory board members on who belongs in the room.' },
  { n: '04', title: 'Ambassadors', body: 'Peer referrals from ambassadors who can carry the invitation credibly.' },
]

const POSITIONING = [
  {
    title: 'The most valuable room in iGaming',
    body: '100 C-level leaders at an exact 50 operators / 50 suppliers balance. Deal-making, not networking.',
    icon: Handshake,
  },
  {
    title: 'Exclusive by design',
    body: 'A guest list capped at 100 delegates, under Chatham House Rule. The exclusivity is the asset.',
    icon: Lock,
  },
  {
    title: 'Built for business outcomes',
    body: 'Hosted meetings, curated content and premium leisure engineered for real deals, in a world-class resort.',
    icon: Trophy,
  },
  {
    title: 'The definitive regional forum',
    body: 'The retreat leading the conversation in iGaming\'s fastest-growing markets.',
    icon: Sparkles,
  },
]

const PARTNERS_2026 = [
  ['alea', 'Alea'], ['anakatech', 'Anakatech'], ['betby', 'BetBy'], ['flows', 'Flows'],
  ['optimove', 'Optimove'], ['playson', 'Playson'], ['softswiss', 'SoftSwiss'],
  ['spinoro', 'Spinoro'], ['z-gaming-asia', 'Z-Gaming Asia'],
]

/* ─── Small hooks & helpers ─────────────────────────────────────────────── */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-scale')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

function Eyebrow({ children, className = '' }) {
  return (
    <div className={`font-sans text-[10px] sm:text-[11px] uppercase track-wide text-[var(--accent-soft)]/80 ${className}`}>
      {children}
    </div>
  )
}

function Rule({ className = '' }) {
  return <div className={`h-px hairline ${className}`} />
}

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative ${className}`}>
      {children}
    </section>
  )
}

/* ─── Countdown to the next retreat ─────────────────────────────────────── */

function useCountdown(iso) {
  const [left, setLeft] = useState(() => Math.max(0, new Date(iso) - new Date()))
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, new Date(iso) - new Date())), 60000)
    return () => clearInterval(t)
  }, [iso])
  const d = Math.floor(left / 86400000)
  const h = Math.floor((left % 86400000) / 3600000)
  const m = Math.floor((left % 3600000) / 60000)
  return { d, h, m }
}

/* ═══════════════════════════════════════════════════════════════════════════
   Proposal & rate-card exports
   ═══════════════════════════════════════════════════════════════════════════ */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function openPrintable(html) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 120000)
}

function printShell(title, subtitle, body) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${esc(title)}</title>
<script>window.addEventListener('load',function(){setTimeout(function(){window.print()},600)});<\/script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Jost',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#132229;background:#fff;font-size:12px;line-height:1.55}
  .cover{background:#04202c;color:#fff;padding:52px 48px 44px}
  .cover .brand{font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:#7fd4de;margin-bottom:14px}
  .cover h1{font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:400;letter-spacing:-.01em}
  .cover p{color:#a9c4cc;margin-top:10px;font-size:12.5px}
  section{padding:26px 48px 6px}
  h2{font-family:Georgia,serif;font-size:19px;font-weight:400;border-bottom:1px solid #c9a44c;padding-bottom:7px;margin-bottom:16px;page-break-after:avoid}
  .item{border:1px solid #e3e7e9;border-radius:6px;padding:14px 16px;margin-bottom:12px;page-break-inside:avoid}
  .ihead{display:flex;justify-content:space-between;align-items:baseline;gap:14px}
  .ihead h3{font-size:14px;font-weight:600}
  .avail{font-size:9.5px;font-weight:500;text-transform:uppercase;letter-spacing:.14em;color:#6b5216;background:#fbf3dc;border-radius:3px;padding:3px 8px;white-space:nowrap;margin-left:8px}
  .price{font-size:17px;font-weight:600;white-space:nowrap}
  .line{font-style:italic;color:#54666e;margin:7px 0 9px}
  ul{padding-left:17px}
  li{margin-bottom:3px;color:#3d4f57}
  .cond{margin-top:9px;background:#eff6f8;border:1px solid #cfe1e6;border-radius:4px;padding:6px 10px;font-size:11px;color:#2c4a53}
  table{width:100%;border-collapse:collapse}
  thead tr{background:#f3f6f7}
  th{padding:9px 14px;text-align:left;font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:.14em;color:#78888e}
  th:last-child{text-align:right}
  td{padding:11px 14px;border-bottom:1px solid #e8ecee;vertical-align:top}
  td:last-child{text-align:right;font-weight:600;white-space:nowrap}
  .total td{background:#04202c;color:#fff;font-weight:600;font-size:14px;border:0}
  .total td:last-child{color:#ffcf33;font-size:19px}
  .foot{padding:26px 48px 40px;border-top:1px solid #c9a44c;margin-top:26px;color:#5d6d74;font-size:11px;line-height:1.75}
  .foot strong{color:#132229}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="cover">
  <div class="brand">NEXT.io Retreats · 2027</div>
  <h1>${esc(title)}</h1>
  <p>${subtitle}</p>
</div>
${body}
<div class="foot">
  All prices exclude VAT. Availability is live and subject to change without notice.<br>
  ${esc(ADDON_CONDITION)}<br>
  Partnerships: <strong>sales@next.io</strong> &nbsp;·&nbsp; next.io
</div>
</body></html>`
}

const today = () =>
  new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

function exportProposal(dest, cart) {
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0)
  const passes = cart.reduce((s, l) => s + (l.passes || 0) * l.qty, 0)
  const rows = cart.map((l) => `<tr>
      <td><div style="font-weight:600">${esc(l.name)}${l.qty > 1 ? ` &times;${l.qty}` : ''}</div>
      <div style="font-size:11px;color:#78888e;margin-top:2px">${esc(l.group)}</div></td>
      <td>${eur(l.price * l.qty)}</td></tr>`).join('')
  const body = `<section>
    <h2>Selected inventory</h2>
    <table><thead><tr><th>Product</th><th>Investment</th></tr></thead><tbody>
      ${rows}
      <tr class="total"><td>Total investment</td><td>${eur(total)}</td></tr>
    </tbody></table>
    <p style="margin-top:14px;font-size:11.5px;color:#54666e">
      Includes <strong>${passes}</strong> all-inclusive delegate pass${passes === 1 ? '' : 'es'}
      in a room capped at 100, split evenly between operators and suppliers.
    </p>
  </section>`
  openPrintable(printShell(
    `NEXT Retreat ${dest.tag} 2027 — Partnership Proposal`,
    `${esc(dest.dates)} &nbsp;·&nbsp; ${esc(dest.venue)}, ${esc(dest.place)} &nbsp;·&nbsp; Prepared ${today()}`,
    body,
  ))
}

function exportRateCard(dest) {
  const pkgs = PACKAGES.map((p) => `<div class="item">
      <div class="ihead"><div><h3 style="display:inline">${esc(p.name)}</h3>
      <span class="avail">${p.avail} available · ${p.passes} pass${p.passes === 1 ? '' : 'es'}</span></div>
      <div class="price">${eur(p.price)}</div></div>
      <p class="line">${esc(p.line)}</p>
      <ul>${p.deliverables.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
    </div>`).join('')
  const adds = ADDONS.map((a) => {
    const local = dest.activities[a.id]
    return `<div class="item">
      <div class="ihead"><div><h3 style="display:inline">${esc(a.name)}</h3>
      <span class="avail">${a.avail} available</span></div>
      <div class="price">${eur(a.price)}</div></div>
      <p class="line">${esc(local.title)}</p>
      <ul><li>${esc(local.blurb)}</li></ul>
      <div class="cond">${esc(ADDON_CONDITION)}</div>
    </div>`
  }).join('')
  const body = `<section><h2>Partnerships &amp; tickets</h2>${pkgs}</section>
    <section><h2>Leisure activities · ${esc(dest.place)}</h2>${adds}</section>
    <section><h2>The room</h2>
      <div class="item">
        <ul>
          <li>100 delegates, capped — an even 50 operators / 50 suppliers split</li>
          <li>83% C-level, 17% senior management</li>
          <li>52% operators, 35% service providers, 10% investors, 3% associations</li>
          <li>All content under Chatham House Rule</li>
          <li>Personalised onboarding and meeting matchmaking completed one month out</li>
          <li>${esc(dest.focus)}</li>
        </ul>
      </div>
    </section>`
  openPrintable(printShell(
    `NEXT Retreat ${dest.tag} 2027 — Rate Card`,
    `${esc(dest.dates)} &nbsp;·&nbsp; ${esc(dest.venue)}, ${esc(dest.place)} &nbsp;·&nbsp; Generated ${today()}`,
    body,
  ))
}

function buildMailto(dest, cart) {
  const subject = `NEXT Retreat ${dest.tag} 2027 — partnership enquiry`
  if (!cart.length) {
    return `mailto:sales@next.io?subject=${encodeURIComponent(subject)}`
  }
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0)
  const lines = cart.map((l) => `· ${l.name}${l.qty > 1 ? ` x${l.qty}` : ''} — ${eur(l.price * l.qty)}`)
  const body = [
    `NEXT Retreat ${dest.tag} 2027 — ${dest.dates}`,
    `${dest.venue}, ${dest.place}`,
    '',
    'Interested in:',
    ...lines,
    '',
    `Total: ${eur(total)} (excl. VAT)`,
    '',
    'Please confirm availability and next steps.',
  ].join('\n')
  return `mailto:sales@next.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/* ═══════════════════════════════════════════════════════════════════════════
   Chrome
   ═══════════════════════════════════════════════════════════════════════════ */

const NAV = [
  ['room', 'The room'],
  ['days', 'Three days'],
  ['partner', 'Partnerships'],
  ['leisure', 'Leisure'],
  ['build', 'Build a package'],
  ['proof', 'Proof'],
]

function Wordmark({ className = '' }) {
  return (
    <div className={`font-sans leading-none ${className}`}>
      <span className="font-medium tracking-tight">NEXT</span>
      <span className="text-[var(--accent-soft)] font-medium">.io</span>
      <span className="ml-2 text-[0.62em] uppercase track-wide text-cream/50 align-middle">Retreats</span>
    </div>
  )
}

function DestinationSwitch({ active, onChange, compact = false }) {
  return (
    <div
      role="tablist"
      aria-label="Choose a retreat"
      className={`relative inline-flex items-center rounded-full border border-cream/15 bg-abyss/60 backdrop-blur-md
                  ${compact ? 'p-0.5' : 'p-1'}`}
    >
      {Object.values(DESTINATIONS).map((d) => {
        const on = d.id === active
        return (
          <button
            key={d.id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(d.id)}
            className={`relative rounded-full transition-all duration-500 font-sans
                        ${compact ? 'px-3.5 py-1.5 text-[11px]' : 'px-5 sm:px-7 py-2.5 text-xs sm:text-[13px]'}
                        ${on
                          ? 'bg-[var(--accent)] text-abyss font-medium shadow-[0_0_28px_-6px_var(--accent)]'
                          : 'text-cream/55 hover:text-cream/90'}`}
          >
            <span className="mr-1.5">{d.flag}</span>
            <span className="uppercase track-mid">{d.tag}</span>
            {!compact && (
              <span className={`ml-2 hidden sm:inline ${on ? 'text-abyss/65' : 'text-cream/35'}`}>
                {d.datesTight}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function Nav({ dest, destId, setDestId, cartCount }) {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
                  ${solid ? 'bg-abyss/88 backdrop-blur-xl border-b border-cream/10' : 'bg-transparent'}`}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 h-16 sm:h-20 flex items-center gap-4">
        <a href="#top" className="shrink-0">
          <Wordmark className="text-lg sm:text-xl text-cream" />
        </a>
        <nav className="hidden lg:flex items-center gap-7 ml-8 font-sans text-[12px] uppercase track-mid">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-cream/50 hover:text-[var(--accent-soft)] transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block">
            <DestinationSwitch active={destId} onChange={setDestId} compact />
          </div>
          <a
            href="#build"
            className="relative inline-flex items-center gap-2 rounded-full bg-next-gold px-4 sm:px-5 py-2
                       font-sans text-[11px] sm:text-xs uppercase track-mid text-abyss font-medium
                       hover:brightness-110 transition"
          >
            Enquire
            {cartCount > 0 && (
              <span className="grid place-items-center h-4 w-4 rounded-full bg-abyss text-next-gold text-[9px] num">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
      <div className="sm:hidden px-5 pb-3">
        <DestinationSwitch active={destId} onChange={setDestId} compact />
      </div>
    </header>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Hero
   ═══════════════════════════════════════════════════════════════════════════ */

function Hero({ dest, destId, setDestId }) {
  return (
    <Section id="top" className="min-h-[100svh] flex flex-col overflow-hidden">
      {/* Photography, cross-faded per destination */}
      <div className="absolute inset-0">
        {Object.values(DESTINATIONS).map((d) => (
          <img
            key={d.id}
            src={asset(d.hero)}
            alt={d.heroAlt}
            className={`absolute inset-0 h-full w-full object-cover submerge transition-opacity duration-[1400ms] ease-out
                        ${d.id === destId ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/62 via-abyss/38 to-abyss" />
        {/* Vignette pulls the eye to the headline without drowning the water */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(78% 62% at 46% 44%, transparent 0%, color-mix(in oklab, var(--ground) 82%, transparent) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(100deg, color-mix(in oklab, var(--ground) 72%, transparent) 0%, transparent 58%)' }}
        />
        <div className="caustics" />
      </div>
      <div className="grain absolute inset-0" />

      <div className="relative flex-1 mx-auto w-full max-w-[1400px] px-5 sm:px-8 flex flex-col justify-center pt-28 pb-14">
        <div className="reveal in">
          <Eyebrow className="mb-5 sm:mb-7">
            NEXT.io Retreats · 2027 · {dest.edition}
          </Eyebrow>

          <h1 className="font-display font-light text-cream leading-[0.92] tracking-[-0.015em]
                         text-[3.1rem] sm:text-[5rem] lg:text-[7rem] xl:text-[8.2rem] max-w-[19ch]">
            Fifty operators.
            <br />
            <span className="italic text-[var(--accent-soft)]">Fifty suppliers.</span>
            <br />
            One shoreline.
          </h1>

          <p className="mt-7 sm:mt-9 max-w-[46ch] font-sans text-[15px] sm:text-lg font-light leading-relaxed text-cream/72">
            One hundred senior executives, three days, two nights, and a room built
            so that the people who buy and the people who build finally have time
            to talk. Everything said in it stays in it.
          </p>

          {/* On mobile the sticky header already carries the switch */}
          <div className="mt-9 sm:mt-11 hidden sm:block">
            <DestinationSwitch active={destId} onChange={setDestId} />
          </div>
        </div>

        {/* Fact rail */}
        <div className="mt-12 sm:mt-16">
          <Rule className="mb-7 opacity-60" />
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
            {[
              [Calendar, 'Dates', dest.dates],
              [MapPin, 'Venue', `${dest.venueShort}, ${dest.place}`],
              [Users, 'The room', '100 delegates · 50 / 50'],
              [Waves, 'Format', 'Retreat · 3 days, 2 nights'],
            ].map(([Icon, k, v], i) => (
              <div key={k} className="reveal in" style={{ transitionDelay: `${120 + i * 90}ms` }}>
                <dt className="flex items-center gap-2 font-sans text-[10px] uppercase track-wide text-cream/40">
                  <Icon size={13} className="text-[var(--accent)]" strokeWidth={1.5} />
                  {k}
                </dt>
                <dd className="mt-2 font-display text-lg sm:text-2xl font-light text-cream leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#value"
        className="relative mx-auto mb-8 grid place-items-center h-11 w-11 rounded-full border border-cream/20
                   text-cream/45 hover:text-[var(--accent-soft)] hover:border-[var(--accent)]/50 transition"
        aria-label="Scroll on"
      >
        <ChevronDown size={17} strokeWidth={1.5} />
      </a>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   The value proposition
   ═══════════════════════════════════════════════════════════════════════════ */

function Value({ dest }) {
  return (
    <Section id="value" className="py-24 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_0.92fr] gap-14 lg:gap-24 items-start">
          <div className="reveal">
            <Eyebrow className="mb-6">Why it works</Eyebrow>
            <h2 className="font-display font-light text-cream leading-[1.02] tracking-[-0.01em]
                           text-[2.4rem] sm:text-[3.6rem] lg:text-[4.4rem]">
              Suppliers get the one thing
              <span className="italic text-[var(--accent-soft)]"> a trade floor never gives them</span>
              — unhurried time with the decision-maker.
            </h2>
            <div className="mt-9 space-y-5 font-sans text-[15px] sm:text-[17px] font-light leading-relaxed text-cream/70 max-w-[54ch]">
              <p>
                At a conference you get ninety seconds at a stand. Here you get three
                days at the same resort as the person who signs — over breakfast, on
                the boat, at the long table after dinner. Half the room runs an
                operator. The other half supplies them. That ratio is enforced, not
                hoped for.
              </p>
              <p>
                Everything is under Chatham House Rule, so the conversations are the
                real ones. And every delegate is onboarded and matched personally a
                month out, which means nobody arrives wondering who to find.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {[['100', 'delegates, capped'], ['50/50', 'operators to suppliers'], ['83%', 'C-level']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-4xl sm:text-5xl font-light text-[var(--accent-soft)] num">{n}</div>
                  <div className="mt-1 font-sans text-[11px] uppercase track-mid text-cream/45">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Overlapping photo composition */}
          <div className="relative reveal-scale">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={asset(dest.lifeShots[0].src)}
                alt={dest.lifeShots[0].alt}
                className="h-full w-full object-cover submerge"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 -left-6 sm:-left-12 w-[52%] aspect-[5/4] overflow-hidden rounded-sm
                            ring-1 ring-cream/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]">
              <img
                src={asset(dest.lifeShots[1].src)}
                alt={dest.lifeShots[1].alt}
                className="h-full w-full object-cover submerge"
              />
            </div>
            <div className="absolute -top-5 -right-3 sm:-right-8 max-w-[15rem] bg-abyss/85 backdrop-blur-md
                            border border-cream/12 px-5 py-4">
              <Quote size={15} className="text-[var(--accent)] mb-2" strokeWidth={1.5} />
              <p className="font-display italic text-[15px] leading-snug text-cream/85">
                Deal-making, not networking.
              </p>
              <p className="mt-2 font-sans text-[10px] uppercase track-mid text-cream/40">
                The 2027 positioning
              </p>
            </div>
          </div>
        </div>

        {/* Positioning quartet */}
        <div className="mt-20 sm:mt-28 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10">
          {POSITIONING.map((p, i) => (
            <div
              key={p.title}
              className="reveal bg-[var(--ground)] p-7 sm:p-9 group hover:bg-[var(--ground-2)] transition-colors duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p.icon size={20} className="text-[var(--accent)] mb-6" strokeWidth={1.25} />
              <h3 className="font-display text-xl sm:text-[1.65rem] font-light leading-tight text-cream">
                {p.title}
              </h3>
              <p className="mt-3.5 font-sans text-[13.5px] font-light leading-relaxed text-cream/60">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   The room — audience data
   ═══════════════════════════════════════════════════════════════════════════ */

function Bar({ label, pct, delay = 0, tone = 'accent' }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setW(pct), delay)
        io.unobserve(el)
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [pct, delay])
  const fill = tone === 'gold' ? 'var(--color-next-gold)' : tone === 'sand' ? 'var(--color-sand)' : 'var(--accent)'
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-sans text-[13px] font-light text-cream/75">{label}</span>
        <span className="font-display text-2xl font-light text-cream num">{pct}%</span>
      </div>
      <div className="mt-2 h-[3px] bg-cream/10 overflow-hidden">
        <div
          className="h-full transition-[width] duration-[1600ms] ease-out"
          style={{ width: `${w}%`, background: fill }}
        />
      </div>
    </div>
  )
}

function TheRoom({ dest }) {
  return (
    <Section id="room" className="py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ground-2)]/40 to-transparent" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="reveal max-w-[62ch]">
          <Eyebrow className="mb-6">The room</Eyebrow>
          <h2 className="font-display font-light text-cream leading-[1.03] tracking-[-0.01em]
                         text-[2.4rem] sm:text-[3.6rem] lg:text-[4.2rem]">
            A hundred people, chosen one at a time.
          </h2>
          <p className="mt-6 font-sans text-[15px] sm:text-[17px] font-light leading-relaxed text-cream/70">
            {dest.focus} Growth never dilutes the cap — the hundred is the product.
          </p>
        </div>

        <div className="mt-16 sm:mt-24 grid lg:grid-cols-3 gap-px bg-cream/10">
          {/* Seniority */}
          <div className="bg-[var(--ground)] p-8 sm:p-10 reveal">
            <h3 className="font-sans text-[11px] uppercase track-mid text-cream/45">Seniority</h3>
            <div className="mt-8 space-y-7">
              {SENIORITY.map((s, i) => <Bar key={s.label} {...s} delay={i * 180} />)}
            </div>
            <p className="mt-9 font-sans text-[12px] font-light leading-relaxed text-cream/40">
              Every delegate is a C-level executive or a senior decision-maker with
              budget. There is no junior tier.
            </p>
          </div>

          {/* Composition */}
          <div className="bg-[var(--ground)] p-8 sm:p-10 reveal" style={{ transitionDelay: '110ms' }}>
            <h3 className="font-sans text-[11px] uppercase track-mid text-cream/45">Who they are</h3>
            <div className="mt-8 space-y-7">
              {COMPOSITION.map((c, i) => (
                <Bar key={c.label} {...c} delay={i * 150} tone={i === 0 ? 'gold' : 'accent'} />
              ))}
            </div>
            <p className="mt-9 font-sans text-[12px] font-light leading-relaxed text-cream/40">
              Operators lead the mix. The rest of the room exists to meet them.
            </p>
          </div>

          {/* Build of the 100 */}
          <div className="bg-[var(--ground)] p-8 sm:p-10 reveal" style={{ transitionDelay: '220ms' }}>
            <h3 className="font-sans text-[11px] uppercase track-mid text-cream/45">How the hundred is built</h3>
            <ul className="mt-8 space-y-5">
              {DELEGATE_BUILD.map((d) => (
                <li key={d.label} className="flex items-baseline gap-4">
                  <span
                    className="font-display text-3xl font-light num shrink-0 w-10"
                    style={{
                      color: d.tone === 'gold' ? 'var(--color-next-gold)'
                        : d.tone === 'sand' ? 'var(--color-sand)'
                        : d.tone === 'muted' ? 'rgba(245,240,228,0.4)' : 'var(--accent-soft)',
                    }}
                  >
                    {d.n}
                  </span>
                  <span className="font-sans text-[13px] font-light leading-snug text-cream/70">{d.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-cream/10 flex items-baseline gap-4">
              <span className="font-display text-3xl font-light text-cream num w-10">100</span>
              <span className="font-sans text-[13px] uppercase track-mid text-cream/50">Total</span>
            </div>
          </div>
        </div>

        {/* Target composition for this destination */}
        <div className="mt-20 sm:mt-28 grid lg:grid-cols-[0.85fr_1fr] gap-14 lg:gap-20 items-center">
          <div className="reveal">
            <Eyebrow className="mb-5">{dest.flag} {dest.tag} · the fifty we invite</Eyebrow>
            <h3 className="font-display text-3xl sm:text-[2.8rem] font-light leading-[1.06] text-cream">
              Fifty C-level guests, invited free, so the fifty who pay have someone to meet.
            </h3>
            <p className="mt-5 font-sans text-[14px] font-light leading-relaxed text-cream/60 max-w-[46ch]">
              Operators, affiliates and influencers attend as guests of NEXT.io. That
              is the whole economic model of the retreat: partners fund the room, and
              the room is worth funding.
            </p>
          </div>
          <div className="reveal grid sm:grid-cols-3 gap-px bg-cream/10" style={{ transitionDelay: '120ms' }}>
            {dest.target.map((t) => (
              <div key={t.label} className="bg-[var(--ground-2)] p-7">
                <div className="font-display text-5xl font-light text-[var(--accent-soft)] num">{t.n}</div>
                <div className="mt-3 font-sans text-[13px] text-cream/80">{t.label}</div>
                <div className="mt-1.5 font-sans text-[11.5px] font-light leading-snug text-cream/45">{t.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection method */}
        <div className="mt-24 sm:mt-32">
          <div className="reveal flex items-end justify-between gap-6 flex-wrap">
            <h3 className="font-display text-2xl sm:text-[2.2rem] font-light text-cream">
              How the list gets made
            </h3>
            <p className="font-sans text-[12px] uppercase track-mid text-cream/40">Four filters, no applications</p>
          </div>
          <Rule className="mt-6 mb-10 opacity-50" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
            {SELECTION.map((s, i) => (
              <div key={s.n} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="font-display text-[2.6rem] font-light text-[var(--accent)]/35 num leading-none">{s.n}</div>
                <h4 className="mt-4 font-sans text-[15px] text-cream">{s.title}</h4>
                <p className="mt-2.5 font-sans text-[13px] font-light leading-relaxed text-cream/55">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Who is in the room — logos + titles
   ═══════════════════════════════════════════════════════════════════════════ */

function LogoWall({ dest }) {
  const half = Math.ceil(dest.attendees.length / 2)
  const rows = [dest.attendees.slice(0, half), dest.attendees.slice(half)]
  return (
    <Section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="reveal max-w-[58ch]">
          <Eyebrow className="mb-6">In the room · {dest.tag} 2026</Eyebrow>
          <h2 className="font-display font-light text-cream leading-[1.04] tracking-[-0.01em]
                         text-[2.2rem] sm:text-[3.2rem] lg:text-[3.8rem]">
            The companies who were already there.
          </h2>
          <p className="mt-5 font-sans text-[14.5px] font-light leading-relaxed text-cream/65">
            {dest.attendees.length} businesses on the {dest.tag === 'LatAm' ? 'Cancún' : 'Cyprus'} guest
            list for 2026 — operators, affiliates, suppliers and investors, sat at the
            same tables for three days.
          </p>
        </div>
      </div>

      <div className="mt-14 sm:mt-20 rail-host space-y-4 sm:space-y-6">
        {rows.map((row, ri) => (
          <div key={ri} className="overflow-hidden edge-fade-x">
            <div
              className={`flex w-max items-center ${ri % 2 ? 'rail-slow' : 'rail'}`}
              style={ri % 2 ? { animationDirection: 'reverse' } : undefined}
            >
              {[...row, ...row].map(([file, name], i) => (
                <div
                  key={`${file}-${i}`}
                  className="shrink-0 mx-3 sm:mx-5 h-16 sm:h-20 w-32 sm:w-44 grid place-items-center
                             bg-cream/[0.04] border border-cream/[0.07] px-4 sm:px-6
                             hover:bg-cream/[0.09] hover:border-[var(--accent)]/25 transition-colors duration-400"
                  title={name}
                >
                  <img
                    src={asset(`${dest.logoDir}/${file}.png`)}
                    alt={name}
                    loading="lazy"
                    className="max-h-9 sm:max-h-11 w-auto max-w-full object-contain
                               opacity-90 [filter:brightness(0)_invert(1)] mix-blend-screen"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Titles in the room */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 mt-20 sm:mt-28">
        <div className="reveal grid lg:grid-cols-[0.8fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <Eyebrow className="mb-5">Seniority, in their own words</Eyebrow>
            <h3 className="font-display text-3xl sm:text-[2.6rem] font-light leading-[1.08] text-cream">
              These are the job titles that actually showed up.
            </h3>
            <p className="mt-5 font-sans text-[13.5px] font-light leading-relaxed text-cream/55 max-w-[42ch]">
              Taken from the confirmed {dest.tag} 2026 delegate list. Titles only —
              never matched back to a company or a name.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {dest.titles.map((t, i) => (
              <span
                key={t}
                className="reveal font-sans text-[12px] sm:text-[13px] font-light text-cream/80
                           border border-cream/15 rounded-full px-4 py-2
                           hover:border-[var(--accent)]/45 hover:text-[var(--accent-soft)] transition-colors"
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Three days
   ═══════════════════════════════════════════════════════════════════════════ */

function ThreeDays({ dest }) {
  return (
    <Section id="days" className="py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.14]">
        <img
          src={asset(dest.resortShots[0].src)}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ground)] via-[var(--ground)]/60 to-[var(--ground)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[46ch]">
            <Eyebrow className="mb-6">The programme</Eyebrow>
            <h2 className="font-display font-light text-cream leading-[1.03] tracking-[-0.01em]
                           text-[2.4rem] sm:text-[3.4rem] lg:text-[4rem]">
              Three days, two nights, one guest list.
            </h2>
          </div>
          <div className="font-sans text-right">
            <div className="text-[11px] uppercase track-mid text-cream/40">{dest.flag} {dest.tag}</div>
            <div className="mt-1.5 font-display text-2xl sm:text-3xl font-light text-[var(--accent-soft)]">
              {dest.dates}
            </div>
            <div className="mt-1 text-[12.5px] font-light text-cream/50">{dest.venue}</div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20 grid md:grid-cols-3 gap-px bg-cream/10">
          {dest.days.map((day, i) => (
            <div
              key={day.n}
              className="reveal bg-[var(--ground)]/90 backdrop-blur-sm p-8 sm:p-10"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-6xl sm:text-7xl font-light text-[var(--accent)]/30 num leading-none">
                  0{day.n}
                </span>
                <div>
                  <div className="font-sans text-[10px] uppercase track-wide text-cream/40">Day {day.n}</div>
                  <div className="mt-1 font-sans text-[13px] text-cream/85">{day.date}</div>
                </div>
              </div>
              <ul className="mt-8 space-y-3.5">
                {day.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1 w-1 rounded-full bg-[var(--accent)] shrink-0" />
                    <span className="font-sans text-[14px] font-light leading-snug text-cream/75">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-8">
          {[
            [Mic, 'Content that operators front', 'Operator and influencer speakers on the agenda, with strong C-level representation on stage. Interactive, workshop and roundtable formats — not a lecture theatre.'],
            [ShieldCheck, 'Chatham House Rule', 'Every session is off the record, which is why the answers are candid and the room says what it actually thinks.'],
            [BadgeCheck, 'Matched a month out', 'Personalised onboarding and meeting matchmaking completed one month before arrival. First-timers leave with a network; returners leave with fresh contacts.'],
          ].map(([Icon, title, body], i) => (
            <div key={title} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <Icon size={19} className="text-[var(--accent)] mb-4" strokeWidth={1.25} />
              <h4 className="font-display text-xl font-light text-cream">{title}</h4>
              <p className="mt-2.5 font-sans text-[13px] font-light leading-relaxed text-cream/55">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Partnerships
   ═══════════════════════════════════════════════════════════════════════════ */

function PackageCard({ pkg, dest, onAdd, inCart, featured }) {
  return (
    <div
      className={`reveal relative flex flex-col p-8 sm:p-10 transition-colors duration-500
                  ${featured
                    ? 'bg-[var(--ground-2)] ring-1 ring-[var(--accent)]/35'
                    : 'bg-[var(--ground)] hover:bg-[var(--ground-2)]'}`}
    >
      {featured && (
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          {pkg.exclusive && (
            <div className="mb-3 inline-flex items-center gap-1.5 font-sans text-[10px] uppercase track-mid
                            text-next-gold border border-next-gold/35 rounded-full px-2.5 py-1">
              <Crown size={11} strokeWidth={1.5} /> Exclusive
            </div>
          )}
          <h3 className="font-display text-[2rem] sm:text-[2.4rem] font-light leading-none text-cream">
            {pkg.name}
          </h3>
          <p className="mt-3 font-display italic text-[17px] text-[var(--accent-soft)]">{pkg.line}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display text-3xl sm:text-4xl font-light text-cream num leading-none">
            {eur(pkg.price)}
          </div>
          <div className="mt-2 font-sans text-[10px] uppercase track-mid text-cream/40">{pkg.kicker}</div>
        </div>
      </div>

      <Rule className="my-7 opacity-50" />

      <div className="flex items-center gap-6 font-sans text-[12px] text-cream/60">
        <span className="inline-flex items-center gap-2">
          <Ticket size={14} className="text-[var(--accent)]" strokeWidth={1.5} />
          {pkg.passes} all-inclusive pass{pkg.passes === 1 ? '' : 'es'}
        </span>
        <span className="inline-flex items-center gap-2">
          <Users size={14} className="text-[var(--accent)]" strokeWidth={1.5} />
          {pkg.avail} available
        </span>
      </div>

      <ul className="mt-7 space-y-3 flex-1">
        {pkg.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-3">
            <Check size={14} className="mt-[3px] text-[var(--accent)] shrink-0" strokeWidth={2} />
            <span className="font-sans text-[13.5px] font-light leading-snug text-cream/75">{d}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onAdd(pkg)}
        disabled={inCart >= pkg.avail}
        className={`mt-9 inline-flex items-center justify-center gap-2 w-full py-3.5 font-sans text-[12px]
                    uppercase track-mid transition
                    ${inCart >= pkg.avail
                      ? 'bg-cream/[0.06] text-cream/35 cursor-not-allowed'
                      : featured
                        ? 'bg-next-gold text-abyss hover:brightness-110'
                        : 'bg-cream/10 text-cream hover:bg-[var(--accent)] hover:text-abyss'}`}
      >
        {inCart >= pkg.avail
          ? 'All allocated'
          : <>{inCart > 0 ? `Added · ${inCart}` : 'Add to package'} <Plus size={13} strokeWidth={2} /></>}
      </button>
    </div>
  )
}

function Partnerships({ dest, onAdd, counts }) {
  return (
    <Section id="partner" className="py-24 sm:py-36 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="reveal flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[52ch]">
            <Eyebrow className="mb-6">Partnerships & tickets</Eyebrow>
            <h2 className="font-display font-light text-cream leading-[1.02] tracking-[-0.01em]
                           text-[2.4rem] sm:text-[3.6rem] lg:text-[4.2rem]">
              Three ways in. Same shoreline.
            </h2>
            <p className="mt-6 font-sans text-[15px] font-light leading-relaxed text-cream/65">
              Identical inventory across both retreats — buy Cyprus, Cancún, or both.
              Prices exclude VAT and every pass is all-inclusive.
            </p>
          </div>
          <button
            onClick={() => exportRateCard(dest)}
            className="inline-flex items-center gap-2.5 border border-cream/20 px-5 py-3
                       font-sans text-[11px] uppercase track-mid text-cream/70
                       hover:border-[var(--accent)]/50 hover:text-[var(--accent-soft)] transition"
          >
            <Download size={14} strokeWidth={1.5} /> Rate card · {dest.tag}
          </button>
        </div>

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-3 gap-px bg-cream/10">
          {PACKAGES.map((p) => (
            <PackageCard
              key={p.id}
              pkg={p}
              dest={dest}
              onAdd={onAdd}
              inCart={counts[p.id] || 0}
              featured={p.id === 'headline'}
            />
          ))}
        </div>

        <p className="mt-8 font-sans text-[12px] font-light text-cream/45 max-w-[70ch]">
          The twenty-four partner passes and twenty-one individual tickets are the paid
          half of the room. The other fifty-five seats — operators, affiliates,
          influencers and the advisory board — attend as guests of NEXT.io.
        </p>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Leisure activities
   ═══════════════════════════════════════════════════════════════════════════ */

function ActivityCard({ addon, dest, onAdd, count, locked, i }) {
  const local = dest.activities[addon.id]
  const Icon = addon.icon
  const imgs = local.imgs || []
  return (
    <div
      className="reveal group relative flex flex-col bg-[var(--ground)] overflow-hidden"
      style={{ transitionDelay: `${i * 110}ms` }}
    >
      {/* Imagery, or a typographic treatment where we have none */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        {imgs.length > 0 ? (
          <div className={`absolute inset-0 grid ${imgs.length > 1 ? 'grid-cols-2 gap-px' : ''}`}>
            {imgs.map((im) => (
              <img
                key={im.src}
                src={asset(im.src)}
                alt={im.alt}
                loading="lazy"
                className="h-full w-full object-cover submerge transition-transform duration-[1400ms]
                           ease-out group-hover:scale-[1.06]"
              />
            ))}
          </div>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(130% 100% at 18% 8%, color-mix(in oklab, var(--accent-deep) 92%, transparent), transparent 66%),' +
                'radial-gradient(110% 90% at 88% 95%, color-mix(in oklab, var(--accent-warm) 46%, transparent), transparent 62%),' +
                'linear-gradient(160deg, color-mix(in oklab, var(--accent) 28%, transparent), transparent 70%),' +
                'var(--ground-2)',
            }}
          >
            <Icon
              size={150}
              strokeWidth={0.4}
              className="absolute -bottom-8 -right-6 text-cream/[0.16]"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ground)] via-transparent to-transparent" />
        <div className="absolute top-5 left-5 flex items-center gap-2 bg-abyss/70 backdrop-blur-sm px-3 py-1.5">
          <Icon size={13} className="text-[var(--accent-soft)]" strokeWidth={1.5} />
          <span className="font-sans text-[10px] uppercase track-mid text-cream/80">{addon.kicker}</span>
        </div>
        {/* Price rides the photograph, so a long product name never fights it.
            Chipped rather than bare — some of these shots are very bright. */}
        <div className="absolute top-4 right-4 bg-abyss/70 backdrop-blur-sm px-3 py-1
                        font-display text-2xl sm:text-[1.7rem] font-light leading-tight text-cream num">
          {eur(addon.price)}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-7 sm:p-8">
        <h3 className="font-display text-[1.6rem] sm:text-[1.85rem] font-light leading-tight text-cream">
          {addon.name}
        </h3>
        <p className="mt-3.5 font-display italic text-[16px] leading-snug text-[var(--accent-soft)]">
          {local.title}
        </p>
        <p className="mt-3.5 font-sans text-[13.5px] font-light leading-relaxed text-cream/60 flex-1">
          {local.blurb}
        </p>
        <button
          onClick={() => onAdd(addon)}
          disabled={locked || count >= addon.avail}
          className={`mt-7 inline-flex items-center justify-center gap-2 w-full py-3.5 font-sans text-[12px]
                      uppercase track-mid transition
                      ${locked
                        ? 'bg-cream/[0.05] text-cream/35 cursor-not-allowed'
                        : count >= addon.avail
                          ? 'bg-cream/[0.06] text-cream/35 cursor-not-allowed'
                          : 'bg-cream/10 text-cream hover:bg-[var(--accent)] hover:text-abyss'}`}
        >
          {locked
            ? <><Lock size={12} strokeWidth={1.75} /> Requires a partnership</>
            : count >= addon.avail
              ? 'All allocated'
              : <>{count > 0 ? `Added · ${count}` : 'Add to package'} <Plus size={13} strokeWidth={2} /></>}
        </button>
      </div>
    </div>
  )
}

function Leisure({ dest, onAdd, counts, locked }) {
  return (
    <Section id="leisure" className="py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ground-2)]/50 to-transparent" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="reveal max-w-[60ch]">
          <Eyebrow className="mb-6">Leisure activities · {dest.place}</Eyebrow>
          <h2 className="font-display font-light text-cream leading-[1.02] tracking-[-0.01em]
                         text-[2.4rem] sm:text-[3.6rem] lg:text-[4.2rem]">
            Own the afternoon everyone remembers.
          </h2>
          <p className="mt-6 font-sans text-[15px] font-light leading-relaxed text-cream/65">
            The content sessions are where the room learns. The leisure programme is
            where it relaxes enough to talk properly — and each slot is hosted by a
            single brand. There are five in total across the three days.
          </p>
        </div>

        <div className="mt-14 sm:mt-20 grid md:grid-cols-3 gap-px bg-cream/10">
          {ADDONS.map((a, i) => (
            <ActivityCard
              key={a.id}
              addon={a}
              dest={dest}
              onAdd={onAdd}
              count={counts[a.id] || 0}
              locked={locked}
              i={i}
            />
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 max-w-[70ch]">
          <Lock size={14} className="mt-0.5 text-[var(--accent-warm)] shrink-0" strokeWidth={1.5} />
          <p className="font-sans text-[12.5px] font-light leading-relaxed text-cream/50">
            {ADDON_CONDITION} They are an amplifier on a partnership, not a way in.
          </p>
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Package builder
   ═══════════════════════════════════════════════════════════════════════════ */

function Builder({ dest, cart, setCart }) {
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0)
  const passes = cart.reduce((s, l) => s + (l.passes || 0) * l.qty, 0)
  const bump = (id, delta) =>
    setCart((c) =>
      c.map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0),
    )

  return (
    <Section id="build" className="py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={asset(dest.resortShots[dest.resortShots.length - 1].src)}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ground)] via-[var(--ground)]/80 to-[var(--ground)]" />
        <div className="caustics opacity-30" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="reveal text-center max-w-[52ch] mx-auto">
          <Eyebrow className="mb-6">Build a package</Eyebrow>
          <h2 className="font-display font-light text-cream leading-[1.02] tracking-[-0.01em]
                         text-[2.4rem] sm:text-[3.4rem] lg:text-[3.9rem]">
            Put it together, then send it.
          </h2>
          <p className="mt-6 font-sans text-[15px] font-light leading-relaxed text-cream/65">
            Add inventory above and it lands here. Export it as a proposal or send it
            straight to the partnerships team.
          </p>
        </div>

        <div className="reveal mt-14 border border-cream/12 bg-abyss/55 backdrop-blur-xl">
          <div className="px-6 sm:px-9 py-5 border-b border-cream/10 flex items-center justify-between gap-4">
            <div className="font-sans text-[11px] uppercase track-mid text-cream/45">
              {dest.flag} NEXT Retreat {dest.tag} 2027 · {dest.datesTight}
            </div>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="font-sans text-[11px] uppercase track-mid text-cream/40 hover:text-cream/80 transition"
              >
                Clear
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="px-6 sm:px-9 py-16 text-center">
              <Anchor size={26} className="mx-auto text-cream/20 mb-5" strokeWidth={1.25} />
              <p className="font-display text-2xl font-light text-cream/50">Nothing selected yet.</p>
              <p className="mt-3 font-sans text-[13px] font-light text-cream/35">
                Start with a partnership, then add the leisure slots you want to own.
              </p>
              <a
                href="#partner"
                className="mt-8 inline-flex items-center gap-2 border border-cream/20 px-5 py-3
                           font-sans text-[11px] uppercase track-mid text-cream/70
                           hover:border-[var(--accent)]/50 hover:text-[var(--accent-soft)] transition"
              >
                See partnerships <ArrowRight size={13} strokeWidth={1.75} />
              </a>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-cream/[0.08]">
                {cart.map((l) => (
                  <li key={l.id} className="px-6 sm:px-9 py-5 flex items-center gap-5">
                    <div className="flex-1 min-w-0">
                      <div className="font-sans text-[15px] text-cream truncate">{l.name}</div>
                      <div className="mt-1 font-sans text-[11px] uppercase track-mid text-cream/40">
                        {l.group}
                        {l.passes ? ` · ${l.passes * l.qty} pass${l.passes * l.qty === 1 ? '' : 'es'}` : ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => bump(l.id, -1)}
                        className="grid place-items-center h-7 w-7 border border-cream/15 text-cream/60
                                   hover:border-[var(--accent)]/50 hover:text-[var(--accent-soft)] transition"
                        aria-label={`Remove one ${l.name}`}
                      >
                        <Minus size={12} strokeWidth={2} />
                      </button>
                      <span className="w-7 text-center font-sans text-[13px] text-cream num">{l.qty}</span>
                      <button
                        onClick={() => bump(l.id, 1)}
                        disabled={l.qty >= l.avail}
                        className="grid place-items-center h-7 w-7 border border-cream/15 text-cream/60
                                   hover:border-[var(--accent)]/50 hover:text-[var(--accent-soft)]
                                   disabled:opacity-30 disabled:cursor-not-allowed transition"
                        aria-label={`Add one ${l.name}`}
                      >
                        <Plus size={12} strokeWidth={2} />
                      </button>
                    </div>
                    <div className="w-28 text-right font-display text-xl font-light text-cream num shrink-0">
                      {eur(l.price * l.qty)}
                    </div>
                    <button
                      onClick={() => setCart((c) => c.filter((x) => x.id !== l.id))}
                      className="text-cream/25 hover:text-cream/70 transition shrink-0"
                      aria-label={`Remove ${l.name}`}
                    >
                      <X size={15} strokeWidth={1.75} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="px-6 sm:px-9 py-7 border-t border-cream/12 bg-[var(--ground-2)]/50">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <div className="font-sans text-[11px] uppercase track-mid text-cream/45">
                      Total investment · excl. VAT
                    </div>
                    <div className="mt-2 font-display text-5xl sm:text-6xl font-light text-next-gold num leading-none">
                      {eur(total)}
                    </div>
                    {passes > 0 && (
                      <div className="mt-3 font-sans text-[12.5px] font-light text-cream/55">
                        {passes} all-inclusive delegate pass{passes === 1 ? '' : 'es'} in a room of 100
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => exportProposal(dest, cart)}
                      className="inline-flex items-center gap-2.5 border border-cream/25 px-5 py-3.5
                                 font-sans text-[11px] uppercase track-mid text-cream
                                 hover:border-[var(--accent)] hover:text-[var(--accent-soft)] transition"
                    >
                      <Download size={14} strokeWidth={1.5} /> Export proposal
                    </button>
                    <a
                      href={buildMailto(dest, cart)}
                      className="inline-flex items-center gap-2.5 bg-next-gold px-5 py-3.5
                                 font-sans text-[11px] uppercase track-mid text-abyss font-medium
                                 hover:brightness-110 transition"
                    >
                      <Mail size={14} strokeWidth={1.75} /> Send to partnerships
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Proof — feedback + previous partners
   ═══════════════════════════════════════════════════════════════════════════ */

function Proof({ dest }) {
  const fb = dest.feedback
  return (
    <Section id="proof" className="py-24 sm:py-36 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1fr] gap-14 lg:gap-24 items-start">
          <div className="reveal lg:sticky lg:top-32">
            <Eyebrow className="mb-6">C-level feedback</Eyebrow>
            <h2 className="font-display font-light text-cream leading-[1.02] tracking-[-0.01em]
                           text-[2.4rem] sm:text-[3.4rem]">
              They score it themselves, and then they come back.
            </h2>
            <div className="mt-10">
              <div className="flex items-start gap-4">
                <span className="font-display text-[5.5rem] sm:text-[7rem] font-light leading-[0.8]
                                 text-[var(--accent-soft)] num">
                  {fb.headline.score}
                </span>
                <span className="mt-3 font-display text-3xl font-light text-cream/35">/10</span>
              </div>
              <p className="mt-4 font-sans text-[14px] text-cream/70 max-w-[30ch]">{fb.headline.label}</p>
            </div>
            <p className="mt-9 font-sans text-[11.5px] font-light leading-relaxed text-cream/35 max-w-[42ch]">
              {fb.source}.
            </p>
          </div>

          <div className="reveal">
            <ul>
              {fb.rows.map(([label, score], i) => (
                <li
                  key={label}
                  className="group flex items-baseline gap-5 py-5 border-b border-cream/[0.09]"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="font-sans text-[10px] num text-cream/25 w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-sans text-[14px] sm:text-[15px] font-light text-cream/78 leading-snug">
                    {label}
                  </span>
                  <span className="relative h-[2px] flex-1 max-w-[7rem] hidden sm:block bg-cream/10 self-center">
                    <span
                      className="absolute inset-y-0 left-0 bg-[var(--accent)]/70"
                      style={{ width: `${(parseFloat(score) / 10) * 100}%` }}
                    />
                  </span>
                  <span className="font-display text-2xl sm:text-[1.75rem] font-light text-cream num shrink-0 w-16 text-right">
                    {score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Previous partners */}
        <div className="mt-24 sm:mt-32">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <h3 className="font-display text-2xl sm:text-[2.4rem] font-light text-cream max-w-[44ch]">
              Brands that backed the 2026 retreats
            </h3>
            <p className="font-sans text-[12px] uppercase track-mid text-cream/40">
              Headline & general partners
            </p>
          </div>
          <Rule className="mt-6 mb-12 opacity-50" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-cream/[0.08]">
            {PARTNERS_2026.map(([file, name], i) => (
              <div
                key={file}
                className="reveal bg-[var(--ground)] h-28 sm:h-32 grid place-items-center px-6
                           hover:bg-[var(--ground-2)] transition-colors duration-500"
                style={{ transitionDelay: `${i * 60}ms` }}
                title={name}
              >
                <img
                  src={asset(`logos/partners/${file}.png`)}
                  alt={name}
                  loading="lazy"
                  className="max-h-8 sm:max-h-10 w-auto max-w-[80%] object-contain opacity-85
                            hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
            {/* Keep the grid rectangular so no hairline cell is left hanging */}
            {Array.from({ length: (5 - (PARTNERS_2026.length % 5)) % 5 }).map((_, i) => (
              <div key={`fill-${i}`} className="hidden lg:block bg-[var(--ground)]" aria-hidden="true" />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Both retreats side by side + close
   ═══════════════════════════════════════════════════════════════════════════ */

function BothRetreats({ destId, setDestId }) {
  return (
    <Section className="py-24 sm:py-36 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="reveal text-center max-w-[46ch] mx-auto">
          <Eyebrow className="mb-6">Two retreats, 2027</Eyebrow>
          <h2 className="font-display font-light text-cream leading-[1.03]
                         text-[2.4rem] sm:text-[3.4rem]">
            Do one. Or do the year.
          </h2>
        </div>

        <div className="mt-14 sm:mt-20 grid md:grid-cols-2 gap-px bg-cream/10">
          {Object.values(DESTINATIONS).map((d, i) => {
            const active = d.id === destId
            return (
              <button
                key={d.id}
                onClick={() => {
                  setDestId(d.id)
                  document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`reveal group relative text-left overflow-hidden min-h-[26rem] sm:min-h-[32rem] ${d.theme}`}
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <img
                  src={asset(d.resortShots[0].src)}
                  alt={d.resortShots[0].alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover submerge
                             transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/78 to-abyss/30" />
                <div className="caustics opacity-40" />
                <div className="relative h-full p-8 sm:p-11 flex flex-col justify-end">
                  <div className="font-sans text-[11px] uppercase track-wide text-[var(--accent-soft)]">
                    {d.flag} NEXT Retreat {d.tag} · {d.edition}
                  </div>
                  <h3 className="mt-4 font-display text-[2.4rem] sm:text-[3.2rem] font-light leading-[0.98] text-cream">
                    {d.place}
                  </h3>
                  <p className="mt-3 font-display italic text-xl text-cream/70">{d.dates}</p>
                  <p className="mt-5 font-sans text-[13.5px] font-light leading-relaxed text-cream/60 max-w-[40ch]">
                    {d.lede}
                  </p>
                  <div className="mt-7 inline-flex items-center gap-2 font-sans text-[11px] uppercase track-mid
                                  text-cream/80 group-hover:text-[var(--accent-soft)] transition-colors">
                    {active ? 'Currently viewing' : 'View this retreat'}
                    <ArrowUpRight size={14} strokeWidth={1.75} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function Close({ dest }) {
  const { d } = useCountdown(dest.id === 'europe' ? '2027-10-11T09:00:00Z' : '2027-11-15T09:00:00Z')
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={asset(dest.hero)}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ground)] via-abyss/85 to-abyss" />
        <div className="caustics" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 py-28 sm:py-44 text-center">
        <div className="reveal">
          <Eyebrow className="mb-8">{dest.flag} {dest.venue} · {dest.dates}</Eyebrow>
          <h2 className="font-display font-light text-cream leading-[0.98] tracking-[-0.015em]
                         text-[2.8rem] sm:text-[4.6rem] lg:text-[6rem] max-w-[24ch] mx-auto">
            There are only
            <span className="italic text-[var(--accent-soft)]"> a hundred seats</span>,
            and fifty of them are already spoken for.
          </h2>
          <p className="mt-8 font-sans text-[15px] sm:text-lg font-light leading-relaxed text-cream/65 max-w-[52ch] mx-auto">
            One headline partnership. Ten general partnerships. Twenty-one individual
            tickets. Five leisure slots. {d > 0 ? `${d.toLocaleString('en-US')} days out.` : ''}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:sales@next.io?subject=NEXT.io%20Retreats%202027%20%E2%80%94%20partnership%20enquiry"
              className="inline-flex items-center gap-2.5 bg-next-gold px-7 py-4 font-sans text-[12px]
                         uppercase track-mid text-abyss font-medium hover:brightness-110 transition"
            >
              <Mail size={15} strokeWidth={1.75} /> sales@next.io
            </a>
            <a
              href="#build"
              className="inline-flex items-center gap-2.5 border border-cream/25 px-7 py-4 font-sans text-[12px]
                         uppercase track-mid text-cream hover:border-[var(--accent)] hover:text-[var(--accent-soft)] transition"
            >
              Build a package <ArrowRight size={14} strokeWidth={1.75} />
            </a>
          </div>
          <p className="mt-10 font-sans text-[12px] font-light text-cream/40">
            Partnerships · William Purchase, Partnerships Sales
          </p>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-abyss">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-14">
        <div className="flex flex-wrap gap-10 justify-between">
          <div>
            <Wordmark className="text-xl text-cream" />
            <p className="mt-4 font-sans text-[12.5px] font-light leading-relaxed text-cream/45 max-w-[38ch]">
              NEXT Retreat Europe · Cap St Georges, Cyprus · 11–13 October 2027<br />
              NEXT Retreat LatAm · Secrets Maroma Beach, Cancún · 15–17 November 2027
            </p>
          </div>
          <div className="font-sans text-[12.5px] font-light text-cream/45 space-y-2">
            <div>
              <a href="mailto:sales@next.io" className="hover:text-[var(--accent-soft)] transition">sales@next.io</a>
            </div>
            <div>
              <a href="https://next.io" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-soft)] transition">
                next.io
              </a>
            </div>
          </div>
        </div>
        <Rule className="my-10 opacity-40" />
        <p className="font-sans text-[11px] font-light leading-relaxed text-cream/30 max-w-[80ch]">
          All prices exclude VAT. Availability is live and subject to change without
          notice. Leisure activities are sold only alongside a Headline or General
          Partnership. Attendee and partner marks are the property of their respective
          owners and are shown to indicate participation in previous editions.
        </p>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   App
   ═══════════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [destId, setDestId] = useState('europe')
  const [cart, setCart] = useState([])
  const dest = DESTINATIONS[destId]

  useReveal()

  // Switching destination resets the package — inventory is per retreat.
  const changeDest = useCallback((id) => {
    setDestId((prev) => {
      if (prev !== id) setCart([])
      return id
    })
  }, [])

  const counts = useMemo(
    () => cart.reduce((acc, l) => ({ ...acc, [l.id]: l.qty }), {}),
    [cart],
  )
  const hasPartnership = cart.some((l) => l.id === 'headline' || l.id === 'general')

  const add = useCallback((item) => {
    const group = PACKAGES.some((p) => p.id === item.id) ? 'Partnership & tickets' : 'Leisure activity'
    setCart((c) => {
      const found = c.find((l) => l.id === item.id)
      if (found) {
        if (found.qty >= item.avail) return c
        return c.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l))
      }
      return [...c, {
        id: item.id, name: item.name, price: item.price,
        passes: item.passes || 0, avail: item.avail, group, qty: 1,
      }]
    })
  }, [])

  const cartCount = cart.reduce((s, l) => s + l.qty, 0)

  return (
    <div className={`${dest.theme} relative min-h-screen bg-[var(--ground)] transition-colors duration-1000`}>
      <Nav dest={dest} destId={destId} setDestId={changeDest} cartCount={cartCount} />
      <main>
        <Hero dest={dest} destId={destId} setDestId={changeDest} />
        <Value dest={dest} />
        <TheRoom dest={dest} />
        <LogoWall dest={dest} />
        <ThreeDays dest={dest} />
        <Partnerships dest={dest} onAdd={add} counts={counts} />
        <Leisure dest={dest} onAdd={add} counts={counts} locked={!hasPartnership} />
        <Builder dest={dest} cart={cart} setCart={setCart} />
        <Proof dest={dest} />
        <BothRetreats destId={destId} setDestId={changeDest} />
        <Close dest={dest} />
      </main>
      <Footer />
    </div>
  )
}
