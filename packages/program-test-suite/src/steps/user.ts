import {World, Cucumber} from '../..';
import {inferType} from '../utils';

export function init(cucumber: Cucumber): void {
  const {Given} = cucumber;

  Given(
    'the (referred )user has custom field {string} equal to {string}',
    function(this: World, field: string, val: string) {
      this.setState({
        current: {
          user: {
            customFields: {
              [field]: inferType(val),
            },
          },
        },
      });
    },
  );

  Given('the (referred )user {word} blocked', function(
    this: World,
    blocked: string,
  ) {
    this.setState({
      current: {
        user: {
          dateBlocked: blocked === 'is' ? 123 : undefined,
        },
      },
    });
  });

  Given('the segment rules include segment {string}', function(
    this: World,
    seg: string,
  ) {
    const segments = this.state.current.rules.userSegmentation || [];
    segments.push(seg);

    this.setState({
      current: {
        rules: {
          userSegmentation: segments,
        },
      },
    });
  });

  Given('the (referred )user belongs to segment {string}', function(
    this: World,
    segment: string,
  ) {
    const segments = this.state.current.user.segments || [];
    segments.push(segment);

    this.setState({
      current: {
        user: {
          segments,
        },
      },
    });
  });

  Given('the user has the following reward:', function(this: World, data: any) {
    const rewards = this.state.current.user.rewards || {
      totalCount: 0,
      data: [],
    };
    rewards.data.push(JSON.parse(data));
    rewards.totalCount += 1;

    this.setState({
      current: {
        user: {
          rewards,
        },
      },
    });
  });
}
