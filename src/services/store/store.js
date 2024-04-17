import { createStore } from 'vuex'
import { MoviesModule } from './modules'





export const store = createStore({
  modules: {
    MoviesModule
  }
})