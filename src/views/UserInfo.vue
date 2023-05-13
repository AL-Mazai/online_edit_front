<!--个人信息-->
<template>
    <div class="avatar" style="text-align: center">
        <div>
            <el-avatar :size="100"  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <el-descriptions class="Info" title="   " :column="1"  border>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user" ></i>
                    用户ID
                </template>
                {{user.userId}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-monitor"></i>
                    用户名
                </template>
                {{user.userName}}
                <el-link icon="el-icon-edit" style="color: cornflowerblue; left: 5%"></el-link>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-message"></i>
                    邮箱
                </template>
                {{user.email}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-switch-button"></i>
                    会员
                </template>
                <el-tag size="small">是</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-cloudy"></i>
                    云空间
                </template>
                <el-link icon="el-icon-refresh" style="color: cornflowerblue" >同步</el-link>
            </el-descriptions-item>
        </el-descriptions>
    </div>

</template>


<script>

export default {

    // eslint-disable-next-line vue/multi-word-component-names

    data(){
        return{
            user: {
                userId: "",
                userName: "",
                email: "",
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
    width: 45%;
    text-align: center;
    margin: auto;
}
</style>
