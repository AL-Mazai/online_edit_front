<!--个人信息-->
<template>
    <div class="avatar" style="text-align: center">
        <div>
            <el-avatar :size="100"  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <el-descriptions class="Info" title="   " :column="1"  border>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user" ></i>用户ID
                </template>
                {{user.userId}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-monitor"></i>用户名
                </template>
                {{user.userName }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-message"></i>邮箱
                </template>
                {{user.email}}
            </el-descriptions-item>
        </el-descriptions>
        <el-button type="warning" style="margin-top: 1vw">修改</el-button>
    </div>

</template>


<script>

export default {

    // eslint-disable-next-line vue/multi-word-component-names

    data(){
        return{
            user: {
                userId: '1',
                userName: 'zzw',
                email: '123@qq.com',
            },
        }
    },
    methods:{
        reset(){
            this.userName = '';
            this.userId='';
            this.email=''
        },
        // async submit(){
        //     var name = sessionStorage.getItem("userName");
        //     const {data:res} = await this.$http.post(`select/${name}`)
        //     this.userList=res.data
        // },
    }
}

</script>

<style>
.Info{
    width: 50%;
    text-align: center;
    margin: auto;
}
</style>
