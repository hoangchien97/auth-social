<template>
  <b-button
    :class="{
      default: true,
      'default--outline': outline,
    }"
    :variant="variant"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </b-button>
</template>

<script>
export default {
  name: 'Default',

  props: {
    outline: Boolean,
  },

  computed: {
    variant() {
      return this.outline ? 'outline-default' : 'default'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.default {
  @include flex-center;

  width: 100%;
  height: 48px;
  font-size: 13px;
  font-weight: 700;
  color: $color-white !important;
  background: $color-black-300 !important;
  border-color: $color-black-300 !important;

  &--outline {
    color: $color-black-500 !important;
    background: $color-white !important;

    &:hover {
      color: $color-white !important;
      background: $color-black-300 !important;
    }
  }
}
</style>
