<!--我参与的文档-->
<template>
    <div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                prop="docId"
                label="序号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="docName"
                label="文件名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型">
            </el-table-column>
            <el-table-column
                prop="createdTime"
                label="创建时间"
                :formatter="dateFormat">
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot:default="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "ParticipateDoc",
    data() {
        return {
            userId: 4,
            tableData: [],
        }
    },
    created() {
        this.axios.get('http://localhost:8088/user/getAllDocParticipate', {
            params: {
                userId: this.userId
            }
        })
            .then(response => {
                console.log(response.data)//测试
                this.tableData = response.data
            })
            .catch(error => {
                console.log(error)
                // this.$message.info(error.data)
            })
    },
    methods: {
        handleEdit() {

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