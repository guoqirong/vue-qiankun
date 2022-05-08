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
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    MenuItem,
    Loading
  },
  setup() {
    const qiankunRouter = getQiankunAppUrl();
    const loading = ref(false);
    const [event] = useEventBus();
    const route = useRoute();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event.on('qiankun-child-loading', (data: any) => {
      const {isLoading, isMenuClick} = data ?? {};
      if (route.path === '/' && !isMenuClick) {
        loading.value = false;
      } else {
        loading.value = Boolean(isLoading);
      }
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
