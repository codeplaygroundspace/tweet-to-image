import { parseTweetUrl } from "../parse-tweet-url";

describe("parseTweetUrl", () => {
  it("extracts ID from x.com URL", () => {
    expect(parseTweetUrl("https://x.com/kepano/status/2036817227031425145")).toBe(
      "2036817227031425145"
    );
  });

  it("extracts ID from twitter.com URL", () => {
    expect(
      parseTweetUrl("https://twitter.com/elonmusk/status/1234567890")
    ).toBe("1234567890");
  });

  it("handles URLs with query params", () => {
    expect(
      parseTweetUrl("https://x.com/user/status/123?s=20&t=abc")
    ).toBe("123");
  });

  it("handles mobile URLs", () => {
    expect(
      parseTweetUrl("https://mobile.twitter.com/user/status/456")
    ).toBe("456");
  });

  it("returns null for non-tweet URLs", () => {
    expect(parseTweetUrl("https://x.com/home")).toBeNull();
    expect(parseTweetUrl("https://google.com")).toBeNull();
    expect(parseTweetUrl("not a url")).toBeNull();
    expect(parseTweetUrl("")).toBeNull();
  });
});
