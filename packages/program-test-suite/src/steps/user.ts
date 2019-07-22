import {World, Cucumber} from '../..';
import {inferType} from '../utils';

export function init(cucumber: Cucumber): void {
  const {Given} = cucumber;

  Given('the user has custom field {string} equal to {string}', function(
    this: World,
    field: string,
    val: string,
  ) {
    this.setState({
      current: {
        user: {
          customFields: {
            [field]: inferType(val),
          },
        },
      },
    });
  });

  Given('the user {word} blocked', function(this: World, blocked: string) {
    this.setState({
      current: {
        user: {
          dateBlocked: blocked === 'is' ? 123 : undefined,
        },
      },
    });
  });
}
