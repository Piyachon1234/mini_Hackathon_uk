<template>
  <v-container fluid fill-height class="Welcome">
    <v-layout justify-center align-center column pa-5>
      <div class="display-3 white--text text-xs-center">
        Welcome to MUIC Matchmaking
      </div>
      <div
        class="display-1 font-weight-bold white--text text-xs-center"
        style="position: relative; top: 20px"
      >
        The website where you can find friends to complete your work with!
      </div>
      <div v-if="$store.state.isLoggedIn">
        <router-link to="/about">
          <v-btn fab class="mt-5 brown darken-4">
            <v-img
              src="@/assets/brand.png"
              alt=""
              contain
              height="50px"
              width="50px"
            ></v-img>
          </v-btn>
        </router-link>
      </div>
      <div v-else>
        <div style="position: relative; top: 30px">
          <v-img
            src="@/assets/brand.png"
            alt=""
            contain
            height="50px"
            width="50px"
          ></v-img>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Welcome",

  components: {},
};
</script>

<style scoped>
.Welcome {
  background: url("@/assets/06_MUIC_campus.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
