<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-media :src="meetup.imageUrl" height="300px"></v-card-media>
          <v-card-title class="display-1 primary--text">{{meetup.title}}</v-card-title>

          <v-card-text>
            <div>
              <p class="body-2">{{meetup.date | date}} - {{meetup.location}}</p>
            </div>
            {{meetup.description}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" large dark>I'm attending</v-btn>
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
    }
  }
};
</script>

