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
  {
    filename: 'gun.gltf',
    title: 'Revolver',
    description: 'A model of a revolver',
    date: new Date('2023-05-03'),
    software: 'Blockbench',
    polygons: 50,
  },
  {
    filename: 'msk.gltf',
    title: 'Insect Cage',
    description: 'A model of a cage for insects',
    date: new Date('2024-08-21'),
    polygons: 84,
    software: 'Blockbench',
  },
];

export default models;
