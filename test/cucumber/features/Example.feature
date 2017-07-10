Feature:
  In order easily to know which app I am using
  As a user or developer
  I want to make sure that I can see the correct page title

Scenario: Check title of website after search
  Given I open Spectrum and agree to the terms
  Then I expect that the title is "Spectrum"
