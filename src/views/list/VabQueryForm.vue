<!--
 * @Author: your name
 * @Date: 2023-08-21 17:15:59
 * @LastEditTime: 2023-08-21 17:16:00
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-electron/src/views/list/components/index.vue
-->
<template>
  <el-row :gutter="0" class="vab-query-form">
    <slot></slot>
  </el-row>
</template>

<script>
  export default {
    name: 'VabQueryForm',
    props: {},
    data() {
      return {}
    },
    created() {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @mixin panel {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }

  .vab-query-form {
    margin-bottom: 10px;

    ::v-deep {
      .top-panel {
        @include panel;
      }

      .bottom-panel {
        @include panel;

        padding-top: 14px;
        border-top: 1px solid #dcdfe6;
      }

      .left-panel {
        @include panel;

        > .el-button,
        .el-form-item {
          margin: 5px;
        }
      }

      .right-panel {
        @include panel;

        justify-content: flex-end;

        .el-form-item {
          margin: 5px;
        }
      }
    }
  }
</style>
