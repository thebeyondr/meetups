<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-img :src="meetup.imageUrl" height="300px"></v-img>
          <v-card-title class="display-1 primary--text">
            {{meetup.title}}
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-dialog :meetup="meetup"></app-edit-meetup-dialog>
            </template>
          </v-card-title>

          <v-card-text>
            <div>
              <p class="body-2">{{meetup.date | date}} - {{meetup.location}}</p>
            </div>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
            </div>
            {{meetup.description}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-meetup-dialog
              v-if="userIsAuthenticated && !userIsCreator"
              :meetupId="meetup.id"
            ></app-register-meetup-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.loadUser !== null &&
        this.$store.getters.loadUser !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.loadUser.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

