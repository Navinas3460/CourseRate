<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1">
      <article class="prose prose-lg mb-2">
        <h1 class="text-center">Add Course</h1>
      </article>
      <input
        type="text"
        placeholder="Course Name"
        class="input input-bordered w-full max-w-xs mb-2"
        v-model="course_name"
      />
      <select class="select select-bordered w-full max-w-xs mb-2" v-model="course_level">
        <option disabled selected>Level</option>
        <option>Foundation</option>
        <option>Diploma in Programming</option>
        <option>Diploma in Data Science</option>
        <option>Degree</option>
      </select>
      <input
        type="text"
        placeholder="Course Link"
        class="input input-bordered w-full max-w-xs mb-2"
        v-model="course_link"
      />
      <button class="btn btn-primary" @click="addCourse">Add</button>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../utils/supabase.ts";
export default {
  name: "AddCourseView",
  data() {
    return {
      course_name: "",
      course_level: "Level",
      course_link: "",
    };
  },
  async mounted() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      alert(error);
    } else {
      if (!data.user.id === process.env.VUE_APP_ADMIN_ID) {
        this.$router.push("/");
      }
    }
  },

  methods: {
    async addCourse() {
      const { data, error } = await supabase
        .from("Courses")
        .insert({
          course_name: this.course_name,
          course_level: this.course_level,
          course_link: this.course_link,
        })
        .select();
      if (!error) {
        alert("Course Added", data);
        this.$router.go();
      } else {
        alert(error.message);
      }
    },
  },
};
</script>
