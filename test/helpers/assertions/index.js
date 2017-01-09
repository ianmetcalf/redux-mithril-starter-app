import expect from 'expect';
import * as reduxActionAssertions from './reduxActionAssertions';

expect.extend({
  ...reduxActionAssertions,
});
