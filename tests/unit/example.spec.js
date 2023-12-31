import { shallowMount } from '@vue/test-utils';
import HelloWorld from '../../src/pages/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message',
      wrapper = shallowMount(HelloWorld, {
        propsData: { msg }
      });
    expect(wrapper.text()).toMatch(msg);
  });
});
