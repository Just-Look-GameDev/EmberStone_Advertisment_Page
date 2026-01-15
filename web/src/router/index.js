import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ImpressumPage from '../pages/ImpressumPage.vue'
import LorePage from '../pages/LorePage.vue'
import BlogList from '../views/BlogList.vue'
import BlogPost from '../views/BlogPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: ImpressumPage
    },
    {
      path: '/lore',
      name: 'lore',
      component: LorePage
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogList
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPost
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
