import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: JSON.parse((localStorage.notes) || '[]')
  },
  mutations: {
    createNote(state, newNote){
      state.notes.push(newNote)
      localStorage.notes = JSON.stringify(state.notes)
    },
    updateToggle(state, {noteIndex, todoIndex}){
      state.notes[noteIndex].description[todoIndex].completed = !state.notes[noteIndex].description[todoIndex].completed
      localStorage.notes = JSON.stringify(state.notes)
    },
    updateTitle(state, {noteIndex, newTitle}){
      state.notes[noteIndex].title = newTitle
      localStorage.notes = JSON.stringify(state.notes)
    },
    updateTodo(state, {noteIndex, todoIndex, newTodo}){
      state.notes[noteIndex].description[todoIndex].text = newTodo
      localStorage.notes = JSON.stringify(state.notes)
    },
    updateDescription(state, {noteIndex, newDescription}){
      state.notes[noteIndex].description = newDescription
      localStorage.notes = JSON.stringify(state.notes)
    },
    deleteTodo(state, {noteIndex, todoIndex}){
      state.notes[noteIndex].description.splice(todoIndex, 1)
      localStorage.notes = JSON.stringify(state.notes)
    },
    deleteNote(state, noteIndex){
      state.notes.splice(noteIndex, 1)
      localStorage.notes = JSON.stringify(state.notes)
    },
    addNewTodo(state, {noteIndex, newTodo}){
      state.notes[noteIndex].description.push(newTodo)
      localStorage.notes = JSON.stringify(state.notes)
    }
  },
  actions: {
    createNote({commit}, newNote){
      commit('createNote', newNote)
    },
    updateToggle({commit}, {noteIndex, todoIndex}){
      commit('updateToggle', {noteIndex, todoIndex})
    },
    updateTitle({commit}, {noteIndex, newTitle}){
      commit('updateTitle', {noteIndex, newTitle})
    },
    updateTodo({commit},{noteIndex, todoIndex, newTodo}){
      commit('updateTodo', {noteIndex, todoIndex, newTodo} )
    },
    updateDescription({commit}, {noteIndex, newDescription}){
      commit('updateDescription', {noteIndex, newDescription})
    },
    deleteTodo({commit}, {noteIndex, todoIndex}){
      commit('deleteTodo', {noteIndex, todoIndex})
    },
    deleteNote({commit}, noteIndex){
      commit('deleteNote', noteIndex)
    },
    addNewTodo({commit}, {noteIndex, newTodo}){
      commit('addNewTodo', {noteIndex, newTodo})
    }
  },
  getters: {
    notes: (state) => {
      return state.notes
    },
    getTodoById: (state, index) => {
      let a = (index-1)
      return state.notes[a]
    }
  }
})
