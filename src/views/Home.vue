<!--主页-->
<template>
    <div>
        <div>
            <div>
                <el-button type="primary" @click="addTool">增加</el-button>
            </div>
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
                            action="http://localhost:8088/upload/img"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl!=''" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>                        </el-upload>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div>
                        <div class="tool_title">
                            <div class="tool_title_line"></div>
                            <p>工具箱</p>
                            <div class="tool_title_line"></div>
                        </div>
                        <div style="display: flex;flex-wrap: wrap">
                            <div class="tool_cell" style="width: 10vw;height: 10vw">
                                <a href="https://chatbot.theb.ai/#/chat/1683942008313" target="_blank">
                                    <img src="../assets/img/div_two.png" style="width: 10vw;height: 10vw">
                                    <p style="text-align: center">chatGpt</p>
                                </a>
                            </div>
                            <div class="tool_cell" style="width: 10vw;height: 10vw">
                                <a href="https://www.pdf2go.com/zh" target="_blank">
                                    <img src="../assets/img/div_one.png" style="width: 10vw;height: 10vw">
                                    <p style="text-align: center">PDF转换器</p>
                                </a>
                            </div>
                            <div class="tool_cell" style="width: 10vw;height: 10vw">
                                <a href="https://www.edrawmax.cn/online/zh/workbench" target="_blank">
                                    <img src="../assets/img/div_three.png" style="width: 10vw;height: 10vw">
                                    <p style="text-align: center">画图</p>
                                </a>
                            </div>
                            <div class="tool_cell" style="width: 10vw;height: 10vw">
                                <a href="https://lib-eofbln6vzrxxd5zyeu7bvmuk.booksc.eu/login" target="_blank">
                                    <img src="../assets/img/div_four.png" style="width: 10vw;height: 10vw">
                                    <p style="text-align: center">书籍网站</p>
                                </a>
                            </div>
                            <div class="tool_cell" style="width: 10vw;height: 10vw">
                                <a href="https://www.canva.cn/" target="_blank">
                                    <img src="../assets/img/div_five.png" style="width: 10vw;height: 10vw">
                                    <p style="text-align: center">logo设计</p>
                                </a>
                            </div>
                            <div class="tool_cell" style="width: 10vw;height: 10vw">
                                <a href="https://unbug.github.io/codelf/" target="_blank">
                                    <img src="../assets/img/div_six.png" style="width: 10vw;height: 10vw">
                                    <p style="text-align: center">代码命名神器</p>
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
                toolName:'',
                toolUrl:'',
            },
            addDialogVisible: false,
            imageUrl: '',
        };
    },
    methods: {
        addTool() {
            this.addDialogVisible = true
        },
        //图片回显
        handleAvatarSuccess(res, file) {
            console.log(res)
            this.imageUrl = res.data
            sessionStorage.setItem("imgUrl", this.imageUrl)
            alert(this.imageUrl)
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
            let _this = this;
            _this.ruleForm.imageUrl = sessionStorage.getItem("imgUrl")
            this.axios.post('http://localhost:8088/upload/img', this.ruleForm).then(resp => {
                if (resp.data.code == 200) {
                    _this.$alert('《' + _this.ruleForm.name + '》添加成功', '消息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            _this.adddialogVisible = false
                            // _this.showAllUsers();
                        }
                    });
                }
            });
        },
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

    /*border: 1px solid red;*/
}

.tool_title_line {
    width: 40%;
    height: 2px;
    background-color: #ccc;
}

.tool_title p {
    margin: 0 2vw;
    font-size: 2vw;
    font-weight: bold;
}

</style>
