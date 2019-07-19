# Read Me -- Structured Trade Finance
## Introduction

The Structured Trade Finance application demonstrates a simplified example of creating a chain of participants between a Manufacturer and its Tier-1, Tier-2, and Tier-3 subcontractors. An External Auditor participant is created so Participants can request external certification for the supply chain (e.g. for Fairtrade, sustainability reporting, etc.). Subcontractors can request trade finance from a Bank with increased transparency because they can demonstrate their chain of partners and orders.    

## Getting Started

### Installing

#### Prerequisites

Be sure you have the following installed:
* DAML SDK
* Docker

### Starting the App
There are two options:

#### Option 1: Start App with Docker

1. Execute:
```
daml build
```
2.  Type:
```
docker-compose up --build
```
3.  Open UI in a new browser tab with http://localhost:7500.

#### Option 2: Start App in Stand-Alone Mode

1. Start the Sandbox with Navigator and with the DAR deployed.
```
daml start
```

2. Open UI in a new browser tab with http://localhost:7500.

Disclaimer: "localhost" which the application is run on should not have a web facing ip address assigned to it.

### Stopping the App

#### Stopping Dockerized Run
1.  Close the browser tab.
2.  Stop the Docker containers or bots by pressing **Ctrl+C**.

#### Stopping Stand-Alone Run

1. Use **CTRL+C** to stop Sandbox and Navigator.

### Resetting the Prototype

Reset the application by following these steps:

**1.** Stop the App by following the steps in Stopping the App section.

**2.** Start the App by following the steps in Starting the App section.

## This Guide

This User Guide will take you step-by-step through the whole stuctured trade finance process of creating a simplified supply chain between participants, requesting a certification from an external auditor entity for the supply chain, creating orders between a manufacturer and its multiple tier subcontractors, and finally, a subcontractor asking for trade finance from a bank and being able to present an immutable audit trail of its order history.

After working through these steps, you can use the Navigator interface to explore other paths and options that are available in the application.

_**Note:** This demo is designed to show successful conclusion of the structured trade finance workflow without exceptions or error conditions. A full production implementation would include additional features, handle errors and exceptions, and incorporate appropriate security controls._

## Workflow

**Roles and Responsibilities**


<table>
  <tr>
   <td><strong>Role</strong>
   </td>
   <td><strong>Responsibility</strong>
   </td>
  </tr>
  <tr>
   <td>Manufactuer
   </td>
   <td>Manufacturer of goods.
<p>
Example participant in application: Manufacturer
   </td>
  </tr>
  <tr>
   <td>Subcontractor
   </td>
   <td>Provides delivery of particular goods requested by the Manufacturer or other Subcontractor.
<p>
Example participant in application: SubContractor1, SubContractor2, SubContractor3
   </td>
  </tr>
  <tr>
   <td>Bank
   </td>
   <td>An institution providing structured trade financing service to Subcontractors.
<p>
Example participant in application: Bank
   </td>
  </tr>
  <tr>
   <td>External Auditor
   </td>
   <td>An external auditor entity that performs certain audits and grants certification.
<p>
Example participant in application: ExternalAuditor
   </td>
  </tr>
</table>


The Structured Trade Finance application includes the following steps:

1. **Market setup**: The application starts with an automated market set-up process. Participants and their roles are created, and relationships are set up.
2. **Onboard participants to supply-chain:** The Manufacturer onboards its Tier-1 Subcontractor to start the simplified supply-chain. Subcontractors invite their own Sub-contractors to create an end-to-end supply chain.
3. **Certify participant supply-chain:** Manufacturer can request an External Auditor to certify the participant supply-chain.  
4. **Create fulfillment request**: Manufacturer can request fulfillment for an order from the Tier-1 Subcontractor. Subcontractors can request fulfillment from their own subcontractors.
5. **Request trade finance**: Subcontractors can request trade finance from a Bank by presenting the original contract details and a verified, immutable upstream audit trail from the originating order. (E.g.: Tier-3 Subcontractor can request trade financing from Bank by presenting a given order coming from a Tier-2 Subcontractor, along with the trail of the given order all the way to the Tier-1 Subcontractor and the originating order from the Manufacturer).
6. **Approve loan request with amount**: Bank can review its loan requests, approve them, and specify amount for loan (full requested amount or less).

## Running the Application

### Choosing and Changing Roles

To log in:

*   On the home screen, select the party from the list.

To switch users:

1. Click the name of the current party at the top of the screen.
2. On the home screen, select a different party.

### Onboarding Participants to Supply-Chain
The Manufacturer starts the process by onboarding its Tier-1 Subcontractor. Subcontractors then invite their own subcontractors to create a full chain. The application goes to Tier-3 level, but any number of subcontractors could be onboarded.

#### Onboarding SubContractor1 to Supply-Chain:
1. Log in as Manufacturer.
2. Choose the **Invite subc.|Request fulf.** tab.
3. Click on the Manufacturer's **role** contract.
4. Select the **CreateOnboardingInvitation** choice.
5. Type in the onboarding parameters:
    *   Name of sub-contractor: SubContractor1

    _**Note:** By clicking on the **Onboarding invitations** tab, the Manufacturer can see the new onboarding invitation request to SubContractor1._
    
6. Log in as SubContractor1.
7. Choose the **Onboarding invitations** tab.
8. Click on the **Onboarding invitation** contract.
9. Select the **AcceptInvitation** choice.

   _**Note:** By clicking on the Contractual relationships tab, SubContractor1 can see the established contractual relationship between Manufacturer and SubContractor1._

#### Onboarding SubContractor2 to Supply-Chain:
1. Log in as SubContractor1.
2. Choose the **Contractual relationships** tab.
3. Click on the **Contractaul relationships** contract.
4. Select the **OnboardSubcontractor** choice.
5. Type in the onboarding parameters:
    *   Name of sub-contractor: SubContractor2   

   _**Note:** By clicking on the **Onboarding invitations** tab, SubContractor1 can see the new onboarding invitation request to     SubContractor2._

6. Log in as SubContractor2.
7. Choose the **Onboarding invitations** tab.
8. Click on the **Onboarding invitation** contract.
9. Select the **AcceptInvitation** choice.

   _**Note:** By clicking on the **Contractual relationships** tab, SubContractor2 can see the established contractual relationship between Manufacturer, SubContractor1, and SubContractor2._

#### Onboarding SubContractor3 to Supply-Chain:
1. Log in as SubContractor2.
2. Choose the **Contractual relationships** tab.
3. Click on the **Contractaul relationships** contract.
4. Select the **OnboardSubcontractor** choice.
5. Type in the onboarding parameters:
    *   Name of sub-contractor: SubContractor3 

   _**Note:** By clicking on the **Onboarding invitations** tab, SubContractor2 can see the new onboarding invitation request to     SubContractor3._

6. Log in as SubContractor3.
7. Choose the **Onboarding invitations** tab.
8. Click on the **Onboarding invitation** contract.
9. Select the **AcceptInvitation** choice.

   _**Note:** By clicking on the **Contractual relationships** tab, SubContractor2 can see the established contractual relationship between Manufacturer, SubContractor1, SubContractor2, and SubContractor3._

### Supply-Chain Certification
The Manufacturer starts the process by requesting certification from an External Auditor for selected subcontractors. External Auditor receives certification request, performs necessary due diligence off ledger, and approves certification on ledger.

#### Manufacturer requests certification from ExternalAuditor:
1. Log in as Manufacturer.
2. Choose the **Contractual relationships** tab.
3. Click on the **Contractaul relationships** contract.
4. Select the **RequestCertification** choice.
5. Type in name of External Auditor: ExternalAuditor

#### Approve certification request:
1. Log in as ExternalAuditor.
2. Choose the **Certification requests** tab.
3. Click on the **Certification request** contract.
4. Select the **Certify** choice.

   _**Note:** Manufacturer and Sub-contractors can see the request for certification in their Certification Requests tab. Once the certification has been approved by the External Auditor, the Manufacturer and Subcontractors can see the certification approval in their Certification Approvals tab._

### Create Fulfillment Requests
The Manufacturer starts the process by requesting fulfillment from its Tier-1 Subcontractor, SubContractor1. SubContractor1 can accept the request and create a related fulfullment request to its own Subcontractor, SubContractor2. The process continues all the way down to the supply-chain.

#### Manufacturer request fulfillment from SubContractor1:
1. Log in as Manufacturer.
2. Choose the **Invite subc.|Request fulf.** tab.
3. Click on the Manufacturer's **role** contract.
4. Select the **CreateFulfillmentRequest** choice.
5. Type in the FulfillmentRequest parameters:
    *  Subcontractor: SubContractor1
    *  Fulfillment ID: arbitrary name/number (e.g. 0001)
    *  Product ID: arbitrary product name (e.g. Car engine)
    *  Quantity: arbitrary number (e.g. 1000)
    *  Unit price: arbitrary number (e.g. 5000)
    *  Contractual relationship ID: Contract ID created through the onboarding of supply-chain participants. (Go to **Contractual relationships** tab and copy contract number. E.g. #10:1)
6. Log in as SubContractor1.
7. Choose the **Fulfillment Requests** tab.
8. Click on the new **Fulfillment request** contract.
9. Select the **Accept** choice.
10. Click on the **Orders** tab and view new order created from the accepted Fulfillment request.

#### SubContractor1 creates fulfillment request to SubContractor2:
1. Log in as SubContractor1.
2. Choose the **Orders** tab.
3. Click on the **order** contract.
4. Select the **Subcontract** choice.
5. Type in the Subcontract parameters:
    *  New Subcontractor: SubContractor2
    *  Product ID: arbitrary product name (e.g. Cylinder)
    *  Quantity: arbitrary number (e.g. 1000)
    *  Unit price: arbitrary number (e.g. 1000)
6. Log in as SubContractor2.
7. Choose the **Fulfillment Requests** tab.
8. Click on the new **Fulfillment request** contract.
9. Select the **Accept** choice.
10. Click on the **Orders** tab and view the new order created from the accpted Fulfillment request.

#### SubContractor2 creates fulfillment request to SubContractor3:
1. Log in as SubContractor2.
2. Choose the **Orders** tab.
3. Click on the **order** contract.
4. Select the **Subcontract** choice.
5. Type in the Subcontract parameters:
    *  New Subcontractor: SubContractor3
    *  Product ID: arbitrary product name (e.g. Connecting Rod)
    *  Quantity: arbitrary number (e.g. 1000)
    *  Unit price: arbitrary number (e.g. 100)
6. Log in as SubContractor3.
7. Choose the **Fulfillment Requests** tab.
8. Click on the new **Fulfillment request** contract.
9. Select the **Accept** choice.
10. Click on the **Orders** tab and view the new order created from the accpted Fulfillment request.

### Initialize Trade Finance request (Loan Request)
SubContractor3 needs financing to be able to meet its order from SubContractor2. To increase the chances of getting a loan from Bank, SubContractor3 will present the audit trail of the received order from SubContractor2. On the Order, it is transparent that the original requestor for a complete product is a well-known, Manufacturer -- the top of the chain.

#### SubContractor3 request loan from Bank:
1. Log in as SubContractor3.
2. Choose the **Orders** tab.
3. Click on the **order** contract.
4. Select the **RequestLoan** choice.
5. Type in the Subcontract parameters:
     *  Financier: Bank
     *  Requested amount: arbitrary number (e.g.: 1000000)
     *  Currency: currency code (e.g. USD)
6. Choose **submit.**

#### Bank reviews and approves loan request:
1. Log in as Bank.
2. Choose the **Loan Requests** tab.
3. Click on the **Loan request** contract.
4. Select the **ApproveLoan** choice.
5. Type in approved amount: e.g.: 800000
6. Choose **submit.**

_**Note:** Once Bank has approved the Loan Request, it appears in the Approved Loans tab of Bank and SubContractor3._


© 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
