<template>
  <div class="kami">
    <vab-query-form>
      <vab-query-form-left-panel>
        <div class="header-contanier">
          <div class="header">
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加</el-button>
            <el-input placeholder="请输入用户标识进行筛选" @keyup="handleKeyUp" v-model="searchUserId" />
            <el-input placeholder="请输入卡密进行筛选" @keyup="handleKeyUp" v-model="searchKami" />
          </div>
        </div>
      </vab-query-form-left-panel>
    </vab-query-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column show-overflow-tooltip type="序号" width="55" label="序号">
        <template #default="scope">
          {{ ++scope.$index }}
        </template>
      </el-table-column>
      <el-table-column prop="user_id" label="用户标识" width="120" />
      <el-table-column label="卡密" width="300">
        <template #default="{ row }">
          <div>{{ `${row.auth_code}` }}</div>
          <div style="margin-top: 5px">
            <el-button type="primary" @click="copyKami(row.auth_code)">复制卡密</el-button>
            <el-button type="primary" @click="seeQRCode(row.auth_code)">二维码</el-button>
          </div>
          <!-- <el-tooltip class="box-item" effect="dark" :content="row.auth_code" placement="top-start">
            <el-button type="primary" @click="copyKami(row.auth_code)">复制卡密</el-button>
          </el-tooltip>

          <el-button type="primary" @click="seeQRCode(row.auth_code)">二维码</el-button> -->

          <!-- <qrcode-vue :value="row.auth_code" :size="200" level="H" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="device_id" label="设备" width="180">
        <template #default="{ row }">{{ row.device_id ? '已绑定' : '未绑定' }} {{ row.device_name }}</template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" sortable />
      <el-table-column prop="remaining_days" label="剩余天数" />
      <el-table-column prop="packages" label="包名称">
        <template #default="{ row }">
          {{ row.packages[0].package_name }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button @click="unbind(row)">{{ row.device_id ? '解绑' : '---' }}</el-button>
          <!-- <el-button type="text" @click="handleDelete(row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <table-edit ref="edit" @fetch-data="fetchData"></table-edit>
    <el-dialog v-model="dialogVisible" title="二维码" width="30%" :before-close="handleClose" v-if="dialogVisible">
      <qrcode-vue :value="auth_code" :size="200" level="H" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import VabQueryFormLeftPanel from './VabQueryFormLeftPanel.vue'
import VabQueryForm from './VabQueryForm.vue'
import TableEdit from './/TableEdit.vue'
import { kamiList, unbindAuthCode } from '@/api/kami.ts'
import QrcodeVue from 'qrcode.vue'
import { ElMessage } from 'element-plus'
import { Refresh, Search } from '@element-plus/icons-vue'

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      auth_code: '',
      searchUserId: '',
      searchKami: ''
    }
  },
  created() {
    this.fetchData()
  },
  components: {
    VabQueryFormLeftPanel,
    VabQueryForm,
    TableEdit,
    QrcodeVue
  },
  methods: {
    seeQRCode(value) {
      this.auth_code = value
      this.dialogVisible = true
    },
    async copyKami(value) {
      try {
        await navigator.clipboard.writeText(value)
        ElMessage({
          message: '已经将卡密复制到剪切板上',
          grouping: true,
          type: 'success'
        })
      } catch (err) {
        ElMessage({
          message: '复制失败,请重新复制',
          grouping: true,
          type: 'error'
        })
      }
    },
    async handleKeyUp() {
      await this.fetchData()
      if (this.searchUserId) {
        this.tableData = this.tableData.filter((item) => item.user_id.includes(this.searchUserId))
      } else if (this.searchKami) {
        this.tableData = this.tableData.filter((item) => item.auth_code.includes(this.searchKami))
      }
    },

    async unbind(row) {
      if (row.device_id) {
        await unbindAuthCode({ auth_code: row.auth_code })
        this.fetchData()
        ElMessage({
          message: '解绑成功',
          grouping: true,
          type: 'success'
        })
      }
    },
    handleDelete() {},
    async fetchData() {
      const data = await kamiList()
      this.tableData = data.data.list
    },
    handleAdd() {
      console.log('xixi')
      this.$refs['edit'].showEdit()
    },
    handleEdit(row) {
      this.$refs['edit'].showEdit(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.kami {
  height: 100vh;
  overflow: auto;

  .header {
    margin-top: 10px;
    display: flex;
    margin-bottom: 20px;
    .el-input {
      margin-left: 20px;
      width: 200px;
    }
  }
}
</style>
