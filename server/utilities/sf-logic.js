const jsforce = require('jsforce');
const readline = require("readline");
const exceljs = require('exceljs');

//Create excel file to log all the errors;
let workbook = new exceljs.Workbook();
let worksheet = workbook.addWorksheet("Errors");
worksheet.columns = [
    { header: "Error on", key: "errorOn" },
    { header: "Error Message", key: "errorMessage" },
    { header: "Error field", key: "errorField" },
];

//module import
const metadataMapping = require('./metadata-mapping');
const e = require('express');

let conn;
let totalMetadata =  [];
let objectName;

let u;

class Field {
    constructor(type, label, apiName, length, precision, decimalPlaces, description,  helpText,
                required, unique, externalId,  startingNumber, picklistValues, displayFormat,               
                defaultValue, latLongNotation, visibleLines) {

        this.type = type;
        this.label = label;
        this.apiName = apiName;     
        this.length = length;
        this.precision = precision;
        this.decimalPlaces = decimalPlaces;
        this.description = description;
        this.helpText = helpText;      
        this.required = required;
        this.unique = unique;
        this.externalId = externalId;
        this.startingNumber = startingNumber;
        this.picklistValues = picklistValues;
        this.displayFormat = displayFormat;
        this.defaultValue = defaultValue;
        this.latLongNotation = latLongNotation;
        this.visibleLines = visibleLines;
    
    }
}

async function sfAuthentication(body) {

    const { username, password, token, environment } = body;

    u = username;

    let url = environment === 'sf-production' ? 'https://login.salesforce.com/' : 'https://test.salesforce.com/';

    try {

        conn = new jsforce.Connection({ loginUrl: url });

        await conn.login(username, password + token);

        console.log("Logged in correctly!");        

    } catch (error) {
        throw error;
    }
}

async function createCustomFields(selectedObject, file) {

    objectName = selectedObject;

    //Get excel fields
    let fields = await getFieldsExcel(file);

    //Create fields
    await createFields(fields);

    //Check total metadata
    if (!totalMetadata.length) return;

    //Query profiles
    let profiles = await queryProfiles();
    console.log('Profiles fetched!');

    //Update profiles
    await updateProfiles(profiles);
    console.log('Profiles updated!');
}

async function getFieldsExcel(file){

    console.log('Getting fields from excel');

    let fields = [];
    const workbook = new exceljs.Workbook();    

    await workbook.xlsx.load(file.data)
    .then( async () => {

        let worksheet = workbook.worksheets[0];

        worksheet.eachRow((row) => {

            let rowValues = row.values;

            let type = rowValues[1];
            let label = rowValues[2];
            let apiName = rowValues[3];            
            let length = rowValues[4];
            let precision = rowValues[5];
            let decimalPlaces = rowValues[6];
            let description = rowValues[7];
            let helpText = rowValues[8];
            let required = rowValues[9];
            let unique = rowValues[10];
            let externalId = rowValues[11];
            let startingNumber = rowValues[12];
            let picklistValues = rowValues[13];
            let displayFormat = rowValues[14];
            let defaultValue = rowValues[15];
            let latLongNotation = rowValues[16];
            let visibleLines = rowValues[17];

            let field = new Field(type, label, apiName, length, precision, decimalPlaces, description,  helpText,
                                    required, unique, externalId, startingNumber, picklistValues, displayFormat,               
                                    defaultValue, latLongNotation, visibleLines);
            fields.push(field);
        })

        //Remove first element (the header)
        fields.shift();

    })
    .catch( (error) => {
        console.log('Error when reading the excel file ' + error);
    });

    return fields;
}

function createFields(fields){
    console.log('Creating fields...: ' + JSON.stringify(fields));
    // Process in pararel all fields
    let promises = fields.map(createField);
    return Promise.all(promises);
}

function createField(field) {

    let metadata = metadataMapping.generateMetadata(field, objectName);

    console.log('U: ' + u);

    //Seems like using a list, maximum ten fields can be created
    //Returns a promise
    return conn.metadata.create('CustomField', metadata, function(err, result){

        if(err){
            console.log('Error on creation ' + err);
            //Log error
        }else{               
            if(result.success){                   
                console.log('Field created: ' + JSON.stringify(result));

                //If the field is created, then we add it to the list of total metadata
                totalMetadata.push(metadata); 
            }else{
                //Log error
                console.log('Error when creating the field ' + JSON.stringify(result));
                createErrorFile = true;
                worksheet.addRow({
                    errorOn: "On creating field",
                    errorMessage: result.errors,
                    errorField: result.fullName,
                    });
            }
        }
    });
}

function queryProfiles(){
    console.log('Gettings profiles...');
    //Return a promise
    return conn.query("SELECT Id, Name FROM Profile");
}

function updateProfiles(profiles){
    console.log('Updating profiles...');
        // Process in pararel all profiles
    let promises = profiles.records.map(updateProfile);
    return Promise.all(promises);
}

function updateProfile(profile) {
    
    let profileName;
    if( profile.Name === 'System Administrator'){
        profileName = 'Admin';
    }else if( profile.Name === 'Standard User'){    
        profileName = 'Standard';
    }else{
        profileName = profile.Name;
    }

    return conn.metadata.read('Profile', profileName)
    .then( function(profile) {

        if(profile.fieldPermissions == undefined) return;
        
        let updateProfile = false;

        try{
    
        //Get only not required fields since required ones will have the permission updated correctly
        let relevantFields = totalMetadata.filter(met => {
            return !met.required || met.required == undefined;                
        }).map( met => met.fullName);

        for(let i=0; i<profile.fieldPermissions.length; i++){
                
            for(relevantField of relevantFields){
                if(profile.fieldPermissions[i].field.startsWith(relevantField)){     
                    
                    updateProfile = true;
                    profile.fieldPermissions[i].editable = true;
                    profile.fieldPermissions[i].readable = true;

                }
            }
        }

        } catch(error){
        console.log('Error ' + error);
        updateProfile = false;
        }

        if(!updateProfile) return null;

            return profile;
    })
    .then(function(profile){ 

        if(profile == null || profile == undefined) return;

        let fullName = profile.fullName;
        
        return conn.metadata.update(
        "Profile",
        {
            fullName,
            fieldPermissions: profile.fieldPermissions,
        },
        function (err, result) {
            if (err) {
            console.log("Error on profile update: " + err);
            createErrorFile = true;
            worksheet.addRow({
                errorOn: "On updating profile",
                errorMessage: err,
                errorField: err,
            });

            } else {
                console.log("Profile updated: " + JSON.stringify(result));
            }
        }
        );
    })
}

async function getAvailableObjects() {

    let objectNames = [];

    let types = [{type: 'CustomObject', folder: null}];
    await conn.metadata.list(types, '53.0', function(err, metadata) {
        if (err) { return console.error('err', err); }
        
        objectNames = metadata.filter((meta) => {
            return "manageableState" in meta === false || meta.manageableState === "unmanaged";
        })
        .map((meta) => {
            return meta.fullName;
        });
    });

    return objectNames;

}

module.exports = { sfAuthentication, getAvailableObjects, createCustomFields };