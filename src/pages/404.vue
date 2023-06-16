<template>
  <div>
    <hzwq-empty image="error" description="页面不存在...." imageSize="100">
      <template #image></template>
      <template #description></template>
    </hzwq-empty>
  </div>
</template>

<script>
import { HzwqEmpty } from 'hzwq-ui';

export default {
  name: 'notFound',
  components: { HzwqEmpty }
};
</script>

<style scoped></style>
