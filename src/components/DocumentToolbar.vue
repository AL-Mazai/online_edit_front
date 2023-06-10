<template>
    <div>
        <!--功能栏-->
        <div>
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                      v-model="fileName"></el-input>
<!--            <el-input style="width: 200px; margin-left: 1px" placeholder="请输入类型" suffix-icon="el-icon-search"-->
<!--                      v-model="type"></el-input>-->
            <el-select v-model="type" placeholder="请选择类型" style="width: 200px; margin-left: 1px">
                <el-option
                    v-for="item in DocTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <el-button type="primary" style="margin-left: 5px;" @click="searchDoc">搜索 <i
                class="el-icon-search"></i></el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="refresh">刷新 <i class="el-icon-refresh"></i>
            </el-button>
            <el-button type="primary" style="margin-left: 5px;" @click="createDoc">新建 <i class="el-icon-plus"></i>
            </el-button>
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
    name: "DocumentToolbar",
    data() {
        return {
            userId: (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}).userId,
            fileName: '',
            type:'',
            /****************新建文档**************************/
            createDocDialog: false,//新建文档对话框
            createDocForm: {
                docId: Math.floor(Math.random() * (100000)) + 100,
                docName: '',
                type: 'docx',
                createdTime:  new Date().toISOString().slice(0,10),
                status: 'true',
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

            formWidth: '8vw',//表单宽度
        }
    },
    props:{
        pageNum: Number,
        pageSize: Number,
        accessLevel: Number
    },
    methods: {
        //新建文档
        createDoc() {
            this.createDocDialog = true
        },
        //提交新建的文档给后端
        submitDoc(doc) {
            if(this.createDocForm.docName != ''){
                console.log(this.createDocForm)
                //设置一个access变量存放创建记录
                let newAccess = {
                    accessId: Math.floor(Math.random() * (100000)) + 100,
                    docId: this.createDocForm.docId,
                    userId: this.userId,
                    accessLevel: 1,
                }
                console.log(newAccess)
                this.axios.post("http://localhost:8088/doc/insertDocument", this.createDocForm).then((res) => {
                    this.$message.success(res.data)
                    //用户创建好文档后将记录同步到access表中
                    this.axios.post("http://localhost:8088/access/inviteUserOfDoc", newAccess).then(() => {
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
                let url = "http://43.138.121.194:4001/create?fileExt=" + doc.type + "&fileName=" + doc.docName + "&sample=false"+"&uid=" + this.userId
                window.open(url, '_blank');
            }else {
                this.$message.warning("文档名不能为空！")
            }

        },

        //根据关键字搜索文档
        searchDoc() {
            this.axios.get('http://localhost:8088/doc/selectFileByPage', {
                //参数
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    fileName: this.fileName,
                    type: this.type,
                    accessLevel: this.accessLevel,
                    userId: this.userId
                }
            })
                .then(response => {
                    let data = response.data.docList
                    let total = response.data.total
                    // 触发自定义事件，将获取到的数据传递给父组件给父组件
                    this.$emit('search', data);
                    this.$emit('search-total', total)
                })
                .catch(error => {
                    console.log(error)
                    this.$message.error("错误")
                })
        },

        //刷新页面
        refresh() {
            location.reload()
        },
    }
}
</script>

<style scoped>

</style>