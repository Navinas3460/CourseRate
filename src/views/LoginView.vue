<template>
  <div class="flex justify-center items-center">
    <div class="grid grid-cols-1 mt-10">
      <article class="prose lg:prose-xl p-10">
        <h1 class="text-center">Login to use the website</h1>
      </article>
      <button class="btn btn-secondary m-5" @click="signin">
        Sign in with
        <img alt="google logo" src="../assets/google.svg" style="width: 20px" />google
      </button>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../utils/supabase.ts";
export default {
  name: "LoginView",
  components: {},
  methods: {
    async signin() {
      await supabase.auth.signInWithOAuth({ provider: "google" });
    },
  },
};
</script>
