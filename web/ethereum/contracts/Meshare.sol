pragma solidity ^0.4.17;

contract Meshare {
    mapping(uint => uint256) questions;
    
    uint minimumContribution = 1;
    
    function createQuestion(uint questionId) public payable {
        require(msg.value >= minimumContribution);
        questions[questionId] = msg.value;
    }
    
    function acceptAnswer(address reciepent, uint questionId) public {
        reciepent.transfer(questions[questionId]);
    }
}   
