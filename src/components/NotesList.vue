<template>
  <div class="notesList">
    <div class="note" v-for="(note, index) in notes" :key="index">
      <router-link :to="{name: 'note', params: {index: index+1}}">
        <span class="title">{{note.title}}</span>
        <div class="date"><span>{{new Date(note.date).toLocaleDateString()}}</span></div>
        
        <div v-if="note.type=='todos'" class="description">
          
          <li 
            v-for="(todo, index) in note.description" :key="index" :class="{completed: todo.completed}">
          {{todo.text }}
          </li>

        </div>
        <div v-else class="description">{{note.description}}</div>
       </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: Array
  },
  data(){
    return{
      hi: '',
      test: ''
    }
  },
  computed:{
    typeOfNoteDescription(){
            return typeof this.note.description
        } 
  }
}
</script>

<style scoped lang="scss">
.notesList{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.note{
  border: 1px solid #aaaaaa83;
  padding: 20px;
  width: 210px;
  height: 210px;
  margin: 10px;
  display: flex;
    flex-direction: column;
    
    &:hover{
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      border: none;
    }
  a{
    
    height: 100%;
    color: #34322a;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    .date{
      font-size: 10px;
      color: #aaaaaa;
      text-align: right;
      
    }
    .title{
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 20px;
      text-align: left;
      white-space:nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .description{
      max-height: 165px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      li{
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.completed{
    text-decoration: line-through;
}
</style>
