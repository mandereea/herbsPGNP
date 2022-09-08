import { enumType } from 'nexus';

export const Taste = enumType({
  name: 'Taste',
  members: ['SPICY', 'SALTY', 'SOUR', 'BITTER', 'SWEET'],
  description: 'The array of the 5 tastes'
})

export const TimeOfDay = enumType({
  name: 'TimeOfDay',
  members: ['EARLY_MORNING', 'MORNING', 'MID_DAY', 'AFTERNOON', 'EVENING', 'MID_NIGHT'],
  description: 'The array of the 6 times'
})

export const Temperament = enumType({
  name: 'Temperament',
  members: ['COLD', 'COOL', 'NEUTRAL', 'WARM', 'HOT'],
  description: 'The array of the 5 temperaments'
})