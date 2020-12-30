<template>
  <b-button
    :class="{
      primary: true,
      'primary--outline': outline,
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
  name: 'Primary',

  props: {
    outline: Boolean,
  },

  computed: {
    variant() {
      return this.outline ? 'outline-primary' : 'primary'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.primary {
  @include flex-center;

  width: 100%;
  height: 48px;
  font-size: 13px;
  font-weight: 700;
  background: $color-primary;

  &--outline {
    background: transparent;

    &:hover {
      color: $color-white;
      background: $color-primary;
    }
  }
}
</style>
