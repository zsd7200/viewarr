import { genres } from '@/components/filter/genres';

export function randomGenre() {
  return genres[Math.floor(Math.random() * genres.length)];
}

export const filterDefaults = {
  availableMethods: {
    genre: ['and', 'or'],
  },
  filter: {
    genre: {
      value: randomGenre(),
      method: 'and',
      available: true,
    },
  },
};