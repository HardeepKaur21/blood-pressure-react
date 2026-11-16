
Feature: Blood Pressure Calculator
  As a user
  I want to enter my blood pressure readings
  So that I can find out my blood pressure category

  Scenario: High blood pressure reading
    Given the blood pressure calculator is open
    When the user enters systolic 145 and diastolic 75
    And the user submits the form
    Then the result should be "High Blood Pressure"

  Scenario: Ideal blood pressure reading
    Given the blood pressure calculator is open
    When the user enters systolic 110 and diastolic 70
    And the user submits the form
    Then the result should be "Ideal Blood Pressure"

  Scenario: Invalid blood pressure reading
    Given the blood pressure calculator is open
    When the user enters systolic 200 and diastolic 80
    And the user submits the form
    Then the application should display "Invalid Input"

  Scenario: Correcting an invalid reading
    Given the blood pressure calculator is open
    When the user enters systolic 200 and diastolic 80
    And the user submits the form
    Then the application should display "Invalid Input"
    When the user changes systolic to 110 and diastolic to 70
    And the user submits the corrected reading
    Then the result should be "Ideal Blood Pressure"
