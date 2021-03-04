import { createI18n } from "react-router-i18n";

// Array of supported locales
// The first in the array is treated as the default locale
const locales = ["en", "ar"];

// Dictionary of translations
const translations = {
  en: {
    Asnwered: "Asnwered ",
    Inbox: "Inbox",
    Home: "Home",
    Account: "Account",
    Login: "Login",
    SignUp: "Sign up",
    Logout: "Log out",
    Required: "Required",
    Prequired: "Password is required",
    Nrequired: "Name is required",
    Urequired: "Username is required",
    eError: "Email is invalid",
    pError: "Password must be 6-16 character",
    switchTo: "AR",
    TypeA: "Type your answer",
    Answer: "Answer",
    Ask: "Ask",
    questionSent: "Queston sent!",
    Send: "Send",
    Ignore: "Ignore",
    Anon: "Anon",
    noAnswer: "It seems like you havent answer any question.",
    gotAquestion: (
      <p>
        Got A <br /> Question ?
      </p>
    ),
    userOrEmail: "Username or Email",
    password: "Password",
    name: "Name",
    Username: "Username",
    Email: "Email",
  },
  ar: {
    Asnwered: "الأجوبة",
    Inbox: "الأسئلة",
    Home: "الرئيسية",
    Account: "الملف الشخصي",
    Login: "الدخول",
    SignUp: "التسجيل",
    Logout: "خروج",
    Required: "مطلوب",
    Prequired: "كلمة المرور مطلوبة",
    Nrequired: "الاسم مطلوب",
    Urequired: "المعرّف مطلوب",
    eError: "البريد الاكتروني غيز صالح",
    pError: "يجب ان تتكون كلمة المرور من 6-16 خانة",
    switchTo: "EN",
    TypeA: "اسأل سؤالك",
    Answer: "أجب",
    Ask: "اسأل",
    questionSent: "تم ارسال سؤالك",
    Send: "ارسل",
    Ignore: "تجاهل",
    Anon: "مجهول",
    noAnswer: "لا توجد اي اجوبة",
    gotAquestion: (
      <p>
        عندك
        <br /> سؤال ؟
      </p>
    ),
    userOrEmail: "اسم المستخدم او البريد الالكتروني",
    password: "كلمة المرور",
    name: "الاسم",
    Username: "المعرّف",
    Email: "البريد الالكتروني",
  },
};

const I18n = createI18n(locales, translations);

export default I18n;
