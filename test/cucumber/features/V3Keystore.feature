Feature:
    In order to easily and securely interact with an Ethereum blockchain
    As a user
    I want to create and use a v3 keystore

Scenario: Create a new v3 keystore
    Given I open the url "http://localhost:8080"
    Then I expect that element "button=Create" becomes visible
    When I click on the element "button=Create"
    Then I expect that element ".header*=Single Account" becomes visible
    When I click on the element ".header*=Single Account"
    Then I expect that element ".header=Create Keystore" becomes visible
    And I expect that element ".message*=Single Account" is visible
    When I set "test_name" to the inputfield "[name='name']"
    And I set "testing" to the inputfield "[name='password']"
    And I set "testing" to the inputfield "[name='confirmPassword']"
    And I click on the element "button=OK"
    Then I expect that element ".content*=test_name" becomes visible

# set test creating with a PK
# test custom  values
# test downloading the v3 keystore
# test editing the keystore
