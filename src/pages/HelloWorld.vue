<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>store使用：{{ exampleMsg }}</h2>
    <div>
      <h2>hzwq-ui库使用:</h2>
      <hzwq-button @click="hzwqButtonClick">设置msg</hzwq-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GETTERS_EXAMPLE_TYPES, ACTION_EXAMPLE_TYPES } from '../store';
import { HzwqButton } from 'hzwq-ui';

export default {
  name: 'HelloWorld',
  components: {
    HzwqButton
  },
  props: {
    msg: String
  },
  data() {
    return {
      selfMsg: this.exampleMsg
    };
  },
  computed: {
    ...mapGetters({
      exampleMsg: GETTERS_EXAMPLE_TYPES.GET_MSG
    })
  },
  methods: {
    ...mapActions({
      setExampleMsg: ACTION_EXAMPLE_TYPES.SET_MSG
    }),
    /**
     * 按钮点击事件
     */
    hzwqButtonClick() {
      this.setExampleMsg('改变数据...');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  text-align: center;
  margin: 30px 0px;

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .input {
    width: 200px;
    margin-right: 10px;
  }
}
</style>
