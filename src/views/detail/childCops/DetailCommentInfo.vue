<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !==0">
    <div class="info-title">
      <div class="info-title-left">用户评价</div>
      <div class="info-title-right">更多>></div>
    </div>
    <div class="comment-content">
      <div class="comment-user">
        <img :src="commentInfo.user.avatar" alt="" class="comment-user-img">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="comment-content-item">
        {{commentInfo.content}}
      </div>
      <div class="comment-type">
        <span class="comment-date">{{commentInfo.created | showData}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from 'common/utils'
export default {
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    showData(value){
      //1、将时间戳转成data对象
        const data = new Date(value * 1000);
        // return data;
        //2、格式化data
        return formatDate(data, "yyyy-MM-dd hh:mm:ss");
    }
  }
}
</script>
<style scoped>
  .comment-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    color: #000;
  }
  .info-title-left {
    float: left;
    font-size: 15px;
  }
  .info-title-right {
    float: right;
    font-size: 12px;
  }
  .info-title::after {
    content: '';
    display: block;
    clear: both;
  }
  .comment-user {
    padding: 10px 0;
    font-size: 14px;
    color: #545454;
  }
  .comment-user-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
    vertical-align: middle;
  }
  .comment-content-item {
    padding-bottom: 10px;
    font-size: 13px;
  }
  .comment-type {
    font-size: 12px;
  }
  .comment-date {
    margin-right: 5px;
  }
  .info-imgs {
    padding-top: 10px;
  }
  .info-imgs img {
    width: 80px;
    height: 80px;
    padding: 0 5px 5px 0;
  }
</style>