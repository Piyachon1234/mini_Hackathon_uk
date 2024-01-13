<template>
    <v-container>
      <div class="profile" align="center">
        <h1>Profile Page</h1>
      </div>
      <v-row>
        <v-col align="left" cols="12" sm="12" md="12">
          <v-card class="profile-card">
            <v-card-title>
              <v-card-subtitle class="subtitle">
                <div class="profile-info">
                  <h1>{{ this.$store.state.username }}</h1>
                  <h3>Email: {{ this.$store.state.email }}</h3>
                  <h3>Bio: {{ this.$store.state.bio }}</h3>
                  <h3>Courses Taken: {{ this.$store.state.coursesTaken }}</h3>
                </div>
              </v-card-subtitle>
              <v-btn
                color="#cca6e3"
                @click="editProfile"
                style="position: relative; right: -700px"
                >Edit Profile</v-btn
              >
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data: () => ({
      valid: true,
    }),
  
    methods: {
      editProfile() {
        this.$router.push({ name: "EditProfile" });
      },
    },
  };
  </script>
  