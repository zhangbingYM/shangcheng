<template>
  <div class="list">
    <div class="top">
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary">添加商品</el-button>
    </div>

    <div class="nav">
      <template>
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          border
          style="width: 100%"
          stripe
        >
          <el-table-column prop="date" label="#" width="67" />
          <el-table-column prop="name" label="商品名称" width="659px" />
          <el-table-column prop="name" label="商品价格(元)" width="114px" />
          <el-table-column prop="name" label="商品重量" width="89" />
          <el-table-column prop="name" label="创建时间" width="159" />
          <el-table-column prop="name" label="操作" width="139">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                ><i class="el-icon-edit"></i
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                ><i class="el-icon-delete"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      tableData: [],
      search: "",
    };
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
.list {
  font-size: 16px;
  padding: 0px 20px;
  .top {
    margin-bottom: 15px;
    .input-with-select {
      margin-right: 21px;
      width: 288px;
      height: 38px;
    }
  }
}
</style>
