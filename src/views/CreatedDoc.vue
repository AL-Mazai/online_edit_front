<!--我创建的文档-->
<template>
    <div>
        <!--文档列表-->
        <div>
            <el-table :data="showTableData" stripe style="width: 100%">
                <el-table-column prop="docId" label="序号" width="150"></el-table-column>
                <el-table-column prop="docName" label="文件名" width="150"></el-table-column>
                <el-table-column prop="type" label="类型" width="150"></el-table-column>
                <el-table-column prop="createdTime" label="创建时间" width="150" :formatter="dateFormat"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="success" icon="el-icon-view" @click="getUserOfDoc(scope.row.docId)">查看成员</el-button>
                        <!--删除提示框-->
                        <el-popconfirm
                            confirm-button-text='确定'
                            cancel-button-text='取消'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="deleteDoc(scope.row)"
                        >
                            <el-button type="danger" icon="el-icon-delete" slot="reference" style="margin-left: 1vw">删除</el-button>
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
        <!--查看文档参与者对话框-->
        <div>
            <el-dialog title="参与成员" :visible.sync="userOfDocDialog">
                <el-button type="primary" icon="el-icon-plus" @click="invite()">邀请</el-button>
                <el-table :data="userOfDocTableData">
                    <el-table-column property="userId" label="编号" width="150"></el-table-column>
                    <el-table-column property="userName" label="姓名" width="150"></el-table-column>
                    <el-table-column property="email" label="邮箱"></el-table-column>
                    <el-table-column label="操作">
                        <template v-slot:default="scope">
                            <!--删除提示框-->
                            <el-popconfirm
                                confirm-button-text='确定'
                                cancel-button-text='取消'
                                icon="el-icon-info"
                                icon-color="red"
                                title="您确定删除吗？"
                                @confirm="deleteUserOfDoc(scope.row.userId)"
                            >
                                <el-button type="danger" icon="el-icon-delete" slot="reference">踢除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
        <!--邀请对话框-->
        <div>

        </div>
    </div>
</template>

<script>
export default {
    name: "CreatedDoc",
    data() {
        return {
            userId: 1,
            docId: 0,
            docTableData: [],
            userOfDocTableData: [],
            userOfDocDialog: false,
            /***分页变量****/
            pageIndex: 1, // 第几页
            pageSize: 5, // 每页几条数据
            total: 0, // 总条目数
            showTableData: [], // 当前展示的数据
        }
    },
    created() {
        this.loadDoc()
    },
    mounted() {
        //在组件被挂载到DOM后执行,在这里中,使用setTimeout()函数来延迟0.5秒执行代码块内的逻辑
        setTimeout(() => {
            // 获取总条目数
            this.total = this.docTableData.length;
            // 根据当前是第几页、每页展示几条，去截取需要展示的数据
            this.getShowTableData();
            // console.log(this.showTableData)
        }, 500);
    },
    methods: {
        //初始化，获取所有文档
        loadDoc(){
            this.axios.get('http://localhost:8088/user/getAllDocCreate', {
                params: {
                    userId: this.userId
                }
            })
                .then(response => {
                    // console.log(response.data)//测试
                    this.docTableData = response.data
                })
                .catch(error => {
                    console.log(error)
                    // this.$message.info(error.data)
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
            this.showTableData = this.docTableData.slice(begin, end);
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
        //编辑文档
        handleEdit() {

        },
        //获取文档的所有参与者
        getUserOfDoc(docId) {
            this.docId = docId //获取文档的id
            // console.log(row.docId)//测试
            this.userOfDocDialog = true
            this.axios.get('http://localhost:8088/doc/selectAllUserOfDocument', {
                params: {
                    docId: docId
                }
            })
                .then(response => {
                    // console.log(response.data)//测试
                    this.userOfDocTableData = response.data
                })
                .catch(error => {
                    // console.log(error)
                    this.$message.info(error.data)
                })
        },
        //踢除文档的某个参与者
        deleteUserOfDoc(userId) {
            this.axios.delete('http://localhost:8088/access/deleteUserOfDoc', {
                params: {
                    userId: userId,
                    docId: this.docId
                }
            })
                .then(response => {
                    // console.log(response.data)
                    this.$message.success(response.data)
                    //重新获取
                    this.getUserOfDoc(this.docId)
                })
                .catch(error => {
                    // console.log(error.response.data)
                    this.$message.error(error.response.data)
                })
        },
        //邀请成员参与文档编辑
        invite(){

        },
        //删除文档
        deleteDoc(row){
            this.axios.delete('http://localhost:8088/doc/deleteDocument', {
                params: {
                    docId: row.docId
                }
            })
                .then(response => {
                    // console.log(response.data)
                    this.$message.success(response.data)
                    //重新获取
                    this.loadDoc()
                    //更新页面
                    // location.reload()
                })
                .catch(error => {
                    // console.log(error.response.data)
                    this.$message.error(error.response.data)
                })
        },
        //设置时间格式
        dateFormat(row, column) {
            // console.log(row[column.prop])//测试
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