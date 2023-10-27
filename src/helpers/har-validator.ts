import { ErrorObject } from 'ajv';
import { Request } from 'har-format';
import harSchemaValidator from './har-schema-validator';

export class HARError extends Error {
  name = 'HARError';
  message = 'validation failed';
  errors: ErrorObject[] = [];
  constructor(errors: ErrorObject[]) {
    super();
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const validateHarRequest = (request: any): request is Request => {
  const validate: any = harSchemaValidator;
  const valid = validate(request);
  if (!valid && validate.errors) {
    throw new HARError(validate.errors);
  }
  return true;
};
