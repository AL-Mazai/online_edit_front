<!--个人信息-->
<template>
    <div class="container">
        <el-card style="width: 500px; text-align: center">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:8088/qiniu/image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="avatarUrl != ''" :src="avatarUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <!--            <img src="../assets/logo.png" class="image">-->
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

            avatarUrl:'',
            imageUrl:'',
        }
    },
    created() {
        this.getUserInfo()
        this.getAvatarUrl()
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
                userId: this.userId,
                userName: this.userForm.userName,
                email: this.userForm.email,
            }
            this.axios.post("http://localhost:8088/user/changeInfo", newUser).then(res => {
                this.$message.success(res.data)
                this.getUserInfo()
            }).catch(error => {
                this.$message.error(error.response.data)
            })
        },
        //获取头像上传成功后的地址,再将头像url存储到数据库
        handleAvatarSuccess(res) {
            this.imageUrl = res

            let avatarRecord = {
                userId: this.userId,
                avatarUrl:this.imageUrl,
            }

            this.axios.post("http://localhost:8088/avatar/addAvatar", avatarRecord).then(res => {
                console.log(res.data)
                this.avatarUrl = res.data.avatarUrl
            }).catch(error => {
                this.$message.error(error.response.data)
            })
        },
        //获取头像url
        getAvatarUrl(){
            this.axios.get("http://localhost:8088/avatar/getAvatarUrl", {
                params:{
                    userId:this.userId
                }
            }).then(res => {
                this.avatarUrl = res.data
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
.avatar-uploader{
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader:hover:before{
    content: "点击上传";
    position: absolute;

    top: 20%;
    left: 43%;

    transform: translate(-50%, -50%);
    color: grey;
    font-size: 15px;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;

    width: 178px;
    height: 178px;

    line-height: 178px;
    text-align: center;

    border: 1px solid #8c939d;

    margin-bottom: 1vw;
}
.avatar {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease-in-out;
}
</style>
