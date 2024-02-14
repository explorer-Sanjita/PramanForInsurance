// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// OpenZeppelin contracts for basic functionality
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";

// IPFS library for demonstration purposes
//import "./IPFSStorage.sol";

contract InsuranceContract is Ownable {
    using SafeCast for uint256;

    // Define a structure to represent a document
    struct Document {
        uint256 indexNumber; // Unique identifier for each document within a client's array
        address InsuranceFirm;
        address clientAddress;
        string documentHash;  // IPFS hash of the document
        uint256 timestamp;
        bool isValid;
        uint256[] traceabilityIndexes;  // Array of traceability indexes
    }

    // Define a structure to represent traceability information
    struct Traceability {
        address user;
        uint256 timestamp;
        string reason;
        bool success; // Whether the access attempt was successful
    }
    struct documentGenerated {
        address insuranceCompany;
        address intendedClient;
        uint256 Index;
    }

    //broker Dashboard info
    mapping(address => documentGenerated[]) private broker;

    // Mapping to store documents associated with each client
    mapping(address => Document[]) private clientDocuments;

    // Mapping to store access control for each document
    mapping(address => mapping(uint256 => mapping(address => bool))) private documentAccessControl;

    // Mapping to track which insurance company shared documents with which clients
    mapping(address => mapping(address => bool)) private sharedDocuments;

    // Mapping to track client access rights
    mapping(address => mapping(address => bool)) private clientAccessRights;

    // Mapping to store traceability for each document access attempt
    mapping(address => mapping(uint256 => Traceability[])) private documentTraceability;

    // Events for traceability
    event DocumentAccessed(address indexed user, address indexed documentOwner, uint256 timestamp, string reason, string documentHash, bool success);

    //Event emitting info, which insurance firm has generated what document for a respective client!
    event DocumentGenerated(address indexed InsuranceFirm, address indexed clientAddress, uint256 Index); 

    // Modifiers for access control
    modifier onlyBroker() {
        require(msg.sender == owner(), "Only the broker can call this function");
        _;
    }

    modifier onlyDocumentOwner(address clientAddress) {
        require(msg.sender == clientAddress, "Not authorized");
        _;
    }

    modifier onlyDocumentOwnerOrAuthorized(address clientAddress) {
        require(msg.sender == owner() || msg.sender == clientAddress || clientAccessRights[clientAddress][msg.sender], "Not authorized");
        _;
    }

    // Function to submit a document to IPFS and store details on the blockchain
    function submitDocument(address insuranceCompany, address clientAddress, string memory documentHash) external onlyDocumentOwner(insuranceCompany) {
        //require(sharedDocuments[insuranceCompany][clientAddress] == false, "Access already granted");
        uint256 timestamp = block.timestamp;
        uint256 indexNumber = clientDocuments[msg.sender].length; // Unique identifier for each document
        Document memory newDocument = Document(indexNumber, insuranceCompany, clientAddress, documentHash, timestamp, true, new uint256[](0));
        clientDocuments[msg.sender].push(newDocument);
        // Mark that the insurance company has shared documents with this client
        sharedDocuments[insuranceCompany][clientAddress] = true;
        // Grant access to the client
        clientAccessRights[insuranceCompany][clientAddress] = true;
        documentTraceability[msg.sender][indexNumber].push(Traceability(msg.sender, block.timestamp, "Insurance Firm Generates Insurance Claim for clIENT!", true));
        documentGenerated memory newDoc = documentGenerated(insuranceCompany, clientAddress, indexNumber);
        broker[owner()].push(newDoc);
        emit DocumentGenerated(insuranceCompany, clientAddress, indexNumber);
    }

    // Function to set access control for a document
    function setAccessControl(address InsuranceFirm, uint256 index, address user, bool hasAccess) external onlyBroker {
        require(index < clientDocuments[InsuranceFirm].length, "Invalid index");

        // Only the document owner can set access control
        //require(msg.sender == clientDocuments[InsuranceFirm][index].clientAddress, "Not authorized to set access control");

        // Set access control
        documentAccessControl[InsuranceFirm][index][user] = hasAccess;
        documentTraceability[InsuranceFirm][index].push(Traceability(msg.sender, block.timestamp, "Broker Giving Document Access to Respective Client!", true));
    }

    // Function to get access control for a document
    function getAccessControl(address InsuranceFirm, uint256 index, address user) external view onlyDocumentOwnerOrAuthorized(InsuranceFirm) returns (bool) {
        require(index < clientDocuments[InsuranceFirm].length, "Invalid index");

        // Only the document owner or authorized users can get access control
        require(msg.sender == clientDocuments[InsuranceFirm][index].clientAddress || clientAccessRights[InsuranceFirm][msg.sender], "Not authorized to get access control");

        // Get access control
        return documentAccessControl[InsuranceFirm][index][user];
    }

    // Function to revoke access from a client or insurance company
    function revokeAccess(address clientAddress, address insuranceCompany) external onlyBroker {
        require(sharedDocuments[insuranceCompany][clientAddress] == true, "Access not granted");

        // Logic to revoke access
        // You can implement a more sophisticated access control mechanism here

        // Mark that the access has been revoked
        sharedDocuments[insuranceCompany][clientAddress] = false;
        // Revoke access from the client
        clientAccessRights[clientAddress][insuranceCompany] = false;
    }

    // Function to mark a document as invalid
    function markDocumentAsInvalid(address clientAddress, uint256 index) external onlyBroker {
        require(index < clientDocuments[clientAddress].length, "Invalid index");
        clientDocuments[clientAddress][index].isValid = false;
    }

    // Function to get all documents of a client
    function getClientDocuments(address insuranceCompany) external view onlyDocumentOwner(insuranceCompany) returns (Document[] memory) {
        return clientDocuments[insuranceCompany];
    }

    function brokerDashboard() external view onlyBroker returns (documentGenerated[] memory) {
        return broker[msg.sender];
    }

    // Function to get all documents (for the broker's dashboard)
    function getAllDocuments(address user) external view onlyBroker returns (Document[] memory) {
        // Return all documents from all clients
        // You may want to implement pagination or other optimizations for a real-world scenario
        return clientDocuments[user];
    }

    // Function to get document details by index for a specific client
    function getDocumentDetails(address clientAddress, uint256 index) external view onlyDocumentOwnerOrAuthorized(clientAddress) returns (Document memory) {
        require(index < clientDocuments[clientAddress].length, "Invalid index");
        return clientDocuments[clientAddress][index];
    }

    // Function to access a document, emitting an event for traceability
    function accessDocument(address InsuranceFirmAddress, uint256 index, string memory reason) external {
        require(index < clientDocuments[InsuranceFirmAddress].length, "Invalid index");

        Document storage document = clientDocuments[InsuranceFirmAddress][index];
        bool success;
        success = clientAccessRights[InsuranceFirmAddress][msg.sender] && documentAccessControl[InsuranceFirmAddress][index][msg.sender];
        if (document.isValid) {
            // Check if access is granted
            require(success,"Access not granted to view document");
                  // Add traceability information
            uint256 traceIndex = document.traceabilityIndexes.length;
            document.traceabilityIndexes.push(traceIndex);
            documentTraceability[InsuranceFirmAddress][index].push(Traceability(msg.sender, block.timestamp, reason, success));

            emit DocumentAccessed(msg.sender, InsuranceFirmAddress, block.timestamp, reason, document.documentHash, success);
    
        } else {
            if(document.isValid){
            documentTraceability[InsuranceFirmAddress][index].push(Traceability(msg.sender, block.timestamp, "Document Fetched Not valid!", success));
            emit DocumentAccessed(msg.sender, InsuranceFirmAddress, block.timestamp, reason, "Document Fetched Not valid!", success);
            }else{            
            success = false;
              uint256 traceIndex = document.traceabilityIndexes.length;
            document.traceabilityIndexes.push(traceIndex);
            documentTraceability[InsuranceFirmAddress][index].push(Traceability(msg.sender, block.timestamp, "cLIENT Not allowed to Access!", success));
            emit DocumentAccessed(msg.sender, InsuranceFirmAddress, block.timestamp, reason, "Cant Access Hash", success);
            }
        }
    }

    // Function to get traceability for a document access attempts
    function getDocumentTraceability(address InsuranceFirm, uint256 index) external view onlyBroker returns (Traceability[] memory) {
        require(index < clientDocuments[InsuranceFirm].length, "Invalid index");
        return documentTraceability[InsuranceFirm][index];
    }

    // Function to check if a client has access to a specific insurance company's documents
    function hasAccessToInsurance(address insuranceCompany, address clientAddress) external view returns (bool) {
        return clientAccessRights[insuranceCompany][clientAddress];
    }
}
