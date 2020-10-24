<template>
    <div class="count-balance">
        <div>
            <div class="count">
                <span class="icon">0.00</span>
                <span>元</span>
            </div>
            <div>我的余额</div>
        </div>
        <div>
            <div class="count">
                <span class="icon">0</span>
                <span>个</span>
            </div>
            <div>我的优惠</div>
        </div>
        <div>
            <div class="count">
                <span class="icon">0</span>
                <span>分</span>
            </div>
            <div>我的积分</div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .count-balance {
        display: flex;
        border-bottom: 15px solid #eee;
    }
    .count-balance>div {
        flex: 1;
        text-align: center;
        border-right: 1px solid #eee;
        padding: 15px 20px;
        font-size: 10px;
    }
    .count-balance>div:last-child {
        border: 0;
    }
    .icon {
        font-size: 16px;
        font-weight: bold;
        color: var(--color-high-text);
    }
    .count {
        margin-bottom: 5px;
    }
</style>