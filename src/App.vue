<template>
  <div className="left-menu">
    <div className="left-menu-title">QIANKUN</div>
    <div className="left-menu-body">
      <MenuItem
        v-for="(item, i) in [...routes, ...qiankunRouter]"
        :key="i"
        :menuText="item.name"
        :menuPath="item.path"
      />
    </div>
  </div>
  <div className="rigth-qiankun-wrapper">
    <router-view />
    <Loading :visible="loading">
      <div id="container"></div>
    </Loading>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MenuItem from '@/components/menu-item/index.vue';
import Loading from '@/components/loading/index.vue';
import { routes } from './router';
import { getQiankunAppUrl } from '@/utils';
import useEventBus from './utils/eventBus';

export default defineComponent({
  components: {
    MenuItem,
    Loading
  },
  setup() {
    const qiankunRouter = getQiankunAppUrl();
    const loading = ref(false);
    const [event] = useEventBus();
    event.on('qiankun-child-loading', (v) => {
      loading.value = Boolean(v)
    });

    return {
      routes,
      qiankunRouter,
      loading
    }
  },
})
</script>


<style lang="scss" src="./app.scss"></style>
