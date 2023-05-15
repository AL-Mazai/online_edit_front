<!--主页-->
<template>
    <div>
        <!--功能栏-->
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                      v-model="name"></el-input>
            <el-button type="primary" style="margin-left: 5px;" @click="searchByName">搜索 <i
                class="el-icon-search"></i></el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="refresh">刷新 <i class="el-icon-refresh"></i>
            </el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="createDoc()">新建 <i class="el-icon-plus"></i>
            </el-button>
        </div>
        <!--标签页-->
        <div>
            <el-tabs v-model="currentTab">
                <el-tab-pane label="最近" name="first" @tab-click="testTab"></el-tab-pane>
                <el-tab-pane label="收藏" name="second" @tab-click="testTab"></el-tab-pane>
            </el-tabs>
        </div>
        <!--数据栏-->
        <div>
            <el-table :data="allDocTableData" stripe style="width: 100%">
                <el-table-column prop="docId" label="序号" width="180"></el-table-column>
                <el-table-column prop="docName" label="文件名" width="180"></el-table-column>
                <el-table-column prop="type" label="类型" width="180"></el-table-column>
                <el-table-column prop="createdTime" label="创建时间" :formatter="dateFormat"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--新建文档对话框-->
        <div>
            <el-dialog title="新建文档" :visible.sync="createDocDialog">
                <el-form :model="createDocForm">
                    <el-form-item label="编号" :label-width="formWidth">
                        <el-input v-model="createDocForm.docId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" :label-width="formWidth">
                        <el-input v-model="createDocForm.docName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formWidth">
                        <el-input v-model="createDocForm.docContent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formWidth">
                        <el-input v-model="createDocForm.type" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" :label-width="formWidth">
                        <el-date-picker v-model="createDocForm.createdTime" type="date"
                                        placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态" :label-width="formWidth">
                        <el-radio v-model="createDocForm.status" label="true">可编辑</el-radio>
                        <el-radio v-model="createDocForm.status" label="false">不可编辑</el-radio>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="createDocDialog = false">取 消</el-button>
                    <el-button type="primary" @click="submitDoc()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data() {
        return {
            name: '',
            currentTab: 'first',
            createDocDialog: false,
            createDocForm: {
                docId: '',
                docName: '',
                docContent: '',
                type: '',
                createdTime: '',
                status: '',
            },
            allDocTableData: [],
            formWidth: '6vw',
        }
    },
    created() {
        this.axios.get('http://localhost:8088/doc/selectAllDocument')
            .then(response => {
                // console.log(response.data)//测试
                this.allDocTableData = response.data
            })
            .catch(error => {
                this.$message.info(error.response.data)
            })
    },
    methods: {
        //重置主页搜索框
        reset() {
            this.name = '';
        },
        //编辑文档
        handleEdit(
            
        ) {

        },
        //新建文档
        createDoc() {
            this.createDocDialog = true
        },
        //提交新建的文档给后端
        submitDoc() {
            console.log(this.createDocForm)//测试
            this.axios.post("http://localhost:8088/doc/insertDocument", this.createDocForm)
                .then((res) => {
                    this.$message.success(res.data)
                }).catch((err) => {
                // console.log(err);//控制台测试代码
                this.$message.error(err.response.data)
            });
            //清空对话框
            this.createDocForm = {}
            //关闭对话框
            this.createDocDialog = false
        },
        //根据关键字搜索文档
        searchByName() {
            this.axios.get('http://localhost:8088/doc/selectAllDocByName', {
                //参数
                params: {
                    //name对应的是后端RequestParam注解中的名称
                    name: this.name
                }
            })
                .then(response => {
                    console.log(response.data)//测试
                    this.allDocTableData = response.data
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        },
        //刷新页面
        refresh() {
            location.reload()
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
        testTab() {
            alert("hello")
        }
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
