<!--主页-->
<template>
    <div>
        <!--功能栏-->
        <div>
            <document-toolbar @search-by-name="allDocTableData = $event"></document-toolbar>
        </div>
        <!--数据栏-->
        <div>
            <el-table :data="allDocTableData" stripe style="width: 100%">
                <el-table-column prop="docId" label="序号" width="150"></el-table-column>
                <el-table-column prop="docName" label="文件名" width="150"></el-table-column>
                <el-table-column prop="type" label="类型" width="150"></el-table-column>
                <el-table-column prop="createdTime" label="创建时间" :formatter="dateFormat"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-size="pageSize"
                :page-sizes="[5, 10, 20, 50]"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import DocumentToolbar from "@/components/DocumentToolbar";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    components:{
        DocumentToolbar
    },
    data() {
        return {
            userId: this.$userId,
            fileName: '',
            type: '',

            allDocTableData: [],//所有文档

            /***分页变量****/
            pageNum: 1,
            pageSize: 5,
            total: 0
        }
    },
    created() {
        this.getAllDoc()
    },
    methods: {
        //重置主页搜索框
        reset() {
            this.name = '';
        },
        //获取所有文档
        getAllDoc() {
            if (this.fileName !== '' || this.type !== '') {
                this.pageNum = 1;
            }
            this.axios.get('http://localhost:8088/doc/selectFileByPage', {
                params: {
                    userId:this.userId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    fileName: this.fileName,
                    type: this.type,
                    accessLevel: 1
                }
            })
                .then(response => {
                    // console.log(response.data.docList)//测试
                    this.allDocTableData = response.data.docList
                    this.total = response.data.total
                })
                .catch(error => {
                    this.$message.info(error.response.data)
                })
        },
        //编辑文档
        handleEdit() {

        },
        /********************分页*******************/
        //数据量改变
        handleSizeChange(pageSize) {
            // console.log(pageSize)
            this.pageSize = pageSize
            this.getAllDoc()
        },
        //页数改变
        handleCurrentChange(pageNum) {
            // console.log(pageNum)
            this.pageNum = pageNum
            this.getAllDoc()
        },
        /********************分页*******************/

        //设置时间格式
        dateFormat(row, column) {
            // console.log(row[column.prop])//测试
            let date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return this.$moment(date).format("YYYY-MM-DD");
        },
    },

}
</script>

<style scoped>
span {
    margin: 1vw 0 1vw 2vw;
    display: inline-block;
    font-size: 1.5vw;
}
</style>
