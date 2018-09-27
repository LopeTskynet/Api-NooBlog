const Promise = require("bluebird")
//technicalsheet methods
/**
 * function checkTechnicalObject : check if technicalsheet object is ok or not
 *
 * @param {Object} technicalSheet
 * @return {Boolean}
 */
exports.checkTechnicalObject = (technicalSheet) => {
  console.log('testing checkTechnicalObject method')
  isComplete = false
  if(technicalSheet !== null){
    if(technicalSheet.name && technicalSheet.pharmacologie && technicalSheet.chimie && technicalSheet.toxicity && technicalSheet.effects && technicalSheet.references){
        if(technicalSheet.effects.physic && technicalSheet.effects.cognitif && technicalSheet.effects.indesirable){
          if(technicalSheet.effects.physic.name && technicalSheet.effects.cognitif.name && technicalSheet.effects.indesirable.name){
            //Clean the first data in tab, because we got '' all time.
            if(technicalSheet.effects.physic.describe[0] == ''){
              console.log('condition ok')
            }
            if(technicalSheet.effects.physic.describe[0] == undefined){
              console.log('second if')
            }
            if(technicalSheet.effects.physic.describe[0] == undefined && technicalSheet.effects.physic.name[0] == undefined) {
              console.log('if 1')
              technicalSheet.effects.physic.describe.splice(0, 1)
            }
            if(technicalSheet.effects.cognitif.describe[0] == undefined && technicalSheet.effects.cognitif.name[0] == undefined){
              console.log('if 2')
              technicalSheet.effects.cognitif.describe.splice(0, 1)
            }
            if(technicalSheet.effects.indesirable.describe[0] == undefined && technicalSheet.effects.indesirable.name[0] == undefined){
              console.log('if 3')
              technicalSheet.effects.indesirable.describe.splice(0, 1)
            }
            if(technicalSheet.effects.physic.name[0] == undefined){
              console.log('if4')
              technicalSheet.effects.physic.name.splice(0, 1)
            }
            if(technicalSheet.effects.cognitif.name[0] == undefined){
              console.log('if5')
              technicalSheet.effects.cognitif.name.splice(0, 1)
            }
            if(technicalSheet.effects.indesirable.name[0] == undefined){
              console.log('if6')
              technicalSheet.effects.indesirable.name.splice(0, 1)
            }
            if(technicalSheet.references.urlTab[0] == undefined){
              technicalSheet.references.urlTab.splice(0, 1)
            }
            if(checkTab(technicalSheet.effects.physic.name) && checkTab(technicalSheet.effects.cognitif.name) && checkTab(technicalSheet.effects.indesirable.name)){
              if(checkTab(technicalSheet.references.urlTab)){
                isComplete = true
                console.log('tout est ok')
              } else {
                console.log('technicalsheet.references.urlTab is bad')
                isComplete = false
              }
            } else {
              console.log('technicalsheet.effects.physic,cognitif,indesirable name tab is bad')
              isComplete = false
            }
          }
        } else {
          console.log('technical.sheet.effects.physic,cognitif,indesirable is bad')
          isComplete = false
        }
    } else {
      console.log('technicalsheet.name,pharmacologie,chimie,toxicity,effects,references is bad')
      isComplete = false
    }
  } else {
    console.log('technicalsheet obj is null')
    isComplete = false
  }
  return isComplete
}
/**
 * function checkTab : browse an array for check if a data is empty or == ''
 *
 * @param {Array} tab
 * @return {Boolean}
 */
checkTab = (tab) => {
  bool = true
  tab.forEach( item => {
    console.log(item)
    item ? 'ok tab in order' : bool = false
  })
  return bool
}
/**
 * function isBlank : check if a string is null or empty
 *
 * @param {String} str
 * @return {Boolean}
 */
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
