<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              name="title"
              v-model="editedTitle"
              label="Title"
              id="title"
              :rules="[() => !!editedTitle || 'This field is required']"
            ></v-text-field>
            <v-textarea
              name="description"
              label="Description"
              id="description"
              v-model="editedDescription"
              :rules="[() => !!editedDescription|| 'This field is required']"
              rows="3"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="primary" @click="onSaveChanges">Save</v-btn>
              <v-btn flat @click="editDialog = false">Cancel</v-btn>
            </v-card-actions>
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim === ""
      ) {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      });
    }
  }
};
</script>