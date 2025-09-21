import Joi from 'joi';

// Habit validation schema
export const createHabitSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Habit title must be at least 3 characters long',
      'string.max': 'Habit title must be less than 100 characters',
    }),
  description: Joi.string()
    .trim()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description must be less than 500 characters',
    }),
  frequency: Joi.string()
    .valid('daily', 'weekly', 'custom')
    .required()
    .messages({
      'any.only': 'Frequency must be daily, weekly, or custom',
    }),
  customDays: Joi.number()
    .integer()
    .min(1)
    .max(365)
    .when('frequency', {
      is: 'custom',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'number.min': 'Custom days must be at least 1',
      'number.max': 'Custom days must be less than 365',
    }),
  daysOfWeek: Joi.array()
    .items(Joi.number().integer().min(0).max(6))
    .min(1)
    .max(7)
    .when('frequency', {
      is: 'weekly',
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'array.min': 'At least one day must be selected',
      'number.min': 'Day values must be between 0 and 6',
      'number.max': 'Day values must be between 0 and 6',
    }),
  xpReward: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      'number.min': 'XP reward must be at least 1',
      'number.max': 'XP reward must be less than 100',
    }),
  startDate: Joi.date()
    .iso()
    .optional()
    .default(() => new Date()),
  endDate: Joi.date()
    .iso()
    .greater(Joi.ref('startDate'))
    .optional()
    .messages({
      'date.greater': 'End date must be after start date',
    }),
});

export const updateHabitSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Habit title must be at least 3 characters long',
      'string.max': 'Habit title must be less than 100 characters',
    }),
  description: Joi.string()
    .trim()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description must be less than 500 characters',
    }),
  frequency: Joi.string()
    .valid('daily', 'weekly', 'custom')
    .optional()
    .messages({
      'any.only': 'Frequency must be daily, weekly, or custom',
    }),
  customDays: Joi.number()
    .integer()
    .min(1)
    .max(365)
    .optional()
    .messages({
      'number.min': 'Custom days must be at least 1',
      'number.max': 'Custom days must be less than 365',
    }),
  daysOfWeek: Joi.array()
    .items(Joi.number().integer().min(0).max(6))
    .min(1)
    .max(7)
    .optional()
    .messages({
      'array.min': 'At least one day must be selected',
      'number.min': 'Day values must be between 0 and 6',
      'number.max': 'Day values must be between 0 and 6',
    }),
  xpReward: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'number.min': 'XP reward must be at least 1',
      'number.max': 'XP reward must be less than 100',
    }),
  endDate: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'Please provide a valid end date',
    }),
});