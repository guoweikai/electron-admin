<!--
 * @Author: your name
 * @Date: 2023-08-21 17:13:33
 * @LastEditTime: 2023-08-21 17:13:33
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /vue3-admin-electron/src/views/list/components/VabQueryFormLeftPanel.vue
-->
<template>
  <el-col :xs="24" :sm="24" :md="24" :lg="span" :xl="span">
    <div class="left-panel">
      <slot></slot>
    </div>
  </el-col>
</template>

<script>
  export default {
    name: 'VabQueryFormLeftPanel',
    props: {
      span: {
        type: Number,
        default: 14,
      },
    },
    data() {
      return {}
    },
    created() {},
    mounted() {},
    methods: {},
  }
</script>
