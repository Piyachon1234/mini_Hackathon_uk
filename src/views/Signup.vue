<template>
  <v-container>
    <template>
      <FlashMessage :position="'right bottom'"></FlashMessage>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
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
          v-model="confirmPassword"
          :rules="passwordRules"
          label="Confirm Password"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="#f7bedb" class="mr-4" @click="submit">
          Sign-up
        </v-btn>

        <v-btn color="#bedff7" class="mr-4" @click="reset"> Reset </v-btn>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  data: () => ({
    valid: true,
    usernameRules: [(v) => !!v || "Email or Username is required"],
    emailRules: [
      (v) => !!v || "Email is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "Email must be in the form: XXX@XXX.XXX",
    ],
    passwordRules: [(v) => !!v || "Password is required"],
  }),

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        if (this.password === this.confirmPassword) {
          // submit to backend to authenticate
          let formData = new FormData();
          formData.append("username", this.username);
          formData.append("password", this.password);
          formData.append("email", this.email);
          let response = await Vue.axios.post("/api/signup", formData);
          if (response.data.success) {
            this.flashMessage.show({
              status: "success",
              title: "Success!",
              message:
                "Successfully signed up. Please continue to login to setup your profile.",
            });
            await this.$router.push({ name: "Login" });
          } else {
            this.flashMessage.show({
              status: "error",
              title: "Error creating user",
              message: response.data.message,
            });
          }
        } else {
          this.flashMessage.show({
            status: "error",
            title: "Passwords do not match",
            message:
              "Please check your password and confirm password fields are the same.",
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
  },
};
</script>
