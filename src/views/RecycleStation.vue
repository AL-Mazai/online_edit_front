<!--回收站-->
<template>
    <!--删除的文档列表-->
    <div>
        <!--文档列表-->
        <el-table :data="deleteDocRecord" stripe style="width: 100%">
            <el-table-column prop="docId" label="序号" width="150"></el-table-column>
            <el-table-column prop="docName" label="文件名" width="150"></el-table-column>
            <el-table-column prop="type" label="类型" width="150"></el-table-column>
            <!--操作-->
            <el-table-column label="操作">
                <template v-slot:default="scope">
                    <el-button type="success" icon="el-icon-refresh" slot="reference" @click="recover(scope.row)">
                        恢复
                    </el-button>
                    <!--删除提示框-->
                    <el-popconfirm
                        confirm-button-text='残忍删除'
                        cancel-button-text='点错了~'
                        icon="el-icon-info"
                        icon-color="red"
                        title="永久删除文档？"
                        @confirm="deleteDocPermanent(scope.row)"
                    >
                        <el-button type="danger" icon="el-icon-delete" slot="reference" style="margin-left: 1vw">
                            永久删除
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
</template>

<script>
import DocumentToolbar from "@/components/DocumentToolbar";

export default {
    name: "RecycleStation",
    components:{
        DocumentToolbar
    },
    data() {
        return {
            userId: this.$userId,
            deleteDocRecord: [],

            /***分页变量****/
            pageNum: 1,
            pageSize: 5,
            total: 0
        }
    },
    created() {
        this.getAllDocByUserDelete()
    },
    methods: {
        //获取所有被删除的文档
        getAllDocByUserDelete() {
            this.axios.get('http://localhost:8088/deleteRecord/selectFilePageDeleteByUser', {
                params: {
                    userId: this.userId,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
            }).then(response => {
                console.log(response.data)//测试
                this.deleteDocRecord = response.data.deleteDocList
                this.total = response.data.total
            }).catch(error => {
                console.log(error)
                this.$message.error(error.data)
            })
        },
        //永久删除文档
        deleteDocPermanent(row) {
            console.log(row)
            //先删除access表中记录
            this.axios.delete('http://localhost:8088/access/deleteAccessRecord', {
                params: {
                    docId: row.docId
                }
            })
                .then(response => {
                    console.log(response.data)
                    // this.$message.success(response.data)
                })
                .catch(error => {
                    // console.log(error.response.data)
                    this.$message.error(error.response.data)
                })
            //再删除delete_record表中记录
            this.axios.delete('http://localhost:8088/deleteRecord/deleteRecord', {
                params: {
                    docId: row.docId
                }
            })
                .then(response => {
                    console.log(response.data)
                    // this.$message.success(response.data)
                })
                .catch(error => {
                    // console.log(error.response.data)
                    this.$message.error(error.response.data)
                })
            //最后从document表中永久删除
            this.axios.delete('http://localhost:8088/doc/deleteDocPermanent', {
                params: {
                    docId: row.docId
                }
            })
                .then(response => {
                    // console.log(response.data)
                    this.$message.success(response.data)
                    //重新获取文档列表
                    this.getAllDocByUserDelete()
                    //更新页面
                    // location.reload()
                })
                .catch(error => {
                    // console.log(error.response.data)
                    this.$message.error(error.response.data)
                })
        },
        //恢复文档
        recover(row) {
            console.log(row)
            this.axios.post("http://localhost:8088/doc/recoverFromBin", {
                docId: row.docId,
            }).then(res => {
                this.$message.success(res.data)
                //重新获取文档列表
                this.getAllDocByUserDelete()
            }).catch(error => {
                console.log(error)
                this.$message.error("恢复失败")
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