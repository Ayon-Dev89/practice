const cds = require('@sap/cds');
const { Students, Subjects } = cds.entities('com.sap.school');

module.exports = function () {

    this.on("getHighestMarks", async (req) => {
        const HighestMarks= await SELECT.from(Subjects).columns`{ MAX(Science)as Highest}` 
        return HighestMarks; 
    });
}