//Setup capa reports here (instead of on server.js) and call to it when needed:
const mongoose = require('mongoose')
//setup schema that we will be pushing to mongodb. We will wrap in an object and declare our keys and properties here:
const capaReportSchema = new mongoose.Schema({
    capaNumber: {
        type: String,
        required: true
    },
    dateCapaCreated: {
        type: Date,
        default: Date.now
    },
    capaStatus: {
        type: String,
        default: "Pending Approval"
    },
    capaPhase: {
        type: String,
        default: "Initiation"
    },
    problemStatement: {
        type: String,
    },
    dateCapaApproved: {
        type: Date,
    },
    nextPhaseDueDate: {
        type: Date,
    },
    productImpacted: {
        type: String,
    },
})
//export the schema to mongodb
module.exports = mongoose.model("CapaReports", capaReportSchema,"capas") //tasks is the collection we are referencing, otherwise a new one will be created by mongodb by default (ex: collection named 'test')
