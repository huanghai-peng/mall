<template>
    <div class="login-bar">
        <div class="login-img">
            <img src="~assets/img/profile/avatar.svg" alt="">
        </div>
        <div class="login-info">
            <div>登录/注册</div>
            <div class="login-phone">
                <img src="~assets/img/profile/phone.svg" alt="">
                <span>暂无绑定手机号</span>
            </div>
        </div>
        <div class="login-arrow-left">
            <img src="~assets/img/common/arrow-left.svg" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .login-bar {
        display: flex;
        background-color: var(--color-tint);
        color: #fff;
        padding: 10px;
    }
    .login-img {
        width: 70px;
        height: 70px;
        margin-right: 15px;
    }
    .login-img img {
        width: 100%;
    }
    .login-info {
        flex: 1;
        font-size: 14px;
        margin-top: 12px;
    }
    .login-arrow-left {
        display: flex;
        align-items: center;
        margin-right: 5px;
    }
    .login-arrow-left img {
        width: 20px;
        height: 20px;
    }
    .login-phone img {
        width: 20px;
        height: 30px;
        vertical-align: middle;
        margin-left: -4px;
    }
    .login-phone span {
        font-size: 12px;
    }
</style>