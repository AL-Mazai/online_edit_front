<!--我参与的文档-->
<template>
    <div>
        <el-table :data="showTableData" stripe style="width: 100%">
            <el-table-column prop="docId" label="序号" width="150"></el-table-column>
            <el-table-column prop="docName" label="文件名" width="150"></el-table-column>
            <el-table-column prop="type" label="类型" width="150"></el-table-column>
            <el-table-column prop="createdTime" label="创建时间" :formatter="dateFormat" width="150"></el-table-column>
            <el-table-column label="操作">
                <template v-slot:default="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    <!--删除提示框-->
                    <el-popconfirm
                        confirm-button-text='残忍离去！'
                        cancel-button-text='点错了~'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定退出吗？"
                        @confirm="quitDoc(scope.row)"
                    >
                        <el-button type="danger" icon="el-icon-delete" slot="reference" style="margin-left: 1vw">退出</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 50]"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "ParticipateDoc",
    data() {
        return {
            userId: (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}).userId,
            allDocParTableData: [],
            /***分页变量****/
            pageIndex: 1, // 第几页
            pageSize: 5, // 每页几条数据
            total: 0, // 总条目数
            showTableData: [], // 当前展示的数据
        }
    },
    created() {
        this.getAllDocParticipate()
    },
    mounted() {
        //在组件被挂载到DOM后执行,在这里中,使用setTimeout()函数来延迟0.5秒执行代码块内的逻辑
        setTimeout(() => {
            // 获取总条目数
            this.total = this.allDocParTableData.length;
            // 根据当前是第几页、每页展示几条，去截取需要展示的数据
            this.getShowTableData();
            console.log(this.showTableData)
        }, 500);
    },
    methods: {
        //获取所有参与的文档
        getAllDocParticipate(){
            this.axios.get('http://localhost:8088/user/getAllDocParticipate', {
                params: {
                    userId: this.userId
                }
            })
                .then(response => {
                    // console.log(response.data)//测试
                    this.allDocParTableData = response.data
                })
                .catch(error => {
                    // console.log(error)
                    this.$message.info(error.data)
                })
        },
        //编辑
        handleEdit(row) {
            let url = "http://192.168.43.202:4000/editor?fileName=" + row.docName + "." + row.type + "&uid=" + this.userId;
            window.open(url, '_blank');
            console.log(row)
        },
        //退出
        quitDoc(row){
            this.axios.delete('http://localhost:8088/access/quitDoc', {
                params: {
                    userId: this.userId,
                    docId: row.docId
                }
            })
                .then(response => {
                    // console.log(response.data)
                    this.$message.success(response.data)
                })
                .catch(error => {
                    console.log(error.response.data)
                    this.$message.error("退出失败！")
                })
        },
        /********************分页*******************/
        //获取当前页数据
        getShowTableData() {
            // 获取截取开始索引
            let begin = (this.pageIndex - 1) * this.pageSize;
            // 获取截取结束索引
            let end = this.pageIndex * this.pageSize;
            // 通过索引去截取当前页要展示的数据
            this.showTableData = this.allDocParTableData.slice(begin, end);
            // console.log(this.showTableData)
        },
        // 当前页数改变，重新截取
        handleCurrentChange(currentPage) {
            // console.log(currentPage)
            this.pageIndex = currentPage;
            this.getShowTableData();
        },
        // 每个页面条目数改变，重新截取
        handleSizeChange(pageSize) {
            // console.log(pageSize)
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.getShowTableData();
        },
        /********************分页*******************/
        //设置时间格式
        dateFormat(row, column) {
            // console.log(row[column.property])//测试
            let date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return this.$moment(date).format("YYYY-MM-DD");
        },
    }
}
</script>

<style scoped>

</style>