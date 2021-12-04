<template>
    <div class="back">
        <div class="content">
            <img src="../assets/logo.png">
            <div class="user">
                <i class="el-icon-s-custom"></i>
                <input type="text" v-model="user">
            </div>
            <div class="pass">
                <i class="el-icon-lock"></i>
                <input type="password" v-model="pass">
            </div>
            <div class="bottom">
                <button class="log" @click="login">登录</button>
                <button class="res" @click="reset">重置</button>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../http/index'
export default {
    props: {

    },
    data() {
        return {
            user:'',
            pass:''
        };
    },
    methods: {
        login(){
            http({
               url:'/login',
               method:'post',
               data:{
                   username:this.user,
                   password:this.pass,
               } 
            }).then((res)=>{
                console.log(res);
                sessionStorage.setItem('token',res.data.token);
                this.$router.push('/index');
            })
        },
        reset(){
            this.user='';
            this.pass='';
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.back{
    width: 100%;
    height: 1167.5px;
    background-color: #2b4b6b;
    .content{
        width: 450px;
        height: 300px;
        background-color: #fff;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 20px;
        padding-top: 100px;
        box-sizing: border-box;
        img{
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background-color: #eeeeee;
            border: 12px solid #fff;
            position: absolute;
            left: 50%;
            top: 0px;
            transform: translate(-50%,-50%);
        }
        .user,.pass{
            width: 100%;
            height: 40px;
            border: 1px solid #dcdfe6;
            display: flex;
            align-items: center;
            padding: 5px;
            margin-bottom:20px;
            i{
                color:#c0c4cc;
            }
            input{
                flex: 1;
                margin-left: 10px;
            }
        }
        .bottom{
            display: flex;
            justify-content: flex-end;
            button{
                width: 70px;
                height: 40px;
                border-radius: 5px;
                font-size: 18px;
                color: #fff;
                margin-left: 10px;
            }
            .log{
                background-color: #409eff;
            }
            .res{
                background-color: #909399;
            }
        }
    }
}
</style>
