@author:zach
@owner:zach

Feature: QR Code

  Scenario: The QR code is displayed when the button is clicked
      Given a QR code component
      When a user views the QR code
      Then they see a QR code in a modal

  Scenario: The QR code redirects to the correct URL
      Given a QR code component
      When a user scans the QR code
      Then they are redirected to the correct URL

  Scenario: The QR code is downloadable

  Scenario: The QR code is printable 

