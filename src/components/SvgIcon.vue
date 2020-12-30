<template>
  <svg class="svg-icon" v-on="$listeners">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
svg {
  height: 1em;
  width: 1em;
}
</style>
