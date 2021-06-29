<template>
    <div class="note" v-if="note">
        <Modal v-if="isModalVisible" @agree-modal="agreeModal()" @close-modal="closeModal()">
            <p v-if="action=='delete'">Do you really want to delete note "{{note.title}}"?</p>
            <p v-if="action=='deleteTodo'">Do you really want to delete todo "{{note.description[this.todoIndex].text}}"?</p>
        </Modal>
        <input class="title" v-model="newTitle" v-focus @blur="updateTitle()">
        <div v-if="typeof this.note.description == 'object'" >
            <div class="description">
                <div 
                    class="todoText" 
                    v-for="(todo, index) in note.description" :key="index" 
                    :class="{completed: todo.completed}"
                >
                    <input  type="checkbox" @click="toggleTodo(index)" v-model="todo.completed">
            
                    <div v-if="!todo.editing" @click="editTodo(index)">{{todo.text }}</div>
                    <input v-else type="text" v-model="newTodo" v-focus @blur="updateTodo(index)">

                    <div class="button_del"><button @click="doAction('deleteTodo', index)">Delete</button></div>

                </div>
            </div>
        </div>
        <div v-else>
            <div> 
                <div 
                    class="description" 
                    v-if="!editingDescription" 
                    @click="editDescription()"
                >
                    {{note.description}}
                </div>
                <textarea
                    v-else 
                    type="text" 
                    ref="desc"
                    v-model="newDescription" 
                    v-focus @blur="updateDescription()"
                />
            </div>
        </div>
        
        <div class="buttons">
            <button v-if="typeOfNoteDescription=='object'" @click="addNewTodo" class="blue">Add new todo</button>
            <button @click="doAction('delete')" class="red">Delete</button>
            <!-- <button @click="doAction('save')" class="blue">Save</button> -->
        </div>
        
    </div>
    <div v-else>
        This note is not found.
        <router-link :to="{name: 'Home'}"> See list of notes</router-link>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
    components:{
        Modal
    },
    data(){
        return{
            newTitle: '',
            newTodo: '',
            action: '',
            todoIndex: '',
            editingDescription: false,
            newDescription: '',
            noteIndex: this.$route.params.index-1,
            isModalVisible: false,
        }
    },
    mounted(){
        if(this.note) this.newTitle = this.note.title
    },
    computed: {
        note(){
            return this.$store.getters.notes[this.noteIndex]
        },
        typeOfNoteDescription(){
            return typeof this.note.description
        }
    },
    watch: {
        isModalVisible: function(){
            console.log(this.isModalVisible)
        }
    },
    methods:{
        toggleTodo(index){
            this.$store.dispatch('updateToggle', {noteIndex: this.noteIndex, todoIndex: index})
        },
        updateTitle(){
            this.note.title = this.newTitle 
            this.$store.dispatch('updateTitle', {noteIndex: this.noteIndex, newTitle: this.newTitle})
        },
        editTodo(index){
            this.newTodo = this.note.description.[index].text 
            this.note.description.[index].editing = true
        },
        editDescription(){
            this.newDescription = this.note.description
            this.editingDescription = true
            this.$nextTick(() => {
                console.log(this.$refs.desc)
                console.log(this.$refs.desc.scrollHeight)
                console.log(this.$refs.desc.scrollTop)
                this.$refs.desc.style.height = (this.$refs.desc.scrollHeight - 12) + 'px'
                });
        },
        updateTodo(index){
            if (this.note.description.[index].editing == true){
                this.note.description.[index].editing = false
                this.$store.dispatch('updateTodo', {noteIndex: this.noteIndex, todoIndex: index, newTodo: this.newTodo})
            }
        },
        deleteTodo(index){
            this.$store.dispatch('deleteTodo', {noteIndex: this.noteIndex, todoIndex: index})
        },
        updateDescription(){
            this.editingDescription = false
            this.$store.dispatch('updateDescription', {noteIndex: this.noteIndex, newDescription: this.newDescription})
        },
        addNewTodo(){
            let newTodo = {text: '', completed: false, editing: false}
            console.log('add new todo')
            this.$store.dispatch('addNewTodo', {noteIndex: this.noteIndex, newTodo: newTodo})
        },
        deleteNote(){
            this.$store.dispatch('deleteNote', this.noteIndex)
            this.$router.push('/')
        },
        doAction(action, index){
            this.isModalVisible = true
            this.action = action
            this.todoIndex = index
        },
        closeModal(){
            this.isModalVisible = false
        },
        agreeModal(){
            this.isModalVisible = false
            if (this.action == 'delete') this.deleteNote()
            if (this.action == 'deleteTodo') this.deleteTodo(this.todoIndex)
        }
    }
}
</script>

<style lang="scss" scoped>
.note{
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    text-align: left;
}
.title{
    border: 1px solid #aaaaaa;
    font-size: 20px;
    font-weight: bold;
    padding: 5px 10px;
}
.description{
    border: 1px solid #aaaaaa;
    white-space:pre-wrap;
    padding: 10px;
    margin-top: 10px;
    min-height: 200px;
    height: auto;
    // overflow: auto;
}
.todoText{
    display: flex;
    flex-direction: row;
    align-items: baseline;
}
.todoText div{
    min-width: 150px;
    min-height: 23px;
    cursor: pointer;
}
textarea{
  margin-top: 10px;
  resize: none;
  padding: 8px;
  height: 202px;
  width: 583px;
  font-size: 16px;
  font-family: 'Noto Sans HK', sans-serif;
}
.completed{
    text-decoration: line-through;
}
.buttons{
    align-self: flex-end;
}
.button_del{
    margin-left: auto;
    button{
    width: 60px;
    margin: 10px 5px 5px 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    color: #aaaaaa;
    font-size: 12px;
    border-radius: 8px;
    }
    :hover{
        background-color: #dc3545;
        color: #fff;
    }
}
button{
    width: 80px;
    margin: 10px 5px 5px 5px;
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    border-radius: 8px;
}
.blue{
    background-color: #519cd8;
    width: auto;
}
.red{
    background-color: #dc3545;
}
</style>