<template>
<div>
    <h1>father</h1>
    <h3 @click="getAxios">axios Test</h3>
    <input v-focus>
    <div>子组件{{title}}</div>
    <button @click="change">改变</button>
</div>
</template>

<script>
export default {
    model: {
        prop: 'msg',
        event: 'change'
    },
    props: {
        // eslint-disable-next-line vue/require-prop-type-constructor
        msg: {
            type: String
        }
    },
    data() {
        return {
            title: this.msg
        };
    },
    watch: {
        title(val) {
            this.$emit('change', val);
        }
    },
    methods: {
        change() {
            this.title = '啊啊'
        },
        getAxios() {
            console.log(this.$axios)
            this.$axios({
                methods: 'post',
                uri: '/home/myapi',
                successCallback: (res) => {
                    console.log(res);
                },
            });
        },
    },
    directives: {
        focus: {
            // 指令的定义
            bind: function (el, el2, el3) {
                console.log(el)
                console.log(el2)
                console.log(el3)
                el.focus()
            }
        }
    }
};
</script>

<style>
</style>
