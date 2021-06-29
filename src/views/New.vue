<template>
  <div class="new">
  
    <input v-model="newTitle" type="text" placeholder="Title...">
    <div class="choice">
      <input type="radio" name="type" id="todos" value="todos" v-model="typeOfNote"><span>List of todos</span>
      <input type="radio" name="type" id="notes" value="notes" checked v-model="typeOfNote" ><span>Note</span>
    </div>
    <textarea
      v-if="typeOfNote=='todos'" 
      v-model="newTasks" 
      cols="30" rows="15" 
      placeholder="Each line is a new task. Enter tasks..."
    />
    <textarea v-else v-model="newTasks" cols="30" rows="15" placeholder="Enter text..."/>
    <button @click="addNote" class="blue">Add</button>
    
    
  </div>
</template>

<script>
  export default {
    data(){
      return{
        newTitle: '',
        newTasks: '',
        newNote: '',
        typeOfNote: 'todos'
      }
    },
    methods: {
      addNote(){
        if(this.typeOfNote == 'todos'){
          let re = '\n';
          let todos = this.newTasks.split(re)
          let newDescription = []
          for(let i=0; i<todos.length; i++){
            newDescription[i] = {text: todos[i], completed: false, editing: false}
          }
          this.newNote = {title: this.newTitle, description: newDescription, date: new Date(), type: 'todos'}
        }else this.newNote = {title: this.newTitle, description: this.newTasks, date: new Date(), type: 'notes'}
          this.$store.dispatch('createNote', this.newNote)

          this.newTitle = ''
          this.newTasks = ''
          this.$router.push('/')
      }  
    }
  }
</script>

<style lang="scss" scoped>
.new{
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}
input{
  height: 30px;
  font-family: 'Noto Sans HK', sans-serif;
}
.choice{
  display: flex;
  justify-content: center;
  align-items: center;
}
.choice span{
  margin: 0 20px 0 10px;
}
textarea{
  margin-top: 10px;
  resize: none;
  font-family: 'Noto Sans HK', sans-serif;
}
button{
  width: 80px;
  align-self: flex-end;
  margin-top: 10px;
  margin: 5px;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  }
  .blue{
      color: #fff;
      font-size: 16px;
      background-color: #519cd8;
      border-radius: 8px;
  }
</style>

