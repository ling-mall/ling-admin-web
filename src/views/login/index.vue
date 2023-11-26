<template>
  <div class="w-full h-full relative">
    <div class="z-0 flex flex-row items-center justify-center w-full h-full absolute blur">
      <!-- <div class="bg-green-1 flex-grow h-full"></div> -->
      <img class="w-screen h-screen" src="https://tailwindui.com/img/beams-home@95.jpg" alt="" />
    </div>
    <div class="w-full h-full z-1 relative flex items-center justify-center">
      <div class="w-100 flex flex-row bg-white rounded shadow-xl p-10">
        <div class="flex flex-row w-full">
          <div class="flex-grow flex flex-col items-center">
            <div class="flex flex-row text-xl">
              <div class="cursor-pointer"> 登录 </div>
            </div>
            <div class="mt-10 w-full flex flex-col items-center">
              <a-form
                :rules="rules"
                :model="form"
                :style="{ width: '90%' }"
                layout="vertical"
                @submit="handleSubmit"
              >
                <a-form-item field="username" validate-trigger="blur" hide-asterisk>
                  <a-input
                    class="rounded"
                    size="large"
                    v-model="form.username"
                    placeholder="用户名 / 手机号 / 邮箱"
                  >
                    <template #prepend> 账号 </template>
                  </a-input>
                </a-form-item>
                <a-form-item field="password" validate-trigger="blur" hide-asterisk>
                  <a-input-password
                    size="large"
                    v-model="form.password"
                    placeholder="密码"
                    allow-clear
                  >
                    <template #prepend> 密码 </template>
                  </a-input-password>
                </a-form-item>
                <div class="flex justify-between mb-6">
                  <a-checkbox v-model="form.isRememberMe">记住我</a-checkbox>
                  <div class="w-17 cursor-pointer"> 忘记密码 ? </div>
                </div>

                <a-form-item>
                  <a-button type="primary" html-type="submit" class="w-full">登录</a-button>
                </a-form-item>
                <div class="flex flex-row [&>*]:(flex-1) space-x-2">
                  <a-button>手机登录</a-button>
                  <a-button>二维码登录</a-button>
                  <a-button>注册</a-button>
                </div>
                <a-divider orientation="center">其他方式</a-divider>
                <div class="flex flex-row text-2xl [&>*]:(cursor-pointer flex-1 text-center)">
                  <div>
                    <span class="iconify" data-icon="ic:baseline-wechat" data-inline="false"></span>
                  </div>
                  <div>
                    <span class="iconify" data-icon="mdi:qqchat" data-inline="false"></span>
                  </div>
                  <div>
                    <span class="iconify" data-icon="mdi:github" data-inline="false"></span>
                  </div>
                  <div>
                    <span class="iconify" data-icon="ri:alipay-line" data-inline="false"></span>
                  </div>
                </div>
              </a-form>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script></script>
<script lang="ts" setup>
  import { getRedirectUrl, doLogin } from '@/api/sso'
  import { FieldRule } from '@arco-design/web-vue'

  defineOptions({ name: 'LoginPage' })

  const form = ref({
    username: 'zhong',
    password: '12345678',
    isRememberMe: false,
    verificationCode: ''
  })

  const rules: Record<string, FieldRule | FieldRule[]> = {
    username: [
      {
        required: true,
        message: '请输入用户名'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码'
      }
    ]
  }

  const handleSubmit = ({ values, errors }) => {
    console.log('values:', values, '\nerrors:', errors)
    if (!errors) {
      doLogin(form.value).then((r) => {
        console.log(r)
      })
    }
  }

  onMounted(() => {
    getRedirectUrl().then((res) => {
      console.log(res)
    })
  })
</script>
<style lang="scss" scoped></style>
@/locales/useLocale
