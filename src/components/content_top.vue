<template>
    <div class="top">
        <span class="one">首页</span>
        <span class="two">></span>
        <span class="three">{{title1}}</span>
        <span class="two">></span>
        <span class="three">{{title2}}</span>
    </div>
</template>

<script>
export default {
    props: {
        title1:{
            type:String
        },
        title2:{
            type:String
        },
    },
    data() {
        return {

        };
    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.top{
    font-size: 16px;
    color: #606266;
    margin-bottom: 15px;
    span{
        margin-right: 10px;
    }
    .one{
        color: #303133;
    }
    .two{
        color: #c4ccdc;
    }
}
</style>
