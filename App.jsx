import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Crown,
  Dna,
  FileText,
  FlaskConical,
  Globe,
  Home,
  Layers,
  Lock,
  Mic,
  MicOff,
  Pause,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  User,
  Zap,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

// Complete curriculum data across Biology, Chemistry, and Physics
const CURRICULUM = {
  biology: {
    id: 'biology',
    name: 'Biologiya',
    subtitle: 'Hujayra tuzilishi, DNK, Organoidlar',
    topicsCount: '48 ta 3D mavzu • 0 dan',
    progress: 68,
    accentGradient: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Dna,
    pageNumber: '03-sahifa',
    chapter: '1-Bo‘lim • Sitologiya asoslari',
    title: 'O‘simlik hujayrasi tuzilishi va organoidlari',
    url: 'biochem.ai/biologiya/03-sahifa/osimlik-hujayrasi',
    defaultPart: 'yadro',
    paragraphs: [
      {
        id: 'p1',
        label: '1-xatboshi',
        sentenceContext:
          'Barcha tirik organizmlarning asosiy tuzilish va funksional birligi hujayra hisoblanadi.',
        segments: [
          { text: 'Barcha tirik organizmlarning eng kichik tuzilish va funksional birligi ' },
          { termId: 'hujayra', label: 'hujayra' },
          { text: ' hisoblanadi. U tashqi tomondan sellyulozadan iborat mustahkam ' },
          { termId: 'qobiq', label: 'hujayra qobig‘i' },
          { text: ' bilan o‘ralgan bo‘lib, ichki muhit doimiyligini himoya qiladi.' }
        ]
      },
      {
        id: 'p2',
        label: '2-xatboshi',
        sentenceContext:
          'Hujayra markazida joylashgan yadro irsiy axborotni (DNK) saqlaydi va barcha hayotiy jarayonlarni boshqaradi.',
        segments: [
          { text: 'Hujayra markazida joylashgan ' },
          { termId: 'yadro', label: 'yadro' },
          {
            text: ' irsiy axborotni (DNK) saqlaydi va barcha hayotiy jarayonlarni boshqaradi. Organoidlar orasidagi moddalar almashinuvini esa suyuq muhit — '
          },
          { termId: 'sitoplazma', label: 'sitoplazma' },
          { text: ' amalga oshiradi.' }
        ]
      },
      {
        id: 'p3',
        label: '3-xatboshi',
        sentenceContext:
          'Yashil o‘simlik hujayrasida quyosh nuri yordamida organik modda sintezlovchi xloroplast hamda energiya ishlab chiqaruvchi mitoxondriya mavjud.',
        segments: [
          { text: 'Yashil o‘simlik hujayrasida quyosh nuri yordamida fotosintezni amalga oshiruvchi ' },
          { termId: 'xloroplast', label: 'xloroplast' },
          { text: ' mavjud. Hujayrani energiya (ATF) bilan ta’minlash vazifasini esa ' },
          { termId: 'mitoxondriya', label: 'mitoxondriya' },
          { text: ' bajaradi.' }
        ]
      }
    ],
    parts: {
      hujayra: {
        id: 'hujayra',
        nameUz: 'O‘simlik hujayrasi (Umumiy 3D)',
        nameEn: 'Eukaryotic Plant Cell',
        freeAvailable: true,
        shortDesc:
          'Hujayra — mustaqil moddalar almashinuvi, o‘sish va ko‘payish xususiyatiga ega eng kichik tirik tizim.',
        olympiadNote:
          'Milliy Sertifikat / OTM: O‘simlik hujayrasi hayvon hujayrasidan sellyuloza qobig‘i, plastidalar (xloroplast) va markaziy vakuolasi bilan farq qiladi.'
      },
      qobiq: {
        id: 'qobiq',
        nameUz: 'Hujayra qobig‘i va membrana',
        nameEn: 'Cell Wall & Plasma Membrane',
        freeAvailable: true,
        shortDesc:
          'Hujayra qobig‘i — tashqi sellyuloza qatlami bo‘lib, hujayraga aniq shakl beradi va moddalarning tanlab o‘tishini nazorat qiladi.',
        olympiadNote:
          'OTM / Olimpiada eslatmasi: O‘simlik qobig‘i sellyulozadan, zamburug‘larniki xitindan, bakteriyalarniki esa mureindan tuzilgan.'
      },
      yadro: {
        id: 'yadro',
        nameUz: 'Yadro (Boshqaruv markazi)',
        nameEn: 'Cell Nucleus & Nucleolus',
        freeAvailable: true,
        shortDesc:
          'Bu yadro — irsiy axborotni (DNK) saqlaydi, oqsil sintezini boshqaradi va nasldan-naslga o‘tkazadi.',
        olympiadNote:
          'Milliy Sertifikat / OTM: Yadro qo‘sh membranali organoid. Sutemizuvchilarning yetuk eritrotsitlari va o‘simlik elaksimon naylarida yadro bo‘lmaydi.'
      },
      sitoplazma: {
        id: 'sitoplazma',
        nameUz: 'Sitoplazma (Ichki muhit)',
        nameEn: 'Cytoplasm & Cytosol',
        freeAvailable: false,
        shortDesc:
          'Sitoplazma — hujayraning yarim suyuq ichki muhiti bo‘lib, barcha organoidlarni o‘zaro bog‘laydi va moddalar tashilishini ta’minlaydi.',
        olympiadNote:
          'OTM / Olimpiada eslatmasi: Sitoplazma doimiy aylanma harakatda (sikloz) bo‘ladi va energiya almashinuvining glikoliz bosqichi shu yerda kechadi.'
      },
      xloroplast: {
        id: 'xloroplast',
        nameUz: 'Xloroplast (Fotosintez markazi)',
        nameEn: 'Chloroplast & Thylakoids',
        freeAvailable: false,
        shortDesc:
          'Xloroplast — yashil xlorofill pigmenti yordamida quyosh nuri energiyasini kimyoviy energiyaga (glyukozaga) aylantiruvchi organoid.',
        olympiadNote:
          'Milliy Sertifikat / OTM siri: O‘zining halqasimon DNK va 70S ribosomalariga ega yarim avtonom, ikki membranali organoid.'
      },
      mitoxondriya: {
        id: 'mitoxondriya',
        nameUz: 'Mitoxondriya (Energiya stansiyasi)',
        nameEn: 'Mitochondrion & Cristae',
        freeAvailable: false,
        shortDesc:
          'Mitoxondriya — organik moddalarni kislorod ishtirokida parchalab, hujayra uchun universal energiya manbai — ATF sintezlaydi.',
        olympiadNote:
          'OTM / Olimpiada eslatmasi: Ichki membranasi burmalar (kristalar) hosil qiladi; aerob nafas olishda 36 molekula ATF aynan shu yerda hosil bo‘ladi.'
      }
    },
    tests: [
      {
        q: '1. O‘simlik hujayrasida irsiy axborotni (DNK) saqlovchi va boshqaruv markazi hisoblangan organoid qaysi?',
        options: ['Sitoplazma', 'Yadro', 'Hujayra qobig‘i', 'Vakuola'],
        correct: 1
      },
      {
        q: '2. Quyosh nuri energiyasi hisobiga organik modda sintezlovchi qo‘sh membranali organoidni toping:',
        options: ['Mitoxondriya', 'Ribosoma', 'Xloroplast', 'Lizosoma'],
        correct: 2
      },
      {
        q: '3. O‘simlik hujayra qobig‘i tarkibiga kiruvchi asosiy uglevod qaysi?',
        options: ['Xitin', 'Sellyuloza', 'Glikogen', 'Murein'],
        correct: 1
      }
    ]
  },

  chemistry: {
    id: 'chemistry',
    name: 'Kimyo',
    subtitle: 'Molekulalar, Kovalent bog‘lanish, Reaksiyalar',
    topicsCount: '42 ta 3D mavzu • 0 dan',
    progress: 54,
    accentGradient: 'from-blue-600 to-cyan-500',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: FlaskConical,
    pageNumber: '05-sahifa',
    chapter: '2-Bo‘lim • Kimyoviy bog‘lanish',
    title: 'Suv (H₂O) molekulasi va kovalent qutbli bog‘lanish',
    url: 'biochem.ai/kimyo/05-sahifa/kovalent-boglanish',
    defaultPart: 'kovalent',
    paragraphs: [
      {
        id: 'c1',
        label: '1-xatboshi',
        sentenceContext:
          'Suv (H₂O) molekulasi burchakli fazoviy tuzilishga ega bo‘lib, bitta kislorod va ikkita vodorod atomidan tashkil topgan.',
        segments: [
          { text: 'Tabiatdagi eng muhim erituvchi — ' },
          { termId: 'h2o', label: 'H₂O molekulasi' },
          { text: ' burchakli fazoviy tuzilishga ega. U markaziy bitta ' },
          { termId: 'kislorod', label: 'kislorod atomi' },
          { text: ' hamda ikkita ' },
          { termId: 'vodorod', label: 'vodorod atomi' },
          { text: ' birikishidan hosil bo‘ladi.' }
        ]
      },
      {
        id: 'c2',
        label: '2-xatboshi',
        sentenceContext:
          'Kislorod va vodorod atomlari orasida umumiy elektron juftlar hisobiga kovalent qutbli bog‘lanish yuzaga keladi.',
        segments: [
          { text: 'Kislorodning elektromanfiyligi yuqori bo‘lgani sababli atomlar orasida ' },
          { termId: 'kovalent', label: 'kovalent bog‘lanish' },
          {
            text: ' (qutbli) hosil bo‘ladi va valent burchak 104,5° ni tashkil etadi.'
          }
        ]
      }
    ],
    parts: {
      h2o: {
        id: 'h2o',
        nameUz: 'H₂O molekulasi (3D Fazoviy model)',
        nameEn: 'Water Molecule (Dipole)',
        freeAvailable: true,
        shortDesc:
          'H₂O — qutbli dipol molekula bo‘lib, kislorod qisman manfiy (δ-), vodorod atomlari esa qisman musbat (δ+) zaryadga ega.',
        olympiadNote:
          'Milliy Sertifikat / OTM: Suv molekulalari orasidagi vodorod bog‘lanish tufayli suvning qaynash harorati (+100°C) anomal darajada yuqori.'
      },
      kislorod: {
        id: 'kislorod',
        nameUz: 'Kislorod atomi (O)',
        nameEn: 'Oxygen Atom (sp³ hybridized)',
        freeAvailable: true,
        shortDesc:
          'Kislorod atomi tashqi energetik pog‘onasida 6 ta elektronga ega bo‘lib, barqaror oktet hosil qilish uchun 2 ta elektron juftlashtiradi.',
        olympiadNote:
          'OTM / Olimpiada eslatmasi: Kislorod atomida 2 ta taqsimlanmagan elektron juft mavjudligi sababli valent burchak 109,5° dan 104,5° gacha siqiladi.'
      },
      vodorod: {
        id: 'vodorod',
        nameUz: 'Vodorod atomlari (2H)',
        nameEn: 'Hydrogen Atoms (1s¹)',
        freeAvailable: true,
        shortDesc:
          'Har bir vodorod atomi o‘zining yagona 1s-elektronini kislorod bilan umumlashtirib, barqaror dublet qobiqqa ega bo‘ladi.',
        olympiadNote:
          'Milliy Sertifikat / OTM: Vodorod atomlari qisman musbat (δ+) zaryadlangani uchun boshqa molekula kislorodi bilan vodorod bog‘ hosil qiladi.'
      },
      kovalent: {
        id: 'kovalent',
        nameUz: 'Kovalent qutbli bog‘lanish (O–H)',
        nameEn: 'Polar Covalent Sigma Bonds',
        freeAvailable: false,
        shortDesc:
          'Kovalent qutbli bog‘lanish — elektromanfiyligi turlicha bo‘lgan ikki metalmas atom orasida umumiy elektron juftlarning siljishi natijasida yuzaga keladi.',
        olympiadNote:
          'OTM / Olimpiada eslatmasi: H₂O molekulasida 2 ta sigma (σ) bog‘ mavjud, pi (π) bog‘ esa mutlaqo yo‘q!'
      }
    },
    tests: [
      {
        q: '1. Suv (H₂O) molekulasidagi valent burchak nechaga teng?',
        options: ['180°', '120°', '104,5°', '109,5°'],
        correct: 2
      },
      {
        q: '2. Kislorod va vodorod atomlari orasida qanday kimyoviy bog‘lanish mavjud?',
        options: ['Ion bog‘lanish', 'Kovalent qutbli', 'Kovalent qutbsiz', 'Metall bog‘lanish'],
        correct: 1
      }
    ]
  },

  physics: {
    id: 'physics',
    name: 'Fizika',
    subtitle: 'Atom modeli, Kvant darajalari, Kuchlar',
    topicsCount: '39 ta 3D mavzu • 0 dan',
    progress: 75,
    accentGradient: 'from-violet-600 to-amber-500',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    icon: Atom,
    pageNumber: '02-sahifa',
    chapter: '4-Bo‘lim • Kvant va atom fizikasi',
    title: 'Rezerford-Bor atom modeli va elektron orbitalar',
    url: 'biochem.ai/fizika/02-sahifa/atom-modeli',
    defaultPart: 'atom_yadrosi',
    paragraphs: [
      {
        id: 'f1',
        label: '1-xatboshi',
        sentenceContext:
          'Atom markazida musbat zaryadlangan atom yadrosi joylashgan bo‘lib, uning atrofida manfiy zaryadli elektronlar aylanadi.',
        segments: [
          { text: 'Atom markazida deyarli barcha massani o‘zida jamlagan ' },
          { termId: 'atom_yadrosi', label: 'atom yadrosi' },
          { text: ' joylashgan. Uning atrofida esa yopiq orbitalar bo‘ylab manfiy zaryadli ' },
          { termId: 'elektronlar', label: 'elektronlar' },
          { text: ' harakatlanadi.' }
        ]
      },
      {
        id: 'f2',
        label: '2-xatboshi',
        sentenceContext:
          'Atom yadrosi kuchli yadro kuchlari bilan bog‘langan proton va neytronlar (nuklonlar) dan tashkil topgan.',
        segments: [
          { text: 'Yadro ichida musbat zaryadli va neytral zarrachalar — ' },
          { termId: 'nuklonlar', label: 'energetik qobiq va nuklonlar' },
          { text: ' o‘ta kuchli yadroviy tortishish kuchlari hisobiga birikib turadi.' }
        ]
      }
    ],
    parts: {
      atom_yadrosi: {
        id: 'atom_yadrosi',
        nameUz: 'Atom yadrosi (3D Markaz)',
        nameEn: 'Atomic Nucleus',
        freeAvailable: true,
        shortDesc:
          'Atom yadrosi — atom o‘lchamidan 100 000 marta kichik, ammo atom massasining 99,9% ini tashkil etuvchi musbat zaryadli markaz.',
        olympiadNote:
          'Milliy Sertifikat / OTM: Yadro zaryadi Z (Mendeleyev jadvalidagi tartib raqam) har doim protonlar soniga teng bo‘ladi.'
      },
      elektronlar: {
        id: 'elektronlar',
        nameUz: 'Elektronlar va orbitalar (e⁻)',
        nameEn: 'Orbiting Electrons',
        freeAvailable: true,
        shortDesc:
          'Elektronlar — manfiy elementar zaryadga (-1,6·10⁻¹⁹ Kl) ega zarrachalar bo‘lib, statsionar orbitalarda energiya nurlatmasdan harakatlanadi.',
        olympiadNote:
          'OTM / Olimpiada eslatmasi: Elektron yuqori orbitadan quyi orbitaga o‘tganda foton (yorug‘lik kvanti) nurlanadi: hν = E₂ - E₁.'
      },
      nuklonlar: {
        id: 'nuklonlar',
        nameUz: 'Energetik qobiq va nuklonlar',
        nameEn: 'Energy Shells & Nucleons',
        freeAvailable: false,
        shortDesc:
          'Proton (p⁺) musbat zaryadli, neytron (n⁰) esa elektroneytral zarracha. Ularning yig‘indisi massa soni A ni beradi (A = Z + N).',
        olympiadNote:
          'Milliy Sertifikat / OTM: Izotoplarda protonlar soni (Z) bir xil, neytronlar soni (N) esa turlicha bo‘ladi.'
      }
    },
    tests: [
      {
        q: '1. Atom massasining 99,9% qismi qayerda to‘plangan?',
        options: ['Elektron qobiqda', 'Atom yadrosida', 'Tashqi orbitada', 'Bo‘sh fazoda'],
        correct: 1
      },
      {
        q: '2. Yadro tarkibidagi proton va neytronlar birgalikda nima deb ataladi?',
        options: ['Fotonlar', 'Pozitronlar', 'Nuklonlar', 'Izomerlar'],
        correct: 2
      }
    ]
  }
};

export default function App() {
  // 'home' = Stunning Welcome/Dashboard Entry Screen, 'workspace' = Interactive Study Workspace
  const [screen, setScreen] = useState('home');
  // User Tier: 'premium' (60 000 so'm/oy) vs 'free' (Tekin)
  const [plan, setPlan] = useState('premium');
  const [subjectKey, setSubjectKey] = useState('biology');
  const [leftTab, setLeftTab] = useState('textbook'); // 'textbook' | 'test'
  const [selectedPartId, setSelectedPartId] = useState('yadro');
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Free Topic Test state
  const [testAnswers, setTestAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Page-Context AI Tutor State
  const [activeSentence, setActiveSentence] = useState(
    CURRICULUM.biology.paragraphs[1].sentenceContext
  );
  const [activeParagraphLabel, setActiveParagraphLabel] = useState('2-xatboshi');
  const [topAskInput, setTopAskInput] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'ai',
      badge: 'Kontekst: Biologiya • 03-sahifa',
      text: 'Assalomu alaykum, Nurhayot! Men siz turgan 03-sahifadagi «O‘simlik hujayrasi» mavzusini real vaqtda ko‘rib turibman. Matndagi ko‘k rangli atamalarga bosing yoki yuqoridagi «Ask AI» orqali ovozli/matnli savol bering!'
    }
  ]);

  // Three.js Refs
  const mountRef = useRef(null);
  const rootGroupRef = useRef(null);
  const clickableMeshesRef = useRef([]);
  const selectedPartRef = useRef(selectedPartId);
  const autoRotateRef = useRef(autoRotate);
  const zoomRef = useRef(zoomLevel);

  const subject = CURRICULUM[subjectKey];
  const currentPart = subject.parts[selectedPartId] || subject.parts[subject.defaultPart];
  const isLockedInFree = plan === 'free' && !currentPart.freeAvailable;

  useEffect(() => {
    selectedPartRef.current = selectedPartId;
  }, [selectedPartId]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    zoomRef.current = zoomLevel;
  }, [zoomLevel]);

  // Enter a subject directly from the Home Dashboard or top bar
  const enterSubjectWorkspace = (newKey, initialTab = 'textbook') => {
    const nextSubj = CURRICULUM[newKey];
    setSubjectKey(newKey);
    setSelectedPartId(nextSubj.defaultPart);
    setLeftTab(initialTab);
    setTestAnswers({});
    setTestSubmitted(false);
    setActiveSentence(nextSubj.paragraphs[0].sentenceContext);
    setActiveParagraphLabel(nextSubj.paragraphs[0].label);
    setScreen('workspace');
    setChatHistory([
      {
        role: 'ai',
        badge: `Kontekst: ${nextSubj.name} • ${nextSubj.pageNumber}`,
        text: `Xush kelibsiz! Siz hozir «${nextSubj.title}» (${nextSubj.url}) sahifasidasiz. Ko‘k rangli atamalarni bosing yoki savolingizni bering!`
      }
    ]);
  };

  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://${subject.url}`).catch(() => {});
    }
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 1800);
  };

  // Click a blue link-word in the white textbook page
  const handleBlueTermClick = (termId, sentenceContext, paraLabel) => {
    setSelectedPartId(termId);
    if (sentenceContext) setActiveSentence(sentenceContext);
    if (paraLabel) setActiveParagraphLabel(paraLabel);
  };

  // Ask AI Tutor with exact page + paragraph context
  const triggerAskAI = (questionText = null, customSentence = null, customParaLabel = null) => {
    const q = (questionText || aiInput || topAskInput).trim();
    if (!q) return;

    const ctxSentence = customSentence || activeSentence;
    const ctxPara = customParaLabel || activeParagraphLabel;
    if (customSentence) setActiveSentence(customSentence);
    if (customParaLabel) setActiveParagraphLabel(customParaLabel);

    const userBubble = {
      role: 'user',
      text: q
    };

    let reply = '';
    if (plan === 'free') {
      reply = `Standart javob (Free rejim): «${currentPart.nameUz}» — bu mavzudagi asosiy tushuncha.\n\n🔒 Eslatma: Aynan siz turgan ${subject.pageNumber} (${ctxPara}) jumlasi bo‘yicha chuqur ustoz tahlili, ovozli tushuntirish va Milliy sertifikat / OTM sirlari faqat Premium obunada (60 000 so‘m/oy) ochiladi.`;
    } else {
      reply = `📍 ${subject.name} • ${subject.pageNumber} (${ctxPara}) tahlili:\nSiz o‘qiyotgan «${ctxSentence}» jumlasida asosiy urg‘u ${currentPart.nameUz.toLowerCase()}ning funksiyasiga qaratilgan.\n\n💡 Ustoz tushuntirishi: ${currentPart.shortDesc}\n\n🎯 ${currentPart.olympiadNote}`;
    }

    setChatHistory((prev) => [
      ...prev,
      userBubble,
      {
        role: 'ai',
        badge:
          plan === 'premium'
            ? `Kontekst: ${subject.name} • ${subject.pageNumber} (${ctxPara})`
            : 'Standart Free AI',
        text: reply
      }
    ]);

    if (!questionText) {
      setAiInput('');
      setTopAskInput('');
    }
  };

  // Simulated Voice Input in Uzbek
  const toggleVoiceQuestion = () => {
    if (plan === 'free') {
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'ai',
          badge: 'Premium Funksiya',
          text: '🎙️ Ovozli savol berish va sahifa kontekstini ovoz orqali tahlil qilish faqat Premium obunachilar (60 000 so‘m/oy) uchun ochiq!'
        }
      ]);
      return;
    }

    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const simulatedSpokenQuestion =
          subjectKey === 'biology'
            ? 'Bu sahifadagi xloroplast va mitoxondriya farqini tushuntir'
            : subjectKey === 'chemistry'
            ? 'Shu sahifadagi kovalent qutbli bog‘lanish qanday hosil bo‘lishini tushuntir'
            : 'Atom yadrosi va elektronlar harakatini sodda tilda tushuntir';
        triggerAskAI(simulatedSpokenQuestion, activeSentence, activeParagraphLabel);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  // Build & Animate Real Three.js 3D Scene (only active when screen === 'workspace')
  useEffect(() => {
    if (screen !== 'workspace') return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 265;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.75);
    rimLight.position.set(-5, -3, -5);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    const clickables = [];
    const animatedObjects = [];

    if (subjectKey === 'biology') {
      // Translucent Plant Cell Wall & Membrane
      const wallGeo = new THREE.SphereGeometry(2.15, 42, 42);
      wallGeo.scale(1.22, 0.95, 0.88);
      const wallMat = new THREE.MeshPhysicalMaterial({
        color: 0x14b8a6,
        transparent: true,
        opacity: 0.22,
        roughness: 0.25,
        metalness: 0.05,
        transmission: 0.35,
        side: THREE.DoubleSide
      });
      const wallMesh = new THREE.Mesh(wallGeo, wallMat);
      wallMesh.userData = { partId: 'qobiq' };
      rootGroup.add(wallMesh);
      clickables.push(wallMesh);

      const wireGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.22, 1));
      wireGeo.scale(1.2, 0.94, 0.86);
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x0d9488,
        transparent: true,
        opacity: 0.22
      });
      rootGroup.add(new THREE.LineSegments(wireGeo, wireMat));

      // Nucleus + Nucleolus
      const nucleusGroup = new THREE.Group();
      nucleusGroup.position.set(-0.45, 0.1, 0.15);
      const nucGeo = new THREE.SphereGeometry(0.68, 32, 32);
      const nucMat = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        roughness: 0.3,
        metalness: 0.15,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.25
      });
      const nucMesh = new THREE.Mesh(nucGeo, nucMat);
      nucMesh.userData = { partId: 'yadro' };
      nucleusGroup.add(nucMesh);
      clickables.push(nucMesh);

      const ringGeo = new THREE.TorusGeometry(0.84, 0.025, 16, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xa78bfa,
        transparent: true,
        opacity: 0.55
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.4;
      nucleusGroup.add(ringMesh);
      rootGroup.add(nucleusGroup);

      // Chloroplasts
      [
        [1.15, 0.65, 0.35, 0.4],
        [0.95, -0.75, -0.25, -0.5]
      ].forEach(([x, y, z, rot], i) => {
        const chlGeo = new THREE.CapsuleGeometry(0.26, 0.52, 12, 24);
        const chlMat = new THREE.MeshStandardMaterial({
          color: 0x16a34a,
          roughness: 0.28,
          emissive: 0x14532d,
          emissiveIntensity: 0.22
        });
        const chlMesh = new THREE.Mesh(chlGeo, chlMat);
        chlMesh.position.set(x, y, z);
        chlMesh.rotation.set(0.3, rot, 0.8);
        chlMesh.userData = { partId: 'xloroplast' };
        rootGroup.add(chlMesh);
        clickables.push(chlMesh);
        animatedObjects.push({ mesh: chlMesh, speed: 0.8 + i * 0.2, offset: i });
      });

      // Mitochondria
      [
        [-1.15, -0.65, 0.3, -0.6],
        [0.2, 0.95, -0.45, 0.7]
      ].forEach(([x, y, z, rot], i) => {
        const mitGeo = new THREE.CapsuleGeometry(0.22, 0.48, 12, 24);
        const mitMat = new THREE.MeshStandardMaterial({
          color: 0xea580c,
          roughness: 0.32,
          emissive: 0x7c2d12,
          emissiveIntensity: 0.25
        });
        const mitMesh = new THREE.Mesh(mitGeo, mitMat);
        mitMesh.position.set(x, y, z);
        mitMesh.rotation.set(-0.4, rot, 0.5);
        mitMesh.userData = { partId: 'mitoxondriya' };
        rootGroup.add(mitMesh);
        clickables.push(mitMesh);
        animatedObjects.push({ mesh: mitMesh, speed: 1.0, offset: i + 2 });
      });

      // Cytoplasmic Spheres
      const cytoGeo = new THREE.SphereGeometry(0.11, 16, 16);
      const cytoMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.25,
        emissive: 0x0369a1,
        emissiveIntensity: 0.2
      });
      [
        [0.35, -0.25, 0.85],
        [-0.85, 0.75, -0.35],
        [0.55, 0.25, -0.75],
        [-0.25, -0.95, -0.2],
        [1.35, -0.1, 0.15]
      ].forEach(([x, y, z], idx) => {
        const dot = new THREE.Mesh(cytoGeo, cytoMat.clone());
        dot.position.set(x, y, z);
        dot.userData = { partId: 'sitoplazma' };
        rootGroup.add(dot);
        clickables.push(dot);
        animatedObjects.push({ mesh: dot, speed: 1.3, offset: idx * 0.7 });
      });
    } else if (subjectKey === 'chemistry') {
      // Water Molecule (H2O) with 104.5° bond angle
      const angleRad = (104.5 * Math.PI) / 180;
      const bondLen = 1.65;

      const oxyGeo = new THREE.SphereGeometry(0.88, 36, 36);
      const oxyMat = new THREE.MeshPhysicalMaterial({
        color: 0xdc2626,
        roughness: 0.2,
        clearcoat: 0.8,
        emissive: 0x7f1d1d,
        emissiveIntensity: 0.2
      });
      const oxyMesh = new THREE.Mesh(oxyGeo, oxyMat);
      oxyMesh.position.set(0, 0.35, 0);
      oxyMesh.userData = { partId: 'kislorod' };
      rootGroup.add(oxyMesh);
      clickables.push(oxyMesh);

      [-1, 1].forEach((dir) => {
        const hx = Math.sin(angleRad / 2) * bondLen * dir;
        const hy = 0.35 - Math.cos(angleRad / 2) * bondLen;

        const hydGeo = new THREE.SphereGeometry(0.52, 32, 32);
        const hydMat = new THREE.MeshPhysicalMaterial({
          color: 0xf1f5f9,
          roughness: 0.22,
          clearcoat: 0.7
        });
        const hydMesh = new THREE.Mesh(hydGeo, hydMat);
        hydMesh.position.set(hx, hy, 0);
        hydMesh.userData = { partId: 'vodorod' };
        rootGroup.add(hydMesh);
        clickables.push(hydMesh);

        const start = new THREE.Vector3(0, 0.35, 0);
        const end = new THREE.Vector3(hx, hy, 0);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const bondGeo = new THREE.CylinderGeometry(0.14, 0.14, bondLen * 0.82, 20);
        const bondMat = new THREE.MeshStandardMaterial({
          color: 0x0d9488,
          roughness: 0.25,
          emissive: 0x0f766e,
          emissiveIntensity: 0.25
        });
        const bondMesh = new THREE.Mesh(bondGeo, bondMat);
        bondMesh.position.copy(mid);
        bondMesh.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          end.clone().sub(start).normalize()
        );
        bondMesh.userData = { partId: 'kovalent' };
        rootGroup.add(bondMesh);
        clickables.push(bondMesh);
      });

      const auraGeo = new THREE.SphereGeometry(2.25, 32, 32);
      const auraMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.08,
        wireframe: true
      });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      aura.userData = { partId: 'h2o' };
      rootGroup.add(aura);
    } else if (subjectKey === 'physics') {
      // Rutherford-Bohr Atom Model
      const nucleusCluster = new THREE.Group();
      [
        [0, 0, 0, 0xea580c],
        [0.24, 0.18, 0.12, 0x7c3aed],
        [-0.22, 0.2, -0.14, 0xea580c],
        [0.15, -0.24, 0.18, 0x7c3aed],
        [-0.18, -0.18, 0.22, 0xea580c],
        [0.05, 0.12, -0.26, 0x7c3aed]
      ].forEach(([nx, ny, nz, col]) => {
        const nGeo = new THREE.SphereGeometry(0.28, 24, 24);
        const nMat = new THREE.MeshStandardMaterial({
          color: col,
          roughness: 0.25,
          emissive: col,
          emissiveIntensity: 0.25
        });
        const nMesh = new THREE.Mesh(nGeo, nMat);
        nMesh.position.set(nx, ny, nz);
        nMesh.userData = {
          partId: col === 0xea580c ? 'atom_yadrosi' : 'nuklonlar'
        };
        nucleusCluster.add(nMesh);
        clickables.push(nMesh);
      });
      rootGroup.add(nucleusCluster);

      [
        [0.45, 0.2, 0],
        [-0.55, 0.4, 0.7],
        [0.1, -0.6, -0.65]
      ].forEach(([rx, ry, rz], idx) => {
        const orbitPivot = new THREE.Group();
        orbitPivot.rotation.set(rx, ry, rz);

        const torusGeo = new THREE.TorusGeometry(2.05, 0.022, 12, 64);
        const torusMat = new THREE.MeshBasicMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.45
        });
        orbitPivot.add(new THREE.Mesh(torusGeo, torusMat));

        const elGeo = new THREE.SphereGeometry(0.16, 20, 20);
        const elMat = new THREE.MeshStandardMaterial({
          color: 0x2563eb,
          emissive: 0x60a5fa,
          emissiveIntensity: 0.65
        });
        const elMesh = new THREE.Mesh(elGeo, elMat);
        elMesh.userData = { partId: 'elektronlar' };
        orbitPivot.add(elMesh);
        clickables.push(elMesh);

        rootGroup.add(orbitPivot);
        animatedObjects.push({
          electron: elMesh,
          radius: 2.05,
          speed: 1.6 + idx * 0.35,
          phase: idx * 2.1
        });
      });
    }

    clickableMeshesRef.current = clickables;

    // Pointer Drag & Direct 3D Raycast Click
    let isDragging = false;
    let pointerDownPos = { x: 0, y: 0 };
    let prevPointer = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();

    const onPointerDown = (e) => {
      isDragging = true;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      pointerDownPos = { x: cx, y: cy };
      prevPointer = { x: cx, y: cy };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      rootGroup.rotation.y += (cx - prevPointer.x) * 0.01;
      rootGroup.rotation.x += (cy - prevPointer.y) * 0.01;
      prevPointer = { x: cx, y: cy };
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      const cx = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const cy = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
      if (Math.hypot(cx - pointerDownPos.x, cy - pointerDownPos.y) < 6) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointerNDC.x = ((cx - rect.left) / rect.width) * 2 - 1;
        pointerNDC.y = -((cy - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNDC, camera);
        const hits = raycaster.intersectObjects(clickableMeshesRef.current, false);
        if (hits.length > 0 && hits[0].object.userData.partId) {
          setSelectedPartId(hits[0].object.userData.partId);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (autoRotateRef.current && !isDragging) {
        rootGroup.rotation.y += 0.0045;
      }

      const targetZ = 6.2 / zoomRef.current;
      camera.position.z += (targetZ - camera.position.z) * 0.1;

      animatedObjects.forEach((item) => {
        if (item.electron) {
          const a = elapsed * item.speed + item.phase;
          item.electron.position.set(
            Math.cos(a) * item.radius,
            Math.sin(a) * item.radius,
            0
          );
        } else if (item.mesh) {
          item.mesh.position.y += Math.sin(elapsed * item.speed + item.offset) * 0.0012;
        }
      });

      const activeId = selectedPartRef.current;
      clickableMeshesRef.current.forEach((mesh) => {
        const isMatch = mesh.userData.partId === activeId;
        const targetScale = isMatch ? 1.15 + Math.sin(elapsed * 4) * 0.04 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
        if (mesh.material && mesh.material.emissiveIntensity !== undefined) {
          mesh.material.emissiveIntensity = isMatch ? 0.55 : 0.2;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [subjectKey, screen]);

  const handleResetView = () => {
    setZoomLevel(1);
    if (rootGroupRef.current) {
      rootGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const correctCount = subject.tests.reduce(
    (acc, t, idx) => (testAnswers[idx] === t.correct ? acc + 1 : acc),
    0
  );

  // SHARED TOP NAVIGATION BAR (Appears on both Home Dashboard & Workspace)
  const renderTopNavbar = () => (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
      <div className="max-w-[1460px] mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Glowing BioChem AI Logo + Home Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-800 bg-clip-text text-transparent">
                  BioChem AI
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Visual AI Tutor
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                3D Interaktiv Ta’lim & Shaxsiy AI Ustoz
              </p>
            </div>
          </button>

          {screen === 'workspace' && (
            <button
              onClick={() => setScreen('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Bosh sahifa</span>
            </button>
          )}
        </div>

        {/* Center: Quick Subject Switcher */}
        <nav className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          {Object.values(CURRICULUM).map((subj) => {
            const Icon = subj.icon;
            const active = screen === 'workspace' && subjectKey === subj.id;
            return (
              <button
                key={subj.id}
                onClick={() => enterSubjectWorkspace(subj.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{subj.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Free vs Premium Switcher + Profile ("Yuldasheva Nurhayot") */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setPlan('free')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                plan === 'free'
                  ? 'bg-white text-slate-800 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Free (Tekin)
            </button>
            <button
              onClick={() => setPlan('premium')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                plan === 'premium'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Premium • 60 000 so‘m/oy</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              YN
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-slate-900">Yuldasheva Nurhayot</p>
              <p className="text-[10px] text-emerald-600 font-semibold">
                {plan === 'premium' ? 'Premium Obunachi' : 'Tekin Tarif'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // =========================================================================
  // SCREEN 1: STUNNING GLASSMORPHIC HOME / DASHBOARD ENTRY SCREEN
  // =========================================================================
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-emerald-50/40 text-slate-800 flex flex-col font-sans relative overflow-x-hidden">
        {/* Decorative Ambient Glows */}
        <div className="pointer-events-none fixed -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="pointer-events-none fixed top-1/3 -right-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl" />

        {renderTopNavbar()}

        <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 py-7 sm:py-10 space-y-8 relative z-10">
          {/* Welcome Hero Banner */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-lg shadow-slate-200/50 p-6 sm:p-9 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sun’iy Intellekt + 3D Vizual Laboratoriya</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Xush kelibsiz, Nurhayot! 👋 <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  Bugun qaysi fanni kashf qilamiz?
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Keraksiz gaplarsiz oq konspekt sahifalar, matn ichidagi ko‘k 3D havola-so‘zlar va
                siz turgan sahifa kontekstini soniyada tushunuvchi shaxsiy AI-ustozingiz tayyor!
              </p>
            </div>

            {/* Quick Start Action Card */}
            <div className="w-full lg:w-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl shrink-0 lg:min-w-[330px]">
              <div className="flex items-center justify-between text-xs text-blue-200 mb-2">
                <span>Davom ettirish • {subject.pageNumber}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  3D Tayyor
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{subject.title}</h3>
              <p className="text-xs text-slate-300 mt-1 font-mono">{subject.url}</p>
              <button
                onClick={() => enterSubjectWorkspace(subjectKey, 'textbook')}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Darsni 3D formatda ochish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Vibrant Subject Hero Cards: Biologiya, Kimyo, Fizika */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Asosiy STEM Fanlari (0 dan boshlab)
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Kirish uchun fan kartasini bosing
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {Object.values(CURRICULUM).map((subj) => {
                const Icon = subj.icon;
                return (
                  <div
                    key={subj.id}
                    onClick={() => enterSubjectWorkspace(subj.id, 'textbook')}
                    className="group bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 hover:border-blue-400 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subj.accentGradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${subj.badgeBg}`}
                        >
                          {subj.topicsCount}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-900 mt-5 group-hover:text-blue-600 transition-colors">
                        {subj.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {subj.subtitle}
                      </p>

                      {/* Sample interactive 3D terms preview */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {Object.values(subj.parts)
                          .slice(0, 3)
                          .map((p) => (
                            <span
                              key={p.id}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                            >
                              3D: {p.nameUz.split(' ')[0]}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">O‘zlashtirish ko‘rsatkichi</span>
                        <span className="font-extrabold text-slate-800">{subj.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${subj.accentGradient}`}
                          style={{ width: `${subj.progress}%` }}
                        />
                      </div>
                      <div className="pt-1 flex items-center justify-between text-xs font-bold text-blue-600">
                        <span>Oq sahifa + 3D Labga kirish</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Two Quick-Access Comparison Cards: Free vs Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Free Tier Card */}
            <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold">
                    BARCHA UCHUN TEKIN (FREE)
                  </span>
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mt-3">
                  Bepul Darsliklar, Mavzulashtirilgan Testlar va 5 ta 3D Element
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Biologiya, Kimyo va Fizika fanlaridan barcha darslik manbalari, mavzulardan
                  keyingi testlar, 5 ta asosiy elementning 3D vizual ko‘rinishi va standart AI
                  chat mutlaqo bepul.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  onClick={() => {
                    setPlan('free');
                    enterSubjectWorkspace('biology', 'test');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Tekin rejimda sinab ko‘rish
                </button>
              </div>
            </div>

            {/* Premium Tier Card */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white rounded-3xl p-6 flex flex-col justify-between shadow-lg shadow-indigo-500/20">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-extrabold inline-flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    PREMIUM • 60 000 SO‘M/OY
                  </span>
                  <Zap className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="text-lg font-extrabold text-white mt-3">
                  0 dan Muvaffaqiyatgacha: To‘liq 3D Modellar + Ovozli Page-Context AI Ustoz
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-1.5 leading-relaxed">
                  Keraksiz gaplarsiz oq sahifalar, matndagi barcha ko‘k 3D organoidlar, har bir
                  sahifa manzilini soniyada tahlil qiluvchi ovozli AI-ustoz hamda Milliy
                  sertifikat / OTM / Olimpiada sirlari!
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  onClick={() => {
                    setPlan('premium');
                    enterSubjectWorkspace('biology', 'textbook');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-sm transition-colors cursor-pointer"
                >
                  Premium 3D Platformani ochish →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================================
  // SCREEN 2: INTERACTIVE STUDY WORKSPACE (WHITE PAGE + 3D + PAGE-CONTEXT AI)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {renderTopNavbar()}

      {/* PROMINENT TOP ADDRESS & "ASK AI (SAHIFA KONTEKSTI + OVOZLI SAVOL)" BAR */}
      <div className="bg-gradient-to-r from-indigo-950 via-blue-950 to-slate-900 text-white border-b border-indigo-800/60">
        <div className="max-w-[1460px] mx-auto px-3 sm:px-6 py-2.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
          {/* Unique Page URL Address Pill */}
          <div className="flex items-center justify-between lg:justify-start gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs text-blue-100 truncate">
                {subject.url}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                AI sahifani ko‘rmoqda
              </span>
              <button
                onClick={handleCopyUrl}
                title="Sahifa manzilini nusxalash"
                className="p-1 rounded-md hover:bg-white/15 text-blue-200 cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Prominent Top "Ask AI" Voice & Quick Question Bar */}
          <div className="flex-1 flex items-center gap-2 max-w-2xl">
            <button
              onClick={toggleVoiceQuestion}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/40'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
              }`}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isListening ? 'Eshitmoqdaman...' : 'Ovozli Ask AI'}</span>
            </button>

            <div className="flex-1 flex items-center bg-white/10 border border-white/20 rounded-xl px-3 py-1 focus-within:border-amber-400 focus-within:bg-white/15 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 mr-2 shrink-0" />
              <input
                type="text"
                value={topAskInput}
                onChange={(e) => setTopAskInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && triggerAskAI(topAskInput)}
                placeholder={`Ask AI (${subject.pageNumber}): Shu sahifadagi jumla yoki atama ma'nosini so‘rang...`}
                className="w-full bg-transparent text-xs text-white placeholder-blue-200/75 focus:outline-none py-1"
              />
              <button
                onClick={() => triggerAskAI(topAskInput)}
                className="ml-1.5 px-2.5 py-1 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-[11px] font-bold shrink-0 cursor-pointer"
              >
                So‘rash
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE: LEFT CRISP WHITE PAPER PAGE + RIGHT 3D VIEWPORT & AI TUTOR */}
      <main className="flex-1 max-w-[1460px] w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT PANEL: CRISP WHITE BOOK-LIKE PAGE ("Varaqqa o'xshash oq sahifa") */}
        <section className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex flex-col overflow-hidden">
          {/* Top Paper Tabs: Konspekt (0 dan) vs Mavzulashtirilgan Test (Tekin) */}
          <div className="px-4 sm:px-6 py-3 border-b border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>{subject.chapter}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                {subject.pageNumber}
              </span>
            </div>

            <div className="flex items-center bg-slate-200/75 p-0.5 rounded-xl text-xs">
              <button
                onClick={() => setLeftTab('textbook')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  leftTab === 'textbook'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Konspekt (0 dan)
              </button>
              <button
                onClick={() => setLeftTab('test')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  leftTab === 'test'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mavzulashtirilgan Test (Tekin)
              </button>
            </div>
          </div>

          {leftTab === 'textbook' ? (
            /* ZERO-FLUFF WHITE PAPER PAGE */
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-5 bg-white">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/70">
                    Oldi-qochdi gaplarsiz • 0 dan aniq bilimlar
                  </span>
                  <span className="text-[11px] text-blue-600 font-bold">
                    Ko‘k so‘zga bosing → 3D model ochiladi
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2.5">
                  {subject.title}
                </h1>
              </div>

              <div className="space-y-4">
                {subject.paragraphs.map((para) => {
                  const isFocusedPara = activeParagraphLabel === para.label;
                  return (
                    <div
                      key={para.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isFocusedPara
                          ? 'bg-blue-50/40 border-blue-200 shadow-2xs'
                          : 'bg-white border-slate-100 hover:border-blue-100 hover:bg-slate-50/40'
                      }`}
                    >
                      <p className="text-[15.5px] leading-7 text-slate-800">
                        {para.segments.map((seg, idx) =>
                          seg.termId ? (
                            <button
                              key={idx}
                              onClick={() =>
                                handleBlueTermClick(
                                  seg.termId,
                                  para.sentenceContext,
                                  para.label
                                )
                              }
                              className={`font-bold underline decoration-2 underline-offset-4 px-1.5 py-0.5 rounded-lg transition-all cursor-pointer ${
                                selectedPartId === seg.termId
                                  ? 'bg-blue-600 text-white shadow-sm'
                                  : 'text-blue-600 hover:bg-blue-100/80'
                              }`}
                            >
                              {seg.label}
                            </button>
                          ) : (
                            <span key={idx}>{seg.text}</span>
                          )
                        )}
                      </p>

                      {/* Sentence-Specific Ask AI Button */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100/80 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-400 font-semibold">
                          {subject.pageNumber} • {para.label}
                        </span>
                        <button
                          onClick={() =>
                            triggerAskAI(
                              `Ustoz, ${subject.pageNumber} (${para.label}) dagi aynan shu jumla ma'nosini tushuntirib bering.`,
                              para.sentenceContext,
                              para.label
                            )
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Ask AI: Shu jumlani tushuntir</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Page Footer & Quick Quiz Link */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 mr-1 font-medium">Sahifalar:</span>
                  {['01', '02', '03', '04', '05'].map((p) => {
                    const isCurrent = subject.pageNumber.startsWith(p);
                    return (
                      <span
                        key={p}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {p}
                      </span>
                    );
                  })}
                </div>

                <button
                  onClick={() => setLeftTab('test')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mavzu testini yechish (Tekin)</span>
                </button>
              </div>
            </div>
          ) : (
            /* FREE TOPIC TEST VIEW */
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-5 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    Barcha foydalanuvchilar uchun TEKIN
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900 mt-1.5">
                    {subject.title} — Mavzulashtirilgan test
                  </h2>
                </div>
                {testSubmitted && (
                  <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-extrabold text-xs border border-blue-200">
                    Natija: {correctCount} / {subject.tests.length}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {subject.tests.map((item, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2.5"
                  >
                    <p className="text-sm font-bold text-slate-900">{item.q}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.options.map((opt, oIdx) => {
                        const chosen = testAnswers[qIdx] === oIdx;
                        const isRight = item.correct === oIdx;
                        let style =
                          'bg-white border-slate-200 text-slate-700 hover:border-blue-400';
                        if (testSubmitted) {
                          if (isRight)
                            style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                          else if (chosen)
                            style = 'bg-rose-50 border-rose-500 text-rose-900';
                        } else if (chosen) {
                          style = 'bg-blue-50 border-blue-600 text-blue-900 font-semibold';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() =>
                              !testSubmitted &&
                              setTestAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))
                            }
                            className={`text-left px-3.5 py-2.5 rounded-xl border text-xs transition-all cursor-pointer ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setTestAnswers({});
                    setTestSubmitted(false);
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Qaytadan boshlash
                </button>
                <button
                  onClick={() => setTestSubmitted(true)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Natijani tekshirish
                </button>
              </div>
            </div>
          )}
        </section>

        {/* RIGHT PANEL: REALISTIC 3D VIEWPORT + ORGANELLE INFO BOX + PAGE-CONTEXT AI */}
        <section className="lg:col-span-6 flex flex-col gap-4">
          {/* TOP RIGHT: INTERACTIVE 3D MODEL + DEFINITION DIRECTLY BELOW IT */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-extrabold text-slate-900">
                  3D Vizual Model: {currentPart.nameUz}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setAutoRotate((r) => !r)}
                  title="Avto-aylanish"
                  className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                    autoRotate
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.45, z + 0.15))}
                  title="Yaqinlashtirish"
                  className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                  title="Uzoqlashtirish"
                  className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetView}
                  title="Asl holatiga qaytarish"
                  className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Three.js WebGL 3D Canvas */}
            <div className="relative h-[245px] sm:h-[260px] w-full bg-gradient-to-b from-slate-50 via-blue-50/40 to-indigo-50/70 select-none">
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              <div className="absolute top-2.5 left-3 bg-white/90 backdrop-blur-xs border border-slate-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-600 pointer-events-none">
                3D modelni aylantiring yoki organoid ustiga bosing
              </div>

              {/* Organelle / Part Hotspots */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap justify-center gap-1.5">
                {Object.values(subject.parts).map((part) => {
                  const locked = plan === 'free' && !part.freeAvailable;
                  const active = selectedPartId === part.id;
                  return (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPartId(part.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-2xs cursor-pointer ${
                        active
                          ? 'bg-blue-600 text-white scale-105'
                          : 'bg-white/95 text-slate-700 hover:bg-blue-50 border border-slate-200'
                      }`}
                    >
                      {locked && <Lock className="w-2.5 h-2.5 text-amber-500" />}
                      <span>{part.nameUz.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Free Tier Lock Overlay for Premium 3D Organelles */}
              {isLockedInFree && (
                <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center text-white">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mb-2">
                    <Lock className="w-5 h-5 text-amber-300" />
                  </div>
                  <p className="text-sm font-bold">
                    «{currentPart.nameUz}» 3D modeli Premium obunada ochiladi
                  </p>
                  <p className="text-xs text-slate-200 max-w-xs mt-1">
                    Tekin tarifda faqat 5 ta asosiy element ko‘rinadi. Barcha organoidlar va 3D
                    modellarni ochish uchun Premiumga o‘ting.
                  </p>
                  <button
                    onClick={() => setPlan('premium')}
                    className="mt-3 px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm cursor-pointer"
                  >
                    Premiumni yoqish (60 000 so‘m/oy)
                  </button>
                </div>
              )}
            </div>

            {/* DEFINITION CARD DIRECTLY BELOW THE 3D MODEL */}
            <div className="p-4 bg-slate-50/90 border-t border-slate-200/80">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-extrabold text-slate-900">{currentPart.nameUz}</h3>
                <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {currentPart.nameEn}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-700 mt-1.5 leading-relaxed">
                {currentPart.shortDesc}
              </p>

              {/* Milliy Sertifikat / OTM / Olimpiada Siri */}
              {plan === 'premium' ? (
                <div className="mt-2.5 p-2.5 rounded-xl bg-indigo-50 border border-indigo-200/90 flex items-start gap-2">
                  <Award className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-indigo-950 font-semibold leading-snug">
                    {currentPart.olympiadNote}
                  </p>
                </div>
              ) : (
                <div className="mt-2.5 p-2.5 rounded-xl bg-slate-200/70 border border-slate-300/80 flex items-center justify-between text-xs text-slate-700">
                  <span className="font-medium">
                    🔒 Milliy sertifikat / OTM va Olimpiada sirlari yopiq
                  </span>
                  <button
                    onClick={() => setPlan('premium')}
                    className="text-blue-600 font-extrabold hover:underline cursor-pointer"
                  >
                    Ochish
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM RIGHT: PAGE-CONTEXT AI TUTOR ("AI Ustoz") */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/60 flex flex-col flex-1 overflow-hidden">
            <div className="px-4 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span className="text-xs font-extrabold">
                  AI Ustoz — Sahifa kontekstini tushunuvchi yordamchi
                </span>
              </div>
              <span className="text-[10px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
                Kontekst: {subject.name} • {subject.pageNumber}
              </span>
            </div>

            <div className="px-3.5 py-2 bg-indigo-50/80 border-b border-indigo-100 text-[11px] text-indigo-950 truncate">
              <span className="font-bold">Faol jumla ({activeParagraphLabel}):</span> «
              {activeSentence}»
            </div>

            <div className="p-3.5 space-y-2.5 max-h-[165px] overflow-y-auto flex-1 bg-slate-50/40">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  {msg.badge && (
                    <span className="text-[10px] font-bold text-indigo-600 mb-0.5 px-1">
                      {msg.badge}
                    </span>
                  )}
                  <div
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-3 py-1.5 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto bg-white">
              <button
                onClick={() =>
                  triggerAskAI('Shu sahifadagi bu atamani sodda qilib tushuntirib bering')
                }
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold transition-colors cursor-pointer"
              >
                Bu atamani sodda tushuntir
              </button>
              <button
                onClick={() =>
                  triggerAskAI('Milliy sertifikat va OTM da shu sahifadan qanday savol tushadi?')
                }
                className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold transition-colors cursor-pointer"
              >
                Milliy sertifikat / OTM siri
              </button>
            </div>

            <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <button
                onClick={toggleVoiceQuestion}
                title="Ovoz orqali savol berish"
                className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && triggerAskAI()}
                placeholder={
                  isListening
                    ? 'Tinglayapman... Savolingizni ovozda ayting...'
                    : 'Shu sahifadagi so‘z yoki jumla haqida so‘rang...'
                }
                className="flex-1 text-xs bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />

              <button
                onClick={() => triggerAskAI()}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-2xs transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}