import React from "react";
import ReactDOM from "react-dom";
import { xdai, dai, eth } from "@burner-wallet/assets";
import BurnerCore from "@burner-wallet/core";
import { InjectedSigner, LocalSigner } from "@burner-wallet/core/signers";
import {
  InfuraGateway,
  InjectedGateway,
  XDaiGateway
} from "@burner-wallet/core/gateways";
import Exchange, { Uniswap, XDaiBridge } from "@burner-wallet/exchange";
import ModernUI from "@burner-wallet/modern-ui";
import UnstoppableDomainsPlugin from "@unstoppabledomains/burner-plugin-domains";
import UnstoppableResolutionPlugin from "@unstoppabledomains/burner-plugin-resolution";

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [new InjectedGateway(), new InfuraGateway(), new XDaiGateway()],
  assets: [xdai, dai, eth]
});

const exchange = new Exchange({
  pairs: [new XDaiBridge(), new Uniswap("dai")]
});

const BurnerWallet = () => (
  <ModernUI
    title="Basic Wallet"
    core={core}
    plugins={[
      exchange,
      new UnstoppableDomainsPlugin(),
      new UnstoppableResolutionPlugin("461b1ad7096c4dbbaf4dc81944ecb4d1")
    ]}
  />
);

ReactDOM.render(<BurnerWallet />, document.getElementById("root"));
