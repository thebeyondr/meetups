<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm6 class="text-sm-right text-xs-center">
        <v-btn class="primary" dark large to="/meetups">Explore meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn large to="/meetups/new" class="text-sm-left text-xs-center">Organize meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="(meetup) in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click.stop="loadMeetup(meetup.id)"
          >
            <div class="meetup-title">
              <h3>{{meetup.title}}</h3>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <h2>Join us and meetup!</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed:{
    meetups (){
      return this.$store.getters.loadFeaturedMeetups
    }
  },
  methods: {
    loadMeetup(id) {
      this.$router.push(`/meetups/${id}`);
    }
  }
};
</script>
<style scoped>
.meetup-title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: whitesmoke;
  padding: 1rem;
  font-kerning: 1rem;
}
</style>
