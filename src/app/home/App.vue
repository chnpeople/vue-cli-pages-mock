<template>
<div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>父组件data{{msg}}</div>
    <HelloWorld v-model="msg" />
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
    name: 'App',
    components: {
        HelloWorld
    },
    data() {
        return {
            msg: '哈哈'
        }
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
