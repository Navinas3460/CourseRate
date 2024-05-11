<template>
  <button class="btn btn-neutral" @click="openModal">Rate</button>
  <dialog :id="modal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">
        Rate
        <b class="text-accent">{{ course.course_name }}</b>
      </h3>
      <p v-if="!newRating" class="text-md mt-5">Your ratings:</p>
      <form class="form-control">
        <div class="tooltip tooltip-secondary" data-tip="slide to rate">
          <label for="rating-difficulty" class="text-lg">Difficulty: </label>
          <input
            name="rating-difficulty"
            id="rating-difficulty"
            type="range"
            min="0"
            max="5"
            v-model="rating_difficulty"
            class="range range-accent"
            step="1"
          />
          <div class="w-full flex justify-between text-xs px-2">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <div class="tooltip tooltip-secondary" data-tip="slide to rate">
          <label for="rating_quality" class="text-lg">Quality: </label>
          <input
            name="rating_quality"
            id="rating_quality"
            type="range"
            min="0"
            max="5"
            v-model="rating_quality"
            class="range range-accent"
            step="1"
          />
          <div class="w-full flex justify-between text-xs px-2">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <button
          v-if="newRating"
          class="btn btn-neutral mt-3"
          @click.prevent="submitRating"
        >
          Add Rating
        </button>
        <button v-else class="btn btn-neutral mt-3" @click.prevent="updateRating">
          Update
        </button>
        <AlertView
          v-if="customAlert.show"
          :msg="customAlert.msg"
          style="margin-top: 10px"
        ></AlertView>
      </form>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script>
import { supabase } from "../../utils/supabase.ts";
import AlertView from "../components/AlertView.vue";
export default {
  name: "RatingModal",
  components: { AlertView },
  props: {
    course: Object,
    modal: String,
  },
  data() {
    return {
      rating_difficulty: 3,
      rating_quality: 3,
      user_id: null,
      newRating: true,
      customAlert: {
        msg: "Rating Added",
        show: false,
      },
    };
  },
  async mounted() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      alert(error);
    } else {
      this.user_id = data.user.id;
    }
    const { data: ratings, error_2 } = await supabase
      .from("Ratings")
      .select("*")
      .eq("uuid", this.user_id)
      .eq("course_id", this.course.id);
    if (!error_2) {
      if (ratings[0]) {
        this.newRating = false;
        this.rating_difficulty = ratings[0].course_difficulty;
        this.rating_quality = ratings[0].course_quality;
      } else {
        console.log("No Ratings for this course yet");
        console.log("modal:", this.modal);
        console.log(this.newRating);
      }
    }
  },
  methods: {
    async submitRating() {
      const { data, error } = await supabase
        .from("Ratings")
        .insert({
          uuid: this.user_id,
          course_id: this.course.id,
          course_difficulty: this.rating_difficulty,
          course_quality: this.rating_quality,
        })
        .select();
      if (!error) {
        console.log(data);
        this.customAlert.msg = "Rating Added";
        this.customAlert.show = true;
        this.newRating = false;
      } else {
        alert(error.message);
      }
    },
    async updateRating() {
      console.log("here");
      const { data, error } = await supabase
        .from("Ratings")
        .update({
          course_difficulty: this.rating_difficulty,
          course_quality: this.rating_quality,
        })
        .eq("uuid", this.user_id)
        .eq("course_id", this.course.id);
      if (!error) {
        console.log(data);
        this.customAlert.msg = "Rating Updated";
        this.customAlert.show = true;
      } else {
        alert(error.message);
      }
    },
    openModal() {
      document.getElementById(this.modal).showModal();
    },
  },
};
</script>
