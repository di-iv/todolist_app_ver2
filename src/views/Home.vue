<template>
  <div class="home">
    <NotesList v-if="notes.length>0" :notes="notes"/>
      <div v-else>It is empty. <router-link to="/new">Create your first note</router-link></div>
  </div>
</template>

<script>
import NotesList from '@/components/NotesList.vue'

export default {
  components: {
    NotesList
  },
  computed: {
    notes(){
      return this.$store.getters.notes
    }
  }
}
</script>
