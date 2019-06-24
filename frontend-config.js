/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { DamlLfValue } from '@da/ui-core';

export const version = {
    schema: 'navigator-config',
    major: 2,
    minor: 0
};

export function theme(userId, party, role) {
    return { documentBackground: intToRGB(hashCode(party)) }
};

// --- Creating views --------------------------------------------------------------------

const loanRequestsView = createTab("Loan Requests", ":LoanRequest@", [
    createIdCol(),
    createCol("requestor", "Requestor"),
    createCol("contractors", "Contractors"),
    createCol("financier", "Financier"),
    createCol("requestedAmount", "Requested amount"),
    createCol("currency", "Currency")
]);

const loanApprovalsView = createTab("Approved Loans", ":LoanApproval@", [
    createIdCol(),
    createCol("requestor", "Requestor"),
    createCol("financier", "Financier"),
    createCol("approvedAmount", "Approved amount"),
    createCol("currency", "Currency")
]);

const loanRejectionsView = createTab("Rejected Loans", ":LoanRejection@", [
    createIdCol(),
    createCol("requestor", "Requestor"),
    createCol("financier", "Financier"),
    createCol("rejectionReason", "Reason of rejection")
]);

// -------------------------

const certificationRequestsView = createTab("Certification Requests", ":CertificationRequest@", [
    createIdCol(),
    createCol("requestor", "Requestor"),
    createCol("certifier", "Certifier"),
    createCol("organisationsToCertify", "Organizations to certify")
]);

const certificationApprovalsView = createTab("Certification Approvals", ":CertificationApproval@", [
    createIdCol(),
    createCol("requestor", "Requestor"),
    createCol("certifier", "Certifier"),
    createCol("organisationsCertified", "Certified organizations")
]);

// -------------------------

const contractorRoleView = createTab("Invite subc. | Request fulf.", ":ContractorRole@", [
    createIdCol(),
    createCol("contractor", "Contractor name")
]);

const onboardingInvitationsView = createTab("Onboarding invitations", ":OnboardingInvitation@", [
    createIdCol(),
    createCol("contractors", "Invitation from Contractors"),
    createCol("subcontractor", "Invitation for Subcontractor")
]);

const contractualRelationshipsView = createTab("Contractual relationships", ":ContractualRelationship@", [
    createIdCol(),
    createCol("contractors", "Contractors in relationship")
]);

const fulfillmentRequestsView = createTab("Fulfillment requests", ":FulfillmentRequest@", [
    createIdCol(),
    createCol("requestor", "Requestor"),
    createCol("subcontractor", "Requested from Subcontractor"),
    createCol("contractors", "Contractors"),
    createCol("relationshipCid", "Relationship contract ID")
]);

const ordersView = createTab("Orders", ":Order@", [
    createIdCol(),
    createCol("requestor", "Requestor"),
    createCol("subcontractor", "Subcontractor"),

    createCol("orderDetails", "Fulfillment ID", null, r => r.orderDetails.fulfillmentId),
    createCol("orderDetails", "Product ID", null, r => r.orderDetails.productId),
    createCol("orderDetails", "Quantity", null, r => r.orderDetails.quantity),
    createCol("orderDetails", "Unit price", null, r => r.orderDetails.unitPrice),

    createCol("contractors", "Contractors"),
    createCol("relationshipCid", "Relationship contract ID")
]);

// --- Assigning views to parties --------------------------------------------------------------------

export const customViews = (userId, party, role) => {
    // Financier
    if (party == 'Bank' || party == 'Financier') {
        return {
            loanRequestsView,
            loanApprovalsView,
            loanRejectionsView,
        };
    }

    // Certifier
    if (party == 'ExternalAuditor' || party == 'Certifier') {
        return {
            certificationRequestsView,
            certificationApprovalsView,
        };
    }

    // Contractor
    if (['Manufacturer', 'SubContractor1', 'SubContractor2', 'SubContractor3', 'SubContractor4'].indexOf(party) >= 0) {
        return {
            contractorRoleView,
            // -------------
            onboardingInvitationsView,
            contractualRelationshipsView,
            fulfillmentRequestsView,
            ordersView,
            // Loans
            loanRequestsView,
            loanApprovalsView,
            loanRejectionsView,
            // Certifications
            certificationRequestsView,
            certificationApprovalsView,
        };
    }
};


// --- Helpers --------------------------------------------------------------------

/**
 title, width and proj are optional

 if proj is null and key is "id" then it will default to the contract id
 if proj is null and key is not "id" then it will default to stringified single or array value of rowData.key
*/
function createCol(key, title = toTitle(key), width = 80, proj) {
    return {
        key: key,
        title: title,
        createCell: ({ rowData }) => ({
            type: "text",
            value: valueFunction(rowData, key, proj)
        }),
        sortable: true,
        width: width,
        weight: 0,
        alignment: "left"
    };
}

function createIdCol() {
    return createCol("id", "Contract ID", 60);
}

function createTab(name, templateId, columns, additionalFilter) {
    var filter;
    if (additionalFilter == null) {
        filter =
        [
            {
                field: "template.id",
                value: templateId
            }
        ]
    } else {
        filter =
        [
            {
                field: "template.id",
                value: templateId
            },
            additionalFilter
        ]
    }
    return {
        type: "table-view",
        title: name,
        source: {
            type: "contracts",
            filter: filter,
            search: "",
            sort: [
                {
                    field: "id",
                    direction: "ASCENDING"
                }
            ]
        },
        columns: columns
    };
}


function formatIfNum(val) {
    var n = Number(val);
    if (Number.isNaN(n)) return val;
    else return n.toLocaleString();
}

function valueFunction(rowData, key, proj) {
    return (
        proj == null
        ?
        (
            Array.isArray(DamlLfValue.toJSON(rowData.argument)[key])
            ?
            DamlLfValue.toJSON(rowData.argument)[key].join(", ")
            :
            (
                key == "id"
                ?
                rowData.id
                :
                formatIfNum(DamlLfValue.toJSON(rowData.argument)[key])
            )
        )
        :
        formatIfNum(proj(DamlLfValue.toJSON(rowData.argument))));
}

// inserts spaces into the usually camel-case key
// e.g. "assetISINCode" -> "Asset ISIN Code"
function toTitle(key) {
    var spaced = key.replace(/([^A-Z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][^A-Z])/g, '$1 $2');
    return spaced[0].toUpperCase() + spaced.substr(1)
}

function getObjectProp1(o) {
    return Object.keys(o)[0];
}

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return 80 * hash;
}

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#" + "00000".substring(0, 6 - c.length) + c;
}