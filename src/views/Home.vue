<!--主页-->
<template>
    <div>
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                      v-model="fileName"></el-input>
            <el-button type="primary" style="margin-left: 5px;">搜索 <i class="el-icon-search"></i></el-button>
            <el-button type="warning" style="margin-left: 5px;" @click="reset">重置 <i class="el-icon-refresh"></i>
            </el-button>
            <el-button type="primary" style="margin-left: 5px;">新建 <i class="el-icon-plus"></i></el-button>
        </div>
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
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data() {
        return {
            fileName: '',
            tableData: [],
        }
    },
    created() {
        this.axios.get('http://localhost:8088/doc/selectAllDocument')
            .then(response => {
                // console.log(response.data)//测试
                this.tableData = response.data
            })
            .catch(error => {
                console.log(error)
            })
    },
    methods: {
        //重置主页搜索框
        reset() {
            this.fileName = '';
        },
        //设置时间格式
        dateFormat(row, column) {
            console.log(row[column.prop])
            let date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return this.$moment(date).format("YYYY-MM-DD");
        },
        //编辑文档函数
        handleEdit() {

        }
    },

}
</script>
