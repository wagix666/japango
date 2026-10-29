const STORAGE_KEY = 'japango-progress-v1';
const THEME_KEY = 'japango-theme';

// SVG Icons for clean, crisp UI rendering
const ICONS = {
  home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  learn: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10"></path><path d="M6 10h10"></path></svg>`,
  practice: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>`,
  dictionary: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>`,
  travel: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
  translate: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>`,
  speaker: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`
};

const kana = [
  ['あ', 'a', 'අ', 'ah'], ['い', 'i', 'ඉ', 'ee'], ['う', 'u', 'උ', 'oo'], ['え', 'e', 'එ', 'eh'], ['お', 'o', 'ඔ', 'oh'],
  ['か', 'ka', 'ක', 'kah'], ['き', 'ki', 'කි', 'kee'], ['く', 'ku', 'කු', 'koo'], ['け', 'ke', 'කෙ', 'keh'], ['こ', 'ko', 'කො', 'koh'],
  ['さ', 'sa', 'ස', 'sah'], ['し', 'shi', 'ශි', 'shee'], ['す', 'su', 'සු', 'soo'], ['せ', 'se', 'සෙ', 'seh'], ['そ', 'so', 'සො', 'soh'],
  ['た', 'ta', 'ත', 'tah'], ['ち', 'chi', 'චි', 'chee'], ['つ', 'tsu', 'ත්සු', 'tsoo'], ['て', 'te', 'තෙ', 'teh'], ['と', 'to', 'තො', 'toh'],
  ['な', 'na', 'න', 'nah'], ['に', 'ni', 'නි', 'nee'], ['ぬ', 'nu', 'නු', 'noo'], ['ね', 'ne', 'නෙ', 'neh'], ['の', 'no', 'නො', 'noh'],
  ['は', 'ha', 'හ', 'hah'], ['ひ', 'hi', 'හි', 'hee'], ['ふ', 'fu', 'ෆු', 'foo'], ['へ', 'he', 'හෙ', 'heh'], ['ほ', 'ho', 'හො', 'hoh'],
  ['ま', 'ma', 'ම', 'mah'], ['み', 'mi', 'මි', 'mee'], ['む', 'mu', 'මු', 'moo'], ['め', 'me', 'මෙ', 'meh'], ['も', 'mo', 'මො', 'moh'],
  ['や', 'ya', 'ය', 'yah'], ['ゆ', 'yu', 'යු', 'yoo'], ['よ', 'yo', 'යො', 'yoh'],
  ['ら', 'ra', 'ර', 'rah'], ['り', 'ri', 'රි', 'ree'], ['る', 'ru', 'රු', 'roo'], ['れ', 're', 'රෙ', 'reh'], ['ろ', 'ro', 'රො', 'roh'],
  ['わ', 'wa', 'ව', 'wah'], ['を', 'wo', 'ඔ (particle)', 'oh (particle)'], ['ん', 'n', 'න්', 'n']
].map(([char, romaji, sinhala, english]) => ({ char, romaji, sinhala, english }));

const kanaSets = {
  voiced: [
    ['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'],
    ['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'],
    ['だ', 'da'], ['ぢ', 'ji (rare)'], ['づ', 'zu (rare)'], ['で', 'de'], ['ど', 'do'],
    ['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo'],
    ['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']
  ],
  contracted: [
    ['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo'], ['しゃ', 'sha'], ['しゅ', 'shu'], ['しょ', 'sho'],
    ['ちゃ', 'cha'], ['ちゅ', 'chu'], ['ちょ', 'cho'], ['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo'],
    ['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo'], ['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo'],
    ['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo'], ['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo'],
    ['じゃ', 'ja'], ['じゅ', 'ju'], ['じょ', 'jo'], ['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo'],
    ['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo']
  ],
  small: [
    ['ぁ', 'small a'], ['ぃ', 'small i'], ['ぅ', 'small u'], ['ぇ', 'small e'], ['ぉ', 'small o'],
    ['ゃ', 'small ya'], ['ゅ', 'small yu'], ['ょ', 'small yo'], ['っ', 'small tsu'], ['ゎ', 'small wa']
  ],
  foreign: [
    ['ふぁ', 'fa'], ['ふぃ', 'fi'], ['ふぇ', 'fe'], ['ふぉ', 'fo'],
    ['うぃ', 'wi'], ['うぇ', 'we'], ['うぉ', 'wo'],
    ['てぃ', 'ti'], ['とゥ', 'tu'], ['でぃ', 'di'], ['どぅ', 'du'],
    ['ちぇ', 'che'], ['しぇ', 'she'], ['じぇ', 'je'],
    ['つぁ', 'tsa'], ['つぃ', 'tsi'], ['つぇ', 'tse'], ['つぉ', 'tso'],
    ['ゔぁ', 'va'], ['ゔぃ', 'vi'], ['ゔ', 'vu'], ['ゔぇ', 've'], ['ゔぉ', 'vo'],
    ['くぁ', 'kwa'], ['くぃ', 'kwi'], ['くぇ', 'kwe'], ['くぉ', 'kwo']
  ],
  marks: [
    ['゛', 'dakuten: voices k/s/t/h rows'], ['゜', 'handakuten: changes h to p'],
    ['か → が', 'ka → ga'], ['さ → ざ', 'sa → za'], ['た → だ', 'ta → da'], ['は → ば', 'ha → ba'], ['は → ぱ', 'ha → pa']
  ]
};

const learnUnits = [
  { id: 'vowels', en: '1. Vowel sounds', si: '1. ස්වර ශබ්ද', enNote: 'Start with the five pure vowel sounds. Read from left to right, then listen and repeat.', siNote: 'පිරිසිදු ස්වර ශබ්ද පහෙන් පටන් ගන්න. වමේ සිට දකුණට කියවා, පසුව අසා නැවත කියන්න.', chars: ['あ', 'い', 'う', 'え', 'お'] },
  { id: 'k-row', en: '2. K row', si: '2. K පේළිය', enNote: 'Add a light k sound before each vowel: ka, ki, ku, ke, ko.', siNote: 'සෑම ස්වරයකටම පෙර සැහැල්ලු “k” ශබ්දයක් එක් කරන්න: ka, ki, ku, ke, ko.', chars: ['か', 'き', 'く', 'け', 'こ'] },
  { id: 's-row', en: '3. S row', si: '3. S පේළිය', enNote: 'Most sounds use s + vowel. し is read shi, not si.', siNote: 'බොහෝ ශබ්ද s + ස්වරය ලෙසයි. し කියවන්නේ “shi” ලෙසයි, “si” නොවේ.', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
  { id: 't-row', en: '4. T row', si: '4. T පේළිය', enNote: 'Notice the special readings ち (chi) and つ (tsu).', siNote: 'විශේෂ කියවීම් දෙකක් මතක තබාගන්න: ち (chi) සහ つ (tsu).', chars: ['た', 'ち', 'つ', 'て', 'と'] },
  { id: 'n-row', en: '5. N row', si: '5. N පේළිය', enNote: 'These sounds are made with n + vowel. Say each vowel clearly.', siNote: 'මෙම ශබ්ද n + ස්වරය එක් කිරීමෙන් සෑදේ. එක් එක් ස්වරය පැහැදිලිව කියන්න.', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { id: 'h-row', en: '6. H row', si: '6. H පේළිය', enNote: 'ふ is commonly written fu in romaji; its Japanese sound is softer than English “foo”.', siNote: 'ふ සාමාන්‍යයෙන් romaji වල fu ලෙස ලියයි; එහි ජපන් ශබ්දය English “foo” ට වඩා මෘදුයි.', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { id: 'm-row', en: '7. M row', si: '7. M පේළිය', enNote: 'Practice the m sounds with each vowel.', siNote: 'සෑම ස්වරයක් සමඟම m ශබ්ද පුහුණු කරන්න.', chars: ['ま', 'み', 'む', 'め', 'も'] },
  { id: 'y-row', en: '8. Y row', si: '8. Y පේළිය', enNote: 'The basic Y row has three characters. The other vowel positions are not used in modern basic kana.', siNote: 'මූලික Y පේළියේ අකුරු තුනයි. අනෙක් ස්වර ස්ථාන නූතන මූලික kana වල භාවිතා නොවේ.', chars: ['や', 'ゆ', 'よ'] },
  { id: 'r-row', en: '9. R row', si: '9. R පේළිය', enNote: 'Japanese r is a light tap, between English r and l for many learners.', siNote: 'ජපන් r ශබ්දය සැහැල්ලු දිව තට්ටුවක්; බොහෝ දෙනාට English r සහ l අතර ශබ්දයක් වගේ ඇසේ.', chars: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { id: 'w-n-row', en: '10. W row and ん', si: '10. W පේළිය සහ ん', enNote: 'を is mainly used as the object particle and is usually pronounced o. ん is the standalone nasal sound.', siNote: 'を ප්‍රධාන වශයෙන් object particle එක ලෙස භාවිතා කර සාමාන්‍යයෙන් “o” ලෙස කියවයි. ん තනි නාසික ශබ්දයයි.', chars: ['わ', 'を', 'ん'] },
  { id: 'voiced', en: '11. Dakuten sounds', si: '11. Dakuten ශබ්ද', enNote: 'Two small marks ゛ voice some consonants: か becomes が, さ becomes ざ, and は becomes ば.', siNote: 'කුඩා ゛ ලකුණු දෙකක් සමහර ව්‍යංජනවල හඬ වෙනස් කරයි: か → が, さ → ざ, は → ば.', chars: ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ'] },
  { id: 'p-sounds', en: '12. Handakuten sounds', si: '12. Handakuten ශබ්ද', enNote: 'The small circle ゜ changes the H row to P sounds: は becomes ぱ.', siNote: 'කුඩා රවුම් ゜ ලකුණ H පේළිය P ශබ්ද බවට වෙනස් කරයි: は → ぱ.', chars: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },
  { id: 'combinations', en: '13. Combined sounds', si: '13. සංයුක්ත ශබ්ද', enNote: 'A character ending in i can combine with small ゃ, ゅ, or ょ: き + ゃ = きゃ (kya).', siNote: 'i ශබ්දයෙන් අවසන් වන අකුරකට කුඩා ゃ, ゅ, ょ එක් කළ හැක: き + ゃ = きゃ (kya).', chars: ['きゃ', 'きゅ', 'きょ', 'しゃ', 'しゅ', 'しょ', 'ちゃ', 'ちゅ', 'ちょ'] }
];

function toKatakana(text) {
  return [...text].map((character) => {
    const code = character.codePointAt(0);
    return code >= 0x3041 && code <= 0x3096 ? String.fromCodePoint(code + 0x60) : character;
  }).join('');
}

const words = [
  { jp: 'こんにちは', reading: 'こんにちは', romaji: 'konnichiwa', si: 'ආයුබෝවන් / සුබ දවසක්', en: 'Hello / good afternoon', topic: 'Greetings' },
  { jp: 'ありがとう', reading: 'ありがとう', romaji: 'arigatou', si: 'ස්තුතියි', en: 'Thank you', topic: 'Greetings' },
  { jp: 'すみません', reading: 'すみません', romaji: 'sumimasen', si: 'සමාවෙන්න / Excuse me', en: 'Excuse me / I am sorry', topic: 'Greetings' },
  { jp: '水', reading: 'みず', romaji: 'mizu', si: 'වතුර', en: 'Water', topic: 'Food' },
  { jp: '駅', reading: 'えき', romaji: 'eki', si: 'දුම්රිය ස්ථානය', en: 'Train station', topic: 'Transport' },
  { jp: '電車', reading: 'でんしゃ', romaji: 'densha', si: 'දුම්රිය', en: 'Train', topic: 'Transport' },
  { jp: 'トイレ', reading: 'といれ', romaji: 'toire', si: 'වැසිකිළිය', en: 'Restroom', topic: 'Travel' },
  { jp: '病院', reading: 'びょういん', romaji: 'byouin', si: 'රෝහල', en: 'Hospital', topic: 'Health' },
  { jp: 'いくら', reading: 'いくら', romaji: 'ikura', si: 'කීයද?', en: 'How much?', topic: 'Shopping' },
  { jp: 'お願いします', reading: 'おねがいします', romaji: 'onegaishimasu', si: 'කරුණාකර', en: 'Please', topic: 'Greetings' },
  { jp: 'おはようございます', reading: 'おはようございます', romaji: 'ohayou gozaimasu', si: 'සුභ උදෑසනක්', en: 'Good morning (polite)', topic: 'Greetings' },
  { jp: 'こんばんは', reading: 'こんばんは', romaji: 'konbanwa', si: 'සුභ සන්ධ්‍යාවක්', en: 'Good evening', topic: 'Greetings' },
  { jp: 'さようなら', reading: 'さようなら', romaji: 'sayounara', si: 'ගිහින් එන්නම් / සමුගැනීමක්', en: 'Goodbye', topic: 'Greetings' },
  { jp: 'はい', reading: 'はい', romaji: 'hai', si: 'ඔව්', en: 'Yes', topic: 'Greetings' },
  { jp: 'いいえ', reading: 'いいえ', romaji: 'iie', si: 'නැහැ', en: 'No', topic: 'Greetings' },
  { jp: '人', reading: 'ひと', romaji: 'hito', si: 'පුද්ගලයා / මිනිසා', en: 'Person', topic: 'People' },
  { jp: '友達', reading: 'ともだち', romaji: 'tomodachi', si: 'මිතුරා / මිතුරිය', en: 'Friend', topic: 'People' },
  { jp: '家族', reading: 'かぞく', romaji: 'kazoku', si: 'පවුල', en: 'Family', topic: 'People' },
  { jp: 'ご飯', reading: 'ごはん', romaji: 'gohan', si: 'බත් / ආහාර වේල', en: 'Rice / meal', topic: 'Food' },
  { jp: 'お茶', reading: 'おちゃ', romaji: 'ocha', si: 'තේ', en: 'Tea', topic: 'Food' },
  { jp: '食べる', reading: 'たべる', romaji: 'taberu', si: 'කනවා', en: 'To eat', topic: 'Food' },
  { jp: '今日', reading: 'きょう', romaji: 'kyou', si: 'අද', en: 'Today', topic: 'Time' },
  { jp: '明日', reading: 'あした', romaji: 'ashita', si: 'හෙට', en: 'Tomorrow', topic: 'Time' },
  { jp: '今', reading: 'いま', romaji: 'ima', si: 'දැන්', en: 'Now', topic: 'Time' },
  { jp: '学校', reading: 'がっこう', romaji: 'gakkou', si: 'පාසල', en: 'School', topic: 'School' },
  { jp: '先生', reading: 'せんせい', romaji: 'sensei', si: 'ගුරුවරයා / ගුරුවරිය', en: 'Teacher', topic: 'School' },
  { jp: '仕事', reading: 'しごと', romaji: 'shigoto', si: 'රැකියාව / වැඩ', en: 'Work / job', topic: 'Work' },
  { jp: '右', reading: 'みぎ', romaji: 'migi', si: 'දකුණ', en: 'Right', topic: 'Directions' },
  { jp: '左', reading: 'ひだり', romaji: 'hidari', si: 'වම', en: 'Left', topic: 'Directions' },
  { jp: '買う', reading: 'かう', romaji: 'kau', si: 'මිලදී ගන්නවා', en: 'To buy', topic: 'Shopping' },
  { jp: '大丈夫', reading: 'だいじょうぶ', romaji: 'daijoubu', si: 'හොඳයි / ප්‍රශ්නයක් නැහැ', en: 'Okay / all right', topic: 'Everyday' },
  { jp: 'ください', reading: 'ください', romaji: 'kudasai', si: 'දෙන්න, කරුණාකර', en: 'Please give me', topic: 'Shopping' }
];

const phrases = [
  { jp: 'すみません。', kana: 'すみません。', romaji: 'Sumimasen.', si: 'සමාවෙන්න.', en: 'Excuse me.', category: 'Getting around', note: 'A polite way to get someone’s attention.' },
  { jp: '駅はどこですか。', kana: 'えきはどこですか。', romaji: 'Eki wa doko desu ka?', si: 'දුම්රිය ස්ථානය කොහෙද?', en: 'Where is the train station?', category: 'Getting around', note: 'は marks the topic; ですか makes this a polite question.' },
  { jp: 'これをください。', kana: 'これをください。', romaji: 'Kore o kudasai.', si: 'මේක දෙන්න, කරුණාකර.', en: 'This one, please.', category: 'Shopping', note: 'Point to the item when you say これ (this).' },
  { jp: 'お水をお願いします。', kana: 'おみずをおねがいします。', romaji: 'Omizu o onegaishimasu.', si: 'වතුර ටිකක්, කරුණාකර.', en: 'Water, please.', category: 'Restaurant', note: 'A polite request you can use at a restaurant.' },
  { jp: '英語のメニューはありますか。', kana: 'えいごのメニューはありますか。', romaji: 'Eigo no menyuu wa arimasu ka?', si: 'ඉංග්‍රීසි මෙනුවක් තිබෙනවාද?', en: 'Do you have an English menu?', category: 'Restaurant', note: 'の links 英語 (English) and メニュー (menu).' },
  { jp: 'アレルギーがあります。', kana: 'あれるぎーがあります。', romaji: 'Arerugii ga arimasu.', si: 'මට ආහාර අසාත්මිකතාවක් තිබෙනවා.', en: 'I have an allergy.', category: 'Restaurant', note: 'Show a written allergy card too; this phrase alone may not explain which ingredient.' },
  { jp: '予約しています。', kana: 'よやくしています。', romaji: 'Yoyaku shite imasu.', si: 'මම වෙන් කරගෙන තිබෙනවා.', en: 'I have a reservation.', category: 'Accommodation', note: 'You can add your name after this phrase.' },
  { jp: '病院に行きたいです。', kana: 'びょういんにいきたいです。', romaji: 'Byouin ni ikitai desu.', si: 'මට රෝහලට යන්න ඕන.', en: 'I want to go to a hospital.', category: 'Health', note: 'For urgent danger, contact local emergency services or ask nearby staff for help.' },
  { jp: '助けてください。', kana: 'たすけてください。', romaji: 'Tasukete kudasai.', si: 'කරුණාකර මට උදව් කරන්න.', en: 'Please help me.', category: 'Emergency', note: 'This phrase asks for help; it is not a substitute for verified local emergency guidance.' },
  { jp: 'いくらですか。', kana: 'いくらですか。', romaji: 'Ikura desu ka?', si: 'කීයද?', en: 'How much is it?', category: 'Shopping', note: 'A useful polite question while shopping.' }
];

const navItems = [
  { id: 'home', icon: ICONS.home, en: 'Home', si: 'මුල් පිටුව' },
  { id: 'learn', icon: ICONS.learn, en: 'Learn', si: 'ඉගෙනගන්න' },
  { id: 'practice', icon: ICONS.practice, en: 'Practice', si: 'පුහුණුව' },
  { id: 'dictionary', icon: ICONS.dictionary, en: 'Dictionary', si: 'ශබ්දකෝෂය' },
  { id: 'travel', icon: ICONS.travel, en: 'Travel', si: 'ගමන්' },
  { id: 'translate', icon: ICONS.translate, en: 'Translate', si: 'පරිවර්තනය' },
  { id: 'profile', icon: ICONS.practice, en: 'Profile', si: 'පැතිකඩ' }
];

const copy = {
  en: {
    workspace: 'YOUR WORKSPACE', offlineReady: 'Lessons ready offline', learner: 'Learner', today: 'YOUR JAPANESE JOURNEY',
    hello: 'こんにちは', greeting: 'Small steps today make Japan feel closer.',
    continue: 'Continue learning', heroTitle: 'Your first 46 Hiragana', heroText: 'Start with the sounds that unlock Japanese reading.',
    dailyGoal: 'Today’s learning', session: 'Study session', sessionDone: 'Session complete for today', goalHint: 'Complete a lesson or quiz to record today’s activity.',
    progress: 'Your progress', lessons: 'Lessons completed', quizzes: 'Quizzes taken', bestScore: 'Best quiz score',
    categories: 'Pick up where you like', categoriesHint: 'A few useful places to begin.', kana: 'Hiragana', kanaSub: '46 basic characters', quiz: 'Quick practice', quizSub: '5 questions, instant feedback', words: 'Useful words', wordsSub: 'Everyday Japanese', phrases: 'Travel phrases', phrasesSub: 'Polite, practical expressions',
    learnTitle: 'Japanese kana chart', learnDesc: 'Explore the basic Hiragana and Katakana sounds and their common marks and combinations. Sinhala pronunciation guides are approximate, not exact Japanese equivalents.',
    hiragana: 'Hiragana', katakana: 'Katakana', basicKana: 'Basic 46', voicedKana: 'Dakuten / handakuten', combinedKana: 'Yōon combinations', smallKana: 'Small kana', foreignKana: 'Foreign sounds', kanaMarks: 'Sound marks', longVowel: 'Long-vowel mark', katakanaSmallNote: 'Katakana also uses ヵ and ヶ in some words and counters.',
    learnLessonsTab: 'Lessons', learnChartTab: 'Alphabet chart',
    translateTitle: 'Say it in Japanese', translateDesc: 'Enter English or Sinhala text to get a Japanese translation, then play it with a Japanese voice available on your device.', translateSource: 'Text language', translateInput: 'Type a word or sentence', translateButton: 'Translate to Japanese', translating: 'Translating…', translationResult: 'Japanese translation', translationPrivacy: 'Translation uses a free online service. Your text is sent to that service; do not enter private or sensitive information. Machine translations can be inaccurate, so verify important phrases. Internet is required, and free service availability or daily limits may change.', translationError: 'Translation service is temporarily unavailable.', translationNetworkError: 'Could not reach the translation service. Check your internet connection.', translationQuotaError: 'The free translation service has reached its current limit. Please try again later.', translationRetry: 'Retry translation', translatedSpeech: 'Hear Japanese',
    play: 'Listen', markDone: 'Mark lesson complete', pronunciation: 'Pronunciation note', pronounceHint: 'Japanese vowels are short and clear. Sinhala guides are approximations; listen to the audio when a Japanese device voice is available.',
    practiceTitle: 'Quick practice', practiceDesc: 'Choose the romaji for each Hiragana. Your score is saved on this device.', question: 'Choose the matching romaji', submit: 'Check answer', next: 'Next question', finish: 'See results', correct: 'That’s right!', incorrect: 'Not quite.', correctAnswer: 'Correct answer:', startQuiz: 'Start 5-question quiz', retry: 'Try another round', resultTitle: 'Practice complete', scoreLabel: 'correct answers',
    practiceQuizTab: 'Kana quiz', writingTab: 'Writing practice', writingTitle: 'Write the kana', writingInstructions: 'Copy the kana shown below into the writing area. Press Check after drawing to compare your strokes. Use Listen to hear the pronunciation. Your drawing is not saved.', writePrompt: 'Write this sound', writingTargetLabel: 'Character to write', hearKana: 'Listen', checkWriting: 'Check', writingDrawFirst: 'Draw the character in the box first, then press Check.', compareWriting: 'Compare your drawing with the correct kana.', clearWriting: 'Clear drawing', nextWriting: 'Next character',
    dictionaryTitle: 'Everyday dictionary', dictionaryDesc: 'A small starter set, organized by topic. More verified words can be added as lessons grow.', search: 'Search Japanese, romaji, or meaning', allTopics: 'All topics', noResults: 'No matching words. Try a different search or topic.',
    dictionaryHiragana: 'Hiragana chart', dictionaryKatakana: 'Katakana chart', dictionaryWords: 'Words', chartDescription: 'Characters are arranged by consonant rows and vowel columns. Select any kana to hear it, or play a whole row.', chartRow: 'Play row', chartVowel: 'Vowel', chartNasal: 'N', chartVoiceNote: 'Audio uses a Japanese voice installed in your browser or device. If no voice is available, the chart still works as a reading reference.',
    chartDakutenTitle: 'Dakuten and handakuten', chartDakutenNote: '゛ voices a sound; ゜ changes the H row to P sounds.', chartCombinationTitle: 'Yōon combinations', chartCombinationNote: 'Combine an i-row kana with small ゃ, ゅ, or ょ.', chartBasicCombinations: 'Basic combinations', chartVoicedCombinations: 'Voiced combinations',
    travelTitle: 'Japan travel phrases', travelDesc: 'Practical, polite expressions with kana, romaji, and Sinhala and English meanings.', categoriesFilter: 'All situations', noPhrases: 'No phrases in this situation yet.', situational: 'Situational note',
    settingsTitle: 'Language and settings', settingsDesc: 'Choose the language used for navigation and interface labels.', language: 'Interface language', english: 'English', sinhala: 'සිංහල', save: 'Save settings', cancel: 'Cancel', reset: 'Reset learning progress', resetAsk: 'Reset your local learning progress? This cannot be undone.', resetDone: 'Learning progress was reset on this device.', saved: 'Settings saved.',
    profileTitle: 'Your profile', signIn: 'Log in', createAccount: 'Create account', signOut: 'Log out', displayName: 'Display name', email: 'Email', password: 'Password', confirmPassword: 'Confirm password', accountSubmit: 'Create my account', loginSubmit: 'Log in with email', noAccount: 'New to JapanGo?', haveAccount: 'Already have an account?', switchToRegister: 'Create an account', switchToLogin: 'Log in instead', localAccountNotice: 'Firebase Authentication manages your sign-in. Learning progress in this version remains stored in this browser.', accountCreated: 'Verification email sent. Verify your email before logging in.', loggedIn: 'You are logged in.', loggedOut: 'You are logged out.', profileUpdated: 'Profile updated.', accountError: 'Could not create or log in. Check your details and try again.', passwordMismatch: 'Passwords do not match.', passwordRequirements: 'Use at least 8 characters.', firebaseSetupNeeded: 'Authentication is not configured yet. Follow FIREBASE_SETUP.md to connect a Firebase project.', firebaseLoadError: 'Firebase Authentication could not load. Check your internet connection and configuration.', firebaseEnableProviders: 'Enable Email/Password and Google providers in Firebase Authentication.', verificationTitle: 'Verify your email', verificationSent: 'We sent a verification link to this email:', verificationInstructions: 'Open the email, verify your address, then return here and log in.', verificationResent: 'Verification email sent again.', emailNotVerified: 'Your email is not verified yet. We sent another verification link.', googleSignIn: 'Log in with Google', googlePopupBlocked: 'Google sign-in popup was blocked. Allow popups or try again.', emailAlreadyUsed: 'This email is already registered. Log in instead.', invalidEmail: 'Enter a valid email address.', orEmail: 'or use email',
    completed: 'Lesson marked complete.', alreadyCompleted: 'This lesson is already recorded as complete.', noVoice: 'A Japanese speech voice is not available in this browser.', speaking: 'Playing device text-to-speech. This is not a native-speaker recording.',
    offlineNote: 'Your lessons and saved progress stay on this device. Speech playback needs a Japanese voice provided by your browser or operating system.', emergencyNote: 'Emergency details vary by location. This starter guide does not provide official emergency numbers; ask local staff or consult verified official guidance.', emptyHistory: 'No quiz results yet. Take a quick practice round to start tracking your progress.'
  },
  si: {
    workspace: 'ඔබේ ඉගෙනුම් අවකාශය', offlineReady: 'පාඩම් offline භාවිතා කළ හැක', learner: 'ඉගෙනුම්කරු', today: 'ඔබේ ජපන් භාෂා ගමන',
    hello: 'こんにちは', greeting: 'අද කුඩා පියවරක්, ජපානය තව ළඟ කරයි.',
    continue: 'ඉගෙනීම දිගටම කරගෙන යන්න', heroTitle: 'ඔබේ පළමු හිරගනා අකුරු 46', heroText: 'ජපන් කියවීමට අවශ්‍ය මූලික ශබ්දවලින් පටන් ගන්න.',
    dailyGoal: 'අද ඉගෙනීම', session: 'ඉගෙනුම් වාරය', sessionDone: 'අද ඉගෙනුම් වාරය සම්පූර්ණයි', goalHint: 'අද ක්‍රියාකාරකම සටහන් කිරීමට පාඩමක් හෝ ප්‍රශ්නාවලියක් සම්පූර්ණ කරන්න.',
    progress: 'ඔබේ ප්‍රගතිය', lessons: 'සම්පූර්ණ කළ පාඩම්', quizzes: 'කළ ප්‍රශ්නාවලි', bestScore: 'හොඳම ලකුණු',
    categories: 'ඔබ කැමති තැනකින් පටන් ගන්න', categoriesHint: 'ආරම්භයට ප්‍රයෝජනවත් කොටස්.', kana: 'හිරගනා', kanaSub: 'මූලික අකුරු 46', quiz: 'කෙටි පුහුණුව', quizSub: 'ප්‍රශ්න 5ක්, ක්ෂණික ප්‍රතිචාර', words: 'ප්‍රයෝජනවත් වචන', wordsSub: 'දිනපතා භාවිතා වන ජපන්', phrases: 'ගමන් වාක්‍ය', phrasesSub: 'විනීත, ප්‍රායෝගික ප්‍රකාශ',
    learnTitle: 'ජපන් kana අක්ෂර වගුව', learnDesc: 'මූලික හිරගනා සහ කටකනා ශබ්ද, ඒවායේ පොදු ශබ්ද ලකුණු සහ සංයෝජන ඉගෙනගන්න. සිංහල උච්චාරණ මඟපෙන්වීම් ආසන්න අනුමාන පමණයි; ජපන් ශබ්දයට හරියටම සමාන නොවේ.',
    hiragana: 'හිරගනා', katakana: 'කටකනා', basicKana: 'මූලික 46', voicedKana: '゛ / ゜ ශබ්ද ලකුණු', combinedKana: 'yōon සංයුක්ත ශබ්ද', smallKana: 'කුඩා kana', foreignKana: 'විදේශීය ශබ්ද', kanaMarks: 'ශබ්ද ලකුණු', longVowel: 'දිගු ස්වර ලකුණ', katakanaSmallNote: 'කටකනාහි සමහර වචන හා ගණන් කිරීම්වල ヵ සහ ヶ ද භාවිතා වේ.',
    learnLessonsTab: 'පාඩම්', learnChartTab: 'හෝඩි වගුව',
    translateTitle: 'ජපන් භාෂාවෙන් කියන්න', translateDesc: 'English හෝ සිංහල වචනයක්/වාක්‍යයක් ඇතුළත් කර ජපන් පරිවර්තනය ලබාගෙන, ඔබේ උපකරණයේ ජපන් හඬක් තිබේ නම් අහන්න.', translateSource: 'ඇතුළත් කරන භාෂාව', translateInput: 'වචනයක් හෝ වාක්‍යයක් ලියන්න', translateButton: 'ජපන් භාෂාවට පරිවර්තනය කරන්න', translating: 'පරිවර්තනය කරමින්…', translationResult: 'ජපන් පරිවර්තනය', translationPrivacy: 'පරිවර්තනය සඳහා නොමිලේ online සේවාවක් භාවිතා කරයි. ඔබේ text එම සේවාවට යවනු ලැබේ; පුද්ගලික හෝ රහස් තොරතුරු ඇතුළත් නොකරන්න. Machine translation නිවැරදි නොවිය හැකි නිසා වැදගත් වාක්‍ය තහවුරු කරගන්න. Internet අවශ්‍ය අතර සේවා සීමා වෙනස් විය හැක.', translationError: 'පරිවර්තන සේවාව තාවකාලිකව ක්‍රියා නොකරයි.', translationNetworkError: 'පරිවර්තන සේවාවට සම්බන්ධ විය නොහැක. Internet සම්බන්ධතාව පරීක්ෂා කරන්න.', translationQuotaError: 'නොමිලේ පරිවර්තන සේවාවේ දැනට ඇති සීමාවට ළඟා වී ඇත. පසුව නැවත උත්සාහ කරන්න.', translationRetry: 'නැවත උත්සාහ කරන්න', translatedSpeech: 'ජපන් හඬ අහන්න',
    play: 'අහන්න', markDone: 'පාඩම සම්පූර්ණ කළ බව සටහන් කරන්න', pronunciation: 'උච්චාරණ සටහන', pronounceHint: 'ජපන් ස්වර කෙටි සහ පැහැදිලියි. සිංහල උච්චාරණ මඟපෙන්වීම් ආසන්න අනුමාන පමණයි. ජපන් හඬක් තිබේ නම් audio අහන්න.',
    practiceTitle: 'කෙටි පුහුණුව', practiceDesc: 'එක් එක් හිරගනා අකුරට ගැළපෙන රෝමාජි තෝරන්න. ලකුණු මේ උපකරණයේ සුරැකේ.', question: 'ගැළපෙන රෝමාජි පිළිතුර තෝරන්න', submit: 'පිළිතුර පරීක්ෂා කරන්න', next: 'ඊළඟ ප්‍රශ්නය', finish: 'ප්‍රතිඵල බලන්න', correct: 'නිවැරදියි!', incorrect: 'එය නිවැරදි නැහැ.', correctAnswer: 'නිවැරදි පිළිතුර:', startQuiz: 'ප්‍රශ්න 5ක පුහුණුව අරඹන්න', retry: 'තවත් වටයක් කරන්න', resultTitle: 'පුහුණුව අවසන්', scoreLabel: 'නිවැරදි පිළිතුරු',
    practiceQuizTab: 'kana ප්‍රශ්නාවලිය', writingTab: 'ලිවීමේ පුහුණුව', writingTitle: 'kana අකුර ලියන්න', writingInstructions: 'පහතින් පෙන්වන kana අකුර ලිවීමේ කොටුවේ අඳින්න. ඇඳීමෙන් පසු stroke සසඳා බැලීමට “පරීක්ෂා කරන්න” ඔබන්න. උච්චාරණය ඇසීමට “අහන්න” ඔබන්න. ඔබේ ඇඳීම සුරැකෙන්නේ නැහැ.', writePrompt: 'මෙම ශබ්දය ලියන්න', writingTargetLabel: 'ලියන්න ඕන අකුර', hearKana: 'අහන්න', checkWriting: 'පරීක්ෂා කරන්න', writingDrawFirst: 'මුලින් කොටුවේ kana අකුර අඳින්න; ඉන්පසු පරීක්ෂා කරන්න ඔබන්න.', compareWriting: 'ඔබ ඇඳූ අකුර නිවැරදි kana අකුර සමඟ සසඳන්න.', clearWriting: 'චිත්‍රය මකන්න', nextWriting: 'ඊළඟ අකුර',
    dictionaryTitle: 'දිනපතා ශබ්දකෝෂය', dictionaryDesc: 'මාතෘකා අනුව පෙළගස්වූ ආරම්භක වචන එකතුවක්. පාඩම් වැඩිවන විට තහවුරු කළ තවත් වචන එකතු කළ හැක.', search: 'ජපන්, රෝමාජි හෝ අර්ථය සොයන්න', allTopics: 'සියලු මාතෘකා', noResults: 'ගැළපෙන වචන හමු වුණේ නැහැ. වෙනත් සෙවුමක් හෝ මාතෘකාවක් උත්සාහ කරන්න.',
    dictionaryHiragana: 'හිරගනා chart', dictionaryKatakana: 'කටකනා chart', dictionaryWords: 'වචන', chartDescription: 'ව්‍යංජන පේළි සහ ස්වර තීරු අනුව අකුරු සකස් කර ඇත. අකුරක් තෝරා ශබ්දය අහන්න, නැත්නම් සම්පූර්ණ පේළිය වාදනය කරන්න.', chartRow: 'පේළිය අහන්න', chartVowel: 'ස්වරය', chartNasal: 'N', chartVoiceNote: 'Audio සඳහා browser/device එකේ ස්ථාපිත ජපන් හඬක් අවශ්‍යයි. හඬක් නැතත් chart එක කියවීමේ reference එකක් ලෙස භාවිතා කළ හැක.',
    chartDakutenTitle: 'Dakuten සහ handakuten', chartDakutenNote: '゛ ලකුණ ශබ්දය voiced කරයි; ゜ ලකුණ H පේළිය P ශබ්ද කරයි.', chartCombinationTitle: 'Yōon සංයුක්ත ශබ්ද', chartCombinationNote: 'i පේළියේ kana අකුරකට කුඩා ゃ, ゅ, හෝ ょ එක් කරන්න.', chartBasicCombinations: 'මූලික සංයෝජන', chartVoicedCombinations: 'හඬ වෙනස් වූ සංයෝජන',
    travelTitle: 'ජපාන ගමන් වාක්‍ය', travelDesc: 'කනා, රෝමාජි සහ සිංහල හා ඉංග්‍රීසි අර්ථ සමඟ ප්‍රායෝගික, විනීත ප්‍රකාශ.', categoriesFilter: 'සියලු අවස්ථා', noPhrases: 'මෙම අවස්ථාවට වාක්‍ය තවම නැහැ.', situational: 'අවස්ථා සටහන',
    settingsTitle: 'භාෂාව සහ සැකසුම්', settingsDesc: 'මෙනු සහ අතුරුමුහුණත සඳහා භාවිතා කරන භාෂාව තෝරන්න.', language: 'අතුරුමුහුණත් භාෂාව', english: 'English', sinhala: 'සිංහල', save: 'සැකසුම් සුරකින්න', cancel: 'අවලංගු කරන්න', reset: 'ඉගෙනුම් ප්‍රගතිය මකන්න', resetAsk: 'මේ උපකරණයේ සුරැකි ඉගෙනුම් ප්‍රගතිය මකන්නද? මෙය ආපසු හැරවිය නොහැක.', resetDone: 'මේ උපකරණයේ ඉගෙනුම් ප්‍රගතිය මකා ඇත.', saved: 'සැකසුම් සුරැකිණි.',
    profileTitle: 'ඔබේ profile එක', signIn: 'Login', createAccount: 'Account එකක් හදන්න', signOut: 'Logout', displayName: 'පෙන්වන නම', email: 'Email', password: 'Password', confirmPassword: 'Password නැවත ලියන්න', accountSubmit: 'Account එක සාදන්න', loginSubmit: 'Email එකෙන් login', noAccount: 'JapanGo අලුතින්ද?', haveAccount: 'දැනටමත් account එකක් තියෙනවාද?', switchToRegister: 'Account එකක් හදන්න', switchToLogin: 'Login වෙන්න', localAccountNotice: 'Login එක Firebase Authentication මඟින් කළමනාකරණය කරයි. මෙම version එකේ ඉගෙනුම් ප්‍රගතිය තවමත් මේ browser එකේ සුරැකේ.', accountCreated: 'Verification email link එක යැව්වා. Login වීමට පෙර email එක verify කරන්න.', loggedIn: 'Login වුණා.', loggedOut: 'Logout වුණා.', profileUpdated: 'Profile එක යාවත්කාලීන කළා.', accountError: 'Account එක සෑදීමට හෝ login වීමට නොහැකි විය. විස්තර පරීක්ෂා කර නැවත උත්සාහ කරන්න.', passwordMismatch: 'Passwords දෙක ගැළපෙන්නේ නැහැ.', passwordRequirements: 'අවම වශයෙන් අකුරු 8ක් භාවිතා කරන්න.', firebaseSetupNeeded: 'Authentication තවම සකස් කර නැහැ. Firebase project එක සම්බන්ධ කිරීමට FIREBASE_SETUP.md පියවර අනුගමනය කරන්න.', firebaseLoadError: 'Firebase Authentication load වුණේ නැහැ. Internet ба configuration පරීක්ෂා කරන්න.', firebaseEnableProviders: 'Firebase Authentication тохиргоонд Email/Password болон Google providers enable කරන්න.', verificationTitle: 'Email එක verify කරන්න', verificationSent: 'මෙම email එකට verification link එක යැව්වා:', verificationInstructions: 'Email එක විවෘත කර ලිපිනය verify කරන්න. ඉන්පසු මෙහි ආපසු පැමිණ login වෙන්න.', emailNotVerified: 'ඔබේ email එක තවම verify කර නැහැ. නැවත verification link එකක් යැව්වා.', googleSignIn: 'Google සමඟ ඉදිරියට යන්න', orEmail: 'නැත්නම් email භාවිතා කරන්න', emailRequired: 'Verification සහ login සඳහා email අවශ්‍යයි.',
    completed: 'පාඩම සම්පූර්ණ කළ බව සටහන් කළා.', alreadyCompleted: 'මෙම පාඩම දැනටමත් සම්පූර්ණ කර ඇත.', noVoice: 'මෙම browser එකේ ජපන් හඬක් නොමැත.', speaking: 'උපකරණයේ text-to-speech ක්‍රියාත්මකයි. මෙය ස්වදේශීය කථිකයෙකුගේ පටිගත කිරීමක් නොවේ.',
    offlineNote: 'පාඩම් සහ සුරැකි ප්‍රගතිය මේ උපකරණයේම පවතී. කථන playback සඳහා browser හෝ මෙහෙයුම් පද්ධතියෙන් සපයන ජපන් හඬක් අවශ්‍යයි.', emergencyNote: 'හදිසි තොරතුරු ස්ථානය අනුව වෙනස් වේ. මෙම ආරම්භක මාර්ගෝපදේශයේ නිල හදිසි අංක නැත; එම ස්ථානයේ කාර්ය මණ්ඩලයෙන් විමසන්න හෝ තහවුරු කළ නිල තොරතුරු බලන්න.', emptyHistory: 'තවම ප්‍රශ්නාවලි ප්‍රතිඵල නැහැ. ප්‍රගතිය සටහන් කිරීමට කෙටි පුහුණුවක් කරන්න.'
  }
};

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (Object.prototype.hasOwnProperty.call(saved, 'writingResults')) {
      delete saved.writingResults;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
    return { language: saved.language === 'si' ? 'si' : 'en', completed: Array.isArray(saved.completed) ? saved.completed : [], quizResults: Array.isArray(saved.quizResults) ? saved.quizResults : [], activityDates: Array.isArray(saved.activityDates) ? saved.activityDates : [], favorites: Array.isArray(saved.favorites) ? saved.favorites : [] };
  } catch {
    return { language: 'en', completed: [], quizResults: [], activityDates: [], favorites: [] };
  }
}

let firebaseAuthState = { configured: false, status: 'loading', user: null, error: '' };
let pendingVerificationEmail = '';

// Theme Handling
let currentTheme = localStorage.getItem(THEME_KEY) || 'light';
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const themeLabel = document.querySelector('#sidebar-theme-label');
  if (themeLabel) {
    themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
  }
}
function toggleTheme() {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
}

let progress = readProgress();
let currentView = 'home';
let profileMode = 'login';
let profileError = '';
let dictionaryTab = 'hiragana';
let quiz = null;
let practiceMode = 'quiz';
let writingTarget = kana[Math.floor(Math.random() * kana.length)];
let writingHasStroke = false;
let writingAnswerRevealed = false;
let writingDrawing = '';
let selectedLanguage = progress.language;
let toastTimer;
let alphabetScript = 'hiragana';
let alphabetSet = 'basic';
let learnUnitIndex = 0;
let learnMode = 'lessons';
let translatedText = '';
let translationBusy = false;
let translationFailed = false;
let translationFailureMessage = '';
let translationInput = '';
let translationLanguage = progress.language;
const content = document.querySelector('#app-content');

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    showToast('Progress could not be saved in this browser.');
  }
}

function t(key) { return copy[progress.language][key] || copy.en[key] || key; }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }
function todayKey() { return new Date().toLocaleDateString('en-CA'); }
function recordActivity() {
  const date = todayKey();
  if (!progress.activityDates.includes(date)) progress.activityDates.push(date);
  saveProgress();
}
function todayLabel() {
  return new Intl.DateTimeFormat(progress.language === 'si' ? 'si-LK' : 'en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
}

function renderNavigation() {
  const markup = navItems.map((item) => `<button class="nav-item ${currentView === item.id ? 'active' : ''}" type="button" data-view="${item.id}" ${currentView === item.id ? 'aria-current="page"' : ''}><span class="nav-symbol" aria-hidden="true">${item.icon}</span><span>${progress.language === 'si' ? item.si : item.en}</span></button>`).join('');
  const sideNav = document.querySelector('#side-nav');
  const mobileNav = document.querySelector('#mobile-nav');
  if (sideNav) sideNav.innerHTML = markup;
  if (mobileNav) mobileNav.innerHTML = markup;
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  const today = document.querySelector('#today-label');
  if (today) today.textContent = todayLabel();
  const languageLabel = document.querySelector('#language-label');
  if (languageLabel) languageLabel.textContent = progress.language === 'si' ? 'සිංහල' : 'English';
  const account = firebaseAuthState.user;
  const profileName = document.querySelector('#profile-name');
  const profileDetail = document.querySelector('#profile-detail');
  if (profileName) profileName.textContent = account?.displayName || (progress.language === 'si' ? 'ආගන්තුකයා' : 'Guest');
  if (profileDetail) profileDetail.textContent = account?.email || (progress.language === 'si' ? 'Login / Account' : 'Login / Account');
}

function titleBlock(title, description) {
  return `<div class="view-title"><h1>${title}</h1><p>${description}</p></div>`;
}

function renderHome() {
  const best = progress.quizResults.length ? Math.max(...progress.quizResults.map((item) => item.score)) : 0;
  const greeting = progress.language === 'si' ? 'ආයුබෝවන්!' : 'Welcome back!';
  return `<div class="welcome-row"><div><div class="japanese-kicker">こんにちは · ${progress.language === 'si' ? 'ආයුබෝවන්' : 'Konnichiwa'}</div><h1>${greeting}</h1><p>${t('greeting')}</p></div></div><section class="hero-panel"><div class="hero-copy"><p class="eyebrow">BEGINNER PATH</p><h2>${t('heroTitle')}</h2><p>${t('heroText')}</p><button class="button-primary button-light" type="button" data-view="learn">${t('continue')} →</button></div><div class="hero-art" aria-hidden="true"><div class="kana-orbit"><span>あ</span><span>き</span><span>の</span></div></div></section><div class="section-heading"><h2>${t('progress')}</h2><p>${t('categoriesHint')}</p></div><section class="dashboard-grid"><article class="panel goal-panel"><div class="panel-title"><h3>${t('dailyGoal')}</h3></div><p>${progress.activityDates.length} ${progress.language === 'si' ? 'ඉගෙනුම් දින' : 'study days'}</p></article><article class="panel progress-panel"><div class="stats-row"><div class="stat"><strong>${progress.completed.length}</strong><span>${t('lessons')}</span></div><div class="stat"><strong>${progress.quizResults.length}</strong><span>${t('quizzes')} · ${best}/5</span></div></div></article></section><div class="section-heading"><h2>${t('categories')}</h2></div><section class="category-grid"><button class="category-card" data-view="learn"><span class="category-mark">あ</span><strong>${t('kana')}</strong><small>${t('kanaSub')}</small></button><button class="category-card" data-view="practice"><span class="category-mark">✓</span><strong>${t('quiz')}</strong><small>${t('quizSub')}</small></button><button class="category-card" data-view="dictionary"><span class="category-mark">語</span><strong>${t('words')}</strong><small>${t('wordsSub')}</small></button><button class="category-card" data-view="travel"><span class="category-mark">旅</span><strong>${t('phrases')}</strong><small>${t('phrasesSub')}</small></button></section>`;
}

function renderLearn() {
  const isSinhala = progress.language === 'si';
  const viewTabs = `<div class="dictionary-tabs learn-view-tabs" role="tablist" aria-label="Learn view"><button class="dictionary-tab ${learnMode === 'lessons' ? 'selected' : ''}" type="button" data-learn-mode="lessons" aria-current="${learnMode === 'lessons' ? 'page' : 'false'}">${t('learnLessonsTab')}</button><button class="dictionary-tab ${learnMode === 'chart' ? 'selected' : ''}" type="button" data-learn-mode="chart" aria-current="${learnMode === 'chart' ? 'page' : 'false'}">${t('learnChartTab')}</button></div>`;
  const scriptTabs = `<div class="segmented-control learn-script-tabs" role="group" aria-label="Kana script"><button type="button" data-script="hiragana" class="${alphabetScript === 'hiragana' ? 'selected' : ''}">${t('hiragana')}</button><button type="button" data-script="katakana" class="${alphabetScript === 'katakana' ? 'selected' : ''}">${t('katakana')}</button></div>`;
  if (learnMode === 'chart') {
    const chartTitle = alphabetScript === 'hiragana' ? t('dictionaryHiragana') : t('dictionaryKatakana');
    return `${titleBlock(isSinhala ? 'ජපන් හෝඩිය ඉගෙනගන්න' : 'Japanese alphabet chart', isSinhala ? 'මූලික අකුරු, ශබ්ද ලකුණු සහ සංයුක්ත ශබ්ද එකම වගුවකින් බලන්න. අකුරක් හෝ පේළියක් තෝරා අහන්න.' : 'Review basic kana, voiced sounds, and combinations together. Select a character or a row to hear it.')} ${viewTabs}<div class="learn-chart-heading">${scriptTabs}<h2>${chartTitle} <span lang="ja">${alphabetScript === 'hiragana' ? 'ひらがな' : 'カタカナ'}</span></h2></div><div class="learn-full-chart"><section class="chart-main-panel">${renderKanaChart(alphabetScript)}</section><section class="chart-voiced-panel">${renderVoicedChart(alphabetScript)}</section><section class="chart-combinations-panel">${renderCombinationChart(alphabetScript)}</section></div>`;
  }

  const unit = learnUnits[learnUnitIndex];
  const lessonId = `learn-${alphabetScript}-${unit.id}`;
  const done = progress.completed.includes(lessonId);
  const lessonChars = unit.chars.map((char) => {
    const displayed = alphabetScript === 'katakana' ? toKatakana(char) : char;
    const romaji = kana.find((item) => item.char === char)?.romaji || kanaSets.voiced.concat(kanaSets.contracted, kanaSets.small, kanaSets.foreign).find((item) => item[0] === char)?.[1] || '';
    return `<article class="learn-kana-card"><span class="learn-kana-char" lang="ja">${displayed}</span><span class="learn-kana-romaji">${escapeHtml(romaji)}</span><button class="icon-button-small" type="button" data-speak="${displayed}" aria-label="${t('play')} ${displayed}">${ICONS.speaker}</button></article>`;
  }).join('');
  const lessonOptions = learnUnits.map((item, index) => `<option value="${index}" ${index === learnUnitIndex ? 'selected' : ''}>${isSinhala ? item.si : item.en}${progress.completed.includes(`learn-${alphabetScript}-${item.id}`) ? ' ✓' : ''}</option>`).join('');
  const progressCount = learnUnits.filter((item) => progress.completed.includes(`learn-${alphabetScript}-${item.id}`)).length;
  const example = unit.chars.slice(0, 3).map((char) => alphabetScript === 'katakana' ? toKatakana(char) : char).join(' · ');
  return `
    ${titleBlock(isSinhala ? 'ජපන් භාෂාව පියවරෙන් පියවර ඉගෙනගන්න' : 'Learn Japanese step by step', isSinhala ? 'එක් පාඩමක් තෝරා අකුරු කියවන්න, අහන්න, පුහුණු වන්න.' : 'Choose one short lesson. Read the characters, listen, and practise at your pace.')}
    ${viewTabs}<div class="learn-toolbar">${scriptTabs}<label class="lesson-picker"><span>${isSinhala ? 'පාඩම' : 'Lesson'} · ${progressCount}/${learnUnits.length}</span><select id="learn-unit-select" aria-label="${isSinhala ? 'පාඩම තෝරන්න' : 'Choose a lesson'}">${lessonOptions}</select></label></div>
    <article class="guided-lesson panel">
      <div class="guided-lesson-heading"><div><p class="eyebrow">${alphabetScript === 'hiragana' ? t('hiragana') : t('katakana')} · ${learnUnitIndex + 1} / ${learnUnits.length}</p><h2>${isSinhala ? unit.si : unit.en}</h2></div><span class="lesson-status ${done ? 'complete' : ''}">${done ? '✓ ' + (isSinhala ? 'සම්පූර්ණයි' : 'Completed') : (isSinhala ? 'දැන් ඉගෙනගන්න' : 'Ready to learn')}</span></div>
      <p class="guided-lesson-note">${isSinhala ? unit.siNote : unit.enNote}</p>
      <div class="lesson-example-row"><span>${isSinhala ? 'අහලා නැවත කියන්න' : 'Listen, then repeat'}</span><button class="button-secondary" type="button" data-speak="${unit.chars.map((char) => alphabetScript === 'katakana' ? toKatakana(char) : char).join('')}">${ICONS.speaker} ${isSinhala ? 'මුළු පේළිය අහන්න' : 'Listen to this group'}</button></div>
      <section class="learn-kana-grid" aria-label="${isSinhala ? unit.si : unit.en}">${lessonChars}</section>
      <p class="learn-pronunciation-note">${isSinhala ? 'සිංහලෙන් දක්වා ඇති ශබ්ද ආසන්න මඟපෙන්වීම් පමණයි; ජපන් උච්චාරණයට හරියටම සමාන නොවේ.' : 'Pronunciation guides are approximate. Sinhala sounds are not exact matches for Japanese.'}</p>
      <div class="learn-lesson-actions"><button class="button-secondary" type="button" data-learn-prev ${learnUnitIndex === 0 ? 'disabled' : ''}>← ${isSinhala ? 'පෙර පාඩම' : 'Previous'}</button><button class="button-primary" type="button" data-learn-complete="${lessonId}" ${done ? 'disabled' : ''}>${done ? '✓ ' + (isSinhala ? 'සම්පූර්ණයි' : 'Completed') : (isSinhala ? 'පාඩම සම්පූර්ණ කරන්න' : 'Complete lesson')}</button><button class="button-secondary" type="button" data-learn-next ${learnUnitIndex === learnUnits.length - 1 ? 'disabled' : ''}>${isSinhala ? 'ඊළඟ පාඩම' : 'Next'} →</button></div>
    </article>
    <div class="section-heading"><h2>${isSinhala ? 'මෙම පාඩමේ අකුරු' : 'Characters in this lesson'}</h2><p>${example}</p></div>
  `;
}

function renderTranslate() {
  const result = translatedText ? `
    <section class="translation-result">
      <div>
        <p class="eyebrow">${t('translationResult')}</p>
        <div id="translation-output" class="translation-output" lang="ja">${escapeHtml(translatedText)}</div>
      </div>
      <button class="button-primary" type="button" data-speak="${escapeHtml(translatedText)}">
        ${ICONS.speaker} <span>${t('translatedSpeech')}</span>
      </button>
    </section>
  ` : '';
  
  const error = translationFailed ? `<div class="feedback error" role="alert">${escapeHtml(translationFailureMessage || t('translationError'))}<button class="button-secondary translation-retry" type="button" data-translate>${t('translationRetry')}</button></div>` : '';
  
  return `
    ${titleBlock(t('translateTitle'), t('translateDesc'))}
    <section class="panel translator-panel">
      <label class="field-label" for="source-language">${t('translateSource')}</label>
      <select class="filter-select" id="source-language">
        <option value="en" ${translationLanguage === 'en' ? 'selected' : ''}>English</option>
        <option value="si" ${translationLanguage === 'si' ? 'selected' : ''}>සිංහල</option>
      </select>
      <label class="field-label" for="source-text">${t('translateInput')}</label>
      <textarea id="source-text" maxlength="500" rows="5" placeholder="${t('translateInput')}">${escapeHtml(translationInput)}</textarea>
      <div class="translator-submit">
        <span>${progress.language === 'si' ? 'English / සිංහල → 日本語' : 'English / Sinhala → Japanese'}</span>
        <button class="button-primary" type="button" data-translate ${translationBusy ? 'disabled' : ''}>
          ${translationBusy ? t('translating') : t('translateButton')}
        </button>
      </div>
      ${error}
      ${result}
      <div class="travel-note">${t('translationPrivacy')}</div>
    </section>
  `;
}

function buildQuestion(previous = []) {
  const pool = kana.filter((item) => !previous.includes(item.char));
  const target = pool[Math.floor(Math.random() * pool.length)] || kana[Math.floor(Math.random() * kana.length)];
  const distractors = kana.filter((item) => item.char !== target.char).sort(() => Math.random() - 0.5).slice(0, 3);
  return { target, options: [...distractors, target].sort(() => Math.random() - 0.5), answer: null };
}

function startQuiz() {
  quiz = { index: 0, score: 0, questions: [], answered: false };
  for (let index = 0; index < 5; index += 1) {
    const previous = quiz.questions.map((question) => question.target.char);
    quiz.questions.push(buildQuestion(previous));
  }
  render();
}

function renderPractice() {
  const isSinhala = progress.language === 'si';
  const tabs = `<div class="practice-mode-tabs" role="tablist"><button type="button" class="practice-mode-tab ${practiceMode === 'quiz' ? 'selected' : ''}" data-practice-mode="quiz">${t('practiceQuizTab')}</button><button type="button" class="practice-mode-tab ${practiceMode === 'writing' ? 'selected' : ''}" data-practice-mode="writing">${t('writingTab')}</button></div>`;
  if (practiceMode === 'writing') {
    const revealedAnswer = writingAnswerRevealed ? `<div class="writing-answer-reveal"><div class="writing-model" lang="ja" aria-label="Correct kana">${writingTarget.char}</div><p>${t('compareWriting')}</p></div>` : '';
    return `${titleBlock(t('practiceTitle'), t('practiceDesc'))}${tabs}<section class="panel writing-panel"><div class="writing-heading"><div><p class="eyebrow">${t('writingTitle')}</p><h2>${t('writePrompt')}: <span class="writing-romaji">${writingTarget.romaji}</span></h2></div><button class="button-secondary" type="button" data-speak="${writingTarget.char}">${ICONS.speaker} ${t('hearKana')}</button></div><p class="guided-lesson-note">${t('writingInstructions')}</p><div class="writing-prompt-model"><span>${t('writingTargetLabel')}</span><strong lang="ja">${writingTarget.char}</strong></div>${revealedAnswer}<div class="writing-canvas-wrap"><canvas id="writing-canvas" width="640" height="420" aria-label="Writing area for Japanese kana"></canvas><span class="canvas-guide" aria-hidden="true">十</span></div><div class="writing-actions"><button class="button-secondary" type="button" data-clear-writing ${writingAnswerRevealed ? 'disabled' : ''}>${t('clearWriting')}</button>${writingAnswerRevealed ? `<button class="button-primary" type="button" data-next-writing>${t('nextWriting')} →</button>` : `<button class="button-primary" type="button" data-check-writing>${t('checkWriting')}</button>`}</div></section>`;
  }
  if (!quiz) {
    return `
      ${titleBlock(t('practiceTitle'), t('practiceDesc'))}
      ${tabs}
      <section class="panel quiz-panel">
        <div class="results">
          <div class="result-mark">あ</div>
          <h2>${t('quiz')}</h2>
          <p>${t('practiceDesc')}</p>
          <button class="button-primary" type="button" data-start-quiz>
            <span>${t('startQuiz')}</span> <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    `;
  }
  
  if (quiz.index >= quiz.questions.length) return renderResults();
  
  const question = quiz.questions[quiz.index];
  const options = question.options.map((option) => {
    const state = quiz.answered && option.romaji === question.target.romaji ? 'correct' : quiz.answered && option.romaji === question.answer ? 'incorrect' : '';
    return `
      <button class="answer-option ${state}" type="button" data-answer="${option.romaji}" ${quiz.answered ? 'disabled' : ''}>
        ${option.romaji}
      </button>
    `;
  }).join('');
  
  const feedback = quiz.answered ? `
    <div class="feedback ${question.answer === question.target.romaji ? 'success' : 'error'}">
      ${question.answer === question.target.romaji ? `✓ ${t('correct')}` : `✕ ${t('incorrect')} ${t('correctAnswer')} <strong>${question.target.romaji}</strong>`}
    </div>
  ` : '<div class="feedback"></div>';
  
  return `
    ${titleBlock(t('practiceTitle'), t('practiceDesc'))}
    ${tabs}
    <section class="panel quiz-panel">
      <div class="quiz-topline">
        <span>${progress.language === 'si' ? 'ප්‍රශ්නය' : 'Question'} ${quiz.index + 1} / 5</span>
        <span>${progress.language === 'si' ? 'ලකුණු' : 'Score'}: ${quiz.score}</span>
      </div>
      <div class="quiz-progress"><span style="width:${((quiz.index + (quiz.answered ? 1 : 0)) / 5) * 100}%"></span></div>
      <p class="question-kana" lang="ja">${question.target.char}</p>
      <p class="question-prompt">${t('question')}</p>
      <div class="answer-grid">${options}</div>
      ${feedback}
      <div class="quiz-actions">
        ${quiz.answered ? `<button class="button-primary" type="button" data-next>${quiz.index === 4 ? t('finish') : t('next')} →</button>` : ''}
      </div>
    </section>
  `;
}

function launchConfetti() {
  const canvas = document.querySelector('#confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const colors = ['#ff4760', '#ff7844', '#10b981', '#f59e0b', '#6366f1', '#38bdf8'];
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height * 0.4) - 20,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: Math.random() * 3 + 2,
    speedX: (Math.random() - 0.5) * 4,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 8
  }));
  
  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    frames++;
    if (frames < 140) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
}

function renderResults() {
  if (quiz && quiz.score >= 4) launchConfetti();
  return `
    ${titleBlock(t('practiceTitle'), t('practiceDesc'))}
    <div class="practice-mode-tabs" role="tablist"><button type="button" class="practice-mode-tab selected" data-practice-mode="quiz">${t('practiceQuizTab')}</button><button type="button" class="practice-mode-tab" data-practice-mode="writing">${t('writingTab')}</button></div>
    <section class="panel quiz-panel">
      <div class="results">
        <div class="result-mark">🎉</div>
        <h2>${t('resultTitle')}</h2>
        <strong class="score">${quiz.score} / 5</strong>
        <p>${t('scoreLabel')}</p>
        <button class="button-primary" type="button" data-start-quiz>${t('retry')}</button>
      </div>
    </section>
  `;
}

function renderDictionary() {
  const topics = [...new Set(words.map((word) => word.topic))];
  const tabs = [
    ['hiragana', 'dictionaryHiragana'],
    ['katakana', 'dictionaryKatakana'],
    ['words', 'dictionaryWords']
  ].map(([id, label]) => `<button class="dictionary-tab ${dictionaryTab === id ? 'selected' : ''}" type="button" data-dictionary-tab="${id}" ${dictionaryTab === id ? 'aria-current="page"' : ''}>${t(label)}</button>`).join('');
  const body = dictionaryTab === 'words' ? `
    <div class="toolbar">
      <label class="search-field"><input id="word-search" type="search" placeholder="${t('search')}" aria-label="${t('search')}"></label>
      <select class="filter-select" id="word-filter" aria-label="${t('allTopics')}">
        <option value="all">${t('allTopics')}</option>
        ${topics.map((topic) => `<option value="${topic}">${topic}</option>`).join('')}
      </select>
    </div>
    <div class="list-stack" id="word-list"></div>
  ` : renderKanaChart(dictionaryTab);
  return `
    ${titleBlock(t('dictionaryTitle'), t('dictionaryDesc'))}
    <div class="dictionary-tabs" role="tablist" aria-label="${t('dictionaryTitle')}">${tabs}</div>
    ${body}
  `;
}

function renderKanaChart(script) {
  const rows = [
    { label: t('chartVowel'), kana: ['あ', 'い', 'う', 'え', 'お'] },
    { label: 'K', kana: ['か', 'き', 'く', 'け', 'こ'] },
    { label: 'S', kana: ['さ', 'し', 'す', 'せ', 'そ'] },
    { label: 'T', kana: ['た', 'ち', 'つ', 'て', 'と'] },
    { label: 'N', kana: ['な', 'に', 'ぬ', 'ね', 'の'] },
    { label: 'H', kana: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
    { label: 'M', kana: ['ま', 'み', 'む', 'め', 'も'] },
    { label: 'Y', kana: ['や', '', 'ゆ', '', 'よ'] },
    { label: 'R', kana: ['ら', 'り', 'る', 'れ', 'ろ'] },
    { label: 'W', kana: ['わ', '', '', 'を', ''] },
    { label: t('chartNasal'), kana: ['ん', '', '', '', ''] }
  ];
  const vowelHeaders = ['a', 'i', 'u', 'e', 'o'];
  const asKatakana = (value) => [...value].map((character) => {
    const code = character.codePointAt(0);
    return code >= 0x3041 && code <= 0x3096 ? String.fromCodePoint(code + 0x60) : character;
  }).join('');
  const cell = (value) => {
    if (!value) return '<td class="chart-empty" aria-hidden="true"></td>';
    const displayed = script === 'katakana' ? asKatakana(value) : value;
    const reading = kana.find((item) => item.char === value)?.romaji || 'n';
    return `<td><button class="chart-kana" type="button" data-speak="${displayed}" aria-label="${displayed}, ${reading}"><span class="chart-character" lang="ja">${displayed}</span><span class="chart-reading">${reading}</span></button></td>`;
  };
  const tableRows = rows.map((row) => {
    const rowKana = row.kana.filter(Boolean).map((value) => script === 'katakana' ? asKatakana(value) : value).join('');
    return `<tr><th scope="row"><span>${row.label}</span><button class="chart-row-play" type="button" data-speak="${rowKana}" aria-label="${t('chartRow')} ${row.label}" title="${t('chartRow')}">${ICONS.speaker}</button></th>${row.kana.map(cell).join('')}</tr>`;
  }).join('');
  return `<p class="chart-description">${t('chartDescription')}</p><div class="kana-chart-scroll"><table class="kana-chart"><thead><tr><th scope="col"></th>${vowelHeaders.map((vowel) => `<th scope="col">${vowel}</th>`).join('')}</tr></thead><tbody>${tableRows}</tbody></table></div><p class="chart-audio-note">${t('chartVoiceNote')}</p>`;
}

function renderVoicedChart(script) {
  const rows = [
    { vowel: 'a', chars: ['が', 'ざ', 'だ', 'ば', 'ぱ'], romaji: ['ga', 'za', 'da', 'ba', 'pa'] },
    { vowel: 'i', chars: ['ぎ', 'じ', 'ぢ', 'び', 'ぴ'], romaji: ['gi', 'ji', 'ji*', 'bi', 'pi'] },
    { vowel: 'u', chars: ['ぐ', 'ず', 'づ', 'ぶ', 'ぷ'], romaji: ['gu', 'zu', 'zu*', 'bu', 'pu'] },
    { vowel: 'e', chars: ['げ', 'ぜ', 'で', 'べ', 'ぺ'], romaji: ['ge', 'ze', 'de', 'be', 'pe'] },
    { vowel: 'o', chars: ['ご', 'ぞ', 'ど', 'ぼ', 'ぽ'], romaji: ['go', 'zo', 'do', 'bo', 'po'] }
  ];
  const headers = ['g', 'z', 'd', 'b', 'p'];
  const convert = (value) => [...value].map((character) => {
    const code = character.codePointAt(0);
    return script === 'katakana' && code >= 0x3041 && code <= 0x3096 ? String.fromCodePoint(code + 0x60) : character;
  }).join('');
  const cells = (row) => row.chars.map((char, index) => {
    const displayed = convert(char);
    return `<td><button class="chart-kana" type="button" data-speak="${displayed}" aria-label="${displayed}, ${row.romaji[index]}"><span class="chart-character" lang="ja">${displayed}</span><span class="chart-reading">${row.romaji[index]}</span></button></td>`;
  }).join('');
  const body = rows.map((row) => `<tr><th scope="row">${row.vowel}</th>${cells(row)}</tr>`).join('');
  return `<section class="chart-section"><div class="chart-section-heading"><h2>${t('chartDakutenTitle')}</h2><p>${t('chartDakutenNote')}</p></div><div class="kana-chart-scroll"><table class="kana-chart modifier-chart"><thead><tr><th scope="col"></th>${headers.map((header) => `<th scope="col">${header}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div><p class="chart-footnote">* ぢ and づ are uncommon in modern everyday words; most often, じ and ず are used for these sounds.</p></section>`;
}

function renderCombinationChart(script) {
  const basicGroups = [
    { label: 'k', chars: ['きゃ', 'きゅ', 'きょ'], romaji: ['kya', 'kyu', 'kyo'] },
    { label: 'sh', chars: ['しゃ', 'しゅ', 'しょ'], romaji: ['sha', 'shu', 'sho'] },
    { label: 'ch', chars: ['ちゃ', 'ちゅ', 'ちょ'], romaji: ['cha', 'chu', 'cho'] },
    { label: 'n', chars: ['にゃ', 'にゅ', 'にょ'], romaji: ['nya', 'nyu', 'nyo'] },
    { label: 'h', chars: ['ひゃ', 'ひゅ', 'ひょ'], romaji: ['hya', 'hyu', 'hyo'] },
    { label: 'm', chars: ['みゃ', 'みゅ', 'みょ'], romaji: ['mya', 'myu', 'myo'] },
    { label: 'r', chars: ['りゃ', 'りゅ', 'りょ'], romaji: ['rya', 'ryu', 'ryo'] }
  ];
  const voicedGroups = [
    { label: 'g', chars: ['ぎゃ', 'ぎゅ', 'ぎょ'], romaji: ['gya', 'gyu', 'gyo'] },
    { label: 'j', chars: ['じゃ', 'じゅ', 'じょ'], romaji: ['ja', 'ju', 'jo'] },
    { label: 'b', chars: ['びゃ', 'びゅ', 'びょ'], romaji: ['bya', 'byu', 'byo'] },
    { label: 'p', chars: ['ぴゃ', 'ぴゅ', 'ぴょ'], romaji: ['pya', 'pyu', 'pyo'] }
  ];
  const convert = (value) => [...value].map((character) => {
    const code = character.codePointAt(0);
    return script === 'katakana' && code >= 0x3041 && code <= 0x3096 ? String.fromCodePoint(code + 0x60) : character;
  }).join('');
  const renderBank = (groups, bankTitle) => {
    const header = `<tr><th scope="col"></th>${groups.map((group) => `<th scope="col">${group.label}</th>`).join('')}</tr>`;
    const rows = ['ゃ', 'ゅ', 'ょ'].map((smallKana, rowIndex) => `<tr><th scope="row">${smallKana}</th>${groups.map((group) => {
      const displayed = convert(group.chars[rowIndex]);
      return `<td><button class="chart-kana" type="button" data-speak="${displayed}" aria-label="${displayed}, ${group.romaji[rowIndex]}"><span class="chart-character" lang="ja">${displayed}</span><span class="chart-reading">${group.romaji[rowIndex]}</span></button></td>`;
    }).join('')}</tr>`).join('');
    return `<div class="combination-bank"><h3>${bankTitle}</h3><div class="kana-chart-scroll"><table class="kana-chart combination-table"><thead>${header}</thead><tbody>${rows}</tbody></table></div></div>`;
  };
  return `<section class="chart-section"><div class="chart-section-heading"><h2>${t('chartCombinationTitle')}</h2><p>${t('chartCombinationNote')}</p></div><div class="combination-banks">${renderBank(basicGroups, t('chartBasicCombinations'))}${renderBank(voicedGroups, t('chartVoicedCombinations'))}</div></section>`;
}

function renderWordList() {
  const search = (document.querySelector('#word-search')?.value || '').trim().toLowerCase();
  const topic = document.querySelector('#word-filter')?.value || 'all';
  const matches = words.filter((word) => (topic === 'all' || word.topic === topic) && [word.jp, word.reading, word.romaji, word.si, word.en, word.topic].some((value) => value.toLowerCase().includes(search)));
  const list = document.querySelector('#word-list');
  if (!list) return;
  list.innerHTML = matches.length ? matches.map((word) => `
    <article class="word-row">
      <div>
        <div class="word-jp" lang="ja">${word.jp}</div>
        <div class="word-reading" lang="ja">${word.reading}</div>
      </div>
      <div>
        <div class="word-romaji">${word.romaji}</div>
        <div class="word-meanings"><span lang="si">${word.si}</span> · ${word.en}</div>
      </div>
      <button class="speak-button" type="button" data-speak="${word.jp}" aria-label="${t('play')} ${word.jp}" title="${t('play')}">
        ${ICONS.speaker}
      </button>
    </article>
  `).join('') : `<div class="empty-state">${t('noResults')}</div>`;
}

function renderTravel() {
  const categories = [...new Set(phrases.map((phrase) => phrase.category))];
  return `
    ${titleBlock(t('travelTitle'), t('travelDesc'))}
    <div class="travel-note">${t('emergencyNote')}</div>
    <div class="toolbar">
      <label class="search-field">
        <input id="phrase-search" type="search" placeholder="${t('search')}" aria-label="${t('search')}">
      </label>
      <select class="filter-select" id="phrase-filter" aria-label="${t('categoriesFilter')}">
        <option value="all">${t('categoriesFilter')}</option>
        ${categories.map((category) => `<option value="${category}">${category}</option>`).join('')}
      </select>
    </div>
    <div class="list-stack" id="phrase-list"></div>
  `;
}

function renderPhraseList() {
  const search = (document.querySelector('#phrase-search')?.value || '').trim().toLowerCase();
  const category = document.querySelector('#phrase-filter')?.value || 'all';
  const matches = phrases.filter((phrase) => (category === 'all' || phrase.category === category) && [phrase.jp, phrase.kana, phrase.romaji, phrase.si, phrase.en, phrase.category].some((value) => value.toLowerCase().includes(search)));
  const list = document.querySelector('#phrase-list');
  if (!list) return;
  list.innerHTML = matches.length ? matches.map((phrase) => `
    <article class="phrase-row">
      <div>
        <div class="phrase-jp" lang="ja">${phrase.jp}</div>
        <div class="word-reading" lang="ja">${phrase.kana}</div>
        <div class="phrase-meta">${phrase.category}</div>
      </div>
      <div>
        <div class="word-romaji">${phrase.romaji}</div>
        <div class="phrase-meanings">
          <span lang="si">${phrase.si}</span><br>${phrase.en}
          <div class="phrase-meta">${t('situational')}: ${phrase.note}</div>
        </div>
      </div>
      <button class="speak-button" type="button" data-speak="${phrase.jp}" aria-label="${t('play')} ${phrase.jp}" title="${t('play')}">
        ${ICONS.speaker}
      </button>
    </article>
  `).join('') : `<div class="empty-state">${t('noPhrases')}</div>`;
}

function renderProgress() {
  const best = progress.quizResults.length ? Math.max(...progress.quizResults.map((item) => item.score)) : 0;
  const history = progress.quizResults.length ? `
    <div class="list-stack">
      ${[...progress.quizResults].reverse().map((result) => `
        <article class="word-row">
          <div><strong>${escapeHtml(result.date)}</strong></div>
          <div class="word-meanings">${progress.language === 'si' ? 'ප්‍රතිඵලය' : 'Result'}: ${result.score} / 5</div>
        </article>
      `).join('')}
    </div>
  ` : `<div class="empty-state">${t('emptyHistory')}</div>`;
  
  return `
    ${titleBlock(t('progress'), t('offlineNote'))}
    <section class="progress-summary">
      <article class="progress-tile">
        <strong>${progress.completed.length}</strong>
        <span>${t('lessons')}</span>
      </article>
      <article class="progress-tile">
        <strong>${progress.quizResults.length}</strong>
        <span>${t('quizzes')}</span>
      </article>
      <article class="progress-tile">
        <strong>${best}/5</strong>
        <span>${t('bestScore')}</span>
      </article>
    </section>
    <div class="section-heading">
      <h2>${progress.language === 'si' ? 'ප්‍රශ්නාවලි ඉතිහාසය' : 'Quiz history'}</h2>
    </div>
    ${history}
    <div class="modal-actions" style="margin-top: 24px;">
      <button class="button-secondary" type="button" data-reset>${t('reset')}</button>
    </div>
  `;
}

function renderProfile() {
  const account = firebaseAuthState.user;
  const notice = `<div class="account-notice">${t('localAccountNotice')}</div>`;
  if (!account) {
    if (profileMode === 'verification') {
      return `${titleBlock(t('verificationTitle'), t('verificationInstructions'))}<section class="panel account-panel"><div class="verification-card"><span class="verification-icon">✉</span><h2>${t('verificationTitle')}</h2><p>${t('verificationSent')}</p><strong>${escapeHtml(pendingVerificationEmail)}</strong><p>${t('verificationInstructions')}</p><button class="button-primary account-submit" type="button" data-profile-mode="login">${t('switchToLogin')}</button></div>${notice}</section>`;
    }
    const createMode = profileMode === 'register';
    const error = profileError ? `<div class="feedback error" role="alert">${escapeHtml(profileError)}</div>` : '';
    const setupNotice = firebaseAuthState.status === 'unconfigured'
      ? `<div class="feedback error" role="status">${t('firebaseSetupNeeded')}</div>`
      : firebaseAuthState.status === 'load-error'
        ? `<div class="feedback error" role="status">${t('firebaseLoadError')}</div>`
        : '';
    const authDisabled = !firebaseAuthState.configured ? 'disabled' : '';
    const form = createMode ? `
      <form class="account-form" id="register-form">
        <label class="field-label" for="account-display-name">${t('displayName')}</label>
        <input id="account-display-name" name="displayName" type="text" autocomplete="name" maxlength="60" required>
        <label class="field-label" for="account-email">${t('email')}</label>
        <input id="account-email" name="email" type="email" autocomplete="email" required>
        <label class="field-label" for="account-password">${t('password')}</label>
        <input id="account-password" name="password" type="password" autocomplete="new-password" minlength="8" required>
        <label class="field-label" for="account-confirm-password">${t('confirmPassword')}</label>
        <input id="account-confirm-password" name="confirmPassword" type="password" autocomplete="new-password" minlength="8" required>
        <button class="button-primary account-submit" type="submit" ${authDisabled}>${t('accountSubmit')}</button>
      </form>
      <p class="account-switch">${t('haveAccount')} <button class="text-button" type="button" data-profile-mode="login">${t('switchToLogin')}</button></p>
    ` : `
      <form class="account-form" id="login-form">
        <label class="field-label" for="account-email">${t('email')}</label>
        <input id="account-email" name="email" type="email" autocomplete="email" required>
        <label class="field-label" for="account-password">${t('password')}</label>
        <input id="account-password" name="password" type="password" autocomplete="current-password" required>
        <button class="button-primary account-submit" type="submit" ${authDisabled}>${t('loginSubmit')}</button>
      </form>
      <p class="account-switch">${t('noAccount')} <button class="text-button" type="button" data-profile-mode="register">${t('switchToRegister')}</button></p>
    `;
    return `${titleBlock(t('profileTitle'), createMode ? t('createAccount') : t('signIn'))}<section class="panel account-panel"><div class="account-mode-tabs"><button class="${!createMode ? 'selected' : ''}" type="button" data-profile-mode="login">${t('signIn')}</button><button class="${createMode ? 'selected' : ''}" type="button" data-profile-mode="register">${t('createAccount')}</button></div>${setupNotice}${error}<button class="google-signin-button" type="button" data-google-sign-in ${authDisabled}><span class="google-mark" aria-hidden="true"><svg viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.43 37.89 46.98 31.72 46.98 24.55z"/><path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg></span>${t('googleSignIn')}</button><div class="account-divider"><span>${t('orEmail')}</span></div>${form}${notice}</section>`;
  }

  const emailStatus = account.emailVerified ? (progress.language === 'si' ? 'Email баталгаажсан' : 'Email verified') : (progress.language === 'si' ? 'Email баталгаажаагүй' : 'Email not verified');
  const avatar = account.photoURL ? `<img class="account-avatar-image" src="${escapeHtml(account.photoURL)}" alt="">` : `<span class="account-avatar">${escapeHtml((account.displayName || account.email || 'U').slice(0, 1).toUpperCase())}</span>`;
  return `${titleBlock(t('profileTitle'), progress.language === 'si' ? 'Таны JapanGo хэрэглэгчийн мэдээлэл.' : 'Your JapanGo account details.') }<section class="panel account-panel"><div class="account-profile-header">${avatar}<div><h2>${escapeHtml(account.displayName || account.email)}</h2><p>${escapeHtml(account.email)}</p><span class="email-status ${account.emailVerified ? 'verified' : 'unverified'}">${emailStatus}</span></div></div>${profileError ? `<div class="feedback error" role="alert">${escapeHtml(profileError)}</div>` : ''}<form class="account-form" id="profile-form"><label class="field-label" for="profile-display-name">${t('displayName')}</label><input id="profile-display-name" name="displayName" type="text" maxlength="60" value="${escapeHtml(account.displayName || '')}" required><button class="button-primary account-submit" type="submit">${t('save')}</button></form>${account.emailVerified ? '' : `<button class="button-secondary account-submit" type="button" data-resend-verification>${progress.language === 'si' ? '↻ Verification дахин илгээх' : '↻ Resend verification email'}</button>`}<button class="button-secondary account-submit" type="button" data-sign-out>${t('signOut')}</button>${notice}</section>`;
}

function render() {
  renderNavigation();
  const renderers = { 
    home: renderHome, 
    learn: renderLearn, 
    practice: renderPractice, 
    dictionary: renderDictionary, 
    travel: renderTravel, 
    translate: renderTranslate, 
    progress: renderProgress,
    profile: renderProfile
  };
  content.innerHTML = (renderers[currentView] || renderHome)();
  if (currentView === 'practice' && practiceMode === 'writing') initializeWritingCanvas();
  if (currentView === 'dictionary' && dictionaryTab === 'words') renderWordList();
  if (currentView === 'travel') renderPhraseList();
}

function initializeWritingCanvas() {
  const canvas = document.querySelector('#writing-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.lineWidth = 12;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#1d302d';
  if (writingDrawing) {
    const image = new Image();
    image.onload = () => context.drawImage(image, 0, 0, canvas.width, canvas.height);
    image.src = writingDrawing;
  }
  const point = (event) => {
    const bounds = canvas.getBoundingClientRect();
    return { x: (event.clientX - bounds.left) * canvas.width / bounds.width, y: (event.clientY - bounds.top) * canvas.height / bounds.height };
  };
  canvas.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);
    const position = point(event);
    context.beginPath();
    context.moveTo(position.x, position.y);
    writingHasStroke = true;
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!canvas.hasPointerCapture(event.pointerId)) return;
    const position = point(event);
    context.lineTo(position.x, position.y);
    context.stroke();
  });
  const finishStroke = () => { writingDrawing = canvas.toDataURL(); };
  canvas.addEventListener('pointerup', finishStroke);
  canvas.addEventListener('pointercancel', finishStroke);
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function speak(text) {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    showToast(t('noVoice'));
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  const japaneseVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('ja'));
  if (!japaneseVoice) {
    showToast(t('noVoice'));
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = japaneseVoice.lang;
  utterance.voice = japaneseVoice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  showToast(t('speaking'));
}

async function translateToJapanese() {
  const input = translationInput.trim();
  const language = translationLanguage;
  if (!input) {
    showToast(t('translateInput'));
    return;
  }
  translationBusy = true;
  translationFailed = false;
  translationFailureMessage = '';
  render();
  try {
    const params = new URLSearchParams({ q: input, langpair: `${language}|ja` });
    const response = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`);
    if (!response.ok) {
      if (response.status === 429) throw new Error(t('translationQuotaError'));
      throw new Error(`${t('translationError')} (HTTP ${response.status})`);
    }
    const data = await response.json();
    const result = data.responseData?.translatedText?.trim();
    if (data.quotaFinished || Number(data.responseStatus) === 429) throw new Error(t('translationQuotaError'));
    if (Number(data.responseStatus) !== 200 || !result) {
      const details = data.responseDetails?.trim();
      throw new Error(details ? `${t('translationError')} ${details}` : t('translationError'));
    }
    translatedText = result;
  } catch (error) {
    translatedText = '';
    translationFailed = true;
    translationFailureMessage = error.name === 'TypeError'
      ? t('translationNetworkError')
      : error.message || t('translationError');
  } finally {
    translationBusy = false;
    render();
  }
}

function openSettings(isOnboarding = false) {
  selectedLanguage = progress.language;
  const root = document.querySelector('#modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" role="presentation">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">${isOnboarding ? 'JapanGo Japanese' : t('settingsTitle')}</h2>
        <p>${isOnboarding ? (progress.language === 'si' ? 'ඔබේ ඉගෙනුම් භාෂාව තෝරන්න.' : 'Choose the language for your learning space.') : t('settingsDesc')}</p>
        <strong>${t('language')}</strong>
        <div class="language-options">
          <button class="language-choice ${selectedLanguage === 'en' ? 'selected' : ''}" type="button" data-language="en">
            <strong>English</strong>
            <span>Interface language</span>
          </button>
          <button class="language-choice ${selectedLanguage === 'si' ? 'selected' : ''}" type="button" data-language="si">
            <strong>සිංහල</strong>
            <span>අතුරුමුහුණත් භාෂාව</span>
          </button>
        </div>
        <div class="modal-actions">
          ${isOnboarding ? '' : `<button class="button-secondary" type="button" data-close>${t('cancel')}</button>`}
          <button class="button-primary" type="button" data-save-language>
            ${isOnboarding ? (selectedLanguage === 'si' ? 'ඉදිරියට යන්න' : 'Get started') : t('save')}
          </button>
        </div>
      </section>
    </div>
  `;
}

function firebaseErrorMessage(error) {
  if (error?.code === 'auth/email-not-verified') return t('emailNotVerified');
  if (error?.code === 'auth/configuration-not-found') return progress.language === 'si'
    ? 'Firebase Console හි japango-2da0d project එකට Authentication ආරම්භ කර Email/Password සහ Google sign-in enable කරන්න.'
    : 'Start Authentication for the japango-2da0d project in Firebase Console, then enable Email/Password and Google sign-in.';
  if (error?.code === 'auth/operation-not-allowed') return t('firebaseEnableProviders');
  if (error?.code === 'auth/unauthorized-domain') return progress.language === 'si'
    ? 'මෙම website domain එක Firebase Authentication → Settings → Authorized domains යටතේ එකතු කරන්න.'
    : 'Add this website domain in Firebase Authentication → Settings → Authorized domains.';
  if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
    return progress.language === 'si' ? 'Google login කවුළුව වසා දැම්මා. නැවත උත්සාහ කරන්න.' : 'The Google sign-in window was closed. Try again.';
  }
  if (error?.code === 'auth/network-request-failed') {
    return progress.language === 'si' ? 'Internet connection එක පරීක්ෂා කර නැවත උත්සාහ කරන්න.' : 'Check your internet connection and try again.';
  }
  if (error?.code === 'auth/invalid-api-key' || error?.code === 'auth/api-key-not-valid') {
    return progress.language === 'si' ? 'Firebase API key එක වැරදියි. firebase-config.js පරීක්ෂා කරන්න.' : 'The Firebase API key is invalid. Check firebase-config.js.';
  }
  if (error?.code === 'auth/popup-blocked') return t('googlePopupBlocked');
  if (error?.code === 'auth/email-already-in-use') return t('emailAlreadyUsed');
  if (error?.code === 'auth/invalid-email') return t('invalidEmail');
  if (error?.code === 'auth/weak-password') return t('passwordRequirements');
  return `${t('accountError')} (${error?.code || error?.message || 'unknown error'})`;
}

async function handleRegister(form) {
  profileError = '';
  const formData = new FormData(form);
  const displayName = String(formData.get('displayName') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const confirmPassword = String(formData.get('confirmPassword') || '');
  if (password !== confirmPassword) profileError = t('passwordMismatch');
  else if (password.length < 8) profileError = t('passwordRequirements');
  else if (!firebaseAuthState.configured || !window.JapanGoFirebaseAuth?.signUp) profileError = t('firebaseSetupNeeded');
  else {
    try {
      const result = await window.JapanGoFirebaseAuth.signUp({ email, password, displayName });
      pendingVerificationEmail = result.email || email;
      profileMode = 'verification';
      profileError = '';
      render();
      return;
    } catch (error) {
      profileError = firebaseErrorMessage(error);
    }
  }

  render();
}

async function handleLogin(form) {
  profileError = '';
  const formData = new FormData(form);
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  if (!firebaseAuthState.configured || !window.JapanGoFirebaseAuth?.signIn) profileError = t('firebaseSetupNeeded');
  else {
    try {
      await window.JapanGoFirebaseAuth.signIn({ email, password });
      profileError = '';
      showToast(t('loggedIn'));
      return;
    } catch (error) {
      profileError = firebaseErrorMessage(error);
      if (error?.code === 'auth/email-not-verified') {
        pendingVerificationEmail = email;
        profileMode = 'verification';
        render();
        return;
      }
    }
  }
  render();
}

async function handleGoogleSignIn() {
  profileError = '';
  if (!firebaseAuthState.configured || !window.JapanGoFirebaseAuth?.signInWithGoogle) {
    profileError = t('firebaseSetupNeeded');
    render();
    return;
  }
  try {
    await window.JapanGoFirebaseAuth.signInWithGoogle();
  } catch (error) {
    profileError = firebaseErrorMessage(error);
    render();
  }
}

async function handleResendVerification() {
  profileError = '';
  try {
    await window.JapanGoFirebaseAuth.resendVerification();
    showToast(t('verificationResent'));
  } catch (error) {
    profileError = firebaseErrorMessage(error);
    render();
  }
}

async function handleProfileUpdate(form) {
  const displayName = String(new FormData(form).get('displayName') || '').trim();
  if (!displayName || !window.JapanGoFirebaseAuth?.updateDisplayName) {
    profileError = t('accountError');
    render();
    return;
  }
  try {
    await window.JapanGoFirebaseAuth.updateDisplayName(displayName);
    profileError = '';
    showToast(t('profileUpdated'));
  } catch (error) {
    profileError = firebaseErrorMessage(error);
  }
  render();
}

// Global Event Delegation
document.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  
  if (target.dataset.view) {
    currentView = target.dataset.view;
    if (currentView !== 'practice') quiz = null;
    render();
    content.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (target.dataset.learnMode) {
    learnMode = target.dataset.learnMode;
    render();
  }

  if (target.dataset.profileMode) {
    profileMode = target.dataset.profileMode;
    profileError = '';
    render();
  }

  if (target.hasAttribute('data-sign-out')) {
    window.JapanGoFirebaseAuth?.signOut().then(() => showToast(t('loggedOut'))).catch((error) => {
      profileError = firebaseErrorMessage(error);
      render();
    });
  }

  if (target.hasAttribute('data-google-sign-in')) {
    handleGoogleSignIn();
  }

  if (target.hasAttribute('data-resend-verification')) {
    handleResendVerification();
  }

  if (target.dataset.dictionaryTab) {
    dictionaryTab = target.dataset.dictionaryTab;
    render();
  }
  
  if (target.dataset.script) {
    alphabetScript = target.dataset.script;
    render();
  }
  
  if (target.dataset.kanaSet) {
    alphabetSet = target.dataset.kanaSet;
    render();
  }

  if (target.dataset.practiceMode) {
    practiceMode = target.dataset.practiceMode;
    render();
  }

  if (target.hasAttribute('data-learn-prev')) {
    learnUnitIndex = Math.max(0, learnUnitIndex - 1);
    render();
  }

  if (target.hasAttribute('data-learn-next')) {
    learnUnitIndex = Math.min(learnUnits.length - 1, learnUnitIndex + 1);
    render();
  }

  if (target.hasAttribute('data-learn-complete')) {
    const id = target.dataset.learnComplete;
    if (!progress.completed.includes(id)) {
      progress.completed.push(id);
      recordActivity();
      render();
      showToast(t('completed'));
    }
  }

  if (target.hasAttribute('data-check-writing')) {
    const canvas = document.querySelector('#writing-canvas');
    const pixels = canvas?.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
    const hasInk = pixels ? pixels.some((value, index) => index % 4 === 3 && value > 0) : false;
    if (!hasInk) {
      showToast(t('writingDrawFirst'));
    } else {
      writingDrawing = canvas.toDataURL();
      writingAnswerRevealed = true;
      render();
    }
  }

  if (target.hasAttribute('data-clear-writing')) {
    const canvas = document.querySelector('#writing-canvas');
    canvas?.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    writingDrawing = '';
    writingHasStroke = false;
    const checkButton = document.querySelector('[data-check-writing]');
    if (checkButton) checkButton.disabled = true;
  }

  if (target.hasAttribute('data-next-writing')) {
    writingTarget = kana[Math.floor(Math.random() * kana.length)];
    writingHasStroke = false;
    writingAnswerRevealed = false;
    writingDrawing = '';
    render();
  }
  
  if (target.matches('#settings-button, #mobile-settings')) openSettings();
  if (target.matches('#theme-toggle, #sidebar-theme-toggle')) toggleTheme();
  
  if (target.dataset.language) {
    selectedLanguage = target.dataset.language;
    document.querySelectorAll('.language-choice').forEach((button) => button.classList.toggle('selected', button.dataset.language === selectedLanguage));
  }
  
  if (target.hasAttribute('data-save-language')) {
    progress.language = selectedLanguage;
    saveProgress();
    document.querySelector('#modal-root').innerHTML = '';
    render();
    showToast(t('saved'));
  }
  
  if (target.hasAttribute('data-close')) document.querySelector('#modal-root').innerHTML = '';
  
  if (target.hasAttribute('data-complete')) {
    const id = target.dataset.complete;
    if (!progress.completed.includes(id)) {
      progress.completed.push(id);
      recordActivity();
      render();
      showToast(t('completed'));
    }
  }
  
  if (target.hasAttribute('data-start-quiz')) startQuiz();
  
  if (target.hasAttribute('data-answer') && quiz && !quiz.answered) {
    const question = quiz.questions[quiz.index];
    question.answer = target.dataset.answer;
    quiz.answered = true;
    if (question.answer === question.target.romaji) quiz.score += 1;
    render();
  }
  
  if (target.hasAttribute('data-next') && quiz) {
    quiz.index += 1;
    quiz.answered = false;
    if (quiz.index >= 5) {
      progress.quizResults.push({ score: quiz.score, date: new Date().toISOString().slice(0, 10) });
      recordActivity();
    }
    render();
  }
  
  const speakTarget = target.closest('[data-speak]');
  if (speakTarget) speak(speakTarget.dataset.speak);
  
  if (target.hasAttribute('data-translate')) translateToJapanese();
  
  if (target.hasAttribute('data-reset')) {
    if (window.confirm(t('resetAsk'))) {
      const language = progress.language;
      progress = { language, completed: [], quizResults: [], activityDates: [], favorites: [] };
      saveProgress();
      render();
      showToast(t('resetDone'));
    }
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.matches('#register-form')) {
    event.preventDefault();
    handleRegister(event.target);
  }
  if (event.target.matches('#login-form')) {
    event.preventDefault();
    handleLogin(event.target);
  }
  if (event.target.matches('#profile-form')) {
    event.preventDefault();
    handleProfileUpdate(event.target);
  }
});

window.addEventListener('japango-auth-state', (event) => {
  firebaseAuthState = event.detail;
  if (firebaseAuthState.user) {
    profileError = '';
    profileMode = 'login';
  }
  render();
});

window.addEventListener('DOMContentLoaded', () => {
  const firebaseBridge = window.JapanGoFirebaseAuth;
  if (!firebaseBridge) {
    firebaseAuthState = { configured: false, status: 'unconfigured', user: null, error: 'Auth adapter missing' };
    render();
    return;
  }
  firebaseAuthState = { ...firebaseBridge.state };
  render();
});

document.addEventListener('input', (event) => {
  if (event.target.matches('#word-search')) renderWordList();
  if (event.target.matches('#phrase-search')) renderPhraseList();
  if (event.target.matches('#source-text')) translationInput = event.target.value;
});

document.addEventListener('change', (event) => {
  if (event.target.matches('#word-filter')) renderWordList();
  if (event.target.matches('#phrase-filter')) renderPhraseList();
  if (event.target.matches('#source-language')) translationLanguage = event.target.value;
  if (event.target.matches('#learn-unit-select')) {
    learnUnitIndex = Number(event.target.value);
    render();
  }
});

// Initialize Theme & App
applyTheme(currentTheme);
render();
if (!localStorage.getItem(STORAGE_KEY)) openSettings(true);
