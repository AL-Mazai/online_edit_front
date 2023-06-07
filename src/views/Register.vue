<template>
    <div class="register-wrap">
        <el-form class="register-container">
            <h1 class="title">用户注册</h1>
            <el-form-item>
                <el-input
                    type="text"
                    placeholder="用户id"
                    v-model="user.userId"
                    autocomplete="off"
                    prefix-icon="el-icon-key"
                    disabled
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    type="text"
                    placeholder="用户名"
                    v-model="user.userName"
                    autocomplete="off"
                    prefix-icon="el-icon-user"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    type="text"
                    placeholder="注册邮箱"
                    v-model="user.email"
                    autocomplete="off"
                    prefix-icon="el-icon-phone"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    type="password"
                    placeholder="注册密码"
                    v-model="user.password"
                    autocomplete="off"
                    prefix-icon="el-icon-lock"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    type="password"
                    placeholder="确认密码"
                    v-model="checkPassword"
                    autocomplete="off"
                    prefix-icon="el-icon-lock"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getUserId" style="width: 100%"
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
                userId: '',
                userName: "",
                email: "",
                password: "",
            },
            checkPassword: '',
        };
    },
    methods: {
        //注册
        doRegister() {
            if(this.checkPassword === this.user.password){
                let url = "http://localhost:8088/user/register";
                this.axios.post(url, this.user).then((res) => {
                    console.log(this.user)
                    this.$message.success(res.data)
                }).catch((err) => {
                    console.log(err);//控制台测试代码
                    this.$message.error(err.response.data)
                });
            }else {
                this.$message.warning("两次密码不一致！")
            }
        },

        getUserId(){
            let name_email= {
                name: this.user.userName,
                email: this.user.email
            }
            this.axios.post("http://43.138.121.194:4001/createUser", name_email).then((res) => {
                this.user.userId = res.data.userId
                this.doRegister()
                this.$router.push("/login"); //注册成功跳转到登录页面
            }).catch((err) => {
                console.log(err);//控制台测试代码
                this.$message.error(err.response.data)
            });


        }
    },
};
</script>

<style scoped>
.register-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh;
    background-color: #fff;
}

.register-container {
    width: 350px;
    padding: 30px 35px 15px 35px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.title {
    text-align: center;
    margin-bottom: 20px;
}

.el-input__inner {
    border-radius: 6px;
}

.el-button {
    border-radius: 6px;
}
</style>