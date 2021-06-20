import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/client/testing";
import { SnackbarProvider } from "notistack";

import TopMenu from "./TopMenu";
import { AuthProvider } from "../context/auth";

let emptyMock: any[] = [];

describe("TopMenu", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <SnackbarProvider>
          <TopMenu />
        </SnackbarProvider>
      </MockedProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(TopMenu).toBeDefined();
  });

  it("should render correctly when NO user logged in", () => {
    const homeIcon = wrapper.find("#home-icon");
    const button = wrapper.find("button");
    const input = wrapper.find("input");

    expect(wrapper).toMatchSnapshot();
    expect(homeIcon).toHaveLength(1);
    expect(button).toHaveLength(1);
    expect(input).toHaveLength(2);
  });

  it("should render correctly when user logged in", () => {
    const contextValues = {
      user: { id: "1", email: "abc@gmail.com", token: "123" },
      login: jest.fn(),
      logout: jest.fn(),
    };

    wrapper = mount(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <AuthProvider value={contextValues}>
          <SnackbarProvider>
            <TopMenu />
          </SnackbarProvider>
        </AuthProvider>
      </MockedProvider>
    );

    const homeIcon = wrapper.find("#home-icon");
    const button = wrapper.find("button");
    const input = wrapper.find("input");

    expect(wrapper).toMatchSnapshot();
    expect(homeIcon).toHaveLength(1);
    expect(button).toHaveLength(2);
    expect(input).toHaveLength(0);
  });
});
