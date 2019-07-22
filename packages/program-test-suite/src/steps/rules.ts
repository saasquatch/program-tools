import {World, Cucumber} from '../..';
import {readFileSync} from 'fs';
import {getRandomUser} from '../faker';

// @ts-ignore
import {recursive as mergeRecursive} from 'merge';

export function init(cucumber: Cucumber): void {
  const {Given} = cucumber;

  Given('there are no program rules', function(this: World) {
    this.setState({
      current: {
        rules: undefined,
      },
    });
  });

  Given('there are no reward rules', function(this: World) {
    this.setState({
      current: {
        rules: {
          rewardRules: undefined,
        },
      },
    });
  });

  Given('the program schema is located at {string}', function(
    this: World,
    path: string,
  ) {
    this.setState({
      config: {
        schemaPath: path,
      },
    });
  });

  Given('the current time is {int}', function(this: World, time: number) {
    this.setState({
      current: {
        time,
      },
    });
  });

  Given('the default configuration is loaded', function(this: World) {
    const defaultIntrospection = JSON.parse(
      readFileSync('__tests__/defaults/template.json').toString(),
    );

    const schema = JSON.parse(
      readFileSync(this.state.config.schemaPath || '').toString(),
    );

    const defaultRules = JSON.parse(
      readFileSync('__tests__/defaults/rules.json').toString(),
    );

    const defaultTemplate = mergeRecursive(defaultIntrospection, schema);

    this.setState({
      current: {
        rules: defaultRules,
        template: defaultTemplate,
        user: getRandomUser('DEFAULT'),
      },
      config: {
        defaultIntrospection,
        defaultRules,
        defaultTemplate,
      },
    });
  });
}
