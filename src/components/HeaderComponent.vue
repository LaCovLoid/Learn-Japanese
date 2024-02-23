<template>
    <div :class="$style.index">
        <main :class="$style.headerMain">
            <div v-for="(item,index) in menuList" :key="index" :class="$style.menuButton">
                <RouterLink :to="item.path"> {{ item.name }} </RouterLink>
            </div>
            {{ store.accessToken }}
            <span @click="storeUp">{{ store.count }}</span>
            <div v-if="store.accessToken" :class="$style.rightMenus">
                <RouterLink to="/mypage" :class="$style.menuButton">My Page</RouterLink>
                <span @click="logout" :class="$style.menuButton">logout</span>
            </div>
            <div v-else :class="[$style.menuButton, $style.loginButton]">
                <RouterLink to="/login">Login</RouterLink>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue';
import { piniaStore } from '@/store/index';
import { RouterLink } from 'vue-router';
import router from '@/router';
const store = piniaStore();


const menuList = reactive([
{
        name: 'Home', //랜덤 단어
        path: '/'
    },
    {
        name: '번역', //이건 papago api 사용
        path: '/translate'
    },
    {
        name: '챌린지', //시간제한있음, 랭킹시스템 있음
        path: '/challenge'
    },
    {
        name: '초심자', //히라가나,가타카나 발음 (반응형 사이트)
        path: '/beginner'
    },

]);

function logout() {
    store.setAccessToken("");
    alert("로그아웃");
    router.push('/');
}
function storeUp() {
    store.setCount(store.count + 1);
    store.setAccessToken("sadjnkadnjk");
}

</script>

<style lang="scss" module>
.index {
    font-size: 18px;
    background-color: #fadaff;
    .headerMain {
        margin: 0 auto;
        padding: 10px 10px;
        max-width: 1280px;

        background-color: #dab5e0;
        position: relative;
        .menuButton {
            margin: 0 5px;
            padding: 5px 10px;
            display: inline-block;

            cursor: pointer;
            border-radius: 10px;
            background-color: #fceaff;
        }
        .rightMenus {
            padding-right: 10px;
            display: inline-block; 
            position: absolute;
            right: 0; 
        }
        .loginButton{
            margin-right: 15px;
            position: absolute;
            right: 0;
        }
    }
}
</style>