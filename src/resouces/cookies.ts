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

  insertKey(key: string, value: string, options: TCookieAttributes["defaultOptions"]) {
    Cookies.set(key, value, options);
    this.ChangeState();
  }
}
