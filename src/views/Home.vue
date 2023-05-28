<!--主页-->
<template>
    <div>
        <!--功能栏-->
        <div>
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                      v-model="fileName"></el-input>
            <el-button type="primary" style="margin-left: 5px;" @click="searchByName">搜索 <i
                class="el-icon-search"></i></el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="refresh">刷新 <i class="el-icon-refresh"></i>
            </el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="createDoc">新建 <i class="el-icon-plus"></i>
            </el-button>
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
                    <el-form-item label="类型" :label-width="formWidth">
                        <el-select v-model="createDocForm.type" placeholder="请选择">
                            <el-option
                                v-for="item in DocTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
<!--                        <el-input v-model="createDocForm.type" auto-complete="off"></el-input>-->
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
                    <el-button type="primary" @click="submitDoc(createDocForm)">确 定</el-button>
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
            userId: (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}).userId,
            fileName: '',
            type: '',

            /****************新建文档**************************/
            createDocDialog: false,//新建文档对话框
            createDocForm: {
                docId: Math.floor(Math.random() * (100000)) + 100,
                docName: '',
                type: '',
                createdTime: '',
                status: '',
                isDelete: 1,
            },//新建文档
            DocTypeOptions:[
                {
                    value: 'docx',
                    label: 'Word'
                },
                {
                    value: 'pptx',
                    label: 'PPT'
                },
                {
                    value: 'xlsx',
                    label: 'Excel'
                },
            ],//文档类型
            formWidth: '6vw',//表单宽度

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
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    fileName: this.fileName,
                    type: this.type
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
        //新建文档
        createDoc() {
            this.createDocDialog = true
        },
        //提交新建的文档给后端
        submitDoc(doc) {
            console.log(this.createDocForm)
            //设置一个access变量存放创建记录
            let newAccess = {
                accessId: Math.floor(Math.random() * (100000)) + 100,
                docId: this.createDocForm.docId,
                userId: this.userId,
                accessLevel: 1,
            }
            this.axios.post("http://localhost:8088/doc/insertDocument", this.createDocForm).then((res) => {
                this.$message.success(res.data)
                //用户创建好文档后将记录同步到access表中
                console.log(newAccess)
                this.axios.post("http://localhost:8088/access/inviteUserOfDoc", newAccess).then((res) => {
                    console.log(res)
                    this.$message.success("同步成功")
                }).catch((err) => {
                    this.$message.error(err.response.data)
                });
            }).catch((err) => {
                this.$message.error(err.response.data)
            });

            //清空对话框
            this.createDocForm = {}
            //关闭对话框
            this.createDocDialog = false

            //跳转到新建的文档
            // let userId = (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}).userId
            // let url = "http://192.168.43.202:4000/create?fileExt=" + doc.type + "&fileName=" + doc.docName + "&sample=false"+"&uid=" + userId
            // window.open(url, '_blank');
        },
        //根据关键字搜索文档
        searchByName() {
            this.axios.get('http://localhost:8088/doc/selectAllDocByName', {
                //参数
                params: {
                    //name对应的是后端RequestParam注解中的名称
                    name: this.fileName
                }
            })
                .then(response => {
                    this.allDocTableData = response.data
                })
                .catch(error => {
                    this.$message.error(error.response.data)
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
