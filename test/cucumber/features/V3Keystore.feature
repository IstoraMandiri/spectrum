Feature:
  In order to easily and securely interact with an Ethereum blockchain
  As a user
  I want to create and use a v3 keystore

Scenario: Create a new v3 keystore
  Given I open Spectrum and agree to the terms
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

Scenario: Edit v3 keystore name
  When I click on the element ".ribbon*=Single Account"
  Then I expect that element ".header=Edit Keystore: Single Account" becomes visible
  When I set "updated_test_name" to the inputfield "[name='name']"
  And I click on the element "button=OK"
  Then I expect that element ".content*=updated_test_name" becomes visible

# set test creating with a PK
# test downloading the v3 keystore
# test custom values

# removing keystore
Scenario: Remove v3 keystore name
  When I click on the element ".ribbon*=Single Account"
  Then I expect that element ".header=Edit Keystore: Single Account" becomes visible
  When I click on the element "button=Remove"
  Then I expect that element ".header=Please Confirm" becomes visible
  When I click on the element "button=Confirm"
  Then I expect that element ".content*=updated_test_name" is not visible
