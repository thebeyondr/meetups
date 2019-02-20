<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn floating accent slot="activator">Edit Date</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
              <template>
                <v-btn flat class="primary" @click="onSaveDate">Save</v-btn>
                <v-btn flat @click="editDialog = false">Close</v-btn>
              </template>
            </v-date-picker>
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
      editableDate: new Date(this.meetup.date).toISOString().substr(0, 10)
    };
  },
  methods: {
    onSaveDate() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);
      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        date: newDate.toISOString()
      });
      this.editDialog = false;
    }
  }
};
</script>