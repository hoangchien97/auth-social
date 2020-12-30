<template>
  <date-range-picker
    v-model="dateRange"
    :class="`date date--${size}`"
    show-dropdowns
    auto-apply
    :ranges="false"
    single-date-picker="single"
    :linked-calendars="false"
    :max-date="maxDate"
    :min-date="minDate"
    :opens="opens"
    v-bind="$props"
    v-on="$listeners"
  >
    <template #input="picker">
      <div class="date__input">
        <template v-if="picker.startDate">
          <span class="date__input-text">
            {{ formatDate(picker.startDate) }}
          </span>
        </template>
        <template v-else>
          <span class="date__input-text" placeholder>{{ placeholder }}</span>
        </template>
        <template v-if="value && showClose">
          <div @click="handleClearble">
            <SvgIcon class="date__input-icon" icon="close" />
          </div>
        </template>
        <template v-else>
          <SvgIcon class="date__input-icon" icon="calendar" />
        </template>
      </div>
    </template>
  </date-range-picker>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import { convertToDateVietNam } from '@/utils/mixins'

export default {
  name: 'Date',

  components: {
    DateRangePicker,
  },

  props: {
    value: [String, Date],
    formatDate: {
      type: Function,
      default: convertToDateVietNam,
    },
    maxDate: {
      type: [String, Date],
      default: null,
    },
    minDate: {
      type: [String, Date],
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Date',
    },
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value)
      },
    },
    opens: {
      type: String,
      default: 'center',
      validator(value) {
        return ['center', 'left', 'right', 'inline'].includes(value)
      },
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    dateRange: {
      get() {
        return { startDate: this.value, endDate: this.value }
      },
      set(date) {
        this.$emit('input', this.convertToISODate(date.startDate))
      },
    },
  },

  methods: {
    handleClearble() {
      this.dateRange = { startDate: undefined, endDate: undefined }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.date {
  .reportrange-text {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 6px 12px;
    font-size: 14px;
    border: 1px solid $color-black-100;
  }

  &[noborder] {
    .reportrange-text {
      border: none;
    }
  }

  .dropdown-menu {
    z-index: $z-index-daterange;
  }
}
</style>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.date {
  width: 100%;

  &--sm {
    height: 40px;
  }

  &--md {
    height: 44px;
  }

  &--lg {
    height: 56px;
    font-size: 18px;
  }

  &__input {
    @include flex-between-center;

    width: 100%;
  }

  &__input-icon {
    margin-left: 16px;
    fill: $color-black-400;
    width: 16px;
    height: 16px;
  }

  &__input-text {
    margin-right: auto;
    &[placeholder] {
      color: $color-black-300;
    }
  }
}
</style>
