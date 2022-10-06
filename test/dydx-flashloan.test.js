const BN = require("bn.js")
const { sendEther, pow } = require("./util")
const { DAI, DAI_WHALE, USDC, USDC_WHALE, USDT, USDT_WHALE, ACC0_PRIVATE_KEY } = require("./config")

const IERC20 = artifacts.require("IERC20")
const TestDyDxSoloMargin = artifacts.require("TestDyDxSoloMargin")

const SOLO = "0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e"

contract("TestDyDxSoloMargin", (accounts) => {
  const WHALE = USDC_WHALE
  const TOKEN = USDC
  const DECIMALS = 6
  const FUND_AMOUNT = pow(10, DECIMALS).mul(new BN(2000000))
  const BORROW_AMOUNT = pow(10, DECIMALS).mul(new BN(1000000))
  const PRIVATE_KEY = ACC0_PRIVATE_KEY

  let testDyDxSoloMargin
  let token

  beforeEach(async () => {
    console.log("Initiating contract instance")
    testDyDxSoloMargin = await TestDyDxSoloMargin.new()
    const accBal = await web3.eth.getBalance(accounts[0])
    console.log("Balance of accounts[0] is: ", accBal.toString())
    console.log("Deployed contract address: ", testDyDxSoloMargin.address.toString())
  })

  it("Check if 1 ETH got deposited into contract", async () => {
    
    // await testDyDxSoloMargin.send(web3.utils.toWei(1, "ether"))
    await testDyDxSoloMargin.sendTransaction({value: '1000000000000000'})
    // const createTransaction = await web3.eth.accounts.signTransaction(
    //     {         
    //       to: testDyDxSoloMargin.address,
    //       value: web3.utils.toWei('1', 'ether'),
    //       gas: 3000000
    //     },
    //     '0x535615c933857afee77ef30da2fe4d04f42e09dc156757db6464a52ad4af4cc1'
    // )

    // const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  //  console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);
    
    // await web3.eth.sendTransaction({
    //     from: accounts[0],
    //     to: testDyDxSoloMargin.address,
    //     value: '1000000000000000'
    // })

    const contrBal = await web3.eth.getBalance(testDyDxSoloMargin.address)
    console.log("Deployed contract address inside IT: ", testDyDxSoloMargin.address.toString())
    console.log("Contract balance after the top up is: ", contrBal.toString())
    // assert(contrBal.gte(0), "Contract wasn't topped up")
  })
})



//   beforeEach(async () => {
//     token = await IERC20.at(TOKEN)
//     testDyDxSoloMargin = await TestDyDxSoloMargin.new()

//     await sendEther(web3, accounts[0], WHALE, 1)

//     // send enough token to cover fee
//     const bal = await token.balanceOf(WHALE)
//     const accBalance = await token.balanceOf(accounts[0])
//     console.log("Balance of whale : ", bal.toString())
//     console.log("Balance of account 0: ", accBalance.toString())
//     assert(bal.gte(FUND_AMOUNT), "balance < fund")
//     await token.transfer(testDyDxSoloMargin.address, FUND_AMOUNT, {
//       from: WHALE,
//     })

//     const soloBal = await token.balanceOf(SOLO)
//     console.log(`solo balance: ${soloBal}`)
//     assert(soloBal.gte(BORROW_AMOUNT), "solo < borrow")
//   })

//   it("flash loan", async () => {
//     const tx = await testDyDxSoloMargin.initiateFlashLoan(token.address, BORROW_AMOUNT, {
//       from: WHALE,
//     })

//     console.log(`${await testDyDxSoloMargin.flashUser()}`)

//     for (const log of tx.logs) {
//       console.log(log.args.message, log.args.val.toString())
//     }
//   })
// })