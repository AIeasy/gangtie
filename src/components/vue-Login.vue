
<template>
    <div class = "login_container">
        <div class = "login_box">
        <!--头像区-->
            <div class="avator_box">
                <img src="../assets/logo.png" alt="">
            </div>
        <!--登陆表单区域-->
        <el-form  :model="loginForm" ref = "loginFormRef" :rules="loginForm_rules" label-width="0px" class = "login_form">
            <!--用户名-->
            <el-form-item prop ="username">
                 <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item prop ="password">
                 <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type = "password"></el-input>
            </el-form-item>
            <!--按钮-->
            <el-form-item class = "btns" >
                <el-button type="primary" @click="login">登陆</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
/* eslint-disable  */
export default { 
    data () { 
        return { 
            loginForm: { username: 'admin', password: '123456' }, 
            loginForm_rules: { 
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
                 { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }], 
                password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }, 
                 { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }] 
                 } 
                 } 
                 }, 
    methods: { 
        resetLoginForm () { 
        this.$refs.loginFormRef.resetFields() 
        },
        login () {
            this.$refs.loginFormRef.validate(async valid =>{
            if (!valid) return;
            const {data: res} = await this.$http.post("login",this.loginForm);
            if(res.meta.status !== 200) return this.$message.error('登录失败');
            this.$message.success("登陆成功");
            console.log(res);
            window.sessionStorage.setItem('token',res.data.token);
            this.$router.push('/home')
            })

        }
        
    } 
        
}
/* eslint-enable  */

</script>

<style lang = "less" scoped>
.login_container{
    background-color: #2b4b6b ;
    height: 100%;
}
.login_box{/*登陆框*/
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%); .avator_box{
        background-color: #2b4b6b;
        border: 1px solid #fff;
        border-radius: 50%;
        height: 130px;
        width: 130px;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left:50%;
        transform: translate(-50%,-50%);
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    .btns{/*按钮*/
        display: flex;
        justify-content: flex-end;
    }
    .login_form{/*输入框*/
        padding: 0 20px;
        width: 100%;
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
    }
}
</style>
