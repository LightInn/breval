import * as migration_20261024_200350_initial from './20261024_200350_initial';
import * as migration_20261024_214019_storage_prefix from './20261024_214019_storage_prefix';

export const migrations = [
  {
    up: migration_20261024_200350_initial.up,
    down: migration_20261024_200350_initial.down,
    name: '20261024_200350_initial',
  },
  {
    up: migration_20261024_214019_storage_prefix.up,
    down: migration_20261024_214019_storage_prefix.down,
    name: '20261024_214019_storage_prefix'
  },
];
