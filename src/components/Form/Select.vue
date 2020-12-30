<template>
  <div class="select">
    <div ref="dropdown" class="select__input-group" @click="handleSelected">
      <b-form-input
        class="select__input"
        :class="{ 'select__input--error': !!errorMessage }"
        :value="selectedItem[textKey]"
        :placeholder="placeholder"
        :controlsize="size"
        :disabled="disabled"
        readonly
      />
      <template v-if="value && Object.keys(value).length">
        <SvgIcon class="select__icon--close" icon="close" @click="handleClosed" />
      </template>
      <template v-else>
        <SvgIcon class="select__icon--filled" icon="caret-down-filled" />
      </template>
    </div>
    <div
      v-if="showItems"
      v-closable="{
        exclude: ['dropdown'],
        handler: handleSelected,
      }"
      :class="{
        select__items: true,
        'select__items--error': !!errorMessage,
      }"
    >
      <div
        v-for="item in remainingItems"
        :key="item[valueKey]"
        class="select__item"
        :value="item[valueKey]"
        @click="handleItemSelect(item)"
      >
        {{ item[textKey] }}
      </div>
    </div>

    <p v-if="errorMessage" class="select__error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Select',

  props: {
    value: [Object],
    items: {
      type: Array,
      required: true,
    },
    textKey: {
      type: String,
      default: 'text',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    placeholder: String,
    errorMessage: String,
    disabled: Boolean,
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value)
      },
    },
  },

  data() {
    return {
      selectedItem: this.value || {},
      showItems: false,
    }
  },

  computed: {
    remainingItems() {
      return this.items.filter(item => item[this.valueKey] !== this.selectedItem[this.valueKey])
    },
  },

  watch: {
    value(val) {
      this.selectedItem = val || {}
    },
  },

  methods: {
    handleSelected() {
      this.showItems = !this.showItems
    },

    handleItemSelect(item) {
      this.selectedItem = item
      this.$emit('input', item)
    },

    handleClosed() {
      this.selectedItem = {}
      this.$emit('input', {})
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.select {
  position: relative;
  width: 100%;
  font-size: 14px;

  &[noborder] &__input {
    border: none;
  }

  &__input-group {
    position: relative;
  }

  &__input {
    height: 40px;
    width: 100%;
    font-size: 14px;
    background-color: $color-white;
    border-radius: 4px;
    user-select: none;
    cursor: pointer;
    border: 1px solid $color-black-100;

    &::selection {
      background-color: transparent;
    }

    &--error {
      color: $color-red;
      border-color: $color-red;

      &:focus {
        box-shadow: none;
      }
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

    &[disabled] {
      color: $color-black-400;
      background-color: $color-black-90;
    }

    &::placeholder {
      color: $color-black-300;
    }
  }

  &__icon {
    &--close,
    &--filled {
      @include abs-right-center($right: 12px);
      @include translate-vertical-center;
      fill: $color-black-400;
    }

    &--filled {
      width: 12px;
      height: 12px;
      pointer-events: none;
    }

    &--close {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }

  &__items {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background-color: $color-white;
    border-radius: 4px;
    box-shadow: $shadow;
    z-index: $z-index-dropdown;
    max-height: 170px;
    overflow-y: auto;

    &--error {
      top: calc(100% - 24px);
    }
  }

  &__item {
    padding: 6px 12px;

    &:hover {
      background-color: #f2f2f2;
      cursor: pointer;
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
