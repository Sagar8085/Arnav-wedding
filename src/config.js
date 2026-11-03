// All wedding data lives here. Edit this file to change names, dates, photos or music.

export const WEDDING = {
  // Google Maps link shared by the family
  mapsUrl: 'https://maps.app.goo.gl/v5ePQWBJy9Xx4GSC7?g_st=ic',

  // Google Calendar event (times in UTC: 7:00 PM IST = 13:30 UTC)
  calendar: {
    title: 'Anisha & Arnav Wedding',
    start: '20270119T133000Z',
    end: '20270119T183000Z',
    details: 'With the blessings of our families, we invite you to celebrate this special occasion with us.',
    location: 'Hotel Ichchha Ltd.',
  },

  // Photos: drop files into /public/photos with these names.
  // Until a file exists, a decorative placeholder is shown instead.
  photos: {
    couple: '/photos/couple.jpg',
    venue: '/photos/venue.jpg',
    deity: '/photos/ganesha.png',
  },

  // Golden Ganesh animation shown in the intro medallion and blessing card
  ganeshVideo: '/golden_ganesh_animation.mp4',

  // Background music (Ganesh mantra). If the file is missing,
  // a soft generated raga melody plays instead.
  music: '/ganesh-mantra.mp3',
}
