import SPELLS from 'common/SPELLS';

const SHAMAN_BASE_ABILITIES = [
  SPELLS.HEALING_WAVE,
  SPELLS.CHAIN_HEAL,
  SPELLS.HEALING_SURGE,
  SPELLS.HEALING_STREAM_TOTEM_HEAL,
  SPELLS.HEALING_TIDE_TOTEM_HEAL,
  SPELLS.RIPTIDE,
  SPELLS.HEALING_RAIN_HEAL,
  SPELLS.WELLSPRING_HEAL,
  SPELLS.UNLEASH_LIFE_TALENT,
  SPELLS.EARTH_SHIELD_HEAL,
  SPELLS.DOWNPOUR_TALENT,
  SPELLS.ASCENDANCE_INITIAL_HEAL,
];

export const RESTORATION_COLORS = {
  CHAIN_HEAL: '#203755',
  HEALING_WAVE: '#146585',
  HEALING_SURGE: '#40b3bf',
  RIPTIDE: '#a3dbce',
  UNUSED:'#CC3D20',
};

// Spell Coefficients
export const CHAIN_HEAL_COEFFICIENT = 1.4;
export const HEALING_WAVE_COEFFICIENT = 1.7;
export const HEALING_SURGE_COEFFICIENT = 1.57;
export const HIGH_TIDE_COEFFICIENT = 1.68;
export const HEALING_WAVE_CAST_TIME = 2.5;

// Conduit Ranks
export const SWIRLING_CURRENTS_RANKS = [20, 21, 23, 24, 26, 28, 29, 30, 31, 33, 34, 36, 37, 39, 40];
export const HEAVY_RAINFALL_RANKS = [75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145];
export const EMBRACE_OF_EARTH_RANKS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
export const NATURES_FOCUS_RANKS = [10, 10.66, 11.33, 12, 12.66, 13.33, 14, 15, 16, 16.66, 17.33, 18, 18.66, 19.33, 20];

export const ABILITIES_AFFECTED_BY_HEALING_INCREASES = [
  ...SHAMAN_BASE_ABILITIES,

  // While the following spells don't double dip in healing increases, they gain the same percentual bonus from the transfer
  SPELLS.CLOUDBURST_TOTEM_HEAL,
  SPELLS.ASCENDANCE_HEAL,
  SPELLS.LEECH,
];

export const BASE_ABILITIES_AFFECTED_BY_MASTERY = [
  ...SHAMAN_BASE_ABILITIES,
];

export const ABILITIES_AFFECTED_BY_MASTERY = [
  ...BASE_ABILITIES_AFFECTED_BY_MASTERY,
  // While the following spells don't double dip in healing increases, they gain the same percentual bonus from the transfer
  SPELLS.CLOUDBURST_TOTEM_HEAL,
  SPELLS.ASCENDANCE_HEAL,
  SPELLS.LEECH,
];

export const ABILITIES_FEEDING_INTO_CBT = [
  ...SHAMAN_BASE_ABILITIES,
  SPELLS.ASCENDANCE_HEAL,
  SPELLS.NATURES_GUARDIAN_HEAL,
];

export const ABILITIES_NOT_FEEDING_INTO_ASCENDANCE = [
  SPELLS.HEALING_TIDE_TOTEM_HEAL,
  SPELLS.HEALING_STREAM_TOTEM_HEAL,
  SPELLS.SPIRIT_LINK_TOTEM_REDISTRIBUTE,
  SPELLS.LEECH,
  SPELLS.ASCENDANCE_HEAL,
  SPELLS.CLOUDBURST_TOTEM_HEAL,
  SPELLS.ASCENDANCE_INITIAL_HEAL,
];
