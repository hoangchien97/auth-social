<template>
  <div class="google-places-autocomplete">
    <b-form-input
      :id="labelName"
      ref="autocomplete"
      :class="{
        'google-places-autocomplete__control': true,
        'google-places-autocomplete__control--error': !!errorMessage,
        'google-places-autocomplete__control--has-icon': $scopedSlots.icon,
      }"
      :controlsize="size"
      v-bind="{ ...$attrs, ...selectedProps }"
      @focus="geolocate"
      v-on="$listeners"
    />
    <slot name="icon" />
    <p v-if="errorMessage" class="google-places-autocomplete__error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { omit } from 'lodash-es'

export default {
  name: 'GooglePlacesAutocomplete',

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

  data() {
    return {
      autocomplete: null,
    }
  },

  computed: {
    selectedProps() {
      // const { size, ...rest } = this.$props
      // return rest
      return omit(this.$props, ['size'])
    },
  },

  mounted() {
    // https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
    this.initAutocomplete()
  },

  methods: {
    initAutocomplete() {
      // eslint-disable-next-line
      this.autocomplete = new google.maps.places.Autocomplete(this.$refs.autocomplete.$el, {
        // types: ['geocode'] // restricting the search predictions to geographical location types
      })

      // Avoid paying for data that you don't need by restricting the set of
      // place fields that are returned to just the address components.
      this.autocomplete.setFields([
        // 'address_components',
        // 'geometry',
        // 'icon',
        'name',
        // 'place_id',
        // 'formatted_address'
      ])
      this.autocomplete.addListener('place_changed', this.fillInAddress)
    },

    fillInAddress() {
      // Get the place details from the autocomplete object.
      const place = this.autocomplete.getPlace()
      this.$emit('input', place.name)
    },

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          // eslint-disable-next-line
          const circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy,
          })
          this.autocomplete.setBounds(circle.getBounds())
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.google-places-autocomplete {
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
