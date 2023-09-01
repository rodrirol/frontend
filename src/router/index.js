import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '../views/AddView.vue'
import TutorialView from '../views/TutorialsView.vue'
import EditView from '../views/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/add',
      name: 'add', 
      component: AddView,
      meta: {
        title: 'Add Tutorial'
      }
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: TutorialView,
      meta: {
        title: 'View Tutorial'
      }
    },
    {
      path: '/edit/:index',
      name: 'edit',
      component: EditView,
      meta: {
        title: 'Edit Tutorial'
      }
    }

  ]
})

export default router
