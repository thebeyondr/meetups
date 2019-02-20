<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h2 class="display-2 primary--text">New Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-form @submit.prevent="createMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offest-sm3>
              <v-text-field
                name="title"
                v-model="title"
                label="Title"
                id="title"
                :rules="[() => !!title || 'This field is required']"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offest-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                :rules="[() => !!location || 'This field is required']"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offest-sm3>
              <v-btn raised @click="onUploadClick">Upload an image</v-btn>
              <input
                type="file"
                name="image"
                style="display:none;"
                ref="fileInput"
                accept="image/*"
                @change="onFilePick"
              >
            </v-flex>
          </v-layout>

          <v-layout v-if="imageUrl !== ''" row>
            <v-flex xs12 sm6 offest-sm3>
              <img :src="imageUrl" height="200px">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offest-sm3>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                :rules="[() => !!description|| 'This field is required']"
                rows="3"
              ></v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6>
              <h4 class="title">Pick a date & time</h4>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
            <v-flex xs12 sm6>
              <v-time-picker v-model="time" format="ampm"></v-time-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm-3>
              <v-btn class="primary" :disabled="!isFormValid" type="submit">Create Meetup</v-btn>
              <p>{{this.submittableDateTime}}</p>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import moment from 'moment'
export default {
  data() {
    return {
      title: "",
      location: "",
      description: "",
      imageUrl: "",
      date: null,
      time: null,
      image: null
    };
  },
  computed: {
    isFormValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.description !== "" &&
        this.imageUrl !== "" &&
        this.submittableDateTime !== "Invalid Date"
      );
    },
    submittableDateTime() {
      if (!this.date || !this.time) {
        return "Invalid Date";
      }
      return new Date(`${this.date}T${this.time}`).toISOString();
    }
  },
  methods: {
    createMeetup() {
      if (!this.isFormValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const newMeetup = {
        title: this.title,
        location: this.location,
        description: this.description,
        image: this.image,
        date: this.submittableDateTime
      };
      this.$store.dispatch("createMeetup", newMeetup);
      this.$router.push("/meetups");
    },
    onUploadClick() {
      this.$refs.fileInput.click();
    },
    onFilePick(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (!filename.includes(".")) {
        return alert("Please enter a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>