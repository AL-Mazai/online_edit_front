<template>
    <div class="login-wrap">
        <el-form class="login-container" :rules="rules" ref="user" :model="user">
            <h1 class="title">用户登录</h1>
            <el-form-item prop="email">
                <el-input type="text" placeholder="用户账号" v-model="user.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="用户密码" v-model="user.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doLogin" style="width: 100%;">登录</el-button>
            </el-form-item>
            <el-row style="text-align: center;margin-top: -10px;">
                <el-link type="primary" @click="$router.push('/register')" style="margin-right: 6px">用户注册</el-link>
                <el-link type="primary" >忘记密码</el-link>
            </el-row>
        </el-form>
    </div>

</template>

<script>


export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            rules: {//表单规则
                email: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        doLogin() {
            //发送请求
            this.axios.post("http://localhost:8088/user/login", this.user).then((res) => {
                //打印收到的数据（用于测试）
                console.log(res.data)
                //验证
                if (res.status === 200) {
                    this.$message.success("登陆成功")
                    this.$router.push('/')
                }
            }).catch((err) =>  {//异常
                if(err.response.status === 401){
                    this.$message.error(err.response.data)
                    console.log(err.response.data)
                }
            });
        },
    }
}
</script>

<style>
.login-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 10%;
    background-repeat: no-repeat;
    background-position: center right;
    background-size: 100%;
}

.login-container {
    border-radius: 10px;
    margin: 0px auto;
    width: 350px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
</style>