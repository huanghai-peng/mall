<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        props:{
            // message:{
            //     type:String,
            //     default:''
            // },
            // show:{
            //     type:Boolean,
            //     default:false
            // }
        },
        data(){
            return {
                message:'',
                isShow:false
            }
        },
        methods:{
            show(message='你好啊',delay=2000){
                this.isShow = true;
                this.message = message;

                setTimeout(()=>{
                    this.isShow = false;
                    this.message = '';
                },delay)
            }
        }
    }
</script>

<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: rgba(0, 0, 0, .6);
        padding: 8px 10px;
        color: #fff;
        z-index: 999;
    }
</style>