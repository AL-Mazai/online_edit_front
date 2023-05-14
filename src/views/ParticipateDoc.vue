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
                <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="primary" icon="el-icon-edit">删除</el-button>
                <el-button type="primary" icon="el-icon-edit">查看成员</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "ParticipateDoc",
    data() {
        return {
            tableData: [{
                docId:'1',
                docName:'Document1',
                type:'Type1',
                createdTime: '2016-05-02',
            }, {
                docId:'3',
                docName:'Document9',
                type:'Type3',
                createdTime: '2016-05-04',
            }, {
                docId:'18',
                docName:'Document6',
                type:'Type6',
                createdTime: '2016-05-01',
            }, {
                docId:'23',
                docName:'Document3',
                type:'Type2',
                createdTime: '2016-05-03',
            }]
        }
    }
}
</script>

<style scoped>

</style>