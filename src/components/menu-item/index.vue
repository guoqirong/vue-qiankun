<template>
  <div
    :class="`menu-item${getSelected(menuPath) ? ' is-selected' : ''}`"
    @click="() => {
      if (menuPath !== '/') {
        event.emit('qiankun-child-loading', {
          isLoading: true,
          isMenuClick: true
        });
      } else {
        event.emit('qiankun-child-loading', {
          isLoading: false
        });
      }
      router.push(menuPath);
    }"
  >
    {{menuText}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useEventBus from '@/utils/eventBus';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menuText: String,
    menuPath: String,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const [event] = useEventBus();

    const getSelected = (path: string) => {
      if (path === '/') {
        return route.path === path;
      }
      return route.path.includes(path);
    };

    return {
      router,
      event,
      getSelected
    }
    
  },
})
</script>

<style lang="scss" src="./index.scss"></style>