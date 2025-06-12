import type { TCookieAttributes, TCookiesCrawJUD } from "@/types/cookies";
import Cookies from "js-cookie";

export default class CookiesCrawJUD implements TCookiesCrawJUD {
  defaultOptions?: TCookieAttributes["defaultOptions"];

  insertKey(
    key: string,
    value: string,
    options: TCookieAttributes["defaultOptions"] = {
      sameSite: "Strict",
      secure: true,
    },
  ) {
    Cookies.set(key, value, options);
  }
}
