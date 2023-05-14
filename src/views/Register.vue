<template>
    <div class="login-wrap">
        <el-form class="login-container">
            <h1 class="title">用户注册</h1>
            <el-form-item>
                <el-input
                    type="text"
                    placeholder="用户id"
                    v-model="user.userId"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    type="text"
                    placeholder="用户名"
                    v-model="user.userName"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    type="text"
                    placeholder="注册邮箱"
                    v-model="user.email"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    type="password"
                    placeholder="注册密码"
                    v-model="user.password"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doRegister" style="width: 100%"
                >注册
                </el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Register",
    data() {
        return {
            user: {
                userId: "",
                userName: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        //注册
        doRegister() {
            let url = "http://localhost:8088/user/register";
            this.axios.post(url, this.user).then((res) => {
                this.$message.success(res.data)
                this.$router.push("/login"); //注册成功跳转到登录页面
            }).catch((err) => {
                console.log(err);//控制台测试代码
                this.$message.error(err.response.data)
            });
        },
    },
};
</script>

<style scoped>
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