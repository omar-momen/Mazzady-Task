export const authService = () => {
  const nuxtApp = useNuxtApp();
  const locale = nuxtApp?.$i18n?.locale;
  const toast = useToast();

  return {
    async login(loginData) {
      const { data, error } = await useMyFetch("member/auth/login", {
        method: "POST",
        body: loginData,
      });

      if (error.value) {
        return toast.add({
          color: "red",
          id: "login_failed",
          title: useError(error.value),
        });
      }

      const message =
        locale.value == "en"
          ? "Welcome to Samh RealState"
          : "مرحبا بك في سمح العقارية";
      toast.add({
        color: "green",
        id: "login_success",
        title: message,
      });

      return data?.value?.data;
    },

    async logout() {
      const { data, error } = await useMyFetch("member/auth/logout", {
        method: "POST",
      });

      if (error.value) {
        return toast.add({
          color: "red",
          id: "logout_failed",
          title: useError(error.value),
        });
      }

      const message =
        locale.value == "en"
          ? "You have been logged out successfully"
          : "تم تسجيل الخروج بنجاح";
      toast.add({
        color: "green",
        id: "logout_success",
        title: message,
      });

      return data?.value?.data;
    },

    async verifyPhoneNumber(phone_number, forgetPass, resend) {
      const { data, error } = await useMyFetch(
        forgetPass
          ? `member/auth/forget-password${resend ? "?resend=true" : ""}`
          : `member/auth/send-sms-code${resend ? "?resend=true" : ""}`,
        {
          method: "POST",
          body: { phone_number },
        }
      );

      if (error.value) {
        return toast.add({
          color: "red",
          id: "verification_code_failed",
          title: useError(error.value),
        });
      }
      const message =
        locale.value == "en"
          ? "Verification code sent successfully"
          : "تم ارسال كود التحقق بنجاح";
      toast.add({
        color: "green",
        id: "verification_code_sent",
        title: message,
      });

      return data?.value?.data;
    },

    async confirmPhoneNumber(phone_number, otp_code, forgetPass) {
      const { data, error } = await useMyFetch(
        forgetPass
          ? `member/auth/verify-forget-password`
          : `member/auth/verify-sms-code`,
        {
          method: "POST",
          body: { phone_number, otp_code },
        }
      );

      if (error.value) {
        return toast.add({
          color: "red",
          id: "code_verification_failed",
          title: useError(error.value),
        });
      }
      const message =
        locale.value == "en"
          ? "code verified successfully"
          : "تم التأكيد من الكود بنجاح";
      toast.add({
        color: "green",
        id: "code_verified",
        title: message,
      });

      return data?.value?.data;
    },

    async resetPassowrd(phone_number, otp_code, new_password) {
      const { data, error } = await useMyFetch(`member/auth/reset-password`, {
        method: "POST",
        body: { phone_number, otp_code, new_password },
      });

      if (error.value) {
        return toast.add({
          color: "red",
          id: "password_reset_failed",
          title: useError(error.value),
        });
      }
      const message =
        locale.value == "en"
          ? "password reset successfully"
          : "تمت إعادة تعيين كلمة المرور بنجاح";
      toast.add({
        color: "green",
        id: "password_reset",
        title: message,
      });

      return data;
    },

    async signup(signupData) {
      const { data, error } = await useMyFetch("member/auth/register", {
        method: "POST",
        body: signupData,
      });

      if (error.value) {
        return toast.add({
          color: "red",
          id: "account_creation_failed",
          title: useError(error.value),
        });
      }
      const message =
        locale.value == "en"
          ? "Account created successfully, please login"
          : "تم انشاء الحساب بنجاح برجاء تسجيل الدخول";
      toast.add({
        color: "green",
        id: "account_created",
        title: message,
      });

      return data?.value?.data;
    },
  };
};
