<!--主页-->
<template>
    <div>
        <!--增加工具-->
        <div>
            <div>
                <el-button type="primary" @click="addTool">增加</el-button>
            </div>
            <!--增加工具对话框-->
            <el-dialog
                title="添加工具"
                :visible.sync="addDialogVisible"
                width="40%"
                :close-on-click-modal="false">
                <el-form :model="ruleForm" style="width: 80%" label-width="100px">
                    <el-form-item label="名称" prop="toolName">
                        <el-input v-model="ruleForm.toolName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="toolUrl">
                        <el-input v-model="ruleForm.toolUrl" placeholder="请输入地址"></el-input>
                    </el-form-item>
                    <el-form-item label="logo" prop="imageUrl">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8088/qiniu/image"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl != ''" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--显示工具列表-->
        <div>
            <div class="tool_title">
                <div class="tool_title_line"></div>
                <p>工具箱</p>
                <div class="tool_title_line"></div>
            </div>
            <div style="display: flex;flex-wrap: wrap">
                <div v-for="tool in tools" :key="tool" class="tool_cell">
                    <a :href=tool.toolUrl target="_blank">
                        <img :src="tool.logoLink" :tool="tool" style="width: 10vw;height: 10vw"/>
                        <p style="text-align: center">{{ tool.toolName }}</p>
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data() {
        return {
            ruleForm: {
                toolId: Math.floor(Math.random() * (100000)) + 100,
                toolName: '',
                toolUrl: '',
                logoLink: '',
            },
            addDialogVisible: false,
            imageUrl: '',
            tools: [],
        };
    },
    created() {
        this.getAllTool()
    },
    methods: {
        //增加工具
        addTool() {
            this.addDialogVisible = true
        },
        //图片回显
        handleAvatarSuccess(res) {
            this.imageUrl = res
        },
        //图片上传大小限制
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        //提交表单
        submitForm() {
            this.ruleForm.logoLink = this.imageUrl
            console.log(this.ruleForm)
            this.axios.post("http://localhost:8088/tools/addTool", this.ruleForm).then((res) => {
                this.$message.success(res.data)
                this.addDialogVisible = false
                this.getAllTool()
            }).catch((err) => {
                this.$message.error(err.response.data)
            });
        },
        //获取数据库中所有工具
        getAllTool() {
            this.axios.get("http://localhost:8088/tools/getAllTool").then((res) => {
                console.log(res.data)
                this.tools = res.data
            })
        }
    }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;

    border: 1px solid #8c939d;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.tool_cell {
    width: 10vw;
    height: 10vw;

    background-color: #ffffff;
    border: 2px solid #cccccc;
    border-radius: 27px;

    padding: 20px;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);

    margin-bottom: 4vw;
    margin-left: 2vw;
}

.tool_cell:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
}

.tool_cell img:hover {
    transform: scale(1.2);
}

.tool_cell a {
    text-decoration: none;
    color: black;
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
}

.tool_cell a p {
    font-weight: bold;
    margin-top: 2vw;
}

.tool_cell a p:hover {
    color: coral;
    transform: scale(1.2);
}

.tool_title {
    width: 100%;
    height: 3vw;

    margin-bottom: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tool_title_line {
    width: 45%;
    height: 2px;
    background-color: #ccc;
}

.tool_title p {
    margin: 0 0.5vw;
    font-size: 2vw;
    font-weight: bold;
}

</style>
