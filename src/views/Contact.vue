<template>
  <div class="contact">
    <h1>This is an contact page</h1>
    <GooglePlacesAutocomplete
      v-model="address"
      class="form-group__input"
      size="sm"
      placeholder="Search location"
      :maxlength="50"
    />
  </div>
</template>

<script>
import GooglePlacesAutocomplete from "@/components/Form/GooglePlacesAutocomplete";
export default {
  name: "Contact",
  components: { GooglePlacesAutocomplete },
  data() {
    return {
      address: null,
    };
  },

  methods: {},
};
</script>
