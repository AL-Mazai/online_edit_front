<!--个人信息-->
<template>
    <div class="container">
        <el-card style="width: 500px; text-align: center">
            <img src="../assets/logo.png" class="image">
            <el-form label-width="80px" size="small">
                <el-form-item label="用户Id">
                    <el-input v-model="userId" disabled autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="userForm.userName" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userForm.email" autocomplete="off" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
                <el-button type="warning" @click="updateUserInfo">保存更改</el-button>
            </el-form>
        </el-card>
    </div>

</template>


<script>

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'UserInfo',
    data() {
        return {
            userId: (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}).userId,
            userForm: {
                userName: '',
                email: '',
            },
        }
    },
    created() {
        this.getUserInfo()
    },
    methods: {
        //获取用户信息
        getUserInfo() {
            this.axios.get('http://localhost:8088/user/getUserInfo', {
                params: {
                    userId: this.userId,
                }
            }).then(response => {
                this.userForm = response.data
            }).catch(error => {
                this.$message.error(error.data)
            })
        },
        //保存信息
        updateUserInfo() {
            let newUser = {
                userId:this.userId,
                userName:this.userForm.userName,
                email:this.userForm.email,
            }
            this.axios.post("http://localhost:8088/user/changeInfo", newUser).then(res => {
                this.$message.success(res.data)
                this.getUserInfo()
            }).catch(error => {
                this.$message.error(error.response.data)
            })
        },
    }
}

</script>

<style scoped>
.container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

</style>
