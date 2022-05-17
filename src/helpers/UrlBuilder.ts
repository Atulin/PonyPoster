export class UrlBuilder {
    #url: URL;
  
    constructor(baseUrl: string) {
      this.#url = new URL(baseUrl);
    }
  
    query(name: string, value: string): UrlBuilder {
      this.#url.searchParams.append(name, value.toString());
      return this;
    }
  
    tryQuery(name: string, value: string | null | undefined): UrlBuilder {
      if (value === null || value === undefined || value.length <= 0) return this;
      return this.query(name, value);
    }
  
    build() {
      return this.#url.toString();
    }
  }