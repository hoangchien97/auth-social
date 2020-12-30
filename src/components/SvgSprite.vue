<template>
  <svg width="0" height="0" style="display: none" v-html="$options.svgSprite" />
</template>

<script>
export default {
  name: 'SvgSprite',
  svgSprite: require('!svg-inline-loader?!@/assets/svg/symbol-defs.svg'),
}
</script>
