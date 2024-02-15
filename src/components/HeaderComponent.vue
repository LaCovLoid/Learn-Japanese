<template>
    <div :class="$style.index">
        <div v-for="(item,index) in menuList" :key="index" :class="$style.menuButton">
            <RouterLink :to="item.path"> {{ item.name }} </RouterLink>
        </div>

    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import {reactive} from 'vue';

const menuList = reactive([
{
        name: '딩섬',
        path: '/about'
    },
    {
        name: '넝마',
        path: '/'
    },
    {
        name: '사류',
        path: '/'
    },
    {
        name: '청우',
        path: '/'
    },

]);

function clickedImg() {
    router.push("/");
}

</script>

<style lang="scss" module>
.index {
    .menuButton {
        display: inline-block;
        margin: 0px;
    }
}
</style>