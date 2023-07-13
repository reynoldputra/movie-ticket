import { PaymentMethod } from '@prisma/client';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';

@ValidatorConstraint({ name: 'customType', async: false })
class CustomTypeValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if(Object.values(PaymentMethod).includes(value)) return true
    else return false
  }

  defaultMessage(args: ValidationArguments) {
    return 'The value is not a valid payment method.';
  }
}

export function IsPaymentMethod(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsPaymentMethod',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return new CustomTypeValidator().validate(value, args);
        },
        defaultMessage(args: ValidationArguments) {
          return new CustomTypeValidator().defaultMessage(args);
        },
      },
    });
  };
}

