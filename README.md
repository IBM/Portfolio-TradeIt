# Place trades through your online broker via simple API calls

Nobody likes losing money in the market. Investors want to be informed at all times of the current state of the market, and need to be ready to make trades at a moment’s notice. Imagine you are a financial institution that wants to provide its client base with the capability to trade stocks, exchange-traded funds, and currencies without having the need to leave their platform and manage relationships with external brokerage firms. To achieve this, you need a way to securely integrate with online brokers for your users and allow them to make trades directly and seamlessly with their connected accounts. TradeIt enables these capabilities by providing an API infrastructure that links retail investors and financial institutions with online financial brokers.

This code pattern shows you how to create a web application built on Node.js that integrates with the [TradeIt](https://www.trade.it/) APIs to give users an end-to-end way of making trades (buying or selling securities) against a mock brokerage. The application showcases the workflow of a customer authenticating themselves against this mock broker, and placing trades through them securely. After selecting the specific options for the trade, the user is returned a summary of a trade ticket to review, and receives the order number and confirmation of the trade.

This code pattern is for developers who want to start building applications with TradeIt integration. When you have completed this code pattern, you will understand how to:

* Build a Node.js web application that's integrated with the [Trade.it](https://www.trade.it/) SDK 
* Store user authentication sessions to allow for multiple trades while signed in.
* Issue multiple trades based on portfolio optimization results 

# Architecture flow

![Architecture flow](docs/doc-images/arch-flow.png?raw=true)

1. The user enters the web app and selects a broker from the available integrations.
1. The user enters their credentials to link with the broker.
1. The user selects their account for transactions and proceeds to the trading ticket. They fill in information regarding the trade to be made, like the ticker name, stock quantity, and whether the trade is a buy or a sell.
1. The user reviews the details of the trade and confirms the trade.
1. The trade details are sent to the broker and a confirmation code is returned to the user.
1. The user can proceed to make another trade which takes them back to the trading ticket.
1. The user can securely log out of their session with the broker and go back to the homepage.

# Included components

+ [TradeIt](https://www.trade.it/)is the API infrastructure that links retail investors and app developers with any online financial broker.
+ [Investment Portfolio](https://console.ng.bluemix.net/catalog/services/investment-portfolio) is the service that lets you store, update, and query your investment portfolios and associated holdings using flexible object definitions.
> The Investment Portfolio service is available for free on [IBM Cloud](https://console.bluemix.net).

## Featured technologies

* [Nodejs](https://www.nodejs.org/) is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side.
* [JQuery](https://www.jquery.com) is a cross-platform JavaScript library that's designed to simplify the client-side scripting of HTML.

# Running the application

## Manually deploy to local machine
1. [Set up your machine](#1-setup-your-machine)
2. [Clone the repository](#2-clone-the-repository)
3. [Create the Investment Portfolio service](#3-create-investment-portfolio-service)
4. [Configure the .env file](#4-configure-env-file)
5. [Create the TradeIt service](#5-create-tradeit-service)
6. [Run the application with NPM](#6-run-application-with-npm)

### 1. Set up your machine

- [npm](https://www.npmjs.com/)  (v5.x)
- [Node](https://nodejs.org/en/) (version 8.9 or higher - note, version 9 is not supported)
* To install a specific Node version, you can use [nvm](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html).

  Example:
  + 1. `nvm install --lts`
  + 2. `nvm use --lts`
  + 3. Output `Now using node v8.11.3 (npm v5.6.0)`

### 2. Clone the repository

```
git clone https://github.com/ash7594/NodeSampleApp.git
```

## 3. Create the Investment Portfolio service

Create the following services in IBM Cloud. This service is part of `Free` plan.

* [**Investment Portfolio**](https://console.ng.bluemix.net/catalog/services/investment-portfolio)


## 4. Configure the .env file

Create a `.env` file in the root directory of your clone of the project repository by copying the sample `.env.example` file using the following command in the terminal:

  ```none
  cp .env.example .env
  ```

> Most files systems regard files with a "." at the front as hidden files.  If you are on a Windows system, you should be able to use either [GitBash](https://git-for-windows.github.io/) or [Xcopy](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/xcopy).

You will need to update the credentials with the IBM Cloud credentials for the services you created in [Step 2](#2-create-investment-portfolio-service).

The `.env` file will look something like the following:

```none
# Investment Portfolio
CRED_PORTFOLIO_USERID_W=
CRED_PORTFOLIO_PWD_W=
CRED_PORTFOLIO_USERID_R=
CRED_PORTFOLIO_PWD_R=

```

### 5. Create the TradeIt service

Go to the [TradeIt website](https://www.trade.it/) and create an account with them.

Take note of the API key and base URL for your account and modify the same in the codebase.

### 6. Run the application with NPM

```
$ npm install --save
$ npm start
```

Access the running app in a browser at <http://0.0.0.0:8080/>.

# License

This code pattern is licensed under the Apache Software License, Version 2.  Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](http://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](http://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
