<template>
    <div id="login">
        <div class="login-from-box">
            <h2>登录</h2>
            <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="75px" label-position="left">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名" clearable prefix-icon='el-icon-user-solid'>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-info'
                        show-password :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入您的手机号" clearable prefix-icon='el-icon-user-solid'>
                    </el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="Verificationcode">
                    <el-input v-model="formData.Verificationcode" placeholder="请输入验证码" clearable
                        prefix-icon='el-icon-loading' :style="{ width: percentage }"></el-input>
                    <el-button @click="getCode">{{ buttonText }}</el-button>
                </el-form-item>
                <el-form-item size="large" style="margin-left: -80px;">
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
import { getUserCode, userLogin } from "@/api/user/index"
import { Message } from "element-ui"
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            formData: {
                username: "admin",
                password: 123456,
                Verificationcode: undefined,
                phone: "",
            },
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                phone: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }],
                Verificationcode: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }],
            },
            percentage: "65%",
            countdown: 0,
            buttonText: "获取验证码",
            code: 0,//获取的验证码
        }
    },
    computed: {

    },
    methods: {
        ...mapActions(['login']),
        submitForm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return
                // TODO 提交表单'
                if (this.formData.Verificationcode == this.code) {
                    this.login(this.formData)
                } else {
                    Message({
                        message: '验证码错误',
                        type: "error",
                        duration: 3000,
                    })
                }
            })
        },
        //提交校验
        resetForm() {
            this.$refs['elForm'].resetFields()
        },
        //获取验证码
        getCode() {
            if (this.countdown == 0 && this.formData.phone != "") {
                this.checkPhoneNumber(this.formData.phone)
            } else if (this.formData.phone == "") {
                this.submitForm()
                Message({
                    message: "请填写手机号",
                    type: "error",
                    duration: 3000,
                })
            } else {
                Message({
                    message: this.buttonText,
                    type: "error",
                    duration: 3000,
                })
            }

        },
        //按钮倒计时
        startCountdown() {
            if (this.countdown > 0) {
                return
            } else {
                this.countdown = 60
                this.buttonText = `${this.countdown} 秒后获取`
                this.percentage = '63%'
                const intervalId = setInterval(() => {
                    this.countdown--
                    this.buttonText = `${this.countdown} 秒后获取`
                    this.percentage = '63%'
                    if (this.countdown === 0) {
                        clearInterval(intervalId)
                        this.buttonText = '获取验证码'
                        this.percentage = '65%'
                    }
                }, 1000)
            }


        },
        checkPhoneNumber(phoneNumber) {
            // 以 1 开头，后面跟 10 位数字
            const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
            console.log('reg.test(phoneNumber)', phoneNumber);
            if (reg.test(phoneNumber)) {
                getUserCode({ phone: this.formData.phone }).then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.code = res.data
                    }
                    this.startCountdown()
                })
            } else {
                Message({
                    message: '手机号有误',
                    type: "error",
                    duration: 3000,
                })
            }
        }

    }
}
</script>
<style lang="scss" scoped>
#login {
    width: 100%;
    height: 100vh;
    text-align: center;
    background-color: rgb(245, 245, 245);
    position: relative;
    background-image: url(@/assets/bk.png);
    background-size: 100% 100%;
    background-repeat: repeat;

    .login-from-box {
        width: 400px;
        height: 315px;
        margin: 0 auto;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -250px;
        background-color: white;
        padding: 50px 50px 50px 50px;
        border-radius: 30px;

    }
}
</style>