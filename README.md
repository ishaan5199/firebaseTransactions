# firebaseTransactions
> working with firebase and reactjs for assignment (Teevro Internship) 


## Requirements  (Prerequisites)
Tools and packages required to successfully install this project.
* node.js
* firebase account

## Installation
A step by step list of commands / guide that informs how to install an instance of this project. 

For Windows

`git clone https://github.com/ishaan5199/firebaseTransactions.git`

`cd basicAuth`

`npm i`


## Usage

1. Create an account (or login if you have one)
![2022-01-10 (1)](https://user-images.githubusercontent.com/78961353/148811796-1c07e316-5fac-477a-b2d6-6b56165eba31.png)

3. Upload a csv file containing 3 headers -> Date, Transaction ID, Amount and some related data rows
![2022-01-10 (2)](https://user-images.githubusercontent.com/78961353/148811857-a898efc0-4714-492f-a5fb-1e1f15193506.png)

4. Click Add
5. Approve or Reject each Transaction and click apply changes to see summary of all transactions of a particular user
![2022-01-10 (10)](https://user-images.githubusercontent.com/78961353/148811937-fd297765-aa1f-43a4-9477-d3439488a28a.png)<br><br>
![2022-01-10 (11)](https://user-images.githubusercontent.com/78961353/148811975-bae180a4-9978-46f1-a0e2-ca2cf859992e.png)

Data being stored on firestore
![2022-01-10 (12)](https://user-images.githubusercontent.com/78961353/148812038-7f228c12-9d25-4215-9cf1-a716872451b5.png)


## Tech Stack / Built With
1. ReactJS - bootstrapped with `create-react-app`
2. Authentication via Firebase Auth and Firestore database for storing transaction info

## Reason for using the above tech stack
ReactJS - Makes the process of creating a single-app website much easier, coupled with great routing features as well as the plethora of packages available via npm. Proper code splitting via components helps us to reuse them in multiple locations without including the same code in multiple places. High Level of compatibility with various tech stacks.

Firebase - Makes user authentication easier and provides a list of methods for authenticating a user like email signin, google signin etc.. out of the box. Also has 2 database applications Firestore and Realtime Database, I used Firestore as the amount of data to be stored was less and only required simple queries. Has various other features including working with Google Cloud Platform directly.

## Authors
Ishaan Mahesh
 
 You can find me here at:
[LinkedIn](https://www.linkedin.com/in/ishaan-mahesh/)
