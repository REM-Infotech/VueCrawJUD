import Cookies from "js-cookie";

interface TCookieAttributes {
  defaultOptions: {
    /**
     * Define when the cookie will be removed. Value can be a Number
     * which will be interpreted as days from time of creation or a
     * Date instance. If omitted, the cookie becomes a session cookie.
     */
    expires?: number | Date | undefined;

    /**
     * Define the path where the cookie is available. Defaults to '/'
     */
    path?: string | undefined;

    /**
     * Define the domain where the cookie is available. Defaults to
     * the domain of the page where the cookie was created.
     */
    domain?: string | undefined;

    /**
     * A Boolean indicating if the cookie transmission requires a
     * secure protocol (https). Defaults to false.
     */
    secure?: boolean | undefined;

    /**
     * Asserts that a cookie must not be sent with cross-origin requests,
     * providing some protection against cross-site request forgery
     * attacks (CSRF)
     */
    sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined;

    /**
     * An attribute which will be serialized, conformably to RFC 6265
     * section 5.2.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [property: string]: any;
  };
}

interface TCookiesCrawJUD {
  cookiesApp: {
    [key: string]: string | undefined;
    token?: string;
  };
  defaultOptions?: TCookieAttributes["defaultOptions"];
  ChangeState(): void;
  insertKey(key: string, value: string, options: TCookieAttributes["defaultOptions"]): void;
}

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
