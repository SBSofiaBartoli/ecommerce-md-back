import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "MatchPassword", async: false})
export class MatchPassword implements ValidatorConstraintInterface {
    validate(password: string, validationArguments: ValidationArguments) {
        if (password !== (validationArguments.object as any)[validationArguments.constraints[0]]) return false;
        return true;
    }
    defaultMessage() {
        return 'Passwords do not match';
    }
}
