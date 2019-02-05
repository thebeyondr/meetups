<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="primary">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  src="https://fshoq.com/free-photos/p/151/eiffel-tower-in-paris/small/show"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title class="white--text">
                  <div>
                    <h2 class="display-1">My Meetup</h2>
                    <p class="subheading">Paris, July 7th 2019</p>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat dark to="/meetups/1">
                    View Meetup
                    <v-icon right>arrow_forward</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>