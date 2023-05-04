<!--主页-->
<template>
    <div>
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="username"></el-input>
            <el-button type="primary" style="margin-left: 5px;">搜索 <i class="el-icon-search"></i></el-button>
            <el-button type="warning" style="margin-left: 5px;" @click="reset">重置 <i class="el-icon-refresh"></i></el-button>
            <el-button type="primary" style="margin-left: 5px;">新建 <i class="el-icon-plus"></i></el-button>
        </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data(){
        return{
            username:'',
        }
    },
    methods:{
        reset(){
            this.username = '';
        }
    }
}
</script>
