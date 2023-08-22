<template>
  <el-drawer :title="title" v-model="dialogFormVisible" direction="rtl" :before-close="close" class="template-edit">
    <el-form ref="form" :model="form" :rules="rules" min-width="800" label-width="120px">
      <el-form-item label="用户标识" prop="user_id">
        <el-input v-model="form.user_id"></el-input>
      </el-form-item>
      <el-form-item label="包名" prop="package_name">
        <el-select v-model="form.package_name" placeholder="请选择包">
          <el-option
            v-for="(item, key) in packages"
            :key="item.package_id"
            :label="item.package_name"
            :value="item.package_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="天数" prop="days">
        <el-input v-model="form.days" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
// import { getAppList } from '@/api/app'
import { addKaimi } from '@/api/kami.ts'
export default {
  name: 'TableEdit',
  data() {
    return {
      form: {
        user_id: '',
        days: '30',
        package_name: ''
      },

      appList: [],
      rules: {
        user_id: [{ required: true, trigger: 'blur', message: '请输入用户标识' }],
        days: [{ required: true, trigger: 'blur', message: '请输入天数' }],
        package_name: [{ required: true, trigger: 'blur', message: '请选着包名' }]
      },
      title: '',
      dialogFormVisible: false,
      isAdd: true,
      packages: []
    }
  },
  created() {
    this.packages = JSON.parse(localStorage.getItem('packages'))
  },
  methods: {
    async showEdit(row) {
      if (!row) {
        this.title = '添加'
        this.isAdd = true
      } else {
        this.title = '编辑'

        this.isAdd = false
      }
      this.dialogFormVisible = true
    },

    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
    },
    save() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          if (this.isAdd) {
            // const { message } = await addMachine({ ...this.form, app_id: '' })
          } else {
            // const { message } = await editMachine(this.form)
          }
          this.packages.forEach((item) => {
            if (item.package_id == this.form.package_id) {
              this.form.package_name = item.package_name
            }
          })
          await addKaimi(this.form)

          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          this.$emit('fetch-data')
          this.form = this.$options.data().form
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.template-edit {
  .el-select {
    width: 100%;
  }
  .el-input-number {
    width: 100%;
  }
}
.el-drawer {
  padding: 15px;
  width: 900px !important;
}
.preview-container {
  display: flex;
  flex-flow: wrap;

  .preview {
    margin: 10px;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
    cursor: pointer;
    box-sizing: border-box;
    .el-image {
      margin: 0 !important;
    }
    .preview-delete {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .preview:hover .preview-delete {
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
