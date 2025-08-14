import type { Model } from '../types/common';
const models: Model[] = [
  {
    filename: 'warn.gltf',
    title: 'File Not Found',
    description: 'The requested file was not found on the server.',
    date: new Date('2025-08-13'),
    software: 'Blockbench',
    polygons: 6,
  },
  {
    filename: 'mht.gltf',
    title: 'Double Sided Sword (Unfinished)',
    description: 'A double sided sword model from the anime "Neon Genesis Evangelion".',
    date: new Date('2024-10-24'),
    software: 'Blockbench',
    polygons: 397,
  },
];

export default models;
