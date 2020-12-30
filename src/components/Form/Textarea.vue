<template>
  <div class="textarea">
    <b-form-textarea
      :id="labelName"
      :class="{
        textarea__control: true,
        'textarea__control--error': !!errorMessage,
        'textarea__control--has-icon': $scopedSlots.icon,
      }"
      v-bind="{ ...$attrs, ...$props }"
      v-on="$listeners"
    />
    <slot name="icon" />
    <p v-if="errorMessage" class="textarea__error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Textarea',

  props: {
    labelName: String,
    errorMessage: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.textarea {
  position: relative;

  &__control {
    font-size: 14px;
    color: $color-black-500;
    border: 1px solid $color-black-100;
    resize: none;

    &::placeholder {
      color: $color-black-300;
    }

    &[noborder] {
      border: none;
    }

    &--error {
      color: $color-red;
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
  }

  &__error {
    margin-top: 4px;
    margin-left: 12px;
    font-size: 14px;
    color: $color-red;
  }
}
</style>
