<template>
  <div class="autocomplete">
    <div ref="dropdown" class="autocomplete__input-group">
      <b-form-input
        ref="input"
        autocomplete="off"
        class="autocomplete__input"
        :class="{ 'autocomplete__input--error': !!errorMessage }"
        :value="selectedItem[textKey]"
        :placeholder="placeholder"
        :controlsize="size"
        :disabled="disabled"
        @input="handleInput"
        @focus="handleInputFocus"
      />
      <SvgIcon class="autocomplete__icon" icon="caret-down-filled" @click="handleSelected" />
    </div>
    <div
      v-if="showItems && !disabled"
      v-closable="{
        exclude: ['dropdown'],
        handler: handleSelected,
      }"
      :class="{
        autocomplete__items: true,
        'autocomplete__items--error': !!errorMessage,
      }"
    >
      <template v-if="remainingItems.length">
        <div
          v-for="item in remainingItems"
          :key="item[valueKey]"
          class="autocomplete__item"
          :value="item[valueKey]"
          @click="handleItemSelect(item)"
        >
          {{ item[textKey] }}
        </div>
      </template>
      <div v-else class="autocomplete__item">Không có dữ liệu</div>
    </div>

    <p v-if="errorMessage" class="autocomplete__error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Autocomplete',

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
    disabled: {
      type: Boolean,
      default: false,
    },
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
      searchTerm: null,
    }
  },

  computed: {
    remainingItems() {
      if (this.searchTerm) {
        return this.items.filter(item =>
          this.removeUnicodeCharacters(item[this.textKey]).includes(
            this.removeUnicodeCharacters(this.searchTerm)
          )
        )
      }

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

      if (!this.showItems) {
        this.searchTerm = null
        this.$refs.input.$el.value = this.selectedItem[this.textKey] || ''
      }
    },

    handleItemSelect(item) {
      this.selectedItem = item
      this.showItems = false

      this.$emit('input', item)
    },

    handleInput(value) {
      this.$forceUpdate()
      this.searchTerm = value
    },

    handleInputFocus() {
      // Avoid resetting values as a no-result item selected
      if (!this.remainingItems.length) return

      this.searchTerm = null
      this.$refs.input.$el.value = ''
      this.showItems = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.autocomplete {
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
    background-color: $color-white !important;
    border-radius: 4px;
    border: 1px solid $color-black-100;

    &--error {
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
      background-color: $color-black-90 !important;
    }

    &::placeholder {
      color: $color-black-300;
    }
  }

  &__icon {
    @include abs-right-center($right: 12px);
    @include translate-vertical-center;

    width: 12px;
    height: 12px;
    fill: $color-black-400;
    user-select: none;
    cursor: pointer;
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
    user-select: none;

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
