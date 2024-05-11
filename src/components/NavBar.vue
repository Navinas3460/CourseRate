<template>
  <div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <button class="btn btn-ghost text-l" @click="$router.push('/')">
          <img alt="site logo" src="../assets/logo.jpg" style="width: 40px" />
          BS Course Rate
        </button>
      </div>
      <div class="flex-none gap-2">
        <label class="swap swap-rotate">
          <!-- this hidden checkbox controls the state -->
          <input
            type="checkbox"
            class="theme-controller"
            value="luxury"
            :checked="isitDark"
            @change="changeTheme"
          />

          <!-- sun icon -->
          <svg
            class="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>

          <!-- moon icon -->
          <svg
            class="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
        <div class="form-control">
          <input
            type="text"
            placeholder="Search.. coming soon"
            class="input input-bordered w-24 md:w-auto"
            disabled
          />
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Profile Picture" :src="imgSource" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <p>{{ name }}</p>
            </li>
            <li v-if="loggedin"><a @click="singout">Logout</a></li>
            <li v-else><a @click="this.$router.push('/login')">Login</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../utils/supabase.ts";
import blank_profile from "../assets/blank_profile.png";

export default {
  name: "NavBar",
  data() {
    return {
      isitDark: false,
      imgSource: "",
      loggedin: false,
      name: "Profile",
    };
  },
  async created() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      this.imgSource = blank_profile;
    } else {
      this.loggedin = true;
      this.name = data.user.user_metadata.full_name;
      this.imgSource = data.user.user_metadata.avatar_url;
    }
  },
  mounted() {
    this.isitDark = localStorage.getItem("isitDark") === "true";
  },

  methods: {
    changeTheme() {
      this.isitDark = !this.isitDark;
      localStorage.setItem("isitDark", this.isitDark);
    },
    singout() {
      sessionStorage.removeItem("user");
      const { error } = supabase.auth.signOut();
      if (error) {
        console.log(error);
      } else {
        this.imgSource = blank_profile;
        this.name = "Profile";
        this.loggedin = false;
        this.$router.push("/login");
      }
    },
  },
};
</script>
