<!--主页-->
<template>
    <div>
        <div class="tool_title">
            <div class="tool_title_line"></div>
            <p>一些工具</p>
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

</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
}
</script>

<style scoped>
.tool_cell{
    background-color: #ffffff;
    border: 2px solid #cccccc;
    border-radius: 27px;
    padding:20px;
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
