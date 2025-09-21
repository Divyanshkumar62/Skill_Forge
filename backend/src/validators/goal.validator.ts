import Joi from 'joi';

// Goal validation schema
export const createGoalSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Goal title must be at least 3 characters long',
      'string.max': 'Goal title must be less than 100 characters',
    }),
  description: Joi.string()
    .trim()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description must be less than 500 characters',
    }),
  dueDate: Joi.date()
    .iso()
    .min('now')
    .optional()
    .messages({
      'date.min': 'Due date must be in the future',
    }),
});

export const updateGoalSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Goal title must be at least 3 characters long',
      'string.max': 'Goal title must be less than 100 characters',
    }),
  description: Joi.string()
    .trim()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description must be less than 500 characters',
    }),
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed')
    .optional(),
  dueDate: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'Please provide a valid date',
    }),
});

// Milestone validation schema
export const createMilestoneSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Milestone title must be at least 3 characters long',
      'string.max': 'Milestone title must be less than 100 characters',
    }),
});