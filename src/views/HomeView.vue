<template>
  <div class="flex justify-center items-center">
    <div class="grid grid-rows-1">
      <article class="prose lg:prose-xl">
        <h1 class="text-center">
          A website to help you see the courses difficulty level and quality
        </h1>
        <h4 class="text-center">Now select your level</h4>
        <!-- ... -->
      </article>
      <button
        class="btn btn-neutral"
        style="margin: 10px"
        @click="$router.push('/foundation')"
      >
        Foundation
      </button>
      <button class="btn btn-neutral" style="margin: 10px">Diploma</button>
      <button class="btn btn-neutral" style="margin: 10px">Degree</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { supabase } from "../../utils/supabase.ts";
export default {
  name: "HomeView",
  components: {},
  async created() {},
};
</script>
