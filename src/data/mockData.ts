import { Trip } from '../types';

export const mockTrips: Trip[] = [
  {
    id: '1',
    destination: 'Bali, Indonesia',
    vibe: 'Chill beach getaway with spiritual vibes',
    duration: 7,
    budget: '$1,200',
    coverImage: 'https://images.pexels.com/photos/2070485/pexels-photo-2070485.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['chill', 'spiritual', 'beach'],
    createdAt: '2024-03-15',
    days: [
      {
        day: 1,
        label: 'Day 1 — Arrival',
        places: [
          {
            id: 'b1',
            name: 'Ngurah Rai International Airport',
            time: '2:00 PM',
            cost: '$0',
            why: 'Your gateway to paradise. Grab a SIM card, exchange currency, and breathe in that warm Balinese air.',
            category: 'transport',
            image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 'b2',
            name: 'Seminyak Beach Club',
            time: '5:00 PM',
            cost: '$25',
            why: 'Best sunset views on the island. Sip a cocktail and let the ocean melt your stress away.',
            category: 'activity',
            image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 'b3',
            name: 'Mama San Restaurant',
            time: '8:00 PM',
            cost: '$30',
            why: 'Award-winning Asian fusion. The perfect first dinner to set the tone for your trip.',
            category: 'food',
            image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
        ],
      },
      {
        day: 2,
        label: 'Day 2 — Ubud',
        places: [
          {
            id: 'b4',
            name: 'Tegallalang Rice Terraces',
            time: '8:00 AM',
            cost: '$5',
            why: 'UNESCO heritage site. Early morning light creates golden-hour magic perfect for photos.',
            category: 'attraction',
            image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 'b5',
            name: 'Sacred Monkey Forest Sanctuary',
            time: '11:00 AM',
            cost: '$8',
            why: 'Ancient Hindu temples surrounded by playful macaques — truly one-of-a-kind.',
            category: 'attraction',
            image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 'b6',
            name: 'Locavore Restaurant',
            time: '7:00 PM',
            cost: '$60',
            why: 'One of Asia\'s best restaurants. Farm-to-table Balinese cuisine — a meal you\'ll never forget.',
            category: 'food',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
        ],
      },
      {
        day: 3,
        label: 'Day 3 — Spiritual',
        places: [
          {
            id: 'b7',
            name: 'Tanah Lot Temple',
            time: '6:00 AM',
            cost: '$5',
            why: 'The most iconic temple in Bali. Sunrise here is absolutely transcendent.',
            category: 'attraction',
            image: 'https://images.pexels.com/photos/2404370/pexels-photo-2404370.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 'b8',
            name: 'Tirta Empul Temple',
            time: '10:00 AM',
            cost: '$3',
            why: 'Sacred spring temple where locals purify themselves. A deeply moving cultural experience.',
            category: 'attraction',
            image: 'https://images.pexels.com/photos/4553620/pexels-photo-4553620.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 'b9',
            name: 'Jari Menari Spa',
            time: '3:00 PM',
            cost: '$45',
            why: 'World-renowned Balinese massage. Your body will thank you after all that exploring.',
            category: 'activity',
            image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    destination: 'Tokyo, Japan',
    vibe: 'Foodie adventure meets urban exploration',
    duration: 10,
    budget: '$2,800',
    coverImage: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['foodie', 'urban', 'adventure'],
    createdAt: '2024-02-20',
    days: [
      {
        day: 1,
        label: 'Day 1 — Shinjuku',
        places: [
          {
            id: 't1',
            name: 'Shinjuku Golden Gai',
            time: '4:00 PM',
            cost: '$15',
            why: 'Maze of 200 tiny bars. Drop your bags and dive straight into Tokyo\'s electric soul.',
            category: 'activity',
            image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 't2',
            name: 'Tokyo Ramen Street',
            time: '7:30 PM',
            cost: '$15',
            why: 'Eight legendary ramen shops under one roof. Your Tokyo food odyssey starts here.',
            category: 'food',
            image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
        ],
      },
      {
        day: 2,
        label: 'Day 2 — Asakusa',
        places: [
          {
            id: 't3',
            name: 'Senso-ji Temple',
            time: '7:00 AM',
            cost: '$0',
            why: 'Tokyo\'s oldest temple. Arrive early to beat the crowds and feel the ancient energy.',
            category: 'attraction',
            image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 't4',
            name: 'Tsukiji Outer Market',
            time: '9:30 AM',
            cost: '$20',
            why: 'Freshest sushi breakfast on the planet. The tuna here is life-changing.',
            category: 'food',
            image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    destination: 'Amalfi Coast, Italy',
    vibe: 'Romantic escape with Mediterranean luxury',
    duration: 5,
    budget: '$3,500',
    coverImage: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['romantic', 'luxury', 'cultural'],
    createdAt: '2024-01-10',
    days: [
      {
        day: 1,
        label: 'Day 1 — Positano',
        places: [
          {
            id: 'a1',
            name: 'Spiaggia Grande Beach',
            time: '10:00 AM',
            cost: '$15',
            why: 'Iconic pebble beach with colorful buildings cascading down the cliffs. Postcard-perfect.',
            category: 'activity',
            image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          {
            id: 'a2',
            name: 'Il San Pietro Restaurant',
            time: '8:00 PM',
            cost: '$120',
            why: 'Michelin-starred cliffside dining. The sea bass with lemon is a religious experience.',
            category: 'food',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
        ],
      },
    ],
  },
];

export const loadingSteps = [
  { id: 1, text: 'Analyzing your vibe...', sub: 'Understanding your travel personality' },
  { id: 2, text: 'Finding best spots...', sub: 'Scanning 10,000+ curated locations' },
  { id: 3, text: 'Optimizing your route...', sub: 'Minimizing travel time between stops' },
  { id: 4, text: 'Calculating costs...', sub: 'Fitting everything within your budget' },
  { id: 5, text: 'Crafting your story...', sub: 'Generating captions and highlights' },
];

export const vibeChips = [
  { id: 'chill', label: 'Chill' },
  { id: 'foodie', label: 'Foodie' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'romantic', label: 'Romantic' },
  { id: 'party', label: 'Party' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'budget', label: 'Budget' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'family', label: 'Family' },
  { id: 'solo', label: 'Solo' },
  { id: 'nature', label: 'Nature' },
];

export const mockCaptions = [
  'Lost in paradise, found myself. Every corner tells a story — the kind that lingers long after you\'ve left. #Wanderlust #TravelVibes #Voya',
  'Not all those who wander are lost... but I\'m definitely directionally challenged and loving every second. #Adventure #GoodVibesOnly #Voya',
  'Golden hour hits different when you\'re 10,000 miles from home. Some places you visit. Others, you feel. #TravelPhotography #Blessed',
  'The best travel stories are the ones you never planned. Chasing sunsets and good food, one city at a time. #Spontaneous #Foodie #Voya',
  'This view? Un-real. Sometimes you have to go far to find what was always inside you. #SoulTravel #Wanderlust #VoyaApp',
];

export const budgetOptions = [
  { id: 'budget', label: 'Budget', sub: 'Under $500' },
  { id: 'mid', label: 'Mid-range', sub: '$500–$2,000' },
  { id: 'premium', label: 'Premium', sub: '$2,000–$5,000' },
  { id: 'luxury', label: 'Luxury', sub: '$5,000+' },
];
