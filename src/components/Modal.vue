<template>
    <div class="modal" ref="modal" @click.self="closeModal">
        <div class="content">
            <i class="fa fa-times close" aria-hidden="true" @click="closeModal"></i>
            <div class="title">
                <h1>Confirm action</h1>
                <slot></slot>
            </div>
            <div class="buttons">
                <button class="blue" @click="agreeModal">Yes</button>
                <button class="red" @click="closeModal">No</button>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        methods:{
            closeModal(){
                this.$emit('close-modal')
            },
            agreeModal(){
                this.$emit('agree-modal')
            }
        }
    }
</script>

<style lang="scss" scoped>
.modal{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.7);
}
.content{
    display: block;
    max-width: 500px;
    max-height: 300px;
    background-color: #fefefe;
    margin: 50px auto;
    border-radius: 10px;
    padding: 20px;
    position: relative;   
}
.close{
    position:absolute;
    right:20px;
    top:20px;
    transition: .5s;
    cursor: pointer;
}
.title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.buttons{
    display: flex;
    margin: 50px 110px;
    justify-content: space-between;
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
}
.red{
    background-color: #dc3545;
}
</style>