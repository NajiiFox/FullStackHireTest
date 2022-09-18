import mockFetch from "cross-fetch";
import reducer, { checkNodeStatus } from "./nodes";
import { Node } from "../types/Node";
import initialState from "./initialState";

jest.mock("cross-fetch");

const mockedFech: jest.Mock<unknown> = mockFetch as any;

describe("Reducers::Nodes", () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA: Node = {
    url: "http://localhost:3002",
    online: false,
    name: "Node 1",
    loading: false,
    blocks: [
      {
        "id": "5",
        "type": "blocks",
        "attributes": {
          "index": 1,
          "timestamp": 1530679678,
          "data": "The Human Torch",
          "previousHash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
          "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
        }
      },
      {
        "id": "6",
        "type": "blocks",
        "attributes": {
          "index": 2,
          "timestamp": 1530679684,
          "data": "is denied",
          "previousHash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
          "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
        }
      },
      {
        "id": "7",
        "type": "blocks",
        "attributes": {
          "index": 3,
          "timestamp": 1530679689,
          "data": "a bank loan",
          "previousHash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
          "hash": "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A="
        }
      }
    ]
    ,
  };

  const nodeB = {
    url: "http://localhost:3003",
    online: false,
    name: "Node 2",
    loading: false,
    blocks: [
      {
        "id": "5",
        "type": "blocks",
        "attributes": {
          "index": 1,
          "timestamp": 1530679678,
          "data": "The Human Torch",
          "previousHash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
          "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
        }
      },
      {
        "id": "6",
        "type": "blocks",
        "attributes": {
          "index": 2,
          "timestamp": 1530679684,
          "data": "is denied",
          "previousHash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
          "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
        }
      },
      {
        "id": "7",
        "type": "blocks",
        "attributes": {
          "index": 3,
          "timestamp": 1530679689,
          "data": "a bank loan",
          "previousHash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
          "hash": "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A="
        }
      }
    ],
  };

  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle checkNodeStatus.pending", () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = { type: checkNodeStatus.pending, meta: { arg: nodeA } };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle checkNodeStatus.fulfilled", () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = {
      type: checkNodeStatus.fulfilled,
      meta: { arg: nodeA },
      payload: { node_name: "alpha" },
    };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          name: "alpha",
          loading: false,
          blocks: [
            {
              "id": "5",
              "type": "blocks",
              "attributes": {
                "index": 1,
                "timestamp": 1530679678,
                "data": "The Human Torch",
                "previousHash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
              }
            },
            {
              "id": "6",
              "type": "blocks",
              "attributes": {
                "index": 2,
                "timestamp": 1530679684,
                "data": "is denied",
                "previousHash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
                "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
              }
            },
            {
              "id": "7",
              "type": "blocks",
              "attributes": {
                "index": 3,
                "timestamp": 1530679689,
                "data": "a bank loan",
                "previousHash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
                "hash": "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A="
              }
            }
          ],
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle checkNodeStatus.rejected", () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          name: "alpha",
          loading: false,
          blocks: [
            {
              "id": "5",
              "type": "blocks",
              "attributes": {
                "index": 1,
                "timestamp": 1530679678,
                "data": "The Human Torch",
                "previousHash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
              }
            },
            {
              "id": "6",
              "type": "blocks",
              "attributes": {
                "index": 2,
                "timestamp": 1530679684,
                "data": "is denied",
                "previousHash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
                "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
              }
            },
            {
              "id": "7",
              "type": "blocks",
              "attributes": {
                "index": 3,
                "timestamp": 1530679689,
                "data": "a bank loan",
                "previousHash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
                "hash": "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A="
              }
            }
          ],
        },
        nodeB,
      ],
    };
    const action = { type: checkNodeStatus.rejected, meta: { arg: nodeA } };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          name: "alpha",
          loading: false,
          blocks: [
            {
              "id": "5",
              "type": "blocks",
              "attributes": {
                "index": 1,
                "timestamp": 1530679678,
                "data": "The Human Torch",
                "previousHash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
              }
            },
            {
              "id": "6",
              "type": "blocks",
              "attributes": {
                "index": 2,
                "timestamp": 1530679684,
                "data": "is denied",
                "previousHash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
                "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
              }
            },
            {
              "id": "7",
              "type": "blocks",
              "attributes": {
                "index": 3,
                "timestamp": 1530679689,
                "data": "a bank loan",
                "previousHash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
                "hash": "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A="
              }
            }
          ],
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});

describe("Actions::Nodes", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockedFech.mockClear();
  });

  const node: Node = {
    url: "http://localhost:3002",
    online: false,
    name: "Node 1",
    loading: false,
    blocks: [
      {
        "id": "5",
        "type": "blocks",
        "attributes": {
          "index": 1,
          "timestamp": 1530679678,
          "data": "The Human Torch",
          "previousHash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
          "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
        }
      },
      {
        "id": "6",
        "type": "blocks",
        "attributes": {
          "index": 2,
          "timestamp": 1530679684,
          "data": "is denied",
          "previousHash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
          "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
        }
      },
      {
        "id": "7",
        "type": "blocks",
        "attributes": {
          "index": 3,
          "timestamp": 1530679689,
          "data": "a bank loan",
          "previousHash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
          "hash": "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A="
        }
      }
    ],
  };

  it("should fetch the node status", async () => {
    mockedFech.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ node_name: "Secret Lowlands" });
        },
      })
    );
    await checkNodeStatus(node)(dispatch, () => {}, {});

    const expected = expect.arrayContaining([
      expect.objectContaining({
        type: checkNodeStatus.pending.type,
        meta: expect.objectContaining({ arg: node }),
      }),
      expect.objectContaining({
        type: checkNodeStatus.fulfilled.type,
        meta: expect.objectContaining({ arg: node }),
        payload: { node_name: "Secret Lowlands" },
      }),
    ]);
    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockedFech.mockReturnValueOnce(Promise.reject(new Error("Network Error")));
    await checkNodeStatus(node)(dispatch, () => {}, {});
    const expected = expect.arrayContaining([
      expect.objectContaining({
        type: checkNodeStatus.pending.type,
        meta: expect.objectContaining({ arg: node }),
      }),
      expect.objectContaining({
        type: checkNodeStatus.rejected.type,
        meta: expect.objectContaining({ arg: node }),
        error: expect.objectContaining({ message: "Network Error" }),
      }),
    ]);

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});

