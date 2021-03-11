import { BigStatView } from '../components/big-stat/big-stat-view';

export default {
  title: 'Big Stat',
};

export const Default = () => {
  const props = { statvalue: 99, statdescription: 'My Stat' };
  return BigStatView(props);
};
