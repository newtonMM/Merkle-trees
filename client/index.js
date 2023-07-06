const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
// const MerkleTree = require('../utils/MerkleTree');

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const name = "Loretta Kozey";

  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  console.log(root);
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
    root,
    // TODO: add request body parameters here!
  });
  console.log("name is ", gift);
  console.log("........", proof);
}

main();
