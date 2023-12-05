import { ref } from 'vue';
import { defineStore } from 'pinia'
import {signIn, logout as logoutFireBase} from '../helper/firebase.helper';
import { toast } from 'vue3-toastify';

export const useAuthStore = defineStore('auth', () => {
  const auth = ref({
    user:'',
  })
  const isLogin = ref(false);
  const login = async (email, pass) => {
    const rs = await signIn(email, pass).then((userCredential) => {
      // Signed in 
      auth.value.user = userCredential.user;
      isLogin.value = true;
      toast.success('Đăng nhập thành công');
      window.location.href = '/';
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        isLogin.value = false;
        auth.value.user = '';
        console.error(errorCode, errorMessage);
        toast.error('Sai thông tin đăng nhập!');
    });
  }
  function logout() {
    logoutFireBase().then(() => {
      auth.value.user = auth.value.user = '';
      isLogin.value = false;
      toast.success('Đăng nhập thành công');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        isLogin.value = false;
        auth.value.user = '';
        console.error(errorCode, errorMessage);
    });
  }

  return { auth, isLogin, login, logout }
})