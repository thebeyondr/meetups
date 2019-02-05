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
            :src="meetup.imageURL"
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
  data() {
    return {
      meetups: [
        {
          imageURL:
            "https://fshoq.com/free-photos/p/151/eiffel-tower-in-paris/small/show",
          id: "dgjhkhljhfhgghjkl",
          title: "Node Workshop in Paris"
        },
        {
          imageURL:
            "https://www.maxpixel.net/static/photo/2x/Us-Congress-America-Washington-Dc-Government-2533244.jpg",
          id: "sdfsdfdghfj",
          title: "Meetup in DC"
        },
        {
          imageURL:
            "https://images.pexels.com/photos/109611/pexels-photo-109611.jpeg?cs=srgb&dl=mandeville-jamaica-109611.jpg",
          id: "vbcbbvbvfsvf",
          title: "Meetup In Mandeville"
        },
        {
          imageURL:
            "https://cdn12.picryl.com/photo/2016/12/31/frauenkirche-dresden-neumarkt-germany-33b39e-1024.jpg",
          id: "rtyurtyuitu",
          title: "Meetup in Germany"
        }
      ]
    };
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
