// Simulated animal data with real-time vitals
export const generateAnimalData = () => {
  const animalTypes = ['Dog', 'Cat', 'Bird', 'Horse', 'Cow', 'Elephant', 'Snake', 'Fish', 'Rabbit', 'Deer'];
  const locations = [
    { lat: 40.7128, lng: -74.0060, name: 'New York' },
    { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
    { lat: 41.8781, lng: -87.6298, name: 'Chicago' },
    { lat: 29.7604, lng: -95.3698, name: 'Houston' },
    { lat: 33.4484, lng: -112.0740, name: 'Phoenix' },
    { lat: 39.7392, lng: -104.9903, name: 'Denver' },
    { lat: 47.6062, lng: -122.3321, name: 'Seattle' },
    { lat: 25.7617, lng: -80.1918, name: 'Miami' },
    { lat: 42.3601, lng: -71.0589, name: 'Boston' },
    { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
  ];

  return animalTypes.map((type, index) => {
    const isCritical = Math.random() > 0.7;
    return {
      id: index + 1,
      name: `${type} ${index + 1}`,
      type,
      location: locations[index],
      vitals: {
        heartRate: isCritical ? Math.floor(Math.random() * 30) + 150 : Math.floor(Math.random() * 40) + 60,
        stress: isCritical ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 20,
        activity: isCritical ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 30,
      },
      status: isCritical ? 'critical' : 'normal',
      lastUpdated: new Date().toISOString(),
      history: generateHistoryData(isCritical)
    };
  });
};

const generateHistoryData = (isCritical) => {
  const data = [];
  for (let i = 23; i >= 0; i--) {
    const time = new Date();
    time.setHours(time.getHours() - i);
    data.push({
      time: time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
      heartRate: isCritical ? Math.floor(Math.random() * 30) + 140 : Math.floor(Math.random() * 30) + 60,
      stress: isCritical ? Math.floor(Math.random() * 20) + 70 : Math.floor(Math.random() * 30) + 20,
      activity: isCritical ? Math.floor(Math.random() * 20) + 70 : Math.floor(Math.random() * 30) + 30,
    });
  }
  return data;
};

// News feed data - using dynamic dates
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

export const newsData = [
  {
    id: 1,
    title: 'Earthquake Alert System Saves Lives in California',
    content: 'Early warning system detected unusual animal behavior 2 hours before magnitude 6.5 earthquake.',
    date: today.toISOString().split('T')[0],
    category: 'Earthquake',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400',
  },
  {
    id: 2,
    title: 'New AI Algorithm Improves Tsunami Prediction',
    content: 'Machine learning model analyzes marine animal behavior to predict tsunami events with 95% accuracy.',
    date: yesterday.toISOString().split('T')[0],
    category: 'Tsunami',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
  },
  {
    id: 3,
    title: 'Flood Prevention Through Animal Monitoring',
    content: 'Monitoring bird migration patterns helps authorities prepare for seasonal floods.',
    date: twoDaysAgo.toISOString().split('T')[0],
    category: 'Flood',
    image: 'https://images.unsplash.com/photo-1547640884-5f6e0e5b0f4c?w=400',
  },
];

// Quiz data
export const quizData = [
  {
    id: 1,
    category: 'Earthquake',
    question: 'What should you do during an earthquake?',
    options: [
      'Run outside immediately',
      'Drop, Cover, and Hold On',
      'Stand in a doorway',
      'Use the elevator',
    ],
    correctAnswer: 1,
    explanation: 'Drop, Cover, and Hold On is the safest action during an earthquake.',
  },
  {
    id: 2,
    category: 'Earthquake',
    question: 'Where is the safest place during an earthquake?',
    options: [
      'Under a sturdy table',
      'Near windows',
      'In an elevator',
      'Under a tree',
    ],
    correctAnswer: 0,
    explanation: 'Shelter under a sturdy table to protect yourself from falling objects.',
  },
  {
    id: 3,
    category: 'Tsunami',
    question: 'What is the first sign of a tsunami?',
    options: [
      'Heavy rain',
      'Earthquake or rapid sea withdrawal',
      'Strong winds',
      'Dark clouds',
    ],
    correctAnswer: 1,
    explanation: 'An earthquake or the sea rapidly withdrawing are warning signs of a tsunami.',
  },
  {
    id: 4,
    category: 'Tsunami',
    question: 'What should you do if you see a tsunami warning?',
    options: [
      'Go to the beach to watch',
      'Move to higher ground immediately',
      'Stay in your car',
      'Wait for official confirmation',
    ],
    correctAnswer: 1,
    explanation: 'Move to higher ground immediately when a tsunami warning is issued.',
  },
  {
    id: 5,
    category: 'Flood',
    question: 'How deep does water need to be to sweep away a car?',
    options: [
      '6 inches',
      '12 inches',
      '24 inches',
      '36 inches',
    ],
    correctAnswer: 1,
    explanation: 'Just 12 inches of flowing water can sweep away most vehicles.',
  },
  {
    id: 6,
    category: 'Flood',
    question: 'What should you do if trapped in a flooded building?',
    options: [
      'Wait in the basement',
      'Move to the highest level',
      'Try to swim out',
      'Stay on the ground floor',
    ],
    correctAnswer: 1,
    explanation: 'Move to the highest level of the building and wait for rescue.',
  },
];

// Shelter and hospital locations
export const emergencyLocations = [
  { id: 1, type: 'shelter', name: 'Central Emergency Shelter', lat: 40.7580, lng: -73.9855, capacity: 500 },
  { id: 2, type: 'shelter', name: 'West Side Shelter', lat: 40.7489, lng: -73.9680, capacity: 300 },
  { id: 3, type: 'hospital', name: 'City General Hospital', lat: 40.7614, lng: -73.9776, beds: 250 },
  { id: 4, type: 'hospital', name: 'Memorial Medical Center', lat: 40.7529, lng: -73.9772, beds: 400 },
  { id: 5, type: 'shelter', name: 'North Emergency Center', lat: 40.7794, lng: -73.9632, capacity: 400 },
  { id: 6, type: 'hospital', name: 'Downtown Clinic', lat: 40.7359, lng: -74.0014, beds: 150 },
];

// Survival guide content
export const survivalGuides = {
  earthquake: {
    title: 'Earthquake Survival Guide',
    icon: '🌍',
    sections: [
      {
        title: 'Before an Earthquake',
        steps: [
          'Secure heavy furniture and appliances',
          'Create an emergency kit with water, food, and supplies',
          'Identify safe spots in each room',
          'Practice drop, cover, and hold on drills',
        ],
      },
      {
        title: 'During an Earthquake',
        steps: [
          'Drop to your hands and knees',
          'Cover your head and neck under sturdy furniture',
          'Hold on until shaking stops',
          'Stay away from windows and heavy objects',
          'If outdoors, move away from buildings and power lines',
        ],
      },
      {
        title: 'After an Earthquake',
        steps: [
          'Check yourself and others for injuries',
          'Inspect your home for damage',
          'Be prepared for aftershocks',
          'Listen to emergency broadcasts',
          'Avoid damaged areas and structures',
        ],
      },
    ],
  },
  tsunami: {
    title: 'Tsunami Survival Guide',
    icon: '🌊',
    sections: [
      {
        title: 'Before a Tsunami',
        steps: [
          'Know your evacuation routes',
          'Prepare an emergency kit',
          'Learn the warning signs',
          'Practice evacuation drills',
        ],
      },
      {
        title: 'During a Tsunami',
        steps: [
          'Move to higher ground immediately',
          'Stay at least 100 feet above sea level or 2 miles inland',
          'Do not wait for official warning',
          'Never go to the beach to watch',
          'Stay away from rivers and streams',
        ],
      },
      {
        title: 'After a Tsunami',
        steps: [
          'Stay on high ground until officials say it is safe',
          'Be aware of multiple waves',
          'Avoid floodwater - it may be contaminated',
          'Return home only when authorities declare it safe',
          'Document property damage',
        ],
      },
    ],
  },
  flood: {
    title: 'Flood Survival Guide',
    icon: '💧',
    sections: [
      {
        title: 'Before a Flood',
        steps: [
          'Know your flood risk',
          'Create evacuation plan',
          'Prepare emergency kit',
          'Move valuables to higher floors',
        ],
      },
      {
        title: 'During a Flood',
        steps: [
          'Move to higher ground immediately',
          'Avoid walking or driving through floodwater',
          'Just 6 inches can knock you down',
          'Turn off utilities if instructed',
          'Do not touch electrical equipment if wet',
        ],
      },
      {
        title: 'After a Flood',
        steps: [
          'Return home only when safe',
          'Avoid floodwater - may be contaminated',
          'Document all damage',
          'Throw away contaminated food',
          'Clean and disinfect everything',
        ],
      },
    ],
  },
};
