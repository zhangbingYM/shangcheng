<template>
  <div class="back">
    <header>
      <h1>电商后台管理系统</h1>
      <button>退出</button>
    </header>
    <div class="concent">
      <div class="left">
        <el-menu
          :default-active="this.$route.path"
          :router="true"
          :unique-opened="true"
          :collapse="iscollapse"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <div class="top" @click="change()">|||</div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item  @click=go() index="/index/user/user_list"><i class="el-icon-menu"></i>用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/permissions/the_role_list"><i class="el-icon-menu"></i>角色列表</el-menu-item>
              <el-menu-item index="/index/permissions/the_power_list"><i class="el-icon-menu"></i>权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/shop/list"><i class="el-icon-menu"></i>商品列表</el-menu-item>
              <el-menu-item index="/index/shop/parameter"><i class="el-icon-menu"></i>分类参数</el-menu-item>
              <el-menu-item index="/index/shop/sort"><i class="el-icon-menu"></i>商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item @click=go() index="/index/data/data_list"><i class="el-icon-menu"></i>数据报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right">
        <div class="index" v-if="!open"> 
          Welcome
        </div>
        <router-view v-else></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      open:false,
      iscollapse:false
    };
  },
  methods: {
    go(){
      this.open=true;
    },
    change(){
      this.iscollapse=!this.iscollapse
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
.back{
  display: flex;
  flex-direction: column;
}
header,.content{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
header{
    align-items: center;
    height: 60px;
    background-color: #373d41;
    padding: 0px 20px;
    h1{
        font-size: 20px;
        color: #fff;
        
    }
    button{
        display: block;
        width: 70px;
        height: 40px;
        background-color: #909399;
        color: #fff;
        border-radius: 5px;
    }
}
.concent{
  height: 1107.5px;
  display: flex;
  .el-menu-vertical-demo{
    height: 100%;
    
    background-color: #333744; 
    display: flex;
    flex-direction: column;
    .top{
      text-align:center;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }
  .right{
    flex: 1;
    padding: 40px 20px;
    background-color: #eaedf1;
  }
}
</style>
