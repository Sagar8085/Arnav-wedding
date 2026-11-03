import { createContext, useContext, useEffect, useState } from 'react'

const translations = {
  en: {
    'intro.tap': 'Tap to Open',
    'intro.sound': 'Turn on sound for the best experience 🎵',
    'intro.blessing': '|| Shree Ganeshaya Namah ||',
    'intro.ceremony': 'Wedding Ceremony',

    'bride.name': 'Anisha',
    'bride.parents': 'Daughter of Smt. Rina Devi & Sh. Dinesh Prasad',
    'bride.place': 'Raxaul, Bihar',
    'groom.name': 'Arnav',
    'groom.parents': 'Son of Smt. Neeta Devi & Sh. Surendra Prasad',
    'groom.place': 'Narkatiaganj, Bihar',
    'bride.label': 'Bride',
    'groom.label': 'Groom',

    'hero.getting_married': 'Are Getting Married',
    'date.short': '19 January 2027',

    'welcome.ceremony': 'Wedding Ceremony',
    'welcome.blessing': 'With the blessings of our families,',
    'welcome.invite': 'we invite you to celebrate this special occasion with us.',
    'welcome.quote': 'Two souls with but a single thought, two hearts that beat as one',

    'couple.title': 'The Bride & The Groom',
    'couple.subtitle': 'Two hearts, two families, one beautiful journey',
    'couple.description': 'A beautiful bond united in love, embarking on the greatest adventure of their lives together.',
    'couple.photo_soon': 'Photo coming soon',

    'details.title': 'Wedding Details',
    'details.subtitle': 'Save the date and join us for this special celebration',
    'details.date_label': 'Wedding Date',
    'details.date_value': '19 January 2027',
    'details.date_note': 'Baraat • 7:00 PM onwards',
    'details.venue_label': 'Venue',
    'details.venue_value': 'Hotel Ichchha Ltd.',
    'details.add_to_calendar': 'Add to Calendar',
    'details.open_map': 'Open in Google Maps',
    'details.blessing_title': 'Blessed by Our Families',
    'details.blessing_desc': 'Two families from Raxaul and Narkatiaganj come together in joy. Your presence and blessings will make this union complete.',

    'schedule.title': 'Wedding Schedule',
    'schedule.subtitle': 'Two days of rituals, music and celebration',
    'schedule.day1': '18 January 2027',
    'schedule.day2': '19 January 2027',
    'schedule.at_venue': 'At the venue',
    'schedule.mehndi': 'Mehndi',
    'schedule.mehndi_time': '1:00 PM onwards',
    'schedule.mehndi_desc': 'Intricate henna designs, laughter and songs as the bride is adorned for her big day.',
    'schedule.sangeet': 'Sangeet & Engagement',
    'schedule.sangeet_time': '7:00 PM onwards',
    'schedule.sangeet_desc': 'An evening of music, dance and the exchange of rings between the couple.',
    'schedule.haldi': 'Haldi',
    'schedule.haldi_time': '11:00 AM onwards',
    'schedule.haldi_desc': 'The auspicious turmeric ceremony that blesses the couple with glow and good fortune.',
    'schedule.baraat': 'Baraat',
    'schedule.baraat_time': '7:00 PM onwards',
    'schedule.baraat_desc': 'The grand procession of the groom with family, friends, music and dancing.',

    'celebration.title1': 'We Look Forward',
    'celebration.title2': 'To Celebrating With You',
    'celebration.message': 'Your presence will make our special day even more memorable.',
    'celebration.see_you': 'See you on 19 January 2027!',

    'thankyou.title': 'Thank You',
    'thankyou.see_you': 'See You At The Wedding',
    'thankyou.datetime': '19 January 2027 • Baraat 7:00 PM',
    'thankyou.location': 'Hotel Ichchha Ltd.',
    'thankyou.quote': '"Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope."',

    'map.navigate': 'Navigate to Venue',
  },
  hi: {
    'intro.tap': 'खोलने के लिए टैप करें',
    'intro.sound': 'सर्वोत्तम अनुभव के लिए ध्वनि चालू करें 🎵',
    'intro.blessing': '|| श्री गणेशाय नमः ||',
    'intro.ceremony': 'शुभ विवाह',

    'bride.name': 'अनीशा',
    'bride.parents': 'सुपुत्री श्रीमती रीना देवी एवं श्री दिनेश प्रसाद',
    'bride.place': 'रक्सौल, बिहार',
    'groom.name': 'अर्णव',
    'groom.parents': 'सुपुत्र श्रीमती नीता देवी एवं श्री सुरेन्द्र प्रसाद',
    'groom.place': 'नरकटियागंज, बिहार',
    'bride.label': 'वधू',
    'groom.label': 'वर',

    'hero.getting_married': 'विवाह बंधन में बंध रहे हैं',
    'date.short': '19 जनवरी 2027',

    'welcome.ceremony': 'शुभ विवाह',
    'welcome.blessing': 'परिवारजनों के आशीर्वाद से,',
    'welcome.invite': 'हम आपको इस शुभ अवसर पर हमारे साथ उत्सव मनाने हेतु सादर आमंत्रित करते हैं।',
    'welcome.quote': 'दो आत्माएं, एक विचार, दो दिल, एक धड़कन',

    'couple.title': 'वर एवं वधू',
    'couple.subtitle': 'दो दिल, दो परिवार, एक खूबसूरत सफर',
    'couple.description': 'प्यार में जुड़े दो दिल, जीवन की सबसे अद्भुत यात्रा पर साथ निकल रहे हैं।',
    'couple.photo_soon': 'फोटो जल्द आ रही है',

    'details.title': 'विवाह विवरण',
    'details.subtitle': 'तिथि को सहेजें और हमारे विशेष उत्सव में शामिल हों',
    'details.date_label': 'विवाह तिथि',
    'details.date_value': '19 जनवरी 2027',
    'details.date_note': 'बारात • शाम 7:00 बजे से',
    'details.venue_label': 'स्थल',
    'details.venue_value': 'होटल इच्छा लिमिटेड',
    'details.add_to_calendar': 'कैलेंडर में जोड़ें',
    'details.open_map': 'Google Maps में खोलें',
    'details.blessing_title': 'परिवारों का आशीर्वाद',
    'details.blessing_desc': 'रक्सौल और नरकटियागंज के दो परिवार खुशी से एक हो रहे हैं। आपकी उपस्थिति और आशीर्वाद इस मिलन को पूर्ण करेंगे।',

    'schedule.title': 'विवाह कार्यक्रम',
    'schedule.subtitle': 'रस्मों, संगीत और उत्सव के दो दिन',
    'schedule.day1': '18 जनवरी 2027',
    'schedule.day2': '19 जनवरी 2027',
    'schedule.at_venue': 'विवाह स्थल पर',
    'schedule.mehndi': 'मेहंदी',
    'schedule.mehndi_time': 'दोपहर 1:00 बजे से',
    'schedule.mehndi_desc': 'सुंदर मेहंदी, हंसी और गीतों के साथ दुल्हन का श्रृंगार।',
    'schedule.sangeet': 'संगीत एवं सगाई',
    'schedule.sangeet_time': 'शाम 7:00 बजे से',
    'schedule.sangeet_desc': 'संगीत, नृत्य और वर-वधू के बीच अंगूठियों के आदान-प्रदान की शाम।',
    'schedule.haldi': 'हल्दी',
    'schedule.haldi_time': 'सुबह 11:00 बजे से',
    'schedule.haldi_desc': 'शुभ हल्दी की रस्म जो दंपत्ति को निखार और सौभाग्य का आशीर्वाद देती है।',
    'schedule.baraat': 'बारात',
    'schedule.baraat_time': 'शाम 7:00 बजे से',
    'schedule.baraat_desc': 'परिवार, मित्रों, संगीत और नृत्य के साथ दूल्हे की भव्य बारात।',

    'celebration.title1': 'हम आपके साथ',
    'celebration.title2': 'जश्न मनाने के लिए उत्सुक हैं',
    'celebration.message': 'आपकी उपस्थिति हमारे विशेष दिन को और भी यादगार बना देगी।',
    'celebration.see_you': '19 जनवरी 2027 को मिलते हैं!',

    'thankyou.title': 'धन्यवाद',
    'thankyou.see_you': 'विवाह में मिलते हैं',
    'thankyou.datetime': '19 जनवरी 2027 • बारात शाम 7:00 बजे',
    'thankyou.location': 'होटल इच्छा लिमिटेड',
    'thankyou.quote': '"प्रेम कोई बाधा नहीं पहचानता। यह बाधाओं को कूदता है, बाड़ों को पार करता है, दीवारों को भेदता है और आशा से भरे अपने गंतव्य तक पहुंचता है।"',

    'map.navigate': 'स्थान पर नेविगेट करें',
  },
}

const LanguageContext = createContext(null)

function readLangFromUrl() {
  const lang = new URLSearchParams(window.location.search).get('lang')
  return lang === 'hi' || lang === 'en' ? lang : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readLangFromUrl)

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('lang', language)
    window.history.replaceState(null, '', url.toString())
    document.documentElement.lang = language
  }, [language])

  const t = (key) => translations[language][key] ?? key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
