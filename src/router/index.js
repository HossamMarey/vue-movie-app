import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MoviesView from '@/views/MoviesView.vue'
import MovieView from '@/views/MovieView.vue'
import MoviesRoute from '@/views/MoviesRoute.vue'
import AddMovieView from '@/views/AddMovieView.vue'
import UpdateMovieView from '@/views/UpdateMovieView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movies',
      component: MoviesRoute,
      children: [
        {
          path: '',
          name: 'movies',
          component: MoviesView
        },
        {
          path: 'add',
          name: 'addMovie',
          component: AddMovieView
        },
        {
          path: ':id',
          name: 'movie',
          component: MovieView
        },
        {
          path: ':id/edit',
          name: 'editMovie',
          component: UpdateMovieView
        }

      ]
    },

  ]
})

export default router
