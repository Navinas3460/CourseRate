import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FoundationView from '../views/FoundationView.vue'
import LoginView from '../views/LoginView.vue'
import AddCourseView from '../views/AddCourseView.vue'
import DiplomaView from '../views/DiplomaView.vue'

import { supabase } from '../../utils/supabase.ts'
let localUser;

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/foundation',
    name: 'foundation',
    component: FoundationView,

  },
  {
    path: '/diploma',
    name: 'diploma',
    component: DiplomaView,
  },
  {
    path: '/degree',
    name: 'degree',
    component: () => import('../views/DegreeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/add-course',
    name: 'add-course',
    component: AddCourseView,
    meta: { requiresAuth: true}
  }

]

async function getUser() {
  localUser = await supabase.auth.getSession();
  if (localUser.data.session == null){
    return false;
  } else {
    return true;
  }
}



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = await getUser();
    if (!user) {
      next("/login")
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
