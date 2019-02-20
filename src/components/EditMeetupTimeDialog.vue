<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn floating accent slot="activator">Edit Time</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%" actions>
              <template>
                <v-btn flat class="primary" @click="onSaveTime">Save</v-btn>
                <v-btn flat @click="editDialog = false">Close</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableTime: new Date(this.meetup.date).toTimeString().substr(0, 5)
    };
  },
  methods: {
    onSaveTime() {
      const newDate = new Date(this.meetup.date);
      const hours = this.editableTime.match(/^(\d+)/)[1];
      const minutes = this.editableTime.match(/:(\d+)/)[1];
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        date: newDate.toISOString()
      });
      this.editDialog = false;
    }
  }
};
</script>