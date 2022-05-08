<template>
  <div :class='`hp-spin ${visibled ? "" : "hide"}`'>
    <div
      :class='isNotScrollbar ? "is-not-scrollbar" : ""'
    >
      <slot />
    </div>
    <div :class="slotDefault ? 'spin-content' : ''">
      <div class="spin-img"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useSlots, watch } from 'vue';

export default defineComponent({
  name: 'Loading',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 0,
    },
    isNotScrollbar: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const visibled = ref(false);
    //判断<slot/>是否有传值
    const slotDefault = !!useSlots().default;

    let timer: number | undefined;
    watch([() => props.visible, () => props.delay], ([visible, delay]) => {
      if (delay) { // 防闪烁
        timer && clearTimeout(timer);
        if (visible) {
          timer = setTimeout(() => visibled.value = true, delay);
        } else {
          visibled.value = false;
        }
      } else {
        visibled.value = visible;
      }
    })
    
    return {
      visibled,
      slotDefault
    };
  },
})
</script>

<style lang="scss" src="./index.scss"></style>