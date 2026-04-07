import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "MatchPassword", async: false })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(
    password: string,
    validationArguments: ValidationArguments,
  ): boolean {
    const [relatedPropertyName] = validationArguments.constraints;
    const relatedValue = (
      validationArguments.object as Record<string, unknown>
    )[relatedPropertyName];
    return password === relatedValue;
  }
  defaultMessage() {
    return "Passwords do not match";
  }
}
