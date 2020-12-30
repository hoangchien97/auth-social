<template>
  <b-button
    :class="{
      danger: true,
      'danger--outline': outline,
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
  name: 'Danger',

  props: {
    outline: Boolean,
  },

  computed: {
    variant() {
      return this.outline ? 'outline-danger' : 'danger'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.danger {
  @include flex-center;

  width: 100%;
  height: 48px;
  font-size: 13px;
  font-weight: 700;
  color: $color-white !important;
  background: $color-red !important;
  border-color: $color-red !important;

  &--outline {
    color: $color-red !important;
    background: transparent !important;

    &:hover {
      color: $color-white !important;
      background: $color-red !important;
    }
  }
}
</style>
