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
}
