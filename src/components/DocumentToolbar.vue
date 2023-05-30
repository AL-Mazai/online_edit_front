<template>
    <!--功能栏-->
    <div>
        <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                  v-model="fileName" @input="transferFileNameToParent"></el-input>
        <el-button type="primary" style="margin-left: 5px;" @click="searchByName">搜索 <i
            class="el-icon-search"></i></el-button>
        <el-button type="primary" style="margin-left: 5px;" @click="refresh">刷新 <i class="el-icon-refresh"></i>
        </el-button>
        <el-button type="primary" style="margin-left: 5px;" @click="createDoc">新建 <i class="el-icon-plus"></i>
        </el-button>
    </div>
</template>

<script>
export default {
    name: "DocumentToolbar",
    data(){
        return{
            fileName:'',
        }
    },
    props: {
        searchByName: Function,
        refresh: Function,
        createDoc: Function,
    },
    methods: {
        //将input框中的fileName传给父组件
        transferFileNameToParent() {
            this.$emit('update-file-name', this.fileName);
        }
    }
}
</script>

<style scoped>

</style>