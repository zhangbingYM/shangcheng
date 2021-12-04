<template>
  <div class="powers">
    <top title1="权限管理" title2="权限列表"></top>
    <el-card>
      <el-table :data="list" stripe border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"> </el-table-column>
        <el-table-column label="路径" prop="path"> </el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==='0'">一级</el-tag>
            <el-tag type='success' v-if="scope.row.level==='1'">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.level==='2'">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import http from "../http/index.js";
import top from "./content_top.vue";
export default {
  props: {},
  data() {
    return {
      list: [],
    };
  },
  methods: {},
  mounted() {
    http({
      url: "rights/list",
    }).then((res) => {
      this.list = res.data;
      console.log(this.list);
    });
  },
  components: {
    top,
  },
};
</script>

<style scoped lang="scss">
</style>
