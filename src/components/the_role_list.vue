<template>
  <div class="top_therole">
    <top title1="权限管理" title2="角色列表"></top>
    <el-card>
      <div class="therole">
        <!-- 添加按钮 -->
        <el-row
          ><el-col class="backcolor"
            ><el-button
              type="primary"
              class="top"
              @click="adddialogVisible = true"
              >添加角色</el-button
            ></el-col
          ></el-row
        >
        <el-table :data="list" border stripe>
          <!-- 下拉展开 -->
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row
                :class="[
                  'bordbot',
                  i1 === 0 ? 'bordtop' : '',
                  'vcenter',
                  'padd',
                ]"
                v-for="(item1, i1) in scope.row.children"
                :key="item1.id"
              >
                <!-- 一级权限 -->
                <el-col :span="5">
                  <el-tag closable @close="removeRoleId(scope.row, item1.id)">{{
                    item1.authName
                  }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 二级,三级权限 -->
                <el-col :span="19">
                  <el-row
                    :class="[i2 === 0 ? '' : 'bordtop', 'vcenter']"
                    v-for="(item2, i2) in item1.children"
                    :key="item2.id"
                  >
                    <el-col :span="6">
                      <el-tag
                        type="success"
                        closable
                        @close="removeRoleId(scope.row, item2.id)"
                        >{{ item2.authName }}</el-tag
                      >
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="18">
                      <el-tag
                        closable
                        v-for="item3 in item2.children"
                        :key="item3.id"
                        type="warning"
                        @close="removeRoleId(scope.row, item3.id)"
                      >
                        {{ item3.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <!-- 索引 -->
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <!-- 修改角色数据按钮 -->
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="edit(scope.row.id)"
                >编辑</el-button
              >
              <!-- 删除角色数据按钮 -->
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="removeById(scope.row.id)"
                >删除</el-button
              >
              <!-- 分配角色权限按钮 -->
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="quanxian(scope.row)"
                >分配权限</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 添加用户弹出input框 -->
        <el-dialog
          title="添加用户"
          :visible.sync="adddialogVisible"
          width="50%"
          @close="backadd"
        >
          <el-form
            :model="addFrom"
            :rules="addFromrules"
            ref="addFromref"
            label-width="100px"
          >
            <el-form-item label="用户名称" prop="roleName">
              <el-input v-model="addFrom.roleName"></el-input>
            </el-form-item>
            <el-form-item label="用户描述" prop="roleDesc">
              <el-input v-model="addFrom.roleDesc"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="adddialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dianji">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改用户弹出input框 -->
        <el-dialog
          title="修改用户"
          :visible.sync="editdialogVisible"
          width="50%"
          @close="editclose"
        >
          <el-form
            :model="editfrom"
            :rules="editfromrules"
            ref="editfromref"
            label-width="100px"
          >
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="editfrom.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
              <el-input v-model="editfrom.roleDesc"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editdianji">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 分配用户权限弹出input框 -->
        <el-dialog
          title="分配权限"
          :visible.sync="ridsdialogVisible"
          width="50%"
          @close="remekrids"
        >
          <el-tree
            :data="ridslist"
            :props="treeProps"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="ridsKeys"
            ref="treeRef"
          ></el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="ridsdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="allRids">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import http from "../http/index.js";
import top from "../components/content_top.vue";
export default {
  props: {},
  data() {
    return {
      list: [],
      // 添加角色保存信息
      adddialogVisible: false,
      addFrom: {
        roleName: "",
        roleDesc: "",
      },
      // 添加角色保存信息
      addFromrules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "角色名称的长度在2~5个字符之间",
            trigger: "blur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "角色描述的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
      },
      // 修改角色保存信息
      editdialogVisible: false,
      editfrom: {},
      editfromrules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "角色名称的长度在2~5个字符之间",
            trigger: "blur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "角色描述的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
      },
      // 角色权限授权信息
      ridsdialogVisible: false,
      ridslist: [],
      treeProps: {
        children: "children",
        label: "authName",
      },
      ridsKeys: [],
      roleId: "",
    };
  },
  mounted() {
    // 请求后台数据渲染角色页面列表
    http({
      url: "/roles",
      method: "get",
    }).then((res) => {
      this.list = res.data;
      console.log(this.list);
    });
  },
  methods: {
    // 简易封装后台数据请求
    http() {
      http({
        url: "/roles",
        method: "get",
      }).then((res) => {
        this.list = res.data;
        console.log(this.list);
      });
    },
    // 用户点击事件
    // 添加角色
    dianji() {
      this.$refs.addFromref.validate((valid) => {
        if (!valid) return;
        http({
          // 添加角色后台数据请求
          url: "/roles",
          method: "post",
          data: {
            roleName: this.addFrom.roleName,
            roleDesc: this.addFrom.roleDesc,
          },
        });
        this.adddialogVisible = false;
        // 用户添加完毕刷新页面
        this.http();
        // 顶部弹框
        this.$message.success("添加角色成功");
      });
    },
    // 添加角色表单重置
    backadd() {
      this.$refs.addFromref.resetFields();
    },
    // 根据id查询角色信息，得到当前数据id
    // 修改，删除前置条件
    edit(id) {
      http({
        url: `/roles/${id}`,
        method: "get",
      }).then((res) => {
        this.editfrom = res.data;
        console.log(this.editfrom);
      });
      this.editdialogVisible = true;
    },
    // 修改角色表单重置
    editclose() {
      this.$refs.editfromref.resetFields();
    },
    // 修改角色
    editdianji() {
      // 请求修改角色数据
      this.$refs.editfromref.validate((valid) => {
        if (!valid) return;
        http({
          url: `/roles/${this.editfrom.roleId}`,
          method: "put",
          data: {
            roleName: this.editfrom.roleName,
            roleDesc: this.editfrom.roleDesc,
          },
        });
        this.editdialogVisible = false;
        // 修改角色数据成功页面重置
        this.http();
        // 修改第一次请求失败，添加第二次请求成功
        this.http();
        // 顶部弹框
        this.$message.success("修改角色成功");
      });
    },
    // 删除角色
    removeById(id) {
      // 弹出提示框
      this.$confirm("此操作将永久删除该角色, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 点击确定请求端口删除角色
        .then(() => {
          http({
            url: `/roles/${id}`,
            method: "delete",
          }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
          this.http();
          // 修改第一次请求失败，添加第二次请求成功
          this.http();
        })
        // 点击取消消除提示框
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除角色指定权限
    removeRoleId(role, rigid) {
      this.$confirm("此操作将删除该权限, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 点击确定请求端口删除角色
        .then(() => {
          http({
            url: `/roles/${role.id}/rights/${rigid}`,
            method: "delete",
          }).then((res) => {
            role.children = res.data;
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        // 点击取消消除提示框
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改角色权限
    quanxian(role) {
      this.roleId = role.id;
      http({
        url: "/rights/tree",
        method: "get",
      }).then((res) => {
        this.ridslist = res.data;
      });
      this.getridsKeys(role, this.ridsKeys);
      this.ridsdialogVisible = true;
    },
    // 根据后台保存id默认勾选
    getridsKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => this.getridsKeys(item, arr));
    },
    // 关闭修改角色权限对话框时重置数组
    remekrids() {
      this.ridsKeys = [];
    },
    // 点击向后台请求修改权限
    allRids() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const idStr = keys.join(",");
      http({
        url: `roles/${this.roleId}/rights`,
        method: "post",
        data: {
          rids: idStr,
        },
      }).then(() => {
        this.$message({
          type: "success",
          message: "分配权限成功!",
        });
        this.http();
        this.ridsdialogVisible = false;
      });
    },
  },
  components: {
    top,
  },
};
</script>

<style scoped lang="scss">
.vcenter {
  display: flex;
  align-items: center;
}
.padd {
  padding: 0 50px 0 50px;
}
.el-tag {
  margin: 7px;
}
.bordtop {
  border-top: 1px solid #eee;
}
.bordbot {
  border-bottom: 1px solid #eee;
}
.top_therole {
  .therole {
    width: 100%;
    height: 100%;
    background-color: #eaedf1;
    .backcolor {
      background-color: white;
    }
    .top {
      margin-bottom: 20px;
    }
  }
}
</style>
