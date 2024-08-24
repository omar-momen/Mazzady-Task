import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, it, expect, beforeEach } from "vitest";
import UserComponent from "@/components/pages/home/UserInfo.vue";

describe("UserInfo", () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = await mountSuspended(UserComponent);
    await wrapper.vm.$nextTick();
  });

  it("renders user name", async () => {
    expect(wrapper.find("h2").text()).toBe("Hala Ahmed");
  });

  it("renders user image", () => {
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toContain("/temp/owner.png");
  });

  it("renders user description", () => {
    expect(wrapper.find("p").text()).toContain(
      "I am Hala Ahmed, I am the owner of the local brand called Beauty which is for Mackeup and Skin Care."
    );
  });

  it("renders user stats correctly", () => {
    const stats = wrapper.findAll(".text-sm.font-bold");
    expect(stats.length).toBe(3);

    expect(stats[0].text()).toBe("5"); // num_of_following
    expect(stats[1].text()).toBe("20"); // num_of_followers
    expect(stats[2].text()).toContain("4.2"); // rate
    expect(stats[2].text()).toContain("( 15 )"); // total_rates
  });

  it("renders Follow button", () => {
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Follow");
  });
});
