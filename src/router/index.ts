import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/trends'
      },
      {
        path: 'trends',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'meme',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'category',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'favourites',
        component: () => import('@/views/Tab4Page.vue')
      },
      {
        path: 'category_page',
        component: () => import('@/views/CategoryPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
