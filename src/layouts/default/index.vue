<template>
  <div class="flex flex-row">
    <DefaultLayoutSider />
    <div class="flex flex-col flex-1">
      <DefaultLayoutHeader />
      <div>
        <router-view v-slot="{ Component }">
          <transition name="scale-slide">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import DefaultLayoutHeader from './header/index.vue'
  import DefaultLayoutSider from './sider/LayoutSider.vue'

  defineOptions({ name: 'DefaultLayout' })
</script>

<style scoped lang="scss">
  .scale-slide-enter-active,
  .scale-slide-leave-active {
    position: absolute;
    transition: all 0.85s ease;
  }

  .scale-slide-enter-from {
    left: -100%;
  }

  .scale-slide-enter-to {
    left: 0%;
  }

  .scale-slide-leave-from {
    transform: scale(1);
  }

  .scale-slide-leave-to {
    transform: scale(0.8);
  }
</style>
