<template>
  <ButtonPrimary v-bind="$props" @click="handleClick" v-on="$listeners">
    <slot />
  </ButtonPrimary>
</template>

<script>

import ButtonPrimary from "@/components/Button/Primary"
export default {
  name: 'FacebookButton',

  components: { ButtonPrimary },

  props: {
    outline: Boolean,
  },

  data() {
    return {}
  },

  methods: {

    handleClick() {
      const options = {
        // https://developers.facebook.com/docs/facebook-login/permissions
        scope: 'public_profile,email,user_link,user_gender',
        // return_scopes: true,
        auth_type: 'rerequest,reauthorize',
      }
      // eslint-disable-next-line no-undef
      FB.login(this.handleResponse, options)
    },

    handleResponse(response) {
      if (response.status === 'connected') {
        this.setTokenFacebook(response.authResponse.accessToken)
        this.dispatchLoginFacebook({
          token: response.authResponse.accessToken,
        })
      } else {
        console.log('User cancelled login or did not fully authorize.')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
