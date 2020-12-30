<template>
  <div class="login">
    <div class="login-form">
      <ButtonGoogle type="submit" class="login-actions__button">
        Login Google
      </ButtonGoogle>
      <ButtonFacebook type="submit" class="login-actions__button">
        Login Facebook
      </ButtonFacebook>
    </div>
  </div>
</template>

<script>
import ButtonGoogle from "@/views/Authentication/LoginGoogle";
import ButtonFacebook from "@/views/Authentication/LoginFacebook";

export default {
  name: "Login",

  components: {
    ButtonGoogle,
    ButtonFacebook,
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 30px;
}

.login-actions {
  &__button {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>