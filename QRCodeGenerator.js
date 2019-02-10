export class QRCodeGenerator{
  constructor()
  {
  }
  AlphaNumericStringGenerator = (lengthofstring, dictionary) =>
  {
    let path = 'protestpassword'
    let output = ''
    for(let i = 0; i<lengthofstring; i++)
    {
      output = output.concat(dictionary[Math.floor(Math.random() * (dictionary.length - 1)])
    }
    console.log("Length of String => " + output.length)
    console.log("OutputString  => " + output)
    return output
  }

  RedundantEncryption = (stringtoencrypt, dictionary = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') =>
  {
    encryptionkey = AlphaNumericStringGenerator(stringtoencrypt.length, dictionary)
    output = ''

    for(let i = 0; i<stringtoencrypt.length; i++)
    {
      output = output.concat(stringtoencrypt[i].concat(encryptionkey[i]))
    }

    console.log("Length of EncryptedString => " + output.length)
    console.log("LengthOfOriginalString => " "+ stringtoencrypt.length)
    console.log("OriginalString  => " + stringtoencrypt)
    console.log("EncryptedtString  => " + output)

    return output
  }

  DecryptKEYString = (stringtodecrypt) =>
  {
    output = ''

    for(let x = 0; x <stringtodecrypt.length / 2; x++)
    {
      output = output.concat(stringtodecrypt[x*2])
    }
    console.log("Length of EncryptedString => " + stringtodecrypt.length)
    console.log("LengthOf DecryptedString => " + output.length)
    console.log("EncryptedString  => " + stringtodecrypt)
    console.log("DecryptedtString  => " + output)
    return output
  }

  ApplyVigniereCipher = (vignierestring, stringtoencrypt = '9H6YTM9040LAMAXOTAK') =>
  {
    let cipheriterator = vignierestring.length

    for(let x = 0; x < stringtoencrypt.length; x++)
    {
      if(cipheriterator < 0){
        cipheriterator = vignierestring.length
      }
      //Implement Substitution
      cipheriterator--
    }
  }

  //Returns The Protest
  Tier1PasscodeGenerator = (length = 64, dictionary = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') =>
  {
    const path = 'protestpassword'
    const firebaseTruePassword = AlphaNumericStringGenerator(length, dictionary)
    const qrStringtoPresentInfo = path.concat(RedundantEncryption(firebaseTruePassword))

    //Path is the Key/Name of the new Child to be added to the Project Directory Structure
    //FireBase True Password is The Value To Be added to the new child
          // of the format  Name = Organiser : Value = "snfwonfwo" AKA path: firebaseTruePassword
    //QRStringtoPresentInfo is the Encrypted Password Which Should Be Passed into the QR CODE
      //The Huey Client system will handle the decryption of the encrypted QR Code
    return {path, FirebaseTruePassword, QRStringtoPresentInfo}
  }

  Tier2OrganiserPWGenerator = (numberoforganisercreated) =>
  {
    //const organiserIDKeyPath = toString(numberoforganisercreated + 1).concat(RedundantEncryption('organiser'))
    const organiserIDKeyPath = 'organiser'.concat(toString(numberoforganisercreated + 1))
    const organiserPWValue = this.AlphaNumericStringGenerator(64, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    const organiserQRPassword = RedundantEncryption(organiserPWValue)

    //Id Key Path Should Be The Name/Key Of The Child Being Added In To To The ORganiser Directory Structure
    //Organiser Password Is The Value Assigned To This New Organiser Child Object In The Organiser Directory
    return {organiserIDKeyPath, organiserPWValue, organiserQRPassword}
  }

  ProtestPWPasswordPopulator = (numberoforganisers) =>
  {
    Tier1Triple = Tier1PasscodeGenerator(64, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

    //Firebase Push Statement
    NameOfchild = Tier1Triple.organiserIDKeyPath
    PasswordValueForChild = Tier1Triple.organiserPassword

    PlaceholderFirebasePushCall = (referencetospecificprotest + "/" + NameOfChild, PasswordValueForChild)

    for(int i = 0; i < numberoforganisers; i++)
    {
      tier2Tuple = Tier2OrganiserPWGenerator(i)
      childPathKey = Tier2Triple.organiserIDKeyPath
      valueToAddToKey = Tier2Triple.organiserpasswordvalueQR
      stringForOrganiserQR = Tier2Triple.organiserQRPassword

      PlaceholderFirebasePushCall(referencetospecificprotest + "/organisers", Tier2Tuple)

    }
  }

  //Next Steps
  //QR Code OnScreen Presentation Code Is Committed Above
  //Only Needs Addition Of A Push Statement To Add

  //import React from 'react';
  //import ReactDOM from 'react-dom';
  //import QRCode from 'react-qr-code';
  //
  //ReactDOM.render(
  //  <QRCode value="hey" />,
  //  document.getElementById('Container')
  //);
}
