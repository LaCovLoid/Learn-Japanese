<template>
  <div>
    <a href="javascript:kakaoLogin();"><img src="../assets/image/kakao_login.png"/></a>
  </div>
</template>
<!--
<script src="https://developers.kakao.com/sdk/js/kakao.js" lang="js"></script>
<script setup lang="js">
(window).Kakao.init("d2b955cff25947c074d700634de105bb");
function kakaoLogin() {
  (window).Kakao.Auth.login({
    scope:'accout_email',
    success: function(authObj) {
      console.log(authObj);
      (window).Kakao.API.request({
        url:'/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account;
        }
      });
    }
  });
}
</script>
-->
<style></style>