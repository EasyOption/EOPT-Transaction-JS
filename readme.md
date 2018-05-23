# EOPT Transaction JS

这是EOPT代币（ERC20）的批量转账的js脚本，基于web3 1.0（不支持web3 0.20.x）和 ethereumjs-tx编写。

## 用法

替换以下参数：

* 根据你的以太坊网络Provider，替换`<api-key>`
* 用你的地址和私钥分别替换 `<sender address>` 和 `<private key>`
* 将`<EOPT contract address>`替换为EOPT合约在你网络中的地址

运行：

```
node eopt_transaction_example.js
```