<template>
  <div class="input-search">
    <b-form-input
      :id="labelName"
      class="input-search__input"
      v-bind="{ ...$attrs, ...$props }"
      v-on="$listeners"
    />
    <SvgIcon class="input-search__icon" icon="search" />
  </div>
</template>

<script>
export default {
  name: 'InputSearch',

  props: {
    labelName: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.input-search {
  position: relative;

  &__input {
    height: 100%;
    font-size: 14px;
    color: $color-black-500;

    &::placeholder {
      color: $color-black-300;
    }

    &[noborder] {
      border: none;
    }
  }

  &__icon {
    @include abs-right-center($right: 12px);
    @include translate-vertical-center;

    pointer-events: none;
    fill: $color-black-500;
  }
}
</style>
