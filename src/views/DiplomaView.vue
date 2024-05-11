<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1">
      <div class="grid grid-rows-1">
        <router-link to="/" class="link mx-6">Go Back</router-link>
        <article class="prose m-5">
          <h2>Diploma Level Courses</h2>
        </article>
      </div>
      <label for="diploma-program" class="text-lg text-center mt-5"
        >Diploma in Programming</label
      >
      <div
        class="overflow-x-auto rounded-md m-5"
        name="diploma-program"
        id="diploma-program"
      >
        <table class="table table-zebra border-4 border-base-300">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Course Name</th>
              <th>Difficulty</th>
              <th>Quality</th>
              <th>Number of Ratings</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <span class="loading loading-dots loading-lg"></span>
            </tr>
            <tr v-for="(course, index) in courses_programming" :key="course.id">
              <th>{{ index + 1 }}</th>
              <td>
                <a class="link" :href="course.course_link" target="_blank">{{
                  course.course_name
                }}</a>
              </td>
              <td>
                <div>
                  <progress
                    class="progress w-30"
                    :value="course.course_difficulty"
                    max="5"
                  ></progress>
                  <span>Rating: {{ course.course_difficulty }}/5</span>
                </div>
              </td>
              <td>
                <div>
                  <progress
                    class="progress w-30"
                    :value="course.course_quality"
                    max="5"
                  ></progress>
                  <span>Rating: {{ course.course_quality }}/5</span>
                </div>
              </td>
              <td>
                <p class="text-center">{{ course.number_of_ratings }}</p>
              </td>
              <td>
                <RatingModal :course="course" :modal="course.id" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <label for="diploma-datascience" class="text-lg text-center mt-5"
        >Diploma in Data Science</label
      >
      <div
        class="overflow-x-auto rounded-md m-5"
        name="diploma-program"
        id="diploma-program"
      >
        <table class="table table-zebra border-4 border-base-300">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Course Name</th>
              <th>Difficulty</th>
              <th>Quality</th>
              <th>Number of Ratings</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading_2">
              <span class="loading loading-dots loading-lg"></span>
            </tr>
            <tr v-for="(course, index) in courses_diploma" :key="course.id">
              <th>{{ index + 1 }}</th>
              <td>
                <a class="link" :href="course.course_link" target="_blank">{{
                  course.course_name
                }}</a>
              </td>
              <td>
                <div>
                  <progress
                    class="progress w-30"
                    :value="course.course_difficulty"
                    max="5"
                  ></progress>
                  <span>Rating: {{ course.course_difficulty }}/5</span>
                </div>
              </td>
              <td>
                <div>
                  <progress
                    class="progress w-30"
                    :value="course.course_quality"
                    max="5"
                  ></progress>
                  <span>Rating: {{ course.course_quality }}/5</span>
                </div>
              </td>
              <td>
                <p class="text-center">{{ course.number_of_ratings }}</p>
              </td>
              <td>
                <RatingModal :course="course" :modal="course.id" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../utils/supabase.ts";
import RatingModal from "../components/RatingModal.vue";
export default {
  name: "DiplomaView",
  components: {
    RatingModal,
  },
  data() {
    return {
      courses_programming: [],
      courses_diploma: [],
      ratings: [],
      loading: true,
      loading_2: true,
    };
  },
  async created() {
    let { data: Courses, error } = await supabase
      .from("Courses")
      .select("*")
      .eq("course_level", "Diploma in Programming");
    if (!error) {
      this.courses_programming = Courses;
    }
    const { data: Ratings, error_2 } = await supabase.from("Ratings").select("*");

    if (error_2) {
      console.log(error_2);
    } else {
      this.courses_programming.forEach((course) => {
        const rating = Ratings.filter((rating) => rating.course_id === course.id);
        if (rating) {
          course.course_difficulty =
            rating.reduce((a, b) => a + b.course_difficulty, 0) / rating.length;
          course.course_quality =
            rating.reduce((a, b) => a + b.course_quality, 0) / rating.length;
          course.number_of_ratings = rating.length;
        }
      });
      this.loading = false;
    }

    let { data: Courses_diploma, error_3 } = await supabase
      .from("Courses")
      .select("*")
      .eq("course_level", "Diploma in Data Science");
    if (!error_3) {
      this.courses_diploma = Courses_diploma;
    }
    const { data: Ratings_diploma, error_4 } = await supabase.from("Ratings").select("*");

    if (error_4) {
      console.log(error_4);
    } else {
      this.courses_diploma.forEach((course) => {
        const rating = Ratings_diploma.filter((rating) => rating.course_id === course.id);
        if (rating) {
          course.course_difficulty =
            rating.reduce((a, b) => a + b.course_difficulty, 0) / rating.length;
          course.course_quality =
            rating.reduce((a, b) => a + b.course_quality, 0) / rating.length;
          course.number_of_ratings = rating.length;
        }
      });
      this.loading_2 = false;
    }
  },
};
</script>
