import { getFromLocalStorage, setToLocalStorage } from "@/services/utils"
import { MOVIE_TYPES } from "../types"


export const MOVIE_LOCAL_DB_KEY = 'MOVIE_LOCAL_DB_KEY'
export const ACTORS_LOCAL_DB_KEY = 'ACTORS_LOCAL_DB_KEY'
export const ACTORS_RULES_LOCAL_DB_KEY = 'ACTORS_RULES_LOCAL_DB_KEY'

const defaultImageUrl = 'https://hips.hearstapps.com/hmg-prod/images/time-travel-movies-1581634382.jpg'

export const MoviesModule = {
  state: () => ({
    home_active_movie_index: 0,
    actor_rules: [
      {
        id: 1,
        name: 'Background role',
      },
      {
        id: 2,
        name: 'Cameo',
      },
      {
        id: 3,
        name: 'Recurring character',
      },
      {
        id: 4,
        name: 'Side character',
      },
      {
        id: 5,
        name: 'Series regular',
      }
    ],
    actors: [
      {
        id: 1,
        name: 'Joey Lever',
        birth_date: '1981-01-01',
      },
      {
        id: 2,
        name: 'Craig Ellis',
        birth_date: '1977-06-01',
      },
      {
        id: 3,
        name: 'Teravis Ward',
        birth_date: '1988-11-22',
      },
      {
        id: 4,
        name: 'Carrie Fisher',
        birth_date: '1992-11-07',
      },
      {
        id: 5,
        name: 'Jennifer Lawrence',
        birth_date: '1990-01-01',
      },
      {
        id: 6,
        name: 'Josh Hutcherson',
        birth_date: '1992-12-01',
      },
      {
        id: 7,
        name: 'Elijah Wood',
        birth_date: '1977-12-01',
      },
      {
        id: 8,
        name: 'Ian McKellen',
        birth_date: '1987-07-01',
      }
    ],
    movies: [
      {
        id: 123324,
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        description: "An ancient Ring thought lost for centuries has been found, and through a strange twist of fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it. However, he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir, and his three Hobbit friends Merry, Pippin, and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign.",
        year: 2001,
        poster: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
        actors: [
          {
            actor_id: 7,
            actor_role_id: 1,
            join_date: '2001-11-07',
          },
          {
            actor_id: 8,
            actor_role_id: 3,
            join_date: '2001-09-07',
          }
        ]
      },
      {
        id: 1,
        title: 'The Hunger Games',
        description: "In a dystopian future, the totalitarian nation of Panem is divided into 12 districts and the Capitol. Each year two young representatives from each district are selected by lottery to participate in The Hunger Games. Part entertainment, part brutal retribution for a past rebellion, the televised games are broadcast throughout Panem. The 24 participants are forced to eliminate their competitors while the citizens of Panem are required to watch. When 16-year-old Katniss' young sister, Prim, is selected as District 12's female representative, Katniss volunteers to take her place. She and her male counterpart, Peeta, are pitted against bigger, stronger representatives, some of whom have trained for this their whole lives.",
        year: 2012,
        poster: 'https://m.media-amazon.com/images/M/MV5BMjA4NDg3NzYxMF5BMl5BanBnXkFtZTcwNTgyNzkyNw@@._V1_SX300.jpg',
        actors: [
          {
            actor_id: 5,
            actor_role_id: 1,
            join_date: '2012-11-07',
          },
          {
            actor_id: 6,
            actor_role_id: 3,
            join_date: '2012-09-07',
          }
        ]
      },
      {
        id: 2,
        title: 'Spider Man: Lost Cause',
        description: "Peter Parker a lone child discovers that his parents were in a horrifying plot to make mankind change. getting bitten by his fathers invention he develops super powers to tries to find answers to his whole life, try and juggle a relationship with his girlfriend and try and find the murderer of his uncle.",
        year: 2014,
        poster: 'https://m.media-amazon.com/images/M/MV5BYmZkYWRlNWQtOGY0Zi00MWZkLWJiZTktNjRjMDY4MTU2YzAyXkEyXkFqcGdeQXVyMzYzNzc1NjY@._V1_SX300.jpg',
        actors: [
          {
            actor_id: 1,
            actor_role_id: 1,
            join_date: '2014-11-07',
          },
          {
            actor_id: 2,
            actor_role_id: 3,
            join_date: '2014-09-07',
          }
        ]
      },
    ],
  }),
  getters: {
    [MOVIE_TYPES.MOVIES]: state => {
      return state.movies.map(movie => {

        const actors = movie.actors.map(actor => {
          const actorData = state.actors.find(a => a.id === actor.actor_id)
          const actorRoles = state.actor_rules.find(ar => ar.id === actor.actor_role_id)
          return {
            ...actor,
            role: actorRoles,
            data: actorData
          }
        })
        return {
          ...movie,
          poster: movie?.poster || defaultImageUrl,
          actors,
        }
      })


    },
    [MOVIE_TYPES.MOVIE]: (state, getters) => id => {
      const movies = getters[MOVIE_TYPES.MOVIES]
      return movies.find(movie => movie.id == id)
    },
  },
  mutations: {
    [MOVIE_TYPES.SET_ACTIVE_MOVIE_INDEX]: (state, payload) => {

      state.home_active_movie_index = payload
    },

    [MOVIE_TYPES.CREATE_MOVIE](state, movie) {
      state.movies.push(movie)
    },
    [MOVIE_TYPES.UPDATE_MOVIE](state, movie) {
      const index = state.movies.findIndex(m => m.id === movie.id)
      state.movies[index] = movie
    },
    [MOVIE_TYPES.DELETE_MOVIE](state, movieId) {
      const index = state.movies.findIndex(m => m.id === movieId)
      state.movies.splice(index, 1)
    },
    [MOVIE_TYPES.UPDATE_LOCAL_STORAGE](state) {
      setToLocalStorage(MOVIE_LOCAL_DB_KEY, state.movies)
      setToLocalStorage(ACTORS_LOCAL_DB_KEY, state.actors)
      setToLocalStorage(ACTORS_RULES_LOCAL_DB_KEY, state.actor_rules)
    },
    [MOVIE_TYPES.UPDATE_STATE_FROM_STORAGE](state) {
      const movies = getFromLocalStorage(MOVIE_LOCAL_DB_KEY)
      const actors = getFromLocalStorage(ACTORS_LOCAL_DB_KEY)
      const actor_rules = getFromLocalStorage(ACTORS_RULES_LOCAL_DB_KEY)
      if (movies) state.movies = movies
      if (actors) state.actors = actors
      if (actor_rules) state.actor_rules = actor_rules
    },
    [MOVIE_TYPES.ADD_ACTOR](state, actor) {
      state.actors.push(actor)
    },
    [MOVIE_TYPES.ADD_ACTOR_RULE](state, rule) {
      state.actor_rules.push(rule)
    }

  },
  actions: {
    [MOVIE_TYPES.INIT_MOVIES_ACTION]({ commit }) {

      commit(MOVIE_TYPES.UPDATE_STATE_FROM_STORAGE)
    },
    [MOVIE_TYPES.DELETE_MOVIE_ACTION]({ commit }, movieId) {
      commit(MOVIE_TYPES.DELETE_MOVIE, movieId)
      commit(MOVIE_TYPES.UPDATE_LOCAL_STORAGE)
    },
    [MOVIE_TYPES.ADD_ACTOR_ACTION]({ commit }, payload) {

      const newActor = {
        id: new Date().getTime(),
        ...payload
      }
      commit(MOVIE_TYPES.ADD_ACTOR, newActor)
      commit(MOVIE_TYPES.UPDATE_LOCAL_STORAGE)
    },
    [MOVIE_TYPES.ADD_ACTOR_RULE_ACTION]({ commit }, payload) {
      const newActorRule = {
        id: new Date().getTime(),
        ...payload
      }
      commit(MOVIE_TYPES.ADD_ACTOR_RULE, newActorRule)
      commit(MOVIE_TYPES.UPDATE_LOCAL_STORAGE)
    },
    [MOVIE_TYPES.CREATE_MOVIE_ACTION]({ commit }, payload) {

      const newMovie = {
        id: new Date().getTime(),
        ...payload
      }
      commit(MOVIE_TYPES.CREATE_MOVIE, newMovie)
      commit(MOVIE_TYPES.UPDATE_LOCAL_STORAGE)
    },

    [MOVIE_TYPES.UPDATE_MOVIE_ACTION]({ commit }, payload) {

      const newMovie = {
        id: new Date().getTime(),
        ...payload
      }
      commit(MOVIE_TYPES.UPDATE_MOVIE, newMovie)
      commit(MOVIE_TYPES.UPDATE_LOCAL_STORAGE)
    }
  },
}