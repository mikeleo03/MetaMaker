<br>
<div align="center">
    <div >
        <img height="100px" src="./img/logo2.png" alt="MetaMaker Logo"/>
    </div>
    <div>
            <h3><b>MetaMaker</b></h3>
            <p><i>A blockchain platform for collaborative game creation, governance, and ownership.</i></p>
    </div>      
</div>
<br>
<h1 align="center">MetaMaker</h1>

![MetaMaker](./img/banner.png)

MetaMaker is a blockchain-based decentralized game development platform that allows players and developers to collaboratively create, govern, and own in-game assets and features. This platform would use blockchain to ensure transparent decision-making, reward contributions, and secure ownership of game elements.

## 📝 Table of Contents
- [General Information](#general-information)
- [Tech Stacks and Platforms](#tech-stacks-and-platforms)
- [High Level Design](#high-level-design)
- [Pages and Features](#pages-and-features)
- [How to Run](#how-to-run)
- [Report and Demo](#report-and-demo)
- [Assets](#assets)
- [Contributors](#contributors)

## 📢 General Information

<blockquote align='center'>
<h3>Refining Collaborative Application Development with Blockchain</h3>
</blockquote> 

Collaborative application development has become increasingly accessible, particularly with the rise of open-source platforms. These platforms allow anyone to modify an application to meet specific needs. If a modification proves valuable to a broader user base, the original developers can integrate it into the official version of the open-source application.  

However, this open-source model still faces several challenges:  
1. **Selection Process**: Determining which modifications to include in the official codebase can be subjective and time-consuming.  
2. **Component Tracking**: Ensuring transparency and traceability of open-source components in the codebase.  
3. **Workflow Automation**: Accelerating integration processes to enhance efficiency.  

To address these challenges, we propose a **blockchain-based fully public development method**. This method enables anyone to suggest program modifications by submitting them to the blockchain as a linked file (e.g., Google Drive link). Public voting will evaluate these proposals, with the highest-voted modification automatically integrated into the main codebase after a defined voting period.  

This blockchain-powered system offers:  
- Transparent decision-making through public voting.  
- Automated integration of top-voted modifications.  
- Enhanced traceability and accountability for submitted changes.  

Initially, this method is designed for blockchain-based game development, aiming to revolutionize how games are collaboratively developed, governed, and owned by communities.

## 👨🏻‍💻 Tech Stacks and Platforms
<div align="center">
<a href="https://react.dev/">
<kbd>
<img src="./img/logo/react.png" height="60" />
</kbd>
</a>

<a href="https://www.typescriptlang.org/">
<kbd>
<img src="./img/logo/ts.png" height="60" />
</kbd>
</a>

<a href="https://tailwindcss.com/">
<kbd>
<img src="./img/logo/tailwind.png" height="60" />
</kbd>
</a>

<a href="https://ui.shadcn.com/">
<kbd>
<img src="./img/logo/ShadcnUI.png" height="60" />
</kbd>
</a>

<a href="https://expressjs.com/">
<kbd>
<img src="./img/logo/express.png" height="60" />
</kbd>
</a>

<a href="https://nodejs.org/en">
<kbd>
<img src="./img/logo/nodejs.png" height="60" />
</kbd>
</a>

<kbd>
<img src="./img/logo/drive.png" height="60" />
</kbd>

<kbd>
<img src="./img/logo/github.png" height="60" />
</kbd>

<kbd>
<img src="./img/logo/solana.png" height="60" />
</kbd>

<kbd>
<img src="./img/logo/ethereum.png" height="60" />
</kbd>

<kbd>
<img src="./img/logo/metamask.png" height="60" />
</kbd>

<kbd>
<img src="./img/logo/ganache.png" height="60" />
</kbd>

<kbd>
<img src="./img/logo/oracle.png" height="60" />
</kbd>

</div>
<div align="center">
<h4>React | Typescript  | TailwindCSS | ShadcnUI | Express | NodeJS | Google Drive API | Github API | Solana | Ethereum | MetaMask | Ganache | Oracle</h4>
</div>
<br>

## 🏗️ High Level Design
![MetaMaker](./img/systemArch.png)

MetaMaker's system consists of three main components: **Frontend (FE)**, **Backend/Oracle**, and **Smart Contract (SC)**.  

1. **Frontend (FE)**:  
   - Users can connect their wallets directly without involving the Backend.  
   - Users can view asset data by requesting information from the Backend, which retrieves it from the Smart Contract.  
   - To vote, users submit their votes via the Frontend, which sends them to the Smart Contract through the Backend/Oracle.  
   - After the voting period ends, the Frontend calls the Backend to execute the *declare winner* function on the Smart Contract and displays the results.  

2. **Backend/Oracle**:  
   - Acts as a bridge between external sources (e.g., Google Drive) and the Smart Contract.  
   - For asset submissions, the Backend uploads temporary files to Google Drive and stores the file link on the blockchain via the Smart Contract.  
   - The Backend also forwards user votes to the Smart Contract, retrieves voting results, and uploads the winning asset to a GitHub repository.  

3. **Smart Contract (SC)**:  
   - Stores asset data and voting results.  
   - Provides functions to view assets, cast votes, and declare the winner (*declare winner*).  
   - Serves as the central logic layer for interactions with the Frontend and Backend.  

This architecture ensures a transparent, secure, and decentralized workflow from asset submission to winner declaration.

## ⭐ Pages and Features
Here's MetaMaker's features and its interface.
<table style="width:100%; text-align:center;">
    <col width="49%">
    <col width="49%">
    <tr>
        <td width="1%" align="center"><img src="./img/features/home.png"/></td>
        <td width="1%" align="center"><img src="./img/features/about.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Home</td>
        <td width="1%" align="center">About</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img src="./img/features/propose1.png"/></td>
        <td width="1%" align="center"><img src="./img/features/propose2.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Proposing Game Asset (1)</td>
        <td width="1%" align="center">Proposing Game Asset (2)</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img src="./img/features/vote1.png"/></td>
        <td width="1%" align="center"><img src="./img/features/announce.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Vote Asset</td>
        <td width="1%" align="center">Winner Announcement</td>
    </tr>
    <tr>
        <td width="1%" align="center"><img src="./img/features/state.png"/></td>
        <td width="1%" align="center"><img src="./img/features/decoration.png"/></td>
    </tr>
    <tr>
        <td width="1%" align="center">Patch State Management</td>
        <td width="1%" align="center">Some Decoration :D</td>
    </tr>
</table>

## ⚙️ How to Run
### General Project
1. **Clone the repository** from the terminal using the following command:
    ```bash
    $ git clone https://github.com/mikeleo03/MetaMaker.git
    ```
2. **Go to the each directory** one by one (frontend, backend, dApp), by using this command:
    ```bash
    $ cd <dir>
    ```
    Using 3 different terminals is recommended.

### Frontend Project
1. **Install all the required dependencies** using this following command in the project frontend directory
   ```bash
   $ npm install
   ```
2. **Run the frontend** using this following command
   ```bash
   $ npm run dev
   ```
3. The MetaMaker frontend should now be running. You can check the server by opening [http://localhost:3000](http://localhost:3000) in your web browser.

### Backend Project
1. **Install all the required dependencies** using this following command in the project backend directory
   ```bash
   $ npm install
   ```
2. **Create a `.env` file** inside the repository directory using the `env.example` file as the template.
3. **Run the server** using the following command. Make sure you have Docker Desktop installed on your device:
    ```bash
    $ npm run dev
    ```
4. The MetaMaker backend server should now be running. You can check the server by opening [http://localhost:5000](http://localhost:5000) in your web browser.

### dApp Project
1. Ensure that Ganache is installed on your device. For more information, visit [this link](https://archive.trufflesuite.com/ganache/).
2. **Build the smart contract** using this following command
   ```bash
   $ truffle build
   ```
3. **Deploy the smart contract on private chain** using this following command
   ```bash
   $ truffle deploy
   ```
3. Finally, do migration using this command
   ```bash
   $ migrate
   ```
4. The MetaMaker dApp should now be running on [http://127.0.0.1:7545](http://127.0.0.1:7545).

## 📌 Report and Demo
Access the **Project Report**:  [Project Report Link](/docs/Project%20Report%20Blockchain%20-%20MetaMaker.pdf)

Watch the **Video Demo**: [Video Demo Link](https://youtu.be/aDZGzmtYYbQ)

## 📂 Assets
Access the MetaMaker **Google Drive Assets**: [View Google Drive Assets](https://drive.google.com/drive/folders/1YkGAarrMd2N2Mq3jw0PHrRc9eqUql9Fj)

Explore the **GitHub Repository Assets**: [View GitHub Repository](https://github.com/Salomo309/Game-Assets)

## 👏 Contributors
|SID|Contributor|
| :---: | --- |
| 13521063 | Salomo Reinhart Gregory Manalu  |
| 13521108 | Michael Leon Putra Widhi  |
| 13521172 | Nathan Tenka |
