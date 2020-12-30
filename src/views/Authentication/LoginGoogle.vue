<template>
  <ButtonDefault v-bind="$props" @click="handleClick" v-on="$listeners">
    <slot />
  </ButtonDefault>
</template>

<script>
import ButtonDefault from "@/components/Button/Default";
export default {
  name: "FacebookButton",

  components: { ButtonDefault },

  props: {
    outline: Boolean,
  },

  data() {
    return {};
  },

  methods: {
    handleClick() {
      console.log("login google");
      const options = {
        _scheme: "oauth2",
        client_id: process.env.VUE_APP_GOOGLE_ID,
        scope: "openid profile email",
        token_key: "access_token",
      };

      // eslint-disable-next-line no-undef
      gapi.load("auth2", async () => {
        // eslint-disable-next-line no-undef
        const auth2 = await gapi.auth2.init(options);
        const dataSignIn = await auth2.signIn();
        const accessToken = dataSignIn.getAuthResponse().access_token;

        console.log(22, auth2);
        console.log(33, dataSignIn);
        console.log(44, accessToken);
        // eslint-disable-next-line no-undef
        console.log(55, gapi.auth2.getAuthInstance());
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
