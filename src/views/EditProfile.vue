<template>
  <v-container>
    <template>
      <FlashMessage :position="'right bottom'"></FlashMessage>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>
        <v-text-field
          v-model="newPassword"
          label="New Password"
          required
        ></v-text-field>
        <v-text-field
          v-model="confirmPassword"
          label="Confirm New Password"
          required
        ></v-text-field>
        <v-text-field v-model="bio" label="Edit bio" required></v-text-field>
        <v-btn :disabled="!valid" color="#f7bedb" class="mr-4" @click="submit">
          Submit
        </v-btn>
        <v-btn color="#bedff7" class="mr-4" @click="reset"> Reset </v-btn>
        <v-btn color="#cca6e3" class="mr-4" @click="back"> Return </v-btn>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  data: () => ({
    valid: true,
    passwordRules: [(v) => !!v || "Password is required"],
  }),

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);
        formData.append("newPassword", this.newPassword);
        formData.append("confirmPassword", this.confirmPassword);
        formData.append("bio", this.bio);
        let response = await Vue.axios.post("/api/editUser", formData);
        if (
          response.data.success &&
          response.data.message == "username updated"
        ) {
          let response2 = await Vue.axios.get("/api/logout");
          if (response2.data.success) {
            this.$flashMessage.success({
              status: "Success",
              title: "Profile Updated",
              message:
                "Profile updated! You'll be redirected to the login page due to new username",
            });
            this.$router.push({ name: "Login" });
          }
        } else if (
          response.data.success &&
          response.data.message == "profile updated"
        ) {
          this.$flashMessage.success({
            status: "Success",
            title: "Profile Updated",
            message: "Profile updated!",
          });
          this.$router.push({ name: "personalProfile" });
        } else if (
          !response.data.success &&
          response.data.message == "New passwords do not match"
        ) {
          this.$flashMessage.error({
            status: "Error",
            title: "New passwords mismatch",
            message: response.data.message,
          });
        } else if (
          !response.data.success &&
          response.data.message == "Wrong password"
        ) {
          this.$flashMessage.error({
            status: "Error",
            title: "Wrong password",
            message: response.data.message,
          });
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    back() {
      this.$router.push({ name: "personalProfile" });
    },
  },
};
</script>
