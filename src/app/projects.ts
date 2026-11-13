export type ProjectType = 'web' | 'mobile' | 'desktop';
export interface Project {
  id: string;
  name: string;
  category: string;
  type: ProjectType;
  image: string;
  summary: string;
  description: string;
  features: string[];
  gallery: string[];
}
export const PROJECTS: readonly Project[] = [
  {
    id: 'medcare',
    name: 'Medcare',
    category: 'Mobile \u00b7 Healthcare',
    type: 'mobile',
    image: 'medcare-home.png',
    summary: 'A connected healthcare experience for patients and medical teams.',
    description:
      'A healthcare application connecting patients with doctors, laboratories and medical service providers. The experience brings service requests, bookings, results and medical-team workflows together.',
    features: [
      'Healthcare service requests',
      'Laboratory tests and results',
      'Patient and staff experiences',
    ],
    gallery: ['medcare-home.png', 'medcare-lab.png', 'medcare-staff.png'],
  },
  {
    id: 'paxi',
    name: 'Paxi Go',
    category: 'Mobile \u00b7 Transport',
    type: 'mobile',
    image: 'paxi-go.webp',
    summary: 'Ride and delivery requests, connected through one mobile experience.',
    description:
      'An iPhone and Android application for ride and delivery requests, map-based booking, live tracking and request updates.',
    features: ['Ride and delivery booking', 'Live tracking', 'Trip and order history'],
    gallery: ['paxi-go.webp'],
  },
  {
    id: 'ulm',
    name: 'ULM Care',
    category: 'Mobile \u00b7 Healthcare',
    type: 'mobile',
    image: 'ulm-care.webp',
    summary: 'Medical services and home-visit bookings in one place.',
    description:
      'A healthcare application bringing doctor appointments, medical service bookings, laboratory and radiology requests, and home visits into one mobile experience.',
    features: ['Doctor appointments', 'Laboratory and radiology bookings', 'Home visit requests'],
    gallery: ['ulm-care.webp'],
  },
  {
    id: 'nagah',
    name: 'Nagah',
    category: 'Mobile \u00b7 Community',
    type: 'mobile',
    image: 'nagah.webp',
    summary: 'Road incident reporting, maps and community insights.',
    description:
      'A mobile application for reporting road incidents, potholes and congestion using an interactive map, location-based reports, photos and an administration review workflow.',
    features: ['Map-based incident reports', 'Report status tracking', 'Administration review'],
    gallery: ['nagah.webp'],
  },
  {
    id: 'adele',
    name: 'Adele',
    category: 'Web \u00b7 Fashion & lifestyle',
    type: 'web',
    image: 'adele.webp',
    summary: 'A bilingual fashion catalog with a responsive brand experience.',
    description:
      'A responsive fashion and lifestyle website with English and Arabic interfaces, product search, collections and galleries, WhatsApp product enquiries and a content-management dashboard.',
    features: ['Arabic and English', 'Product discovery', 'Content management'],
    gallery: ['adele.webp'],
  },
  {
    id: 'skinalyze',
    name: 'Skinalyze',
    category: 'Mobile \u00b7 AI integration',
    type: 'mobile',
    image: 'skinalyze.webp',
    summary: 'An AI-assisted skin-image application with a clear upload journey.',
    description:
      'A Flutter application that connects skin-image uploads to an AI-assisted analysis backend. The experience includes authentication, Arabic localization, saved checks and dark mode.',
    features: ['Image upload workflow', 'AI backend integration', 'Localized interfaces'],
    gallery: ['skinalyze.webp'],
  },
  {
    id: 'ava',
    name: 'Ava',
    category: 'Mobile \u00b7 Accessibility',
    type: 'mobile',
    image: 'ava.webp',
    summary: 'Speech and Arabic Sign Language in an accessible mobile experience.',
    description:
      'An accessibility-focused mobile application using AI integration to translate speech into Arabic Sign Language, with localization and light and dark interfaces.',
    features: ['Speech translation', 'Arabic Sign Language', 'Accessible interfaces'],
    gallery: ['ava.webp'],
  },
  {
    id: 'alopr',
    name: 'Alopr',
    category: 'Mobile \u00b7 Healthcare',
    type: 'mobile',
    image: 'alopr.webp',
    summary: 'A digital space connecting patients, followers and doctors.',
    description:
      'An application supporting communication between Alzheimer\u2019s patients and their doctors, with patient and follower journeys, profiles, assessments and AI-assisted chat integration.',
    features: ['Patient and follower journeys', 'Doctor communication', 'AI-assisted chat'],
    gallery: ['alopr.webp'],
  },
  {
    id: 'quarto',
    name: 'Quarto',
    category: 'Desktop \u00b7 Business operations',
    type: 'desktop',
    image: 'quarto.webp',
    summary: 'Gaming sessions, caf\u00e9 orders and billing in one operational workspace.',
    description:
      'A desktop application for PlayStation lounge and caf\u00e9 management. The system covers rooms, gaming sessions, caf\u00e9 tables, customer and staff orders, checkout and business reporting.',
    features: ['Rooms and gaming sessions', 'Orders and checkout', 'Operations reporting'],
    gallery: ['quarto.webp'],
  },
];
