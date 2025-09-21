import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

interface ValidationOptions {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}

export const validate = (schemas: ValidationOptions) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    // Validate request body
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body, { 
        abortEarly: false,
        stripUnknown: true 
      });
      if (error) {
        const bodyErrors = error.details.map(detail => detail.message);
        errors.push(...bodyErrors);
      }
    }

    // Validate request params
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params, { 
        abortEarly: false 
      });
      if (error) {
        const paramErrors = error.details.map(detail => detail.message);
        errors.push(...paramErrors);
      }
    }

    // Validate request query
    if (schemas.query) {
      const { error } = schemas.query.validate(req.query, { 
        abortEarly: false 
      });
      if (error) {
        const queryErrors = error.details.map(detail => detail.message);
        errors.push(...queryErrors);
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
      return;
    }

    next();
  };
};

// Common parameter schemas
export const idParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid ID format',
      'any.required': 'ID is required',
    }),
});

// Common query schemas
export const paginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sort: Joi.string().optional(),
  order: Joi.string().valid('asc', 'desc').default('desc'),
});