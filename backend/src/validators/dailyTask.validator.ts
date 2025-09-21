import Joi from 'joi';

// Daily task validation schema
export const createDailyTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Task title must be at least 3 characters long',
      'string.max': 'Task title must be less than 100 characters',
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
    .required()
    .messages({
      'date.base': 'Please provide a valid due date',
      'any.required': 'Due date is required',
    }),
  goal: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Invalid goal ID format',
    }),
  habit: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Invalid habit ID format',
    }),
});

export const updateDailyTaskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Task title must be at least 3 characters long',
      'string.max': 'Task title must be less than 100 characters',
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
    .optional()
    .messages({
      'date.base': 'Please provide a valid due date',
    }),
  completed: Joi.boolean()
    .optional(),
  goal: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .allow(null)
    .messages({
      'string.pattern.base': 'Invalid goal ID format',
    }),
  habit: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .allow(null)
    .messages({
      'string.pattern.base': 'Invalid habit ID format',
    }),
});