<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offest-sm3>
        <v-card>
          <v-layout row v-if="error">
            <v-flex xs12>
              <app-alert @dismissed="onDismiss" :text="error.message"></app-alert>
            </v-flex>
          </v-layout>
          <v-card-text>
            <v-container>
              <v-card-title primary-title>
                <div>
                  <h3 class="display-1">Sign Up</h3>
                </div>
              </v-card-title>
              <v-form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      :rules="[() => !!email || 'Please enter an email',
                      email => /.+@.+/.test(email) || 'Please enter a valid email']"
                    ></v-text-field>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      :rules="[() => !!password || 'Please enter a password',
                      () => (password.length >= 6) || 'Try making the password more than 6 characters' ]"
                    ></v-text-field>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[ 
                    () => (password === confirmPassword) 
                    || 'Passwords don\'t match']"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-btn type="submit" :disabled="!isFormValid">Sign Up</v-btn>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    isFormValid() {
      return (
        this.email !== "" &&
        /.+@.+/.test(this.email) &&
        this.password !== "" &&
        this.confirmPassword === this.password
      );
    },
    user() {
      return this.$store.getters.loadUser;
    },
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    user(value) {
      if ((value !== null) & (value !== undefined)) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignUp() {
      if (!this.isFormValid) {
        return;
      }
      this.$store.dispatch("createUser", {
        email: this.email,
        password: this.password
      });
    },
    onDismiss() {
      // eslint-disable-next-line
      console.log("Alert dismissed");
      this.$store.dispatch("clearError");
    }
  }
};
</script>
