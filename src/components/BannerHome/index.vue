<template>
    <div class="banner0">
        <div class="banner0-text-wrapper">
            <div class="banner0-title" data-edit="text,image" style="opacity: 1; transform: translate(0px, 0px);">
                <!-- <img src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" width="100%" alt="img"> -->
                <SearchTrip />
            </div>
            <!-- <div class="banner0-content" style="opacity: 1; transform: translate(0px, 0px);">
                <span>一个高效的页面动画解决方案</span>
            </div> -->
            <!-- <button data-edit="link,text" type="button" class="ant-btn banner0-button ant-btn-background-ghost" style="opacity: 1; transform: translate(0px, 0px);">
                <span>Learn More</span>
            </button> -->
        </div>
    </div>
</template>

<script>
import SearchTrip from "./../../components/SearchTrip";
export default {
    components: {
        SearchTrip
    }
}
</script>

<style>
.banner0 {
    width: 100%;
    height: 100vh;
    position: relative;
    text-align: center;
    border-color: #666;
    background-image: url(https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg);
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}
.banner0 .banner0-text-wrapper {
    display: inline-block;
    position: absolute;
    top: 20%;
    margin: auto;
    left: 0;
    right: 0;
    font-size: 14px;
    color: #fff;
    width: 550px;
}
.banner0 .banner0-title {
    width: 350px;
    left: 30px;
    min-height: 60px;
    margin: auto;
    display: inline-block;
    font-size: 40px;
    position: relative;
}
.banner0 .banner0-content {
    margin-bottom: 20px;
    word-wrap: break-word;
    min-height: 24px;
}
.banner0 .banner0-button {
    border: 1px solid #fff;
    color: #fff;
    background: 0 0;
    box-shadow: 0 0 0 transparent;
    font-size: 16px;
    height: 40px;
    transition: background .45s cubic-bezier(.215,.61,.355,1),box-shadow .45s cubic-bezier(.215,.61,.355,1);
}
</style>