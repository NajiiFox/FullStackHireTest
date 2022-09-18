import React from "react";
import { mount } from "enzyme";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedNodes from "./Nodes";
import Node from "../components/Node";
import { checkNodesStatus } from "../reducers/nodes";

describe("<Nodes />", () => {
  const nodes = {
    list: [
      {
        url: "https://thawing-springs-53971.herokuapp.com",
        online: false,
        name: "Node 1",
        loading: false,
        blocks: [
          {
            id: "5",
            type: "blocks",
            attributes: {
              index: 1,
              timestamp: 1530679678,
              data: "The Human Torch",
              previousHash: "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
              hash: "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
            },
          },
          {
            id: "6",
            type: "blocks",
            attributes: {
              index: 2,
              timestamp: 1530679684,
              data: "is denied",
              previousHash: "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
              hash: "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
            },
          },
          {
            id: "7",
            type: "blocks",
            attributes: {
              index: 3,
              timestamp: 1530679689,
              data: "a bank loan",
              previousHash: "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
              hash: "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A=",
            },
          },
        ],
      },
      {
        url: "https://secret-lowlands-62331.herokuapp.com",
        online: false,
        name: "Node 2",
        loading: false,
        blocks: [
          {
            id: "5",
            type: "blocks",
            attributes: {
              index: 1,
              timestamp: 1530679678,
              data: "The Human Torch",
              previousHash: "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
              hash: "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
            },
          },
          {
            id: "6",
            type: "blocks",
            attributes: {
              index: 2,
              timestamp: 1530679684,
              data: "is denied",
              previousHash: "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
              hash: "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
            },
          },
          {
            id: "7",
            type: "blocks",
            attributes: {
              index: 3,
              timestamp: 1530679689,
              data: "a bank loan",
              previousHash: "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
              hash: "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A=",
            },
          },
        ],
      },
    ],
  };

  let store: MockStoreEnhanced<unknown, {}>;

  function setup(): JSX.Element {
    const middlewares = [thunk];
    store = configureMockStore(middlewares)({ nodes });
    return (
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
  }

  afterEach(() => {
    store.clearActions();
  });

  it("should contain <Node />", () => {
    const wrapper = mount(setup());

    expect(wrapper.find(Node).length).toEqual(2);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          meta: expect.objectContaining({ arg: nodes.list }),
          type: checkNodesStatus.pending.type,
        }),
      ])
    );
  });

  it("should match snapshot", () => {
    const component = create(setup());
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
