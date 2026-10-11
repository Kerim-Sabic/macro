/* ==========================================================================
   NECTAR PILOT — application
   Design & build: Horalix

   Layers, top to bottom:
     icons → catalog → state → helpers → backend adapter → engine
     → screen renderers → shell renderer → events → boot
   ========================================================================== */
(() => {
  'use strict';

  /* ======================================================================
     1. ICONS  — 24x24, stroked, authored to one weight so the rail reads
        as a single instrument set.
     ====================================================================== */
  const P = {
    route:    '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h5a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h5"/>',
    ticket:   '<path d="M4 8.5A2.5 2.5 0 0 0 4 15.5V19h16v-3.5a2.5 2.5 0 0 1 0-7V5H4z"/><path d="M12 7v2M12 13v2"/>',
    sprout:   '<path d="M12 21v-8"/><path d="M12 13C12 9.4 9.3 7 5 7c0 3.6 2.7 6 7 6z"/><path d="M12 13c0-3.2 2.4-5.4 6-5.4 0 3.2-2.4 5.4-6 5.4z"/>',
    activity: '<path d="M3 12h3.5l3 7.5 4.5-15 3 7.5H21"/>',
    wrench:   '<path d="M20.4 6.2a5.2 5.2 0 0 1-6.7 6.7l-7 7a2.2 2.2 0 0 1-3.1-3.1l7-7a5.2 5.2 0 0 1 6.7-6.7l-3.1 3.1 3.1 3.1z"/>',
    sliders:  '<path d="M4 7h9M17.5 7H20M4 17h3.5M12 17h8"/><circle cx="15" cy="7" r="2.2"/><circle cx="9.5" cy="17" r="2.2"/>',
    play:     '<path d="M7.5 4.8 19 12 7.5 19.2z" fill="currentColor" stroke="none"/>',
    pause:    '<path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none"/>',
    stop:     '<rect x="6.5" y="6.5" width="11" height="11" rx="1.5" fill="currentColor" stroke="none"/>',
    plus:     '<path d="M12 5v14M5 12h14"/>',
    minus:    '<path d="M5 12h14"/>',
    x:        '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    check:    '<path d="M4.5 12.5l5 5L19.5 6.5"/>',
    chevD:    '<path d="M6 9.5l6 6 6-6"/>',
    chevU:    '<path d="M6 14.5l6-6 6 6"/>',
    chevL:    '<path d="M14.5 6l-6 6 6 6"/>',
    chevR:    '<path d="M9.5 6l6 6-6 6"/>',
    aU:       '<path d="M12 19.5V5M6 11l6-6 6 6"/>',
    aD:       '<path d="M12 4.5V19M6 13l6 6 6-6"/>',
    aL:       '<path d="M19.5 12H5M11 6l-6 6 6 6"/>',
    aR:       '<path d="M4.5 12H19M13 6l6 6-6 6"/>',
    aUL:      '<path d="M17.5 17.5l-11-11M6.5 14v-7.5H14"/>',
    aUR:      '<path d="M6.5 17.5l11-11M17.5 14v-7.5H10"/>',
    aDL:      '<path d="M17.5 6.5l-11 11M6.5 10v7.5H14"/>',
    aDR:      '<path d="M6.5 6.5l11 11M17.5 10v7.5H10"/>',
    rotCW:    '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4.5V10h-5.5"/>',
    rotCCW:   '<path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4.5V10h5.5"/>',
    move:     '<path d="M12 3.5v17M3.5 12h17"/><path d="M12 3.5 9.5 6M12 3.5 14.5 6M12 20.5 9.5 18M12 20.5 14.5 18M3.5 12 6 9.5M3.5 12 6 14.5M20.5 12 18 9.5M20.5 12 18 14.5"/>',
    inf:      '<path d="M18.2 7.4a4.6 4.6 0 1 0 0 9.2c-3.1 0-4.6-2.4-6.2-4.6S9 7.4 5.8 7.4a4.6 4.6 0 1 0 0 9.2c3.1 0 4.6-2.4 6.2-4.6s3.1-4.6 6.2-4.6z"/>',
    trash:    '<path d="M4 6.5h16M9.5 6.5V4.5h5v2M6.5 6.5l1 13.5h9l1-13.5"/>',
    pencil:   '<path d="M4 20h4.2L20 8.2 15.8 4 4 15.8z"/><path d="M14.2 5.6 18.4 9.8"/>',
    grip:     '<circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.4" fill="currentColor" stroke="none"/>',
    refresh:  '<path d="M20.5 11a8.5 8.5 0 1 0-.6 4.5"/><path d="M20.5 4v7h-7"/>',
    search:   '<circle cx="11" cy="11" r="6.5"/><path d="M15.8 15.8 20.5 20.5"/>',
    alert:    '<path d="M12 3.5 21.5 20H2.5z"/><path d="M12 9.5v4.5M12 17h.01"/>',
    info:     '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8h.01"/>',
    dl:       '<path d="M12 3.5v11.5M7 10.5l5 5 5-5M4.5 20h15"/>',
    clock:    '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.3l3.3 2"/>',
    link:     '<path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1.3 1.3"/><path d="M14 10.5a4 4 0 0 0-5.7 0L5.5 13.3a4 4 0 0 0 5.7 5.7l1.3-1.3"/>',
    user:     '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    layers:   '<path d="M12 3.5 21 8l-9 4.5L3 8z"/><path d="M3 12.5 12 17l9-4.5M3 16.5 12 21l9-4.5"/>',
    cpu:      '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/><rect x="10" y="10" width="4" height="4" rx="1"/><path d="M9 3.5v3M15 3.5v3M9 17.5v3M15 17.5v3M3.5 9h3M3.5 15h3M17.5 9h3M17.5 15h3"/>',
    keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6.5 9.5h.01M10 9.5h.01M13.5 9.5h.01M17 9.5h.01M6.5 12.8h.01M10 12.8h.01M13.5 12.8h.01M17 12.8h.01M8.5 15.8h7"/>',
    bell:     '<path d="M18 15.5V10a6 6 0 1 0-12 0v5.5L4 18.5h16z"/><path d="M10 21.5h4"/>',
    palette:  '<path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.4 0 2-.9 2-1.8 0-1.4-1.2-1.7-1.2-2.9 0-.8.7-1.5 1.6-1.5H16a4.5 4.5 0 0 0 4.5-4.5c0-3.5-3.8-6.3-8.5-6.3z"/><circle cx="8" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.8" r="1.1" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1.1" fill="currentColor" stroke="none"/>',
    monitor:  '<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8.5 20h7M12 16.5V20"/>',
    sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/>',
    moon:     '<path d="M20.5 14.8A8.6 8.6 0 0 1 9.2 3.5a8.7 8.7 0 1 0 11.3 11.3z"/>',
    target:   '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/>',
    bot:      '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9.5 4h5"/><circle cx="9" cy="13" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1.3" fill="currentColor" stroke="none"/>',
    mouse:    '<rect x="6.5" y="2.5" width="11" height="19" rx="5.5"/><path d="M12 6.5v4"/>',
    flask:    '<path d="M9 3h6M10 3v6.2L4.6 18.9A2 2 0 0 0 6.3 22h11.4a2 2 0 0 0 1.7-3.1L14 9.2V3"/><path d="M7.6 15h8.8"/>',
    zap:      '<path d="M13.2 2.5 4.5 14h6.4l-1.1 7.5L19.5 10h-6.4z"/>',
    droplet:  '<path d="M12 3.2s6.2 6.6 6.2 11a6.2 6.2 0 0 1-12.4 0c0-4.4 6.2-11 6.2-11z"/>',
    leaf:     '<path d="M4.5 19.5C4.5 10 11 3.8 20.2 3.8c0 9.2-6.2 15.7-15.7 15.7z"/><path d="M4.5 19.5c3.6-3.9 7.6-6.2 11.7-7.1"/>',
    heart:    '<path d="M12 20.4S3.6 14.8 3.6 9.2A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.4 2.7c0 5.6-8.4 11.2-8.4 11.2z"/>',
    snow:     '<path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2 3.8 16.8"/><path d="M9.5 4.6 12 6.9l2.5-2.3M9.5 19.4 12 17.1l2.5 2.3"/>',
    pin:      '<path d="M9 3h6l-.6 5.4 3.1 2.6v2h-5v8l-.5 1-.5-1v-8h-5v-2l3.1-2.6z"/>',
    power:    '<path d="M12 3.5v8.2"/><path d="M6.8 6.6a8.2 8.2 0 1 0 10.4 0"/>',
    shield:   '<path d="M12 3 4.5 6v6c0 4.6 3.2 7.9 7.5 9.2 4.3-1.3 7.5-4.6 7.5-9.2V6z"/>',
    eye:      '<path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    filter:   '<path d="M3 5h18l-7.2 8.4V20l-3.6 1.8v-8.4z"/>',
    save:     '<path d="M5 3.5h11L20.5 8v12.5h-16z"/><path d="M8 3.5v6h7v-6M8 20.5V14h8v6.5"/>',
    gift:     '<rect x="3" y="8.5" width="18" height="4.5" rx="1"/><path d="M4.5 13v8h15v-8M12 8.5V21"/><path d="M12 8.5S10.5 3.5 8 3.5a2.5 2.5 0 0 0 0 5M12 8.5s1.5-5 4-5a2.5 2.5 0 0 1 0 5"/>',
    gauge:    '<path d="M4 17a8.5 8.5 0 1 1 16 0"/><path d="M12 17l4.5-5.2"/><circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none"/>',
    walk:     '<circle cx="13" cy="4.5" r="2"/><path d="M9 21l2.5-6.5-2-2 1-5 3.5 1.5 2 3.5 2.5 1"/><path d="M11.5 14.5 15 21M9.5 7.5 6 10"/>',
    brain:    '<path d="M12 5.2a3 3 0 0 0-5.6-1.1A3 3 0 0 0 3.8 8.9a3.2 3.2 0 0 0 .5 5A3 3 0 0 0 8 19.4a3 3 0 0 0 4-.4z"/><path d="M12 5.2a3 3 0 0 1 5.6-1.1 3 3 0 0 1 2.6 4.8 3.2 3.2 0 0 1-.5 5A3 3 0 0 1 16 19.4a3 3 0 0 1-4-.4z"/><path d="M12 5.2V19"/>',
    hex:      '<path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4z"/>',
    history:  '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3.5 4.5V10H9"/><path d="M12 7.5V12l3.2 2"/>',
    box:      '<path d="M3.5 7.8 12 3.2l8.5 4.6v8.4L12 20.8l-8.5-4.6z"/><path d="M3.5 7.8 12 12.4l8.5-4.6M12 12.4v8.4"/>',
  };
  const ico = (n, cls) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
      stroke-linecap="round" stroke-linejoin="round"${cls ? ` class="${cls}"` : ''} aria-hidden="true">${P[n] || ''}</svg>`;

  /* ======================================================================
     2. CATALOG — the game's real vocabulary. Every field, dispenser and
        planter is colour-coded so a two-letter code reads as a sprite.
     ====================================================================== */
  const FIELDS = [
    ['sunflower','Sunflower','SF','#E0BC3C'], ['dandelion','Dandelion','DN','#E4CE47'],
    ['mushroom','Mushroom','MU','#BE5250'],   ['blueflower','Blue Flower','BF','#4F7CC0'],
    ['clover','Clover','CL','#5DA458'],       ['strawberry','Strawberry','ST','#CE4351'],
    ['spider','Spider Field','SP','#7B6BAC'], ['bamboo','Bamboo','BB','#6BAF67'],
    ['rose','Rose','RO','#CC5470'],           ['pinetree','Pine Tree','PT','#3F8C6B'],
    ['cactus','Cactus','CA','#66A44E'],       ['pumpkin','Pumpkin','PU','#D0782F'],
    ['pineapple','Pineapple','PA','#D8AD3C'], ['stump','Stump Field','SU','#957855'],
    ['mountaintop','Mountain Top','MT','#8B9FB3'], ['coconut','Coconut','CO','#AE8760'],
    ['pepper','Pepper Patch','PP','#BC3E3E'],
  ].map(([id, name, code, color]) => ({ id, name, code, color }));
  const FIELD = id => FIELDS.find(f => f.id === id) || FIELDS[0];

  const PATTERNS = ['e_lol','CornerXSnake','Stationary','Snake','Squares','Lines',
                    'Slither','Auryn','Fork','Spiral','Diamond','Typhoon','Cornerlines'];

  const DISPENSERS = [
    ['wealthclock','Wealth Clock','WC','#E0BC3C',60,'disp'],
    ['blueberry','Blueberry Dispenser','BD','#4F7CC0',60,'disp'],
    ['strawberry','Strawberry Dispenser','SD','#CE4351',60,'disp'],
    ['royaljelly','Royal Jelly Dispenser','RJ','#DAA53C',60,'disp'],
    ['treat','Treat Dispenser','TD','#B98A5C',60,'disp'],
    ['glue','Glue Dispenser','GD','#8B9FB3',90,'disp'],
    ['coconut','Coconut Dispenser','CD','#AE8760',240,'disp'],
    ['antpass','Ant Pass Dispenser','AP','#7A6A55',720,'disp'],
    ['robopass','Robo Pass Dispenser','RP','#6C8AA4',1440,'disp'],
    ['honeystorm','Honeystorm','HS','#E0A33C',1440,'disp'],
    ['redbooster','Red Field Booster','RB','#CE4351',60,'boost'],
    ['bluebooster','Blue Field Booster','BB','#4F7CC0',60,'boost'],
    ['mountainbooster','Mountain Field Booster','MB','#8B9FB3',60,'boost'],
    ['windshrine','Wind Shrine','WS','#7BB4BE',1440,'shrine'],
    ['stickerprinter','Sticker Printer','SP','#AC7BBE',1440,'shrine'],
    ['stickerstack','Sticker Stack','SS','#BE967B',1440,'shrine'],
    ['memorymatch','Memory Match','MM','#5DA458',1440,'game'],
    ['extrememm','Extreme Memory Match','XM','#BE5250',1440,'game'],
    ['winterm','Winter Memory Match','WM','#7BA4CE',1440,'game'],
    ['nightmm','Night Memory Match','NM','#7B6BAC',1440,'game'],
    ['stockings','Stockings','SK','#CE4351',1440,'beesmas'],
    ['feast','Feast','FE','#D0922F',1440,'beesmas'],
    ['samovar','Samovar','SV','#BE9C4F',1440,'beesmas'],
    ['snowmachine','Snow Machine','SM','#8BB4CE',1440,'beesmas'],
    ['lidart','Lid Art','LA','#AC7BBE',1440,'beesmas'],
    ['gingerbread','Gingerbread House','GH','#B0763F',1440,'beesmas'],
  ].map(([id, name, code, color, cd, group]) => ({
    id, name, code, color, cd, group,
    /* Card faces are narrow; the group heading already says "Dispensers". */
    short: name.replace(/ Dispenser$/, '')
               .replace(/(.) Field Booster$/, '$1 Booster')
               .replace(/(.) Memory Match$/, '$1 Match'),
  }));

  const COLLECT_GROUPS = [
    ['all','All'], ['disp','Dispensers'], ['boost','Boosters'],
    ['shrine','Shrines'], ['game','Games'], ['beesmas','Beesmas'],
  ];

  const NECTARS = [
    ['comforting','Comforting','#DC5266'], ['motivating','Motivating','#E4C43F'],
    ['satisfying','Satisfying','#5B80C6'], ['refreshing','Refreshing','#54C2BC'],
    ['invigorating','Invigorating','#4FB477'],
  ].map(([id, name, color]) => ({ id, name, color }));

  const PLANTERS = [
    ['paper','Paper','PP','#B4AF9F','comforting'],   ['ticket','Ticket','TK','#D8BC48','motivating'],
    ['plastic','Plastic','PL','#4F86BE','satisfying'],['candy','Candy','CY','#CE7BA4','comforting'],
    ['blueclay','Blue Clay','BC','#4F6ABE','refreshing'],['redclay','Red Clay','RC','#BE5250','comforting'],
    ['tacky','Tacky','TY','#AEBE4F','motivating'],   ['pesticide','Pesticide','PS','#4FA45D','invigorating'],
    ['heattreated','Heat-Treated','HT','#D0742F','satisfying'],['hydroponic','Hydroponic','HY','#3F96BE','refreshing'],
    ['petal','Petal','PT','#CE7BAE','comforting'],   ['plenty','Planter Of Plenty','PO','#DAA53C','invigorating'],
  ].map(([id, name, code, color, nectar]) => ({ id, name, code, color, nectar }));
  const PLANTER = id => PLANTERS.find(p => p.id === id) || PLANTERS[0];

  const TOKENS = [
    ['Token Link', 10000], ['Bear Morph', 150], ['Blue Boost', 98], ['Red Boost', 97],
    ['Focus', 96], ['Melody', 95], ['Haste', 94], ['Super Smoothie', 92],
    ['Precision', 90], ['Star Treatment', 88], ['Field Dice', 86], ['Loaded Dice', 85],
    ['Enzymes', 80], ['Glitter', 78], ['Oil', 74], ['Glue', 72],
    ['Tropical Drink', 70], ['Micro-Converter', 66], ['Coconut', 60], ['Whirligig', 55],
    ['Honey Token', 40], ['Pollen Token', 30], ['Ticket', 25], ['Jelly Bean', 20],
  ].map(([name, pr], i) => ({ id: 'tk' + i, name, pr, off: false }));

  const TOOLS = [
    { id: 'autojelly',  name: 'Auto-Jelly',   icon: 'flask',  tabs: ['General'] },
    { id: 'autoclick',  name: 'Auto-Clicker', icon: 'mouse',  tabs: ['General'] },
    { id: 'boost',      name: 'Boost Macro',  icon: 'zap',    tabs: ['General', 'Targets'] },
    { id: 'rbc',        name: 'RBC Gather',   icon: 'shield', tabs: ['General', 'Alts', 'Field Picker'] },
    { id: 'vichop',     name: 'Vic Hop',      icon: 'bot',    tabs: ['General', 'Main', 'Searcher'] },
  ];

  const ZONES = [
    ['Starter Zone',  ['sunflower','dandelion','mushroom','blueflower','clover']],
    ['5 Bee Zone',    ['strawberry','spider','bamboo']],
    ['10 Bee Zone',   ['rose','pinetree']],
    ['15 Bee Zone',   ['cactus','pumpkin','pineapple','stump','coconut']],
    ['35 Bee Zone',   ['mountaintop','pepper']],
  ];

  const NAV = [
    { id: 'gather',   name: 'Gather',   icon: 'route' },
    { id: 'collect',  name: 'Collect',  icon: 'ticket' },
    { id: 'planters', name: 'Planters', icon: 'sprout' },
    { id: 'status',   name: 'Status',   icon: 'activity' },
    { id: 'tools',    name: 'Tools',    icon: 'wrench' },
    { id: 'settings', name: 'Settings', icon: 'sliders' },
  ];

  const VERSION = '1.0.0';

  /* ======================================================================
     3. STATE
     ====================================================================== */
  const KEY = 'nectarpilot.state.v1';
  let uid = 0;
  const nid = p => `${p}${(++uid).toString(36)}${Date.now().toString(36).slice(-3)}`;

  const mkEntry = (o = {}) => ({
    id: nid('g'),
    on: true,
    dur: 900,
    left: 900,
    forever: false,
    pattern: 'e_lol',
    field: 'pinetree',
    backpack: 95,
    ret: 'walk',
    len: 4, wid: 0, dist: 3,
    dir: 'c',
    rot: 0,
    sprinkler: true,
    blender: false,
    fast: true,
    drift: false,
    ...o,
  });

  const defaults = () => ({
    screen: 'gather',
    run: 'idle',
    pinned: false,
    win: 'normal',
    presets: ['Default', 'Night Grind', 'Beesmas', 'Low-End PC'],
    presetIdx: 0,
    accounts: ['Default', 'Alt — Pollen', 'Alt — Nectar'],
    accountIdx: 0,

    gather: {
      view: 'queue', tab: 'size', sel: null, tokenSel: 'tk1',
      entries: [
        mkEntry({ pattern: 'e_lol', field: 'pinetree', dur: 900, left: 720, len: 4, wid: 0, dist: 3 }),
        mkEntry({ pattern: 'CornerXSnake', field: 'pineapple', dur: 900, left: 900, len: 6, wid: 2, dist: 4, dir: 'ne' }),
        mkEntry({ pattern: 'Stationary', field: 'mountaintop', dur: 600, left: 600, backpack: 80, ret: 'ai', len: 2, wid: 2, dist: 2 }),
        mkEntry({ pattern: 'Snake', field: 'cactus', dur: 1200, left: 1200, on: false, len: 5, wid: 3, dist: 3, dir: 'sw' }),
      ],
      tokens: TOKENS.map(t => ({ ...t })),
    },

    collect: {
      group: 'all',
      items: Object.fromEntries(DISPENSERS.map((d, i) => [
        d.id, { on: d.group !== 'beesmas', left: Math.round(d.cd * 60 * ((i * 37 % 100) / 100)) },
      ])),
    },

    planters: {
      duration: 48, win: 0, sel: null,
      lanes: [
        [['hydroponic', 0, 12], ['hydroponic', 12, 12], ['hydroponic', 24, 12], ['hydroponic', 36, 12]],
        [['pesticide', 0, 12], ['pesticide', 12, 12], ['pesticide', 24, 12], ['pesticide', 36, 12]],
        [['tacky', 0, 12], ['tacky', 12, 12], ['tacky', 24, 12], ['plenty', 36, 12]],
      ],
      elapsed: 4 * 3600 + 40 * 60,
      autoPlanters: true,
      nectar: { comforting: 62, motivating: 88, satisfying: 41, refreshing: 95, invigorating: 74 },
    },

    status: { filter: 'all', autoscroll: true },

    tools: {
      sel: 'vichop',
      tab: { autojelly: 'General', autoclick: 'General', boost: 'General', rbc: 'General', vichop: 'General' },
      autojelly: { on: false, kind: 'Royal Jelly', amount: 50, autoEquip: true, keepGifted: true },
      autoclick: { on: true, cps: 18, mode: 'Hold', jitter: 12 },
      boost: { on: true, interval: 30, targets: { 'Field Boost': true, 'Mark': true, 'Baby Love': false, 'Haste': true, 'Bomb': false, 'Focus': true } },
      rbc: {
        on: true, phase: 'Current', strength: 0, panic: false,
        alts: [{ n: 'Alt 1', ok: true }, { n: 'Alt 2', ok: false }, { n: 'Alt 3', ok: false }],
        picks: { starter: ['sunflower','mushroom','blueflower','clover'], '5bee': ['strawberry','bamboo'], '10bee': ['pinetree'], '15bee': ['cactus','pineapple','coconut'], '35bee': ['mountaintop'] },
      },
      vichop: {
        on: false, role: 'Main', hop: true, timeout: 30, searcher: true,
        detect: 92, cooldown: 8, rejoin: true,
        stats: { macro: [323, 50, 9], all: [1903, 250, 77], life: [8124, 1122, 294] },
      },
    },

    settings: {
      theme: 'auto', accent: 'nectar', scale: 100, motion: false,
      window: 'Roblox — Bee Swarm Simulator', res: '1920 × 1080', server: '',
      launch: false, tray: true,
      model: 'Standard', compute: 'DirectML', capture: 'Desktop Duplication', confidence: 78,
      hotkeys: { start: 'F1', pause: 'F2', stop: 'F3', reload: 'F4', panic: 'F8' },
      webhook: '', notifyDisconnect: true, notifyLevel: false, notifyVic: true,
      channel: 'Stable', autoUpdate: true,
    },

    session: { t: 0, honey: 0, fields: 0, hops: 0, drops: 0, backpack: 12, task: 'Idle' },
  });

  let S = defaults();
  /* Transient — never persisted. */
  let logs = [];
  let rate = Array.from({ length: 40 }, (_, i) => 26 + Math.sin(i / 3.4) * 7 + (i % 5));
  let logsDrawn = 0;
  let listening = null;

  function save() {
    try {
      const { session, ...rest } = S;
      localStorage.setItem(KEY, JSON.stringify({ ...rest, session: { ...session } }));
    } catch (_) { /* private mode — run from memory */ }
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const p = JSON.parse(raw);
      const d = defaults();
      S = { ...d, ...p };
      for (const k of ['gather','collect','planters','status','tools','settings','session']) {
        S[k] = { ...d[k], ...(p[k] || {}) };
      }
      S.tools = { ...d.tools, ...(p.tools || {}) };
      for (const t of TOOLS) S.tools[t.id] = { ...d.tools[t.id], ...((p.tools || {})[t.id] || {}) };
      S.settings.hotkeys = { ...d.settings.hotkeys, ...((p.settings || {}).hotkeys || {}) };
      S.run = 'idle';
    } catch (_) { S = defaults(); }
  }

  /* ======================================================================
     4. HELPERS
     ====================================================================== */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pad = n => String(Math.floor(n)).padStart(2, '0');

  const hms = s => `${pad(s / 3600)}:${pad((s % 3600) / 60)}:${pad(s % 60)}`;
  const ms  = s => `${pad(s / 60)}:${pad(s % 60)}`;
  const cdText = s => {
    if (s <= 0) return 'Ready';
    if (s >= 3600) return `${Math.floor(s / 3600)}h ${pad((s % 3600) / 60)}m`;
    return ms(s);
  };
  const compact = n => n >= 1e9 ? (n / 1e9).toFixed(2) + 'B'
                    : n >= 1e6 ? (n / 1e6).toFixed(2) + 'M'
                    : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : Math.round(n);

  /** Colour-coded two-letter sprite — our stand-in for the game's pixel art. */
  const sprite = (code, color, cls = '') =>
    `<span class="sprite ${cls}" style="--s-bg:${color}22;border-color:${color}55;color:${color}">${esc(code)}</span>`;

  const toggleEl = (on, act, extra = '') =>
    `<button class="toggle${on ? ' on' : ''}" role="switch" aria-checked="${on}" data-act="${act}"${extra}></button>`;

  const stepper = (val, act, { min = 0, max = 999, w = false, suffix = '' } = {}) => `
    <div class="stepper${w ? ' wide' : ''}">
      <button class="bump" data-act="${act}" data-d="-1" aria-label="Decrease">${ico('minus')}</button>
      <input type="number" value="${val}" min="${min}" max="${max}" data-act="${act}" data-d="set" aria-label="Value" />
      ${suffix ? `<span class="bump" style="width:auto;padding:0 6px;font-family:var(--f-mono);font-size:11px">${esc(suffix)}</span>` : ''}
      <button class="bump" data-act="${act}" data-d="1" aria-label="Increase">${ico('plus')}</button>
    </div>`;

  const select = (val, opts, act, cls = '') => `
    <label class="select ${cls}">
      <select data-act="${act}">
        ${opts.map(o => {
          const [v, t] = Array.isArray(o) ? o : [o, o];
          return `<option value="${esc(v)}"${v === val ? ' selected' : ''}>${esc(t)}</option>`;
        }).join('')}
      </select>${ico('chevD', 'chev')}
    </label>`;

  const seg = (val, opts, act, cls = '') => `
    <div class="seg ${cls}" role="tablist">
      ${opts.map(o => {
        const [v, t, i] = Array.isArray(o) ? o : [o, o];
        return `<button role="tab" aria-selected="${v === val}" class="${v === val ? 'on' : ''}" data-act="${act}" data-v="${esc(v)}">${i ? ico(i) : ''}${esc(t)}</button>`;
      }).join('')}
    </div>`;

  const hint = t => `<span class="hint" title="${esc(t)}">?</span>`;

  const field = (label, ctl, tip) =>
    `<div class="field"><div class="lbl">${esc(label)}${tip ? hint(tip) : ''}</div><div class="ctl">${ctl}</div></div>`;

  /** Arc geometry for the cooldown rings and nectar dials. */
  const arc = (pct, r) => {
    const c = 2 * Math.PI * r;
    return `stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${(c * (1 - clamp(pct, 0, 1))).toFixed(2)}"`;
  };

  function toast(msg, kind = 'info') {
    const host = $('#toasts');
    if (!host) return;
    const el = document.createElement('div');
    el.className = `toast ${kind}`;
    el.innerHTML = `${ico(kind === 'ok' ? 'check' : kind === 'warn' ? 'alert' : 'info')}<span>${esc(msg)}</span>`;
    host.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 240ms, transform 240ms';
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      setTimeout(() => el.remove(), 260);
    }, 2600);
  }

  function log(msg, tag = 'core', kind = '') {
    logs.push({ t: S.session.t, ts: new Date(), msg, tag, kind });
    if (logs.length > 400) { logs = logs.slice(-400); logsDrawn = Math.max(0, logsDrawn - 1); }
  }

  /* ======================================================================
     5. BACKEND ADAPTER
        The real capture / detection / input engine attaches here. Every
        call the UI makes to the outside world goes through this object,
        so swapping the mock for a native bridge touches nothing else.
     ====================================================================== */
  const Backend = window.NectarPilotBackend || {
    name: 'simulator',
    start()  { return true; },
    pause()  { return true; },
    stop()   { return true; },
    /** Per-second sample the UI renders. A native bridge returns real numbers. */
    sample(active) {
      if (!active) return null;
      const base = 32 + Math.sin(S.session.t / 26) * 9;
      return {
        honeyPerSec: Math.max(0, base * 1e4 / 60 + (Math.random() - 0.5) * 4e3),
        pollenRate: Math.max(4, base + (Math.random() - 0.5) * 6),
        backpackDelta: 0.42 + Math.random() * 0.5,
      };
    },
  };

  /* ======================================================================
     6. ENGINE — the run loop. Drives timers, telemetry and the log.
     ====================================================================== */
  const active = () => S.run === 'running';
  const activeEntry = () => S.gather.entries.find(e => e.on && e.left > 0) || S.gather.entries.find(e => e.on) || null;

  const CHATTER = [
    ['Sprinkler placed — Supreme Saturator', 'gather', ''],
    ['Token Link collected · +4 tokens', 'ai', 'nectar'],
    ['Pathfind: portal route resolved in 340 ms', 'path', ''],
    ['Bear Morph detected — priority 150', 'ai', 'nectar'],
    ['Blue Boost active for 08:00', 'boost', 'ok'],
    ['Backpack converted at Hive · 2 min', 'hive', 'ok'],
    ['Field drift corrected (−3 studs)', 'gather', ''],
    ['Whirligig used — returning to hive', 'gather', ''],
    ['Planter ready: Hydroponic · Pine Tree', 'plant', 'ok'],
    ['Wealth Clock collected', 'collect', 'ok'],
    ['Vicious Bee detected — engaging searcher', 'vic', 'warn'],
    ['Night cycle detected — switching pattern', 'vic', 'warn'],
    ['Server hop complete · 42 ms ping', 'hop', ''],
    ['Roblox reconnected after timeout', 'net', 'fault'],
    ['Mondo Chick spotted — ignoring (filtered)', 'ai', ''],
    ['Glitter applied to Pineapple', 'boost', ''],
    ['OCR: backpack 96% — returning early', 'ocr', ''],
    ['Ant Pass claimed', 'collect', 'ok'],
  ];

  function setRun(next) {
    if (next === S.run) return;
    const prev = S.run;
    if (next === 'running') {
      if (!Backend.start()) return toast('Engine did not start', 'warn');
      log(prev === 'paused' ? 'Run resumed' : `Run armed · preset "${S.presets[S.presetIdx]}" · account "${S.accounts[S.accountIdx]}"`, 'core', 'ok');
      toast(prev === 'paused' ? 'Resumed' : 'Running', 'ok');
    } else if (next === 'paused') {
      Backend.pause();
      log('Run paused', 'core', 'warn');
      toast('Paused', 'warn');
    } else {
      Backend.stop();
      log('Run stopped', 'core', '');
      toast('Stopped');
      S.session.task = 'Idle';
    }
    S.run = next;
    render();
    save();
  }

  function tick() {
    const s = S.session;
    if (active()) {
      s.t++;
      const smp = Backend.sample(true);

      /* Gather queue — burn down the flying entry, advance on completion. */
      const e = activeEntry();
      if (e) {
        s.task = `${PATTERNS.includes(e.pattern) ? e.pattern : 'Pattern'} · ${FIELD(e.field).name}`;
        if (!e.forever) {
          e.left = Math.max(0, e.left - 1);
          if (e.left === 0) {
            s.fields++;
            log(`Field complete — ${FIELD(e.field).name} (${e.pattern})`, 'gather', 'ok');
            const on = S.gather.entries.filter(x => x.on);
            if (on.every(x => x.left === 0)) on.forEach(x => { x.left = x.dur; });
          }
        }
      } else {
        s.task = 'No enabled fields';
      }

      /* Telemetry */
      if (smp) {
        s.honey += smp.honeyPerSec;
        s.backpack = clamp(s.backpack + smp.backpackDelta, 0, 100);
        if (s.backpack >= (e ? e.backpack : 95)) {
          s.backpack = 2;
          log('Backpack full — converting at hive', 'hive', 'ok');
        }
        if (s.t % 2 === 0) {
          rate.push(smp.pollenRate);
          if (rate.length > 40) rate.shift();
        }
      }

      /* Cooldowns */
      for (const d of DISPENSERS) {
        const it = S.collect.items[d.id];
        if (it && it.on && it.left > 0) {
          it.left--;
          if (it.left === 0) log(`${d.name} is ready`, 'collect', 'ok');
        }
      }

      /* Planter clock */
      S.planters.elapsed = (S.planters.elapsed + 1) % (S.planters.duration * 3600);

      /* Vic Hop counters */
      if (S.tools.vichop.on && S.tools.vichop.hop && s.t % 47 === 0) {
        s.hops++;
        S.tools.vichop.stats.macro[0]++;
        S.tools.vichop.stats.all[0]++;
        S.tools.vichop.stats.life[0]++;
        log('Server hop complete', 'hop', '');
      }

      /* Chatter */
      if (s.t % 4 === 0 && Math.random() < 0.66) {
        const [m, tg, k] = CHATTER[Math.floor(Math.random() * CHATTER.length)];
        if (k === 'fault') s.drops++;
        log(m, tg, k);
      }

      if (s.t % 30 === 0) save();
    }

    live();
  }

  /* ======================================================================
     7. SCREENS
     ====================================================================== */
  const Screens = {};

  /* ---- 7.1 Gather ------------------------------------------------------ */
  Screens.gather = {
    fill: () => true,
    head() {
      const g = S.gather;
      return {
        title: 'Gather',
        sub: g.view === 'queue'
          ? `${g.entries.filter(e => e.on).length} of ${g.entries.length} fields armed · flight plan runs top to bottom`
          : 'Detection priority for every token the AI can see',
        acts: `
          ${seg(g.view, [['queue', 'Run Queue', 'layers'], ['tokens', 'AI Tokens', 'brain']], 'g.view')}
          ${g.view === 'queue'
            ? `<button class="btn primary" data-act="g.add">${ico('plus')}Add field</button>`
            : `<button class="btn" data-act="g.resetTokens">${ico('refresh')}Reset priorities</button>`}`,
      };
    },
    body() {
      return S.gather.view === 'queue' ? this.queue() : this.tokens();
    },

    queue() {
      const g = S.gather;
      const sel = g.entries.find(e => e.id === g.sel) || g.entries[0];
      if (sel) g.sel = sel.id;
      const flying = activeEntry();

      const rows = g.entries.length ? g.entries.map((e, i) => {
        const f = FIELD(e.field);
        const isFlying = active() && flying && flying.id === e.id;
        return `
        <li class="qrow${e.id === g.sel ? ' sel' : ''}${e.on ? '' : ' off'}${isFlying ? ' flying' : ''}"
            data-act="g.sel" data-id="${e.id}" draggable="true" data-idx="${i}">
          <span class="grip" data-nodrag>${ico('grip')}</span>
          <span class="idx mono">${i + 1}</span>
          <span class="dur" data-qleft="${e.id}">${e.forever ? '∞' : ms(e.left)}</span>
          <span class="meta">
            <span class="pat">${esc(e.pattern)}</span>
            <span class="fld">${esc(f.name)} · ${e.len}×${e.wid} · ${e.ret === 'ai' ? 'AI pathfind' : 'Walk back'}</span>
          </span>
          <span class="tail">
            ${isFlying ? '<span class="chip ok">Flying</span>' : ''}
            ${sprite(f.code, f.color)}
            ${toggleEl(e.on, 'g.toggleOn', ` data-id="${e.id}"`)}
            <button class="btn icon sm ghost" data-act="g.del" data-id="${e.id}" title="Remove field" aria-label="Remove field">${ico('trash')}</button>
          </span>
        </li>`;
      }).join('') : `<li>${this.emptyQueue()}</li>`;

      return `
      <div class="split">
        <div class="panel">
          <header>
            <h2>Flight plan</h2>
            <div class="acts">
              <span class="chip">${g.entries.filter(e => e.on).length} armed</span>
              <button class="btn sm ghost" data-act="g.allOn">All on</button>
              <button class="btn sm ghost" data-act="g.allOff">All off</button>
            </div>
          </header>
          <div class="body tight">
            <ul class="queue" id="queueList">${rows}</ul>
            ${g.entries.length > 1
              ? '<p class="eyebrow" style="text-align:center;padding:12px 4px 4px">Drag to reorder</p>' : ''}
          </div>
        </div>
        ${sel ? this.editor(sel) : ''}
      </div>`;
    },

    emptyQueue() {
      return `<div class="empty">${ico('route')}<p>No fields in the flight plan yet. Add one and Nectar Pilot will fly them in order, top to bottom.</p>
        <button class="btn primary" data-act="g.add">${ico('plus')}Add field</button></div>`;
    },

    editor(e) {
      const f = FIELD(e.field);
      const g = S.gather;
      const bpHue = e.backpack >= 90 ? 'var(--fault)' : e.backpack >= 70 ? 'var(--ember)' : 'var(--ok)';

      const tabs = { size: this.tabSize(e), align: this.tabAlign(e), misc: this.tabMisc(e) }[g.tab];

      return `
      <div class="panel">
        <header>
          <h2>Field ${g.entries.findIndex(x => x.id === e.id) + 1}</h2>
          <div class="acts">
            <button class="btn sm ghost" data-act="g.dup" data-id="${e.id}" title="Duplicate">${ico('layers')}Duplicate</button>
          </div>
        </header>
        <div class="body stack">

          <div class="durfield">
            <span class="val${e.forever ? ' dim' : ''}">${e.forever ? '∞' : hms(e.dur)}</span>
            <div class="units">
              ${['h', 'm', 's'].map(u => `
                <span class="unit">
                  <span class="u">${u.toUpperCase()}</span>
                  <span class="bumps">
                    <button data-act="g.dur" data-u="${u}" data-d="1" aria-label="More ${u}">${ico('chevU')}</button>
                    <button data-act="g.dur" data-u="${u}" data-d="-1" aria-label="Less ${u}">${ico('chevD')}</button>
                  </span>
                </span>`).join('')}
            </div>
            <button class="inf${e.forever ? ' on' : ''}" data-act="g.forever" title="Run this field forever" aria-pressed="${e.forever}">${ico('inf')}</button>
          </div>

          <div class="row">
            ${select(e.pattern, PATTERNS, 'g.pattern', 'grow')}
          </div>
          <div class="row">
            ${select(e.field, FIELDS.map(x => [x.id, x.name]), 'g.field', 'grow')}
            ${sprite(f.code, f.color, 'lg')}
          </div>

          <div>
            <div class="field" style="padding-bottom:2px">
              <div class="lbl">Return at backpack${hint('Head to the hive once the backpack passes this fill level.')}</div>
              <div class="ctl mono" style="font-size:var(--t-md);color:${bpHue}">${e.backpack}%</div>
            </div>
            <input class="slider" type="range" min="10" max="100" step="1" value="${e.backpack}"
                   data-act="g.backpack" style="--pct:${e.backpack}%" aria-label="Return at backpack percent" />
          </div>

          ${field('Return method', seg(e.ret, [['walk', 'Walk', 'walk'], ['ai', 'AI', 'brain']], 'g.ret', 'lit'),
                  'Walk retraces the route. AI pathfinds through portals and cannons.')}

          <div>${seg(g.tab, [['size', 'Size'], ['align', 'Align'], ['misc', 'Misc']], 'g.tab', 'grow')}</div>
          <div class="stack">${tabs}</div>
        </div>
      </div>`;
    },

    tabSize(e) {
      return `<div class="fieldset">
        ${field('Length', stepper(e.len, 'g.len', { min: 0, max: 30 }), 'Number of rows in the pattern.')}
        ${field('Width',  stepper(e.wid, 'g.wid', { min: 0, max: 30 }), 'Number of columns in the pattern.')}
        ${field('Distance', stepper(e.dist, 'g.dist', { min: 0, max: 30 }), 'Studs travelled per pattern step.')}
      </div>`;
    },

    tabAlign(e) {
      const cells = [
        ['nw', 'aUL'], ['n', 'aU'], ['ne', 'aUR'],
        ['w', 'aL'],   ['c', null], ['e', 'aR'],
        ['sw', 'aDL'], ['s', 'aD'], ['se', 'aDR'],
      ];
      return `<div class="row wrap" style="align-items:flex-start;gap:12px">
        <div class="dpad" role="group" aria-label="Field alignment">
          ${cells.map(([d, i]) => d === 'c'
            ? `<button class="hub${e.dir === 'c' ? ' on' : ''}" data-act="g.dir" data-v="c" title="Centre" aria-label="Centre"></button>`
            : `<button class="${e.dir === d ? 'on' : ''}" data-act="g.dir" data-v="${d}" title="${d.toUpperCase()}" aria-label="Align ${d.toUpperCase()}">${ico(i)}</button>`).join('')}
        </div>
        <div class="stack" style="gap:6px">
          <button class="btn icon" data-act="g.rot" data-d="0" title="Reset rotation">${ico('move')}</button>
          <button class="btn icon" data-act="g.rot" data-d="-1" title="Rotate counter-clockwise">${ico('rotCCW')}</button>
          <button class="btn icon" data-act="g.rot" data-d="1" title="Rotate clockwise">${ico('rotCW')}</button>
        </div>
        <div class="stack" style="gap:4px;flex:1;min-width:120px">
          <span class="eyebrow">Alignment</span>
          <span class="mono" style="font-size:var(--t-md)">${e.dir.toUpperCase()} · ${e.rot * 90}°</span>
          <p style="font-size:var(--t-sm);color:var(--ink-3);margin-top:4px">
            The pattern anchors to this corner of the field and rotates with the compass.</p>
        </div>
      </div>`;
    },

    tabMisc(e) {
      return `<div class="fieldset">
        ${field('Place sprinkler', toggleEl(e.sprinkler, 'g.flag', ' data-k="sprinkler"'), 'Drop and refresh your sprinkler inside the pattern.')}
        ${field('Use blender', toggleEl(e.blender, 'g.flag', ' data-k="blender"'), 'Feed surplus tokens into the blender between runs.')}
        ${field('Gotta Go Fast', toggleEl(e.fast, 'g.flag', ' data-k="fast"'), 'Use the movement boost while traversing.')}
        ${field('Correct field drift', toggleEl(e.drift, 'g.flag', ' data-k="drift"'), 'Re-anchor when the character slides off pattern.')}
      </div>`;
    },

    tokens() {
      const g = S.gather;
      const sel = g.tokens.find(t => t.id === g.tokenSel) || g.tokens[0];
      g.tokenSel = sel.id;
      return `
      <div class="split">
        <div class="panel">
          <header><h2>Token priority</h2><div class="acts"><span class="chip">${g.tokens.filter(t => !t.off).length} tracked</span></div></header>
          <div class="body flush">
            <div class="tokenlist">
              ${g.tokens.map(t => `
                <div class="trow${t.id === sel.id ? ' sel' : ''}${t.off ? ' dis' : ''}" data-act="g.token" data-id="${t.id}">
                  <span class="lamp${t.off ? '' : ' on'}"></span>
                  <span class="nm">${esc(t.name)}</span>
                  <span class="pr">${t.pr}</span>
                  <span class="pl">Priority</span>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div class="panel">
          <header><h2>${esc(sel.name)}</h2></header>
          <div class="body stack">
            <div class="fieldset">
              ${field('Priority', stepper(sel.pr, 'g.tokenPr', { min: 0, max: 10000, w: true }), 'Higher priority tokens are collected first when several are visible.')}
              ${field('Ignore this token', toggleEl(sel.off, 'g.tokenOff'), 'The detector still sees it, but the pilot will not divert for it.')}
            </div>
            <p style="font-size:var(--t-sm);color:var(--ink-3)">
              Detection runs on the <strong style="color:var(--ink)">${esc(S.settings.model)}</strong> model
              at ${S.settings.confidence}% confidence via ${esc(S.settings.compute)}.
            </p>
          </div>
        </div>
      </div>`;
    },
  };

  /* ---- 7.2 Collect ----------------------------------------------------- */
  Screens.collect = {
    head() {
      const items = DISPENSERS.filter(d => S.collect.items[d.id].on);
      const ready = items.filter(d => S.collect.items[d.id].left <= 0);
      const next = items.filter(d => S.collect.items[d.id].left > 0)
                        .sort((a, b) => S.collect.items[a.id].left - S.collect.items[b.id].left)[0];
      return {
        title: 'Collect',
        sub: `${ready.length} ready now${next ? ` · next up ${next.name} in ${cdText(S.collect.items[next.id].left)}` : ''}`,
        acts: `
          ${seg(S.collect.group, COLLECT_GROUPS, 'c.group')}
          <button class="btn" data-act="c.allOn">All on</button>
          <button class="btn" data-act="c.allOff">All off</button>`,
      };
    },
    body() {
      const list = DISPENSERS.filter(d => S.collect.group === 'all' || d.group === S.collect.group);
      const ready = DISPENSERS.filter(d => S.collect.items[d.id].on && S.collect.items[d.id].left <= 0);
      return `
      <div class="stack">
        ${ready.length ? `
        <div class="panel">
          <header><h2>Ready now</h2><div class="acts">
            <button class="btn sm primary" data-act="c.collectAll">${ico('check')}Collect all ${ready.length}</button>
          </div></header>
          <div class="body tight">
            <div class="row wrap" style="gap:6px">
              ${ready.map(d => `<span class="chip ok">${sprite(d.code, d.color, 'sm')}&nbsp;${esc(d.name)}</span>`).join('')}
            </div>
          </div>
        </div>` : ''}

        <div class="panel">
          <header><h2>${esc(COLLECT_GROUPS.find(g => g[0] === S.collect.group)[1])}</h2>
            <div class="acts"><span class="chip">${list.filter(d => S.collect.items[d.id].on).length}/${list.length} enabled</span></div>
          </header>
          <div class="body">
            <div class="dispgrid">
              ${list.map(d => {
                const it = S.collect.items[d.id];
                const pct = it.left <= 0 ? 1 : 1 - it.left / (d.cd * 60);
                return `
                <div class="disp${it.on ? '' : ' off'}${it.on && it.left <= 0 ? ' ready' : ''}" data-id="${d.id}">
                  <svg class="ring${it.left <= 0 ? ' done' : ''}" viewBox="0 0 36 36" data-ring="${d.id}">
                    <circle class="trk" cx="18" cy="18" r="14.5"/>
                    <circle class="arc" cx="18" cy="18" r="14.5" transform="rotate(-90 18 18)" ${arc(pct, 14.5)}/>
                  </svg>
                  <span class="meta">
                    <span class="nm" title="${esc(d.name)}">${esc(d.short)}</span>
                    <span class="cd" data-cd="${d.id}">${cdText(it.left)}</span>
                  </span>
                  ${toggleEl(it.on, 'c.toggle', ` data-id="${d.id}"`)}
                </div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>`;
    },
  };

  /* ---- 7.3 Planters ---------------------------------------------------- */
  Screens.planters = {
    head() {
      const p = S.planters;
      return {
        title: 'Planters',
        sub: `${p.lanes.flat().length} planters scheduled across ${p.duration} hours · ${hms(p.elapsed)} elapsed`,
        acts: `
          <label class="select">${''}
            <select data-act="p.duration">
              ${[12, 24, 36, 48, 72].map(h => `<option value="${h}"${h === p.duration ? ' selected' : ''}>${h}h cycle</option>`).join('')}
            </select>${ico('chevD', 'chev')}
          </label>
          <button class="btn" data-act="p.refresh">${ico('refresh')}Refresh</button>
          <button class="btn danger" data-act="p.clear">${ico('trash')}Clear schedule</button>`,
      };
    },
    body() {
      const p = S.planters;
      const span = 12;                       /* hours visible in the window */
      const start = p.win * span;
      const end = Math.min(start + span, p.duration);
      const nowH = p.elapsed / 3600;
      const inWindow = nowH >= start && nowH <= end;
      const nowPct = ((nowH - start) / span) * 100;
      const maxWin = Math.ceil(p.duration / span) - 1;

      const hours = [];
      for (let h = start; h < end; h++) hours.push(h);

      const lanes = p.lanes.map((lane, li) => {
        const blocks = lane
          .map((b, bi) => ({ b, bi }))
          .filter(({ b }) => b[1] < end && b[1] + b[2] > start);
        if (!blocks.length) return `<div class="tl-lane"></div>`;
        return `<div class="tl-lane">
          ${blocks.map(({ b, bi }) => {
            const pl = PLANTER(b[0]);
            const nec = NECTARS.find(n => n.id === pl.nectar);
            const s0 = Math.max(b[1], start), e0 = Math.min(b[1] + b[2], end);
            const left = ((s0 - start) / span) * 100;
            const wide = ((e0 - s0) / span) * 100;
            const selCls = p.sel === `${li}:${bi}` ? ' sel' : '';
            return `<button class="tl-block${selCls}" data-act="p.block" data-id="${li}:${bi}"
              style="left:calc(${left.toFixed(4)}% + 1.5px);width:calc(${wide.toFixed(4)}% - 3px);--b-bg:${pl.color}2E;--b-edge:${pl.color}66">
              <span class="nm">${esc(pl.name)}</span>
              <span class="ic"><span class="lamp" style="background:${nec.color};box-shadow:0 0 6px ${nec.color}66"></span>
                <span class="t">${esc(nec.name)} · ${b[2]}h</span></span>
            </button>`;
          }).join('')}
        </div>`;
      }).join('');

      return `
      <div class="split">
        <div class="stack">
          <div class="timeline">
            <div class="tl-ruler" style="grid-template-columns:repeat(${hours.length},1fr)">
              ${hours.map(h => `<span>${h}h</span>`).join('')}
            </div>
            <div class="tl-track" style="position:relative">
              ${lanes}
              ${inWindow ? `<div class="tl-now" data-nowline style="left:calc(6px + (100% - 12px) * ${(nowPct / 100).toFixed(4)})"></div>` : ''}
            </div>
          </div>

          <div class="row wrap">
            <button class="btn icon" data-act="p.win" data-d="-1" ${p.win === 0 ? 'disabled' : ''} aria-label="Earlier">${ico('chevL')}</button>
            <span class="chip">${start}h – ${end}h</span>
            <button class="btn icon" data-act="p.win" data-d="1" ${p.win >= maxWin ? 'disabled' : ''} aria-label="Later">${ico('chevR')}</button>
            <span class="mono" style="margin-left:auto;color:var(--ink-3);font-size:var(--t-sm)"
                  data-live="plElapsed">${hms(p.elapsed)} / ${p.duration}:00:00</span>
          </div>

          ${p.sel ? this.blockEditor() : `<div class="panel"><div class="body"><div class="empty">${ico('sprout')}
            <p>Select a block on the timeline to change its planter, or clear the schedule and let auto-planters rebuild it.</p></div></div></div>`}
        </div>

        <div class="stack">
          <div class="panel">
            <header><h2>Nectar</h2><div class="acts"><span class="chip live">Hive bonus ×${(1 + Object.values(p.nectar).reduce((a, b) => a + b, 0) / 500).toFixed(2)}</span></div></header>
            <div class="body">
              <div class="gauges">
                ${NECTARS.map(n => {
                  const v = p.nectar[n.id];
                  return `<div class="gauge">
                    <svg class="dial" viewBox="0 0 44 44">
                      <circle class="trk" cx="22" cy="22" r="18"/>
                      <circle class="arc" cx="22" cy="22" r="18" transform="rotate(-90 22 22)" style="--g:${n.color}" ${arc(v / 100, 18)}/>
                    </svg>
                    <span class="pctv" style="color:${n.color}">${v}%</span>
                    <span class="nm">${esc(n.name)}</span>
                  </div>`;
                }).join('')}
              </div>
            </div>
          </div>

          <div class="panel">
            <header><h2>Automation</h2></header>
            <div class="body fieldset">
              ${field('Auto-planters', toggleEl(p.autoPlanters, 'p.auto'), 'Rebuild the schedule automatically as planters are harvested.')}
              ${field('Harvest window', select('On expiry', ['On expiry', 'Every 6h', 'Every 12h', 'Manual'], 'p.window'))}
            </div>
          </div>
        </div>
      </div>`;
    },

    blockEditor() {
      const [li, bi] = S.planters.sel.split(':').map(Number);
      const b = S.planters.lanes[li] && S.planters.lanes[li][bi];
      if (!b) return '';
      const pl = PLANTER(b[0]);
      return `
      <div class="panel">
        <header><h2>Slot ${li + 1} · ${b[1]}h – ${b[1] + b[2]}h</h2>
          <div class="acts">
            <button class="btn sm ghost" data-act="p.deselect">${ico('x')}Close</button>
          </div>
        </header>
        <div class="body stack">
          <div class="row">
            ${sprite(pl.code, pl.color, 'lg')}
            ${select(b[0], PLANTERS.map(x => [x.id, x.name]), 'p.type', 'grow')}
          </div>
          ${field('Growth time', stepper(b[2], 'p.hours', { min: 1, max: 24, suffix: 'h' }))}
          ${field('Nectar', `<span class="chip" style="background:${NECTARS.find(n => n.id === pl.nectar).color}22;color:${NECTARS.find(n => n.id === pl.nectar).color}">${esc(NECTARS.find(n => n.id === pl.nectar).name)}</span>`)}
        </div>
      </div>`;
    },
  };

  /* ---- 7.4 Status ------------------------------------------------------ */
  Screens.status = {
    head() {
      return {
        title: 'Status',
        sub: active() ? `Flying · ${S.session.task}` : S.run === 'paused' ? 'Paused mid-run' : 'Engine idle — arm a run to see live telemetry',
        acts: `
          ${seg(S.status.filter, [['all', 'All'], ['gather', 'Gather'], ['ai', 'AI'], ['collect', 'Collect'], ['fault', 'Faults']], 's.filter')}
          <button class="btn" data-act="s.copy">${ico('save')}Copy log</button>
          <button class="btn" data-act="s.clear">${ico('trash')}Clear</button>`,
      };
    },
    body() {
      const s = S.session;
      return `
      <div class="stack">
        <div class="tiles">
          ${this.tile('Runtime', hms(s.t), active() ? 'Flying now' : 'Stopped', 'runtime')}
          ${this.tile('Honey', compact(s.honey), `${compact(s.honey / Math.max(1, s.t) * 3600)}/hr`, 'honey')}
          ${this.tile('Fields run', String(s.fields), `${s.hops} server hops`, 'fields')}
          ${this.tile('Backpack', Math.round(s.backpack) + '<small>%</small>', 'Converts at 95%', 'backpack')}
          ${this.tile('Disconnects', String(s.drops), s.drops ? 'Auto-rejoin on' : 'Clean session', 'drops')}
        </div>

        <div class="split even">
          <div class="panel">
            <header><h2>Pollen rate</h2><div class="acts"><span class="chip live" data-live="rateNow">${Math.round(rate[rate.length - 1])} /s</span></div></header>
            <div class="body"><div class="chartbox" id="rateChart">${this.chart()}</div></div>
          </div>
          <div class="panel">
            <header><h2>Current task</h2></header>
            <div class="body stack">
              <div class="row">
                <span class="lamp${active() ? ' ok' : ''}"></span>
                <span class="display" style="font-size:var(--t-lg)" data-live="taskName">${esc(s.task)}</span>
              </div>
              <div class="fieldset">
                ${field('Preset', `<span class="mono">${esc(S.presets[S.presetIdx])}</span>`)}
                ${field('Account', `<span class="mono">${esc(S.accounts[S.accountIdx])}</span>`)}
                ${field('Detection', `<span class="mono">${esc(S.settings.model)} · ${esc(S.settings.compute)}</span>`)}
                ${field('Engine', `<span class="mono">${esc(Backend.name)}</span>`)}
              </div>
            </div>
          </div>
        </div>

        <div class="panel">
          <header><h2>Event log</h2>
            <div class="acts">
              <span class="chip">${logs.length} lines</span>
              <button class="btn sm ghost" data-act="s.autoscroll">${ico(S.status.autoscroll ? 'check' : 'x')}Autoscroll</button>
            </div>
          </header>
          <div class="body flush"><div class="console" id="console">${this.lines(logs)}</div></div>
        </div>
      </div>`;
    },

    tile(k, v, d, live) {
      return `<div class="tile"><span class="k">${esc(k)}</span>
        <span class="v" data-live="t-${live}">${v}</span>
        <span class="d" data-live="d-${live}">${esc(d)}</span></div>`;
    },

    match(l) {
      const f = S.status.filter;
      if (f === 'all') return true;
      if (f === 'fault') return l.kind === 'fault' || l.kind === 'warn';
      if (f === 'ai') return l.tag === 'ai' || l.tag === 'path' || l.tag === 'vic';
      if (f === 'gather') return l.tag === 'gather' || l.tag === 'hive';
      if (f === 'collect') return l.tag === 'collect' || l.tag === 'plant';
      return true;
    },

    lines(arr) {
      return arr.filter(l => this.match(l)).map(l => `
        <div class="logline ${l.kind}">
          <span class="ts">${pad(l.ts.getHours())}:${pad(l.ts.getMinutes())}:${pad(l.ts.getSeconds())}</span>
          <span class="tg">${esc(l.tag)}</span>
          <span class="msg">${esc(l.msg)}</span>
        </div>`).join('');
    },

    chart() {
      const w = 100, h = 100, n = rate.length;
      const max = Math.max(...rate) * 1.15, min = Math.min(...rate) * 0.85;
      const x = i => (i / (n - 1)) * w;
      const y = v => h - ((v - min) / (max - min || 1)) * h;
      const pts = rate.map((v, i) => `${x(i).toFixed(2)},${y(v).toFixed(2)}`);
      const line = 'M' + pts.join('L');
      const area = `${line}L${w},${h}L0,${h}Z`;
      /* The endpoint marker sits outside the SVG: preserveAspectRatio="none"
         stretches the viewBox horizontally and would squash a circle. */
      const capTop = (y(rate[n - 1]) / h * 100).toFixed(2);
      return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="Pollen rate over the last 80 seconds">
        <defs><linearGradient id="rateFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--nectar)" stop-opacity=".28"/>
          <stop offset="100%" stop-color="var(--nectar)" stop-opacity="0"/>
        </linearGradient></defs>
        ${[0.25, 0.5, 0.75].map(f => `<line class="grid" x1="0" y1="${(h * f).toFixed(1)}" x2="${w}" y2="${(h * f).toFixed(1)}" vector-effect="non-scaling-stroke"/>`).join('')}
        <path class="area" d="${area}"/>
        <path class="line" d="${line}" vector-effect="non-scaling-stroke"/>
      </svg>
      <span class="chartcap" style="left:calc(100% - 4px);top:calc(6px + (100% - 6px) * ${(capTop / 100).toFixed(4)})"></span>`;
    },
  };

  /* ---- 7.5 Tools ------------------------------------------------------- */
  Screens.tools = {
    head() {
      const t = TOOLS.find(x => x.id === S.tools.sel);
      const cfg = S.tools[t.id];
      return {
        title: 'Tools',
        sub: `${TOOLS.filter(x => S.tools[x.id].on).length} of ${TOOLS.length} running alongside the main flight plan`,
        acts: `${t.tabs.length > 1 ? seg(S.tools.tab[t.id], t.tabs, 't.tab') : ''}
               <span class="chip ${cfg.on ? 'ok' : ''}">${cfg.on ? 'Enabled' : 'Off'}</span>`,
      };
    },
    body() {
      const t = TOOLS.find(x => x.id === S.tools.sel);
      return `
      <div class="toolsplit">
        <div class="toollist">
          ${TOOLS.map(x => `
            <button class="toolbtn${x.id === S.tools.sel ? ' on' : ''}" data-act="t.sel" data-id="${x.id}">
              ${ico(x.icon, 'ic')}<span class="nm">${esc(x.name)}</span>
              <span class="lamp${S.tools[x.id].on ? ' on' : ''}"></span>
            </button>`).join('')}
        </div>
        <div class="stack">${this[t.id]()}</div>
      </div>`;
    },

    autojelly() {
      const c = S.tools.autojelly;
      return `<div class="panel"><header><h2>Auto-Jelly</h2></header><div class="body fieldset">
        ${field('Enabled', toggleEl(c.on, 't.on'))}
        ${field('Jelly type', select(c.kind, ['Royal Jelly', 'Star Jelly'], 't.aj.kind'))}
        ${field('Feed per cycle', stepper(c.amount, 't.aj.amount', { min: 1, max: 999 }), 'How many jellies to open in one pass.')}
        ${field('Auto-equip new bees', toggleEl(c.autoEquip, 't.aj.equip'))}
        ${field('Keep gifted bees', toggleEl(c.keepGifted, 't.aj.gift'), 'Never re-roll a bee that has already been gifted.')}
      </div></div>`;
    },

    autoclick() {
      const c = S.tools.autoclick;
      return `<div class="panel"><header><h2>Auto-Clicker</h2></header><div class="body fieldset">
        ${field('Enabled', toggleEl(c.on, 't.on'))}
        ${field('Clicks per second', stepper(c.cps, 't.ac.cps', { min: 1, max: 60 }))}
        ${field('Mode', seg(c.mode, ['Hold', 'Toggle'], 't.ac.mode'))}
        ${field('Timing jitter', stepper(c.jitter, 't.ac.jitter', { min: 0, max: 100, suffix: '%' }), 'Randomises the interval so the cadence is not perfectly uniform.')}
      </div></div>`;
    },

    boost() {
      const c = S.tools.boost;
      if (S.tools.tab.boost === 'Targets') {
        return `<div class="panel"><header><h2>Boost targets</h2></header><div class="body fieldset">
          ${Object.entries(c.targets).map(([k, v]) =>
            field(k, toggleEl(v, 't.bo.target', ` data-k="${esc(k)}"`))).join('')}
        </div></div>`;
      }
      return `<div class="panel"><header><h2>Boost Macro</h2></header><div class="body fieldset">
        ${field('Enabled', toggleEl(c.on, 't.on'))}
        ${field('Re-apply every', stepper(c.interval, 't.bo.interval', { min: 1, max: 240, suffix: 'min' }))}
        ${field('Active targets', `<span class="chip">${Object.values(c.targets).filter(Boolean).length} selected</span>`)}
      </div></div>`;
    },

    rbc() {
      const c = S.tools.rbc;
      const tab = S.tools.tab.rbc;

      if (tab === 'Alts') {
        return `<div class="panel"><header><h2>Alt accounts</h2>
          <div class="acts"><button class="btn sm" data-act="t.rbc.addAlt">${ico('plus')}Add alt</button></div></header>
          <div class="body stack">
            <div class="alts">
              ${c.alts.map((a, i) => `
                <button class="alt${a.ok ? ' on' : ''}" data-act="t.rbc.alt" data-i="${i}">
                  ${ico('user')}<span class="nm">${esc(a.n)}</span>
                  <span class="lamp${a.ok ? ' ok' : ' fault'}"></span>
                </button>`).join('')}
            </div>
            <p style="font-size:var(--t-sm);color:var(--ink-3)">
              Green means the alt is signed in and idling in the target server. Click to toggle its state.</p>
          </div></div>`;
      }

      if (tab === 'Field Picker') {
        const keys = ['starter', '5bee', '10bee', '15bee', '35bee'];
        return `<div class="panel"><header><h2>Field picker</h2>
          <div class="acts"><span class="chip">${Object.values(c.picks).flat().length} selected</span></div></header>
          <div class="body flush">
            ${ZONES.map(([zone, ids], zi) => `
              <div class="zonerow">
                <span class="zn">${esc(zone)}</span>
                <span class="fields">
                  ${ids.map(id => {
                    const f = FIELD(id);
                    const on = (c.picks[keys[zi]] || []).includes(id);
                    return `<button class="fieldpick${on ? ' on' : ''}" data-act="t.rbc.pick" data-z="${keys[zi]}" data-id="${id}"
                      title="${esc(f.name)}" aria-pressed="${on}"
                      style="background:${f.color}22;color:${f.color};font-family:var(--f-mono);font-size:9.5px">${esc(f.code)}</button>`;
                  }).join('')}
                </span>
              </div>`).join('')}
          </div></div>`;
      }

      return `<div class="panel"><header><h2>RBC Gather</h2></header><div class="body fieldset">
        ${field('Enabled', toggleEl(c.on, 't.on'))}
        ${field('Phase', seg(c.phase, ['Current', 'Next'], 't.rbc.phase'), 'Gather for the challenge that is live now, or pre-load the next one.')}
        ${field('Strength', stepper(c.strength, 't.rbc.strength', { min: 0, max: 10 }), 'How aggressively to contest the field.')}
        ${field('Panic exit', toggleEl(c.panic, 't.rbc.panic'), 'Leave immediately if a stronger player enters the field.')}
      </div></div>`;
    },

    vichop() {
      const c = S.tools.vichop;
      const tab = S.tools.tab.vichop;

      const stats = `
        <div class="panel">
          <header><h2>Detections</h2><div class="acts"><span class="chip${c.on ? ' live' : ''}">${c.on ? 'Watching' : 'Standby'}</span></div></header>
          <div class="body flush tablewrap">
            <table class="datatable">
              <thead><tr><th>Scope</th><th>Servers hopped</th><th>Nights detected</th><th>Vics detected</th></tr></thead>
              <tbody>
                <tr><td>This macro</td>${c.stats.macro.map(v => `<td data-live="vh">${v.toLocaleString()}</td>`).join('')}</tr>
                <tr><td>All macros</td>${c.stats.all.map(v => `<td>${v.toLocaleString()}</td>`).join('')}</tr>
                <tr><td>Lifetime</td>${c.stats.life.map(v => `<td>${v.toLocaleString()}</td>`).join('')}</tr>
              </tbody>
            </table>
          </div>
        </div>`;

      if (tab === 'Main') {
        return `<div class="panel"><header><h2>Main account</h2></header><div class="body fieldset">
          ${field('Role', select(c.role, ['Main', 'Searcher', 'Solo'], 't.vh.role'), 'Main fights the vicious bee; searchers hop servers looking for one.')}
          ${field('Rejoin after kill', toggleEl(c.rejoin, 't.vh.rejoin'))}
          ${field('Post-kill cooldown', stepper(c.cooldown, 't.vh.cooldown', { min: 0, max: 120, suffix: 's' }))}
        </div></div>` + stats;
      }

      if (tab === 'Searcher') {
        return `<div class="panel"><header><h2>Searcher</h2></header><div class="body fieldset">
          ${field('Searcher enabled', toggleEl(c.searcher, 't.vh.searcher'))}
          ${field('Detection confidence', stepper(c.detect, 't.vh.detect', { min: 50, max: 99, suffix: '%' }), 'Raise this if the searcher calls false positives.')}
          ${field('Hop timeout', stepper(c.timeout, 't.vh.timeout', { min: 5, max: 300, suffix: 's' }), 'Give up on a server after this long without a sighting.')}
        </div></div>` + stats;
      }

      return `<div class="panel"><header><h2>Vic Hop</h2></header><div class="body fieldset">
        ${field('Enabled', toggleEl(c.on, 't.on'))}
        ${field('Role', select(c.role, ['Main', 'Searcher', 'Solo'], 't.vh.role'))}
        ${field('Server hop', toggleEl(c.hop, 't.vh.hop'), 'Public server hopping with AI night and vicious-bee detection.')}
        ${field('Hop timeout', stepper(c.timeout, 't.vh.timeout', { min: 5, max: 300, suffix: 's' }))}
      </div></div>` + stats;
    },
  };

  /* ---- 7.6 Settings ---------------------------------------------------- */
  Screens.settings = {
    head() {
      return {
        title: 'Settings',
        sub: `Nectar Pilot ${VERSION} · ${esc(S.settings.channel)} channel`,
        acts: `<button class="btn" data-act="st.export">${ico('dl')}Export config</button>
               <button class="btn danger" data-act="st.reset">${ico('refresh')}Reset to defaults</button>`,
      };
    },
    body() {
      const st = S.settings;
      const ACCENTS = [['nectar', '#F2A93B'], ['ember', '#E4653A'], ['cool', '#5AA9C9'], ['green', '#4FB477'], ['violet', '#9A7BD4']];

      return `
      <div class="settings">

        <div class="panel">
          <header><h2>Appearance</h2></header>
          <div class="body fieldset">
            ${field('Theme', seg(st.theme, [['auto', 'Auto'], ['light', 'Light', 'sun'], ['dark', 'Dark', 'moon']], 'st.theme'))}
            ${field('Accent', `<div class="swatches">${ACCENTS.map(([k, c]) =>
              `<button class="swatch${st.accent === k ? ' on' : ''}" style="--sw:${c}" data-act="st.accent" data-v="${k}"
                       title="${k}" aria-label="${k} accent" aria-pressed="${st.accent === k}"></button>`).join('')}</div>`)}
            ${field('Interface scale', stepper(st.scale, 'st.scale', { min: 80, max: 130, suffix: '%' }))}
            ${field('Reduce motion', toggleEl(st.motion, 'st.motion'), 'Stops the power rail and transitions.')}
          </div>
        </div>

        <div class="panel">
          <header><h2>Game</h2></header>
          <div class="body fieldset">
            ${field('Roblox window', select(st.window, ['Roblox — Bee Swarm Simulator', 'Roblox (window 2)', 'Detect automatically'], 'st.window'))}
            ${field('Capture resolution', select(st.res, ['1920 × 1080', '2560 × 1440', '1600 × 900', '1280 × 720'], 'st.res'))}
            ${field('Private server link', `<input class="input mono" style="width:250px" placeholder="https://www.roblox.com/share?code=…"
                     value="${esc(st.server)}" data-act="st.server" />`)}
            ${field('Launch with Windows', toggleEl(st.launch, 'st.launch'))}
            ${field('Minimise to tray', toggleEl(st.tray, 'st.tray'))}
          </div>
        </div>

        <div class="panel">
          <header><h2>Detection</h2><div class="acts"><span class="chip cool">${esc(Backend.name)}</span></div></header>
          <div class="body fieldset">
            ${field('Model', select(st.model, ['Eco', 'Standard', 'Full', 'Ultra'], 'st.model'), 'Larger models see more tokens but cost more frame time.')}
            ${field('Compute', select(st.compute, ['CPU', 'DirectML', 'CUDA', 'CoreML'], 'st.compute'))}
            ${field('Capture backend', select(st.capture, ['Desktop Duplication', 'Windows Graphics Capture', 'BitBlt'], 'st.capture'))}
            <div class="field stackfield">
              <div class="lbl">Detection confidence${hint('Below this score a detection is discarded.')}
                <span class="mono" style="margin-left:auto;color:var(--nectar)">${st.confidence}%</span></div>
              <div class="ctl"><input class="slider" type="range" min="40" max="99" value="${st.confidence}"
                   data-act="st.confidence" style="--pct:${((st.confidence - 40) / 59 * 100).toFixed(1)}%" aria-label="Detection confidence" /></div>
            </div>
          </div>
        </div>

        <div class="panel">
          <header><h2>Hotkeys</h2><div class="acts"><span class="chip">Click a key, then press a new one</span></div></header>
          <div class="body fieldset">
            ${[['start', 'Start run'], ['pause', 'Pause run'], ['stop', 'Stop run'],
               ['reload', 'Reload preset'], ['panic', 'Emergency stop']].map(([k, label]) =>
              `<div class="field hotkeyrow"><div class="lbl">${esc(label)}</div><div class="ctl">
                <button class="cap${listening === k ? ' listening' : ''}" data-act="st.hotkey" data-k="${k}">
                  ${listening === k ? 'Press a key…' : esc(st.hotkeys[k])}</button></div></div>`).join('')}
          </div>
        </div>

        <div class="panel">
          <header><h2>Notifications</h2></header>
          <div class="body fieldset">
            ${field('Discord webhook', `<input class="input mono" style="width:250px" placeholder="https://discord.com/api/webhooks/…"
                     value="${esc(st.webhook)}" data-act="st.webhook" />`)}
            ${field('On disconnect', toggleEl(st.notifyDisconnect, 'st.nd'))}
            ${field('On level up', toggleEl(st.notifyLevel, 'st.nl'))}
            ${field('On vicious bee', toggleEl(st.notifyVic, 'st.nv'))}
          </div>
        </div>

        <div class="panel">
          <header><h2>Updates</h2><div class="acts"><span class="chip ok">Up to date</span></div></header>
          <div class="body fieldset">
            ${field('Release channel', seg(st.channel, ['Stable', 'Beta', 'Nightly'], 'st.channel'))}
            ${field('Install automatically', toggleEl(st.autoUpdate, 'st.autoUpdate'))}
            ${field('Installed version', `<span class="mono">${VERSION}</span>`)}
            ${field('', `<button class="btn" data-act="st.check">${ico('refresh')}Check for updates</button>`)}
          </div>
        </div>

        <div class="panel">
          <div class="credits">
            <svg class="bigmark" viewBox="0 0 24 34" aria-hidden="true"><g fill="currentColor">
              <path d="M12 .2 17.72 3.5v6.6L12 13.4 6.28 10.1V3.5z"/>
              <path opacity=".72" d="M6.28 6.8 12 10.1v6.6L6.28 20 .56 16.7v-6.6z"/>
              <path opacity=".72" d="M17.72 6.8 23.44 10.1v6.6L17.72 20 12 16.7v-6.6z"/>
              <path opacity=".4" d="M12 20.1l5.72 3.3v6.6L12 33.3l-5.72-3.3v-6.6z"/>
            </g></svg>
            <div class="by">Designed &amp; built by</div>
            <div class="studio">Horalix</div>
            <p class="tag">Nectar Pilot is an automation cockpit for Bee Swarm Simulator — a flight plan you arm once and instruments you can actually read.</p>
            <div class="lines">
              <div><span class="r">Interface &amp; design system</span><span class="p">Horalix</span></div>
              <div><span class="r">Engineering</span><span class="p">Horalix</span></div>
              <div><span class="r">Version</span><span class="p mono">${VERSION} · ${esc(st.channel)}</span></div>
              <div><span class="r">Engine</span><span class="p mono">${esc(Backend.name)}</span></div>
            </div>
          </div>
        </div>

      </div>`;
    },
  };

  /* ======================================================================
     8. SHELL RENDER
     ====================================================================== */
  function renderRail() {
    $('#rail').innerHTML =
      NAV.map(n => `
        <button class="navbtn${S.screen === n.id ? ' active' : ''}" data-act="nav" data-id="${n.id}"
                aria-current="${S.screen === n.id}" style="position:relative">
          ${ico(n.icon)}<span>${esc(n.name)}</span>
          ${n.id === 'status' && active() ? '<span class="dot"></span>' : ''}
        </button>`).join('') +
      `<span class="grow"></span><span class="rule"></span>
       <button class="navbtn" data-act="st.themeCycle" title="Switch theme">
         ${ico(S.settings.theme === 'light' ? 'sun' : S.settings.theme === 'dark' ? 'moon' : 'monitor')}
         <span>${S.settings.theme === 'auto' ? 'Auto' : S.settings.theme === 'dark' ? 'Dark' : 'Light'}</span>
       </button>`;
  }

  function renderDock() {
    const running = active();
    const paused = S.run === 'paused';
    const hk = S.settings.hotkeys;
    const s = S.session;
    const hr = s.t ? s.honey / s.t * 3600 : 0;

    $('#dock').innerHTML = `
      <div class="transport">
        <button class="tkey${running ? ' armed' : ''}" data-act="run.start" ${running ? 'disabled' : ''}>
          ${ico('play')}<span class="lab">${paused ? 'Resume' : 'Start'}</span><span class="keycap">${esc(hk.start)}</span>
        </button>
        <button class="tkey${paused ? ' armed' : ''}" data-act="run.pause" ${running || paused ? '' : 'disabled'}>
          ${ico('pause')}<span class="lab">Pause</span><span class="keycap">${esc(hk.pause)}</span>
        </button>
        <button class="tkey stop${running || paused ? ' hot' : ''}" data-act="run.stop" ${running || paused ? '' : 'disabled'}>
          ${ico('stop')}<span class="lab">Stop</span><span class="keycap">${esc(hk.stop)}</span>
        </button>
      </div>

      <div class="readouts">
        <div class="readout">
          <span class="k">Status</span>
          <span class="v" data-live="dockTask">${esc(running ? s.task : paused ? 'Paused' : 'Ready')}</span>
        </div>
        <div class="readout">
          <span class="k">Preset</span>
          <span class="v">${esc(S.presets[S.presetIdx])}</span>
          <span class="nav">
            <button data-act="preset" data-d="-1" aria-label="Previous preset">${ico('chevL')}</button>
            <button data-act="preset" data-d="1" aria-label="Next preset">${ico('chevR')}</button>
          </span>
        </div>
        <div class="readout">
          <span class="k">Backpack</span>
          <span class="v mono" data-live="dockBp">${Math.round(s.backpack)}%</span>
        </div>
        <div class="readout">
          <span class="k">Account</span>
          <span class="v">${esc(S.accounts[S.accountIdx])}</span>
          <span class="nav">
            <button data-act="account" data-d="-1" aria-label="Previous account">${ico('chevL')}</button>
            <button data-act="account" data-d="1" aria-label="Next account">${ico('chevR')}</button>
          </span>
        </div>
      </div>

      <div class="dockgauge">
        <div class="stat">
          <span class="k">Honey / hr</span>
          <span class="v" data-live="dockRate">${compact(hr)}</span>
        </div>
        <div class="spark" id="dockSpark">${sparkline()}</div>
      </div>`;
  }

  function sparkline() {
    const d = rate.slice(-24);
    const max = Math.max(...d), min = Math.min(...d);
    const pts = d.map((v, i) => `${(i / (d.length - 1) * 96).toFixed(1)},${(28 - (v - min) / (max - min || 1) * 24).toFixed(1)}`);
    return `<svg viewBox="0 0 96 30" preserveAspectRatio="none" aria-hidden="true">
      <path d="M${pts.join('L')}L96,30L0,30Z" fill="currentColor" opacity=".14"/>
      <path d="M${pts.join('L')}" fill="none" stroke="currentColor" stroke-width="1.4"
            stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    </svg>`;
  }

  function render() {
    const sc = Screens[S.screen];
    const h = sc.head();
    $('#app').dataset.run = S.run;
    $('#screenhead').innerHTML = `
      <div class="titles"><h1>${esc(h.title)}</h1><div class="sub">${h.sub}</div></div>
      <div class="acts">${h.acts || ''}</div>`;
    $('#screenbody').innerHTML = sc.body();
    $('#screenbody').classList.toggle('fill', !!(sc.fill && sc.fill()));
    renderRail();
    renderDock();
    applyChrome();
    logsDrawn = logs.filter(l => Screens.status.match(l)).length;
    if (S.screen === 'status' && S.status.autoscroll) {
      const c = $('#console');
      if (c) c.scrollTop = c.scrollHeight;
    }
  }

  /** Live pass — cheap, focus-safe, runs every second. */
  function live() {
    const s = S.session;
    const set = (sel, v) => { const el = $(sel); if (el && el.innerHTML !== v) el.innerHTML = v; };

    set('#tbClock', hms(s.t));
    set('#tbState', active() ? 'Flying' : S.run === 'paused' ? 'Paused' : 'Idle');
    const lamp = $('#tbLamp');
    if (lamp) lamp.className = 'lamp' + (active() ? ' ok' : S.run === 'paused' ? ' on' : '');

    set('[data-live="dockTask"]', esc(active() ? s.task : S.run === 'paused' ? 'Paused' : 'Ready'));
    set('[data-live="dockBp"]', Math.round(s.backpack) + '%');
    set('[data-live="dockRate"]', compact(s.t ? s.honey / s.t * 3600 : 0));
    const sp = $('#dockSpark'); if (sp) sp.innerHTML = sparkline();

    if (S.screen === 'gather' && S.gather.view === 'queue') {
      const flying = activeEntry();
      for (const e of S.gather.entries) {
        set(`[data-qleft="${e.id}"]`, e.forever ? '∞' : ms(e.left));
      }
      $$('#queueList .qrow').forEach(row => {
        const on = active() && flying && row.dataset.id === flying.id;
        row.classList.toggle('flying', !!on);
      });
    }

    if (S.screen === 'collect') {
      for (const d of DISPENSERS) {
        const it = S.collect.items[d.id];
        set(`[data-cd="${d.id}"]`, cdText(it.left));
        const ring = $(`[data-ring="${d.id}"]`);
        if (ring) {
          const pct = it.left <= 0 ? 1 : 1 - it.left / (d.cd * 60);
          const c = 2 * Math.PI * 14.5;
          ring.querySelector('.arc').setAttribute('stroke-dashoffset', (c * (1 - pct)).toFixed(2));
          ring.classList.toggle('done', it.left <= 0);
        }
        const card = $(`.disp[data-id="${d.id}"]`);
        if (card) card.classList.toggle('ready', it.on && it.left <= 0);
      }
    }

    if (S.screen === 'planters') {
      set('[data-live="plElapsed"]', `${hms(S.planters.elapsed)} / ${S.planters.duration}:00:00`);
      const nl = $('[data-nowline]');
      if (nl) {
        const span = 12, start = S.planters.win * span;
        const f = clamp((S.planters.elapsed / 3600 - start) / span, 0, 1);
        nl.style.left = `calc(6px + (100% - 12px) * ${f.toFixed(4)})`;
      }
    }

    if (S.screen === 'status') {
      set('[data-live="t-runtime"]', hms(s.t));
      set('[data-live="d-runtime"]', active() ? 'Flying now' : 'Stopped');
      set('[data-live="t-honey"]', compact(s.honey));
      set('[data-live="d-honey"]', `${compact(s.t ? s.honey / s.t * 3600 : 0)}/hr`);
      set('[data-live="t-fields"]', String(s.fields));
      set('[data-live="d-fields"]', `${s.hops} server hops`);
      set('[data-live="t-backpack"]', Math.round(s.backpack) + '<small>%</small>');
      set('[data-live="t-drops"]', String(s.drops));
      set('[data-live="d-drops"]', s.drops ? 'Auto-rejoin on' : 'Clean session');
      set('[data-live="rateNow"]', Math.round(rate[rate.length - 1]) + ' /s');
      set('[data-live="taskName"]', esc(s.task));
      const chart = $('#rateChart'); if (chart) chart.innerHTML = Screens.status.chart();

      const con = $('#console');
      if (con) {
        const shown = logs.filter(l => Screens.status.match(l));
        if (shown.length > logsDrawn) {
          con.insertAdjacentHTML('beforeend', Screens.status.lines(shown.slice(logsDrawn)));
          logsDrawn = shown.length;
          while (con.children.length > 400) con.removeChild(con.firstChild);
          if (S.status.autoscroll) con.scrollTop = con.scrollHeight;
        }
      }
    }
  }

  /* Only clear data-theme if we were the ones who set it — a host page may
     own that attribute, and stomping it would break its own theme switch. */
  let themeOwned = false;

  function applyChrome() {
    const r = document.documentElement;
    if (S.settings.theme === 'auto') {
      if (themeOwned) { r.removeAttribute('data-theme'); themeOwned = false; }
    } else {
      r.setAttribute('data-theme', S.settings.theme);
      themeOwned = true;
    }
    r.dataset.accent = S.settings.accent;
    r.style.setProperty('--ui-scale', (S.settings.scale / 100).toFixed(3));
    r.style.setProperty('--dur', S.settings.motion ? '0ms' : '160ms');
    $('#app').classList.toggle('compact', S.win === 'compact');
    $('#app').classList.toggle('max', S.win === 'max');
    $('#btnPin').classList.toggle('on', S.pinned);
    $('#btnPin').innerHTML = ico('pin');
    $('#buildTag').textContent = 'v' + VERSION;
    const wc = $$('.wincontrols [data-noop]');
    if (wc.length === 3) {
      wc[0].innerHTML = ico('minus');
      wc[1].innerHTML = ico(S.win === 'max' ? 'layers' : 'box');
      wc[2].innerHTML = ico('x');
    }
  }

  /* ======================================================================
     9. ACTIONS
     ====================================================================== */
  const G = () => S.gather;
  const selEntry = () => G().entries.find(e => e.id === G().sel);
  const selToken = () => G().tokens.find(t => t.id === G().tokenSel);
  const curTool  = () => S.tools[S.tools.sel];

  const ACT = {
    /* Shell */
    nav: (el) => { S.screen = el.dataset.id; render(); save(); },
    preset: (el) => {
      const n = S.presets.length;
      S.presetIdx = (S.presetIdx + Number(el.dataset.d) + n) % n;
      log(`Preset switched to "${S.presets[S.presetIdx]}"`, 'core', '');
      render(); save();
    },
    account: (el) => {
      const n = S.accounts.length;
      S.accountIdx = (S.accountIdx + Number(el.dataset.d) + n) % n;
      log(`Account switched to "${S.accounts[S.accountIdx]}"`, 'core', '');
      render(); save();
    },
    'run.start': () => setRun('running'),
    'run.pause': () => setRun(S.run === 'paused' ? 'running' : 'paused'),
    'run.stop':  () => setRun('idle'),

    /* Gather */
    'g.view':   (el) => { G().view = el.dataset.v; render(); save(); },
    'g.tab':    (el) => { G().tab = el.dataset.v; render(); save(); },
    'g.sel':    (el) => { G().sel = el.dataset.id; render(); save(); },
    'g.add':    () => {
      const e = mkEntry();
      G().entries.push(e); G().sel = e.id;
      toast('Field added to the flight plan', 'ok');
      render(); save();
    },
    'g.dup': (el) => {
      const src = G().entries.find(x => x.id === el.dataset.id);
      if (!src) return;
      const copy = { ...src, id: nid('g'), left: src.dur };
      G().entries.splice(G().entries.indexOf(src) + 1, 0, copy);
      G().sel = copy.id;
      render(); save();
    },
    'g.del': (el) => {
      const i = G().entries.findIndex(x => x.id === el.dataset.id);
      if (i < 0) return;
      const [gone] = G().entries.splice(i, 1);
      if (G().sel === gone.id) G().sel = (G().entries[i] || G().entries[i - 1] || {}).id || null;
      toast('Field removed');
      render(); save();
    },
    'g.toggleOn': (el) => {
      const e = G().entries.find(x => x.id === el.dataset.id);
      if (e) e.on = !e.on;
      render(); save();
    },
    'g.allOn':  () => { G().entries.forEach(e => e.on = true);  render(); save(); },
    'g.allOff': () => { G().entries.forEach(e => e.on = false); render(); save(); },
    'g.dur': (el) => {
      const e = selEntry(); if (!e) return;
      const mul = { h: 3600, m: 60, s: 1 }[el.dataset.u];
      e.dur = clamp(e.dur + mul * Number(el.dataset.d), 0, 24 * 3600);
      e.left = e.dur;
      render(); save();
    },
    'g.forever': () => { const e = selEntry(); if (e) e.forever = !e.forever; render(); save(); },
    'g.pattern': (el) => { const e = selEntry(); if (e) e.pattern = el.value; render(); save(); },
    'g.field':   (el) => { const e = selEntry(); if (e) e.field = el.value; render(); save(); },
    'g.backpack':(el) => {
      const e = selEntry(); if (!e) return;
      e.backpack = Number(el.value);
      el.style.setProperty('--pct', e.backpack + '%');
      const out = el.closest('div').querySelector('.ctl');
      if (out) {
        out.textContent = e.backpack + '%';
        out.style.color = e.backpack >= 90 ? 'var(--fault)' : e.backpack >= 70 ? 'var(--ember)' : 'var(--ok)';
      }
      save();
    },
    'g.ret': (el) => { const e = selEntry(); if (e) e.ret = el.dataset.v; render(); save(); },
    'g.dir': (el) => { const e = selEntry(); if (e) e.dir = el.dataset.v; render(); save(); },
    'g.rot': (el) => {
      const e = selEntry(); if (!e) return;
      const d = Number(el.dataset.d);
      e.rot = d === 0 ? 0 : (e.rot + d + 4) % 4;
      render(); save();
    },
    'g.flag': (el) => { const e = selEntry(); if (e) e[el.dataset.k] = !e[el.dataset.k]; render(); save(); },
    'g.token':   (el) => { G().tokenSel = el.dataset.id; render(); save(); },
    'g.tokenOff':() => { const t = selToken(); if (t) t.off = !t.off; render(); save(); },
    'g.resetTokens': () => {
      G().tokens = TOKENS.map(t => ({ ...t }));
      toast('Token priorities restored', 'ok');
      render(); save();
    },

    /* Collect */
    'c.group':  (el) => { S.collect.group = el.dataset.v; render(); save(); },
    'c.toggle': (el) => { const it = S.collect.items[el.dataset.id]; if (it) it.on = !it.on; render(); save(); },
    'c.allOn':  () => { Object.values(S.collect.items).forEach(i => i.on = true);  render(); save(); },
    'c.allOff': () => { Object.values(S.collect.items).forEach(i => i.on = false); render(); save(); },
    'c.collectAll': () => {
      let n = 0;
      for (const d of DISPENSERS) {
        const it = S.collect.items[d.id];
        if (it.on && it.left <= 0) { it.left = d.cd * 60; n++; log(`${d.name} collected`, 'collect', 'ok'); }
      }
      toast(`Collected ${n} ${n === 1 ? 'item' : 'items'}`, 'ok');
      render(); save();
    },

    /* Planters */
    'p.duration': (el) => {
      S.planters.duration = Number(el.value);
      S.planters.win = 0;
      S.planters.elapsed = Math.min(S.planters.elapsed, S.planters.duration * 3600 - 1);
      render(); save();
    },
    'p.win':   (el) => { S.planters.win = Math.max(0, S.planters.win + Number(el.dataset.d)); render(); save(); },
    'p.block': (el) => { S.planters.sel = S.planters.sel === el.dataset.id ? null : el.dataset.id; render(); save(); },
    'p.deselect': () => { S.planters.sel = null; render(); save(); },
    'p.type': (el) => {
      const [li, bi] = S.planters.sel.split(':').map(Number);
      S.planters.lanes[li][bi][0] = el.value;
      render(); save();
    },
    'p.hours': (el, d) => {
      const [li, bi] = S.planters.sel.split(':').map(Number);
      const lane = S.planters.lanes[li], b = lane[bi];
      const v = d === 'set' ? Number(el.value) : b[2] + d;
      b[2] = clamp(v, 1, 24);
      /* Re-flow the lane so blocks stay end-to-end. */
      let t = lane[0][1];
      for (const blk of lane) { blk[1] = t; t += blk[2]; }
      render(); save();
    },
    'p.auto':   () => { S.planters.autoPlanters = !S.planters.autoPlanters; render(); save(); },
    'p.window': () => { render(); save(); },
    'p.refresh': () => {
      const pool = PLANTERS.map(p => p.id);
      S.planters.lanes = S.planters.lanes.map(lane =>
        lane.map(b => [pool[Math.floor(Math.random() * pool.length)], b[1], b[2]]));
      log('Planter schedule rebuilt', 'plant', 'ok');
      toast('Schedule refreshed', 'ok');
      render(); save();
    },
    'p.clear': () => {
      confirmModal('Clear the planter schedule?',
        'Every scheduled planter is removed. Auto-planters will start rebuilding on the next harvest.',
        'Clear schedule', () => {
          S.planters.lanes = [[], [], []];
          S.planters.sel = null;
          log('Planter schedule cleared', 'plant', 'warn');
          render(); save();
        });
    },

    /* Status */
    's.filter': (el) => { S.status.filter = el.dataset.v; render(); save(); },
    's.clear':  () => { logs = []; logsDrawn = 0; render(); toast('Log cleared'); },
    's.autoscroll': () => { S.status.autoscroll = !S.status.autoscroll; render(); save(); },
    's.copy': () => {
      const text = logs.map(l => `${l.ts.toISOString()} [${l.tag}] ${l.msg}`).join('\n');
      if (navigator.clipboard && text) {
        navigator.clipboard.writeText(text).then(() => toast('Log copied to clipboard', 'ok'),
                                                 () => toast('Clipboard blocked by the browser', 'warn'));
      } else toast(text ? 'Clipboard unavailable' : 'Nothing to copy', 'warn');
    },

    /* Tools */
    't.sel': (el) => { S.tools.sel = el.dataset.id; render(); save(); },
    't.tab': (el) => { S.tools.tab[S.tools.sel] = el.dataset.v; render(); save(); },
    't.on':  () => {
      const c = curTool(); c.on = !c.on;
      log(`${TOOLS.find(t => t.id === S.tools.sel).name} ${c.on ? 'enabled' : 'disabled'}`, 'tool', c.on ? 'ok' : '');
      render(); save();
    },
    't.aj.kind':   (el) => { S.tools.autojelly.kind = el.value; render(); save(); },
    't.aj.amount': (el, d) => num(S.tools.autojelly, 'amount', el, d, 1, 999),
    't.aj.equip':  () => { S.tools.autojelly.autoEquip = !S.tools.autojelly.autoEquip; render(); save(); },
    't.aj.gift':   () => { S.tools.autojelly.keepGifted = !S.tools.autojelly.keepGifted; render(); save(); },
    't.ac.cps':    (el, d) => num(S.tools.autoclick, 'cps', el, d, 1, 60),
    't.ac.mode':   (el) => { S.tools.autoclick.mode = el.dataset.v; render(); save(); },
    't.ac.jitter': (el, d) => num(S.tools.autoclick, 'jitter', el, d, 0, 100),
    't.bo.interval': (el, d) => num(S.tools.boost, 'interval', el, d, 1, 240),
    't.bo.target': (el) => {
      const t = S.tools.boost.targets, k = el.dataset.k;
      t[k] = !t[k]; render(); save();
    },
    't.rbc.phase':    (el) => { S.tools.rbc.phase = el.dataset.v; render(); save(); },
    't.rbc.strength': (el, d) => num(S.tools.rbc, 'strength', el, d, 0, 10),
    't.rbc.panic':    () => { S.tools.rbc.panic = !S.tools.rbc.panic; render(); save(); },
    't.rbc.alt':      (el) => { const a = S.tools.rbc.alts[Number(el.dataset.i)]; if (a) a.ok = !a.ok; render(); save(); },
    't.rbc.addAlt':   () => {
      S.tools.rbc.alts.push({ n: `Alt ${S.tools.rbc.alts.length + 1}`, ok: false });
      render(); save();
    },
    't.rbc.pick': (el) => {
      const z = el.dataset.z, id = el.dataset.id;
      const arr = S.tools.rbc.picks[z] || (S.tools.rbc.picks[z] = []);
      const i = arr.indexOf(id);
      if (i < 0) arr.push(id); else arr.splice(i, 1);
      render(); save();
    },
    't.vh.role':     (el) => { S.tools.vichop.role = el.value; render(); save(); },
    't.vh.hop':      () => { S.tools.vichop.hop = !S.tools.vichop.hop; render(); save(); },
    't.vh.searcher': () => { S.tools.vichop.searcher = !S.tools.vichop.searcher; render(); save(); },
    't.vh.rejoin':   () => { S.tools.vichop.rejoin = !S.tools.vichop.rejoin; render(); save(); },
    't.vh.timeout':  (el, d) => num(S.tools.vichop, 'timeout', el, d, 5, 300),
    't.vh.detect':   (el, d) => num(S.tools.vichop, 'detect', el, d, 50, 99),
    't.vh.cooldown': (el, d) => num(S.tools.vichop, 'cooldown', el, d, 0, 120),

    /* Settings */
    'st.theme':  (el) => { S.settings.theme = el.dataset.v; applyChrome(); renderRail(); save(); render(); },
    'st.themeCycle': () => {
      const order = ['auto', 'light', 'dark'];
      S.settings.theme = order[(order.indexOf(S.settings.theme) + 1) % 3];
      render(); save();
      toast(`Theme: ${S.settings.theme}`);
    },
    'st.accent': (el) => { S.settings.accent = el.dataset.v; render(); save(); },
    'st.scale':  (el, d) => num(S.settings, 'scale', el, d, 80, 130),
    'st.motion': () => { S.settings.motion = !S.settings.motion; render(); save(); },
    'st.window': (el) => { S.settings.window = el.value; save(); },
    'st.res':    (el) => { S.settings.res = el.value; save(); },
    'st.server': (el) => { S.settings.server = el.value; save(); },
    'st.launch': () => { S.settings.launch = !S.settings.launch; render(); save(); },
    'st.tray':   () => { S.settings.tray = !S.settings.tray; render(); save(); },
    'st.model':  (el) => { S.settings.model = el.value; render(); save(); },
    'st.compute':(el) => { S.settings.compute = el.value; render(); save(); },
    'st.capture':(el) => { S.settings.capture = el.value; save(); },
    'st.confidence': (el) => {
      S.settings.confidence = Number(el.value);
      el.style.setProperty('--pct', ((S.settings.confidence - 40) / 59 * 100).toFixed(1) + '%');
      const out = el.closest('.field').querySelector('.lbl .mono');
      if (out) out.textContent = S.settings.confidence + '%';
      save();
    },
    'st.hotkey': (el) => {
      listening = listening === el.dataset.k ? null : el.dataset.k;
      render();
    },
    'st.webhook': (el) => { S.settings.webhook = el.value; save(); },
    'st.nd': () => { S.settings.notifyDisconnect = !S.settings.notifyDisconnect; render(); save(); },
    'st.nl': () => { S.settings.notifyLevel = !S.settings.notifyLevel; render(); save(); },
    'st.nv': () => { S.settings.notifyVic = !S.settings.notifyVic; render(); save(); },
    'st.channel': (el) => { S.settings.channel = el.dataset.v; render(); save(); },
    'st.autoUpdate': () => { S.settings.autoUpdate = !S.settings.autoUpdate; render(); save(); },
    'st.check': () => { toast(`Nectar Pilot ${VERSION} is the latest ${S.settings.channel} build`, 'ok'); },
    'st.export': () => {
      const { session, ...cfg } = S;
      const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'nectar-pilot-config.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast('Config exported', 'ok');
    },
    'st.reset': () => {
      confirmModal('Reset every setting?',
        'Presets, hotkeys, the flight plan and all tool configuration return to their defaults. This cannot be undone.',
        'Reset everything', () => {
          const t = S.settings.theme;
          S = defaults();
          S.settings.theme = t;
          logs = []; logsDrawn = 0;
          log('Configuration reset to defaults', 'core', 'warn');
          render(); save();
          toast('Everything reset', 'ok');
        });
    },
  };

  /** Shared numeric setter for stepper controls. */
  function num(obj, key, el, d, min, max) {
    obj[key] = clamp(d === 'set' ? Number(el.value) || 0 : obj[key] + d, min, max);
    render(); save();
  }
  /* Gather steppers reuse it against the selected entry. */
  for (const k of ['len', 'wid', 'dist']) {
    ACT['g.' + k] = (el, d) => { const e = selEntry(); if (e) num(e, k, el, d, 0, 30); };
  }
  ACT['g.tokenPr'] = (el, d) => { const t = selToken(); if (t) num(t, 'pr', el, d, 0, 10000); };

  /* ======================================================================
     10. MODAL
     ====================================================================== */
  function confirmModal(title, body, cta, onOk) {
    const host = $('#modalhost');
    host.innerHTML = `
      <div class="modalwrap" data-modal>
        <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}">
          <header><h2>${esc(title)}</h2></header>
          <div class="body"><p style="font-size:var(--t-base);color:var(--ink-2)">${esc(body)}</p></div>
          <footer>
            <button class="btn" data-modal-close>Cancel</button>
            <button class="btn danger" data-modal-ok>${esc(cta)}</button>
          </footer>
        </div>
      </div>`;
    const close = () => { host.innerHTML = ''; };
    $('[data-modal-close]', host).onclick = close;
    $('[data-modal-ok]', host).onclick = () => { close(); onOk(); };
    $('[data-modal]', host).onclick = e => { if (e.target.dataset.modal !== undefined) close(); };
    $('[data-modal-ok]', host).focus();
  }

  /* ======================================================================
     11. EVENTS
     ====================================================================== */
  function dispatch(el, d) {
    const fn = ACT[el.dataset.act];
    if (fn) fn(el, d);
  }

  document.addEventListener('click', e => {
    const wc = e.target.closest('.wincontrols [data-noop]');
    if (wc) {
      const i = $$('.wincontrols [data-noop]').indexOf(wc);
      if (i === 0) { S.win = S.win === 'compact' ? 'normal' : 'compact'; applyChrome(); save(); }
      if (i === 1) { S.win = S.win === 'max' ? 'normal' : 'max'; applyChrome(); save(); }
      if (i === 2) {
        confirmModal('Quit Nectar Pilot?', 'The run stops and the window closes. Your configuration is already saved.',
          'Quit', () => { setRun('idle'); toast('Nectar Pilot would exit here', 'warn'); });
      }
      return;
    }
    if (e.target.closest('#btnPin')) {
      S.pinned = !S.pinned; applyChrome(); save();
      toast(S.pinned ? 'Window pinned on top' : 'Window unpinned');
      return;
    }
    const el = e.target.closest('[data-act]');
    if (!el) return;
    if (el.tagName === 'SELECT' || el.tagName === 'INPUT') return;   /* handled on change/input */
    e.preventDefault();
    dispatch(el, el.dataset.d ? Number(el.dataset.d) : undefined);
  });

  document.addEventListener('change', e => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    if (el.tagName === 'SELECT') dispatch(el);
    else if (el.type === 'number') dispatch(el, 'set');
  });

  document.addEventListener('input', e => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    if (el.type === 'range' || (el.tagName === 'INPUT' && el.type === 'text')) dispatch(el);
  });

  /* Drag to reorder the flight plan. */
  let dragId = null;
  document.addEventListener('dragstart', e => {
    const row = e.target.closest('.qrow');
    if (!row) return;
    dragId = row.dataset.id;
    row.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', dragId); } catch (_) {}
  });
  document.addEventListener('dragend', () => {
    dragId = null;
    $$('.qrow').forEach(r => r.classList.remove('dragging', 'dropbefore', 'dropafter'));
  });
  document.addEventListener('dragover', e => {
    const row = e.target.closest('.qrow');
    if (!row || !dragId) return;
    e.preventDefault();
    const before = e.clientY < row.getBoundingClientRect().top + row.offsetHeight / 2;
    $$('.qrow').forEach(r => r.classList.remove('dropbefore', 'dropafter'));
    row.classList.add(before ? 'dropbefore' : 'dropafter');
  });
  document.addEventListener('drop', e => {
    const row = e.target.closest('.qrow');
    if (!row || !dragId) return;
    e.preventDefault();
    const list = G().entries;
    const from = list.findIndex(x => x.id === dragId);
    let to = list.findIndex(x => x.id === row.dataset.id);
    if (from < 0 || to < 0 || from === to) { dragId = null; return render(); }
    const before = e.clientY < row.getBoundingClientRect().top + row.offsetHeight / 2;
    const [moved] = list.splice(from, 1);
    to = list.findIndex(x => x.id === row.dataset.id);
    list.splice(before ? to : to + 1, 0, moved);
    dragId = null;
    render(); save();
  });

  /* Hotkeys */
  const keyName = e => {
    const parts = [];
    if (e.ctrlKey) parts.push('Ctrl');
    if (e.altKey) parts.push('Alt');
    if (e.shiftKey) parts.push('Shift');
    let k = e.key;
    if (k === ' ') k = 'Space';
    if (k.length === 1) k = k.toUpperCase();
    if (!['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) parts.push(k);
    return parts.join('+');
  };

  document.addEventListener('keydown', e => {
    if (listening) {
      e.preventDefault();
      if (e.key === 'Escape') { listening = null; return render(); }
      if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return;
      S.settings.hotkeys[listening] = keyName(e);
      toast(`${listening} bound to ${keyName(e)}`, 'ok');
      listening = null;
      render(); save();
      return;
    }
    if (e.key === 'Escape' && $('[data-modal]')) { $('#modalhost').innerHTML = ''; return; }

    const typing = /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName);
    if (typing) return;

    const name = keyName(e);
    const hk = S.settings.hotkeys;
    if (name === hk.start)  { e.preventDefault(); setRun('running'); }
    else if (name === hk.pause)  { e.preventDefault(); setRun(S.run === 'paused' ? 'running' : 'paused'); }
    else if (name === hk.stop)   { e.preventDefault(); setRun('idle'); }
    else if (name === hk.reload) {
      e.preventDefault();
      G().entries.forEach(x => x.left = x.dur);
      log(`Preset "${S.presets[S.presetIdx]}" reloaded`, 'core', '');
      toast('Preset reloaded', 'ok');
      render();
    } else if (name === hk.panic) {
      e.preventDefault();
      setRun('idle');
      log('EMERGENCY STOP — all input released', 'core', 'fault');
      toast('Emergency stop', 'warn');
    }
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (S.settings.theme === 'auto') render();
  });

  /* ======================================================================
     12. BOOT
     ====================================================================== */
  load();
  log(`Nectar Pilot ${VERSION} ready · ${Backend.name} engine`, 'core', 'ok');
  log(`Detection: ${S.settings.model} on ${S.settings.compute}`, 'core', '');
  log('Waiting for the pilot to arm a run', 'core', '');
  render();
  setInterval(tick, 1000);

  /* Exposed so a native host can drive the same UI. */
  window.NectarPilot = {
    get state() { return S; },
    setBackend(b) { Object.assign(Backend, b); render(); },
    log, toast, render,
    start: () => setRun('running'),
    pause: () => setRun('paused'),
    stop:  () => setRun('idle'),
  };
})();
