import type { TCookieAttributes, TCookiesCrawJUD } from "@/types/cookies";
import Cookies from "js-cookie";

export default class CookiesCrawJUD implements TCookiesCrawJUD {
  defaultOptions?: TCookieAttributes["defaultOptions"];

  cookiesApp: {
    [key: string]: string | undefined;
    token?: string;
  } = undefined;

  ChangeState() {
    const getCookies = Cookies.get();
    console.log(getCookies);
    this.cookiesApp = Object.apply(getCookies);
  }

  insertKey(
    key: string,
    value: string,
    options: TCookieAttributes["defaultOptions"] = {
      sameSite: "Strict",
      secure: true,
    },
  ) {
    Cookies.set(key, value, options);
    this.ChangeState();
  }

  clearCookies() {
    Object.keys(this.cookiesApp).forEach((key) => {
      Cookies.remove(key);
    });
    this.ChangeState();
  }
}
