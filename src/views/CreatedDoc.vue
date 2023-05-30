<!--我创建的文档-->
<template>
    <div>
        <!--文档列表-->
        <div>
            <el-table :data="docTableData" stripe style="width: 100%">
                <el-table-column prop="docId" label="序号" width="100"></el-table-column>
                <el-table-column prop="docName" label="文件名" width="120"></el-table-column>
                <el-table-column prop="type" label="类型" width="120"></el-table-column>
                <el-table-column prop="createdTime" label="创建时间" width="150"
                                 :formatter="dateFormat"></el-table-column>
                <!--是否启用-->
                <el-table-column prop="type" label="是否启用" width="150">
                    <template v-slot:default="scope">
                        <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ccc"
                                   @change="changeStatus(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <!--操作-->
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="success" icon="el-icon-view" @click="getUserOfDoc(scope.row.docId)">查看成员
                        </el-button>
                        <!--删除提示框-->
                        <el-popconfirm
                            confirm-button-text='确定'
                            cancel-button-text='取消'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="deleteDoc(scope.row)"
                        >
                            <el-button type="danger" icon="el-icon-delete" slot="reference" style="margin-left: 1vw">
                                删除
                            </el-button>
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
                :current-page="pageNum"
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
            <el-dialog title="邀请成员" :visible.sync="inviteUserDialog">
                <el-form :model="inviteUserForm">
                    <el-form-item label="邀请记录编号" :label-width="formWidth">
                        <el-input v-model="inviteUserForm.accessId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="文档id" :label-width="formWidth">
                        <el-input v-model="inviteUserForm.docId" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户id" :label-width="formWidth">
                        <el-input v-model="inviteUserForm.userId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="授权" :label-width="formWidth">
                        <el-select v-model="inviteUserForm.accessLevel" placeholder="请选择">
                            <el-option
                                v-for="item in accessLevelOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <!--                        <el-input v-model="inviteUserForm.accessLevel" auto-complete="off"></el-input>-->
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="inviteUserDialog = false">取 消</el-button>
                    <el-button type="primary" @click="submitInvite()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreatedDoc",
    data() {
        return {
            userId: (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}).userId,
            docId: 0,//文档id，刷新参与成员列表时使用
            docTableData: [],//当前用户创建的所有文档
            userOfDocTableData: [],//某个文档的所有参与者
            /**************邀请成员**********************/
            inviteUserForm: {
                accessId: '',
                docId: '',
                userId: '',
                accessLevel: '',
            },//邀请成员表单
            accessLevelOptions: [
                {
                    value: 2,
                    label: '可读可写'
                },
                {
                    value: 3,
                    label: '只读'
                },
            ],//权限选择
            formWidth: '8vw',
            /**************邀请成员**********************/
            /***对话框***/
            userOfDocDialog: false,
            inviteUserDialog: false,
            /***分页变量****/
            pageNum: 1,
            pageSize: 5,
            total: 0
        }
    },
    created() {
        this.getAllDocByUserCreate()
    },
    methods: {
        //初始化，获取所有文档
        getAllDocByUserCreate() {
            this.axios.get('http://localhost:8088/user/selectFilePageCreateByUser', {
                params: {
                    userId: this.userId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
            }).then(response => {
                // console.log(response.data)//测试
                this.docTableData = response.data.docList
                this.total = response.data.total
            }).catch(error => {
                console.log(error)
                this.$message.error(error.data)
            })
        },
        //是否启用文档
        changeStatus(row) {
            // console.log(row.status)
            //更改状态
            this.axios.post("http://localhost:8088/doc/changeDocStatus", {
                docId: row.docId,
                status: row.status
            }).then(res => {
                this.$message.success(res.data)
            }).catch(error => {
                this.$message.error(error.response.data)
            })
        },

        /********************分页*******************/
        //数据量改变
        handleSizeChange(pageSize) {
            // console.log(pageSize)
            this.pageSize = pageSize
            this.getAllDocByUserCreate()
        },
        //页数改变
        handleCurrentChange(pageNum) {
            // console.log(pageNum)
            this.pageNum = pageNum
            this.getAllDocByUserCreate()
        },
        /********************分页*******************/

        //编辑文档
        handleEdit(row) {
            let url = "http://192.168.43.202:4000/editor?fileName=" + row.docName + "." + row.type + "&uid=" + this.userId;
            window.open(url, '_blank');
            console.log(row)
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

        /**************邀请成员参与文档编辑***************/
        invite() {
            this.inviteUserDialog = true
            this.inviteUserForm.docId = this.docId
            this.inviteUserForm.accessId = Math.floor(Math.random() * (100000)) + 100
        },
        submitInvite() {
            if (this.inviteUserForm.userId != this.userId) {
                this.axios.post("http://localhost:8088/access/inviteUserOfDoc", this.inviteUserForm).then((res) => {
                    //刷新参与成员列表
                    this.getUserOfDoc(this.docId)
                    this.$message.success(res.data)
                }).catch((err) => {
                    console.log(err.response.data)
                    this.$message.error("邀请失败，用户不存在")
                });
                //清空对话框
                this.inviteUserForm = {}
                //关闭对话框
                this.inviteUserDialog = false
            } else {
                this.$message.warning("不能邀请自己！")
            }

        },
        /**************邀请成员参与文档编辑***************/

        //删除文档
        deleteDoc(row) {
            let newDeleteRecord = {
                deleteId: Math.floor(Math.random() * (100000)) + 100,
                userId: this.userId,
                docId: row.docId
            }
            this.axios.delete('http://localhost:8088/doc/deleteDocument', {
                params: {
                    docId: row.docId
                }
            })
                .then(response => {
                    //将删除的文档添加到回收站
                    this.axios.post("http://localhost:8088/deleteRecord/addDeleteRecord", newDeleteRecord).then((res) => {
                        console.log(res)
                    }).catch((err) => {
                        this.$message.error(err.response.data)
                    });

                    // console.log(response.data)
                    this.$message.success(response.data)
                    //重新获取文档列表
                    this.getAllDocByUserCreate()
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