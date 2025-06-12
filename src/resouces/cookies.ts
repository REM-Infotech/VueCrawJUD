import type { TCookieAttributes, TCookiesCrawJUD } from "@/types/cookies";
import Cookies from "js-cookie";

export default class CookiesCrawJUD implements TCookiesCrawJUD {
  defaultOptions?: TCookieAttributes["defaultOptions"];

  cookiesApp: {
    [key: string]: string | undefined;
    token?: string;
  } = Cookies.get();

  ChangeState() {
    this.cookiesApp = Cookies.get();
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
