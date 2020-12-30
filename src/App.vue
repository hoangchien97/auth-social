<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      isFacebookSdkEmbedded: false,
      mounted: false,
    };
  },

  async created() {
    this.embedGoogleSdk();
    this.embedFacebookSdk();

    this.mounted = true;
  },

  methods: {
    embedGoogleSdk() {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = "https://apis.google.com/js/platform.js?onload=init"
      document.head.appendChild(script);
    },

    embedFacebookSdk() {
      const script = document.createElement("script");
      script.async = true;
      script.crossorigin = "anonymous";
      script.addEventListener("load", this.initFacebook);

      const sdks = {
        vi: "https://connect.facebook.net/vi_VN/sdk.js",
        en: "https://connect.facebook.net/en_US/sdk.js",
      };

      script.src = sdks[process.env.VUE_APP_I18N_LOCALE] || sdks.en;
      document.head.appendChild(script);
    },

    initFacebook() {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: process.env.VUE_APP_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v7.0",
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
