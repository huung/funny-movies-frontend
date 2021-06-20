import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/client/testing";

import ThumbButtons from "./ThumbButtons";
import { AuthProvider } from "../context/auth";

let emptyMock: any[] = [];

describe("ThumbButtons UI", () => {

  it("should be defined", () => {
    expect(ThumbButtons).toBeDefined();
  });

  it("should render correctly", () => {
    const wrapper = mount(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <ThumbButtons videoId="TBiSf3-CCSU" votes={[]} />
      </MockedProvider>
    );
    const likeButton = wrapper.find("button#like");
    const dislikeButton = wrapper.find("button#dislike");

    expect(wrapper).toMatchSnapshot();
    expect(likeButton).toHaveLength(1);
    expect(dislikeButton).toHaveLength(1);
  });
});

describe("ThumbButtons functionality", () => {
  let wrapper: any;
  const setState = jest.fn();

  beforeEach(() => {
    const useStateSpy = jest.spyOn(React, "useState");
    const init = {};
    useStateSpy.mockImplementation(() => [init, setState] as any);

    wrapper = mount(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <ThumbButtons videoId="TBiSf3-CCSU" votes={[]} />
      </MockedProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("buttons should not work when there is no user", () => {
    // console.log("WRAPPER:", wrapper.debug());
    const likeButton = wrapper.find("button#like");
    const dislikeButton = wrapper.find("button#dislike");

    likeButton.simulate("click");
    dislikeButton.simulate("click");
    expect(setState).not.toHaveBeenCalled();
  });

  it("buttons should work when user exists", () => {
    const contextValues = {
      user: { id: "1", email: "abc@gmail.com", token: "123" },
      login: jest.fn(),
      logout: jest.fn(),
    };
    wrapper = mount(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <AuthProvider value={contextValues}>
          <ThumbButtons videoId="TBiSf3-CCSU" votes={[]} />
        </AuthProvider>
      </MockedProvider>
    );
    const likeButton = wrapper.find("button#like");
    likeButton.simulate("click");

    expect(setState).toHaveBeenCalled();
  });
});
