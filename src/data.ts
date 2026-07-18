import heroImg from './assets/images/hero_mountain_cabin_1784369504047.jpg';
import cozyImg from './assets/images/cozy_chalet_1784369515930.jpg';
import familyImg from './assets/images/family_villa_1784369528576.jpg';
import groupImg from './assets/images/group_chalet_1784369539728.jpg';

export const cabins = [
  {
    id: 'cozy-chalet',
    name: 'Cozy Chalet',
    slug: 'Solo',
    category: 'Intimate Escape',
    description: 'The perfect place for a romantic getaway or nature retreat. A compact yet thoughtfully designed space with panoramic windows overlooking the forest.',
    capacity: '2 guests',
    size: '45 m²',
    image: cozyImg,
  },
  {
    id: 'family-villa',
    name: 'Family Villa',
    slug: 'Nest',
    category: 'Family Retreat',
    description: 'A spacious modular home for comfortable family holidays. Two bedrooms, a large terrace, and a cozy living room with a fireplace for evenings together.',
    capacity: '4-6 guests',
    size: '85 m²',
    image: familyImg,
  },
  {
    id: 'group-chalet',
    name: 'Retreat Chalet',
    slug: 'Hub',
    category: 'Social Gathering',
    description: 'A large space for friends and big companies. Multiple lounge areas, a huge terrace for parties under the stars, and maximum comfort for everyone.',
    capacity: '8-10 guests',
    size: '140 m²',
    image: groupImg,
  }
];

export const siteData = {
  heroImage: heroImg,
};
