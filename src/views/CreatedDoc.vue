<!--我创建的文档-->
<template>
    <div>
        <!--文档列表-->
        <div>
            <el-table :data="docTableData" stripe style="width: 100%">
                <el-table-column prop="docId" label="序号" width="150"></el-table-column>
                <el-table-column prop="docName" label="文件名" width="150"></el-table-column>
                <el-table-column prop="type" label="类型" width="150"></el-table-column>
                <el-table-column prop="createdTime" label="创建时间" :formatter="dateFormat"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="primary" icon="el-icon-view" @click="getUserOfDoc(scope.row)">查看成员
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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
                            <el-button type="danger" icon="el-icon-delete" @click="deleteUserOfDoc(scope.row)">删除</el-button>
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
            userOfDocDialog: false
        }
    },
    created() {
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
    methods: {
        handleEdit() {

        },
        //获取文档的所有参与者
        getUserOfDoc(row) {
            this.docId = row.docId //获取文档的id
            // console.log(row.docId)//测试
            this.userOfDocDialog = true
            this.axios.get('http://localhost:8088/doc/selectAllUserOfDocument', {
                params: {
                    docId: this.docId
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
        deleteUserOfDoc(row) {
            this.axios.delete('http://localhost:8088/access/deleteUserOfDoc', {
                params: {
                    userId: row.userId,
                    docId: this.docId
                }
            })
                .then(response => {
                    // console.log(response.data)
                    this.$message.success(response.data)
                })
                .catch(error => {
                    // console.log(error.response.data)
                    this.$message.error(error.response.data)
                })
        },
        //邀请成员参与文档编辑
        invite(){

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