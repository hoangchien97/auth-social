<template>
  <div class="input">
    <b-form-input
      :id="labelName"
      :class="{
        input__control: true,
        'input__control--error': !!errorMessage,
        'input__control--has-icon': $scopedSlots.icon,
      }"
      :controlsize="size"
      v-bind="{ ...$attrs, ...selectedProps }"
      v-on="$listeners"
    />
    <slot name="icon" />
    <p v-if="errorMessage" class="input__error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { omit } from 'lodash-es'

export default {
  name: 'Input',

  props: {
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value)
      },
    },
    labelName: String,
    errorMessage: String,
  },

  computed: {
    selectedProps() {
      // const { size, ...rest } = this.$props
      // return rest
      return omit(this.$props, ['size'])
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.input {
  position: relative;

  &__control {
    font-size: 14px;
    color: $color-black-500;
    border: 1px solid $color-black-100;

    &::placeholder {
      color: $color-black-300;
    }

    &[noborder] {
      border: none;
    }

    &[controlsize='sm'] {
      height: 40px;
    }

    &[controlsize='md'] {
      height: 44px;
    }

    &[controlsize='lg'] {
      height: 56px;
      font-size: 18px;
    }

    &--error {
      border-color: $color-red;

      &:focus {
        box-shadow: none;
      }
    }

    &--has-icon {
      padding-right: 2.75rem;
    }

    & + svg {
      @include abs-top-right($top: 22px, $right: 12px);
      @include translate-vertical-center;

      fill: $color-black-500;
      cursor: pointer;

      &[noaction] {
        pointer-events: none;
        cursor: default;
      }
    }

    &[disabled] {
      color: $color-black-400;
      background-color: $color-black-90;
    }
  }

  &__error {
    margin-top: 4px;
    margin-left: 12px;
    font-size: 14px;
    color: $color-red;
  }
}
</style>
