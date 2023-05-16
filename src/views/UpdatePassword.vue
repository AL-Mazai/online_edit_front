<!--更改密码-->
<template>
    <div class="update-wrap">
        <el-form class="update-container">
            <h1 class="title">修改密码</h1>
            <el-form-item>
                <el-input type="text" name="email" placeholder="邮箱" v-model="email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="text" placeholder="原密码" v-model="oldPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="text" placeholder="新密码" v-model="newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="text" placeholder="确认密码" v-model="checkPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doUpdate" style="width: 100%">确认更改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "UpdatePassword",
    data() {
        return {

            email: '',
            oldPassword: '',
            newPassword: '',
            checkPassword: '',

            // rules: {//表单规则
            //     password: [
            //         { required: true, message: '请输入原密码', trigger: 'blur' },
            //         { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            //     ],
            //     newPassword: [
            //         { required: true, message: '请输入新密码', trigger: 'blur' },
            //         { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            //     ],
            //     checkPassword: [
            //         { required: true, message: '请再次输入新密码', trigger: 'blur' },
            //         { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            //     ],
            // },
            dialogFormVisible: false,
        };
    },
    methods: {
        //修改密码
        doUpdate() {
            if (this.checkPassword === this.newPassword) {
                //发送请求
                this.axios.post("http://localhost:8088/user/changePassword", {
                    email: this.email,
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                }).then((res) => {
                    //打印收到的数据（用于测试）
                    // console.log(res.data)
                    //验证
                    if (res.status === 200) {
                        this.$message.success("修改成功")
                        this.$router.push('/')
                    }
                }).catch((err) => {//异常
                    if (err.response.status === 401) {
                        this.$message.error(err.response.data)
                    }
                });
            } else {
                this.$message.error("两次密码输入不一致！")
            }
        },
    }
}
</script>

<style scoped>
.update-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    /*padding-top: 5%;*/
    background-repeat: no-repeat;
    background-position: center right;
    background-size: 100%;
}

.update-container {
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
