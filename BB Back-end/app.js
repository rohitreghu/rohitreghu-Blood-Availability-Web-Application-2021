const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/BloodGroupDB', { useNewUrlParser: true, useUnifiedTopology: true });

const bloodBankSchema = {
    bloodBankName: {
        type: String,
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    bloodAvailability: {
        "A+": { type: String },
        "A-": { type: String },
        "B+": { type: String },
        "B-": { type: String }
    }
}

const BloodBank = mongoose.model("BloodBank", bloodBankSchema);

const exampleBloodBank = [
    {
        bloodBankName: "AAA",
        cityName: "Bhopal",
        location: "M.P. Nagar, Bhopal",
        contact: "+91 111",
        bloodAvailability: {
            "A+": "yes",
            "A-": "yes",
            "B+": "yes",
            "B-": "no"
        }
    },
    {
        bloodBankName: "BBB",
        cityName: "Bhopal",
        location: "M.P. Nagar, Bhopal",
        contact: "+91 222",
        bloodAvailability: {
            "A+": "no",
            "A-": "yes",
            "B+": "yes",
            "B-": "no"
        }
    },
    {
        bloodBankName: "CCC",
        cityName: "Bhopal",
        location: "M.P. Nagar, Bhopal",
        contact: "+91 333",
        bloodAvailability: {
            "A+": "yes",
            "A-": "no",
            "B+": "yes",
            "B-": "no"
        }
    },
    {
        bloodBankName: "DDD",
        cityName: "Bengaluru",
        location: "Kormangala, Bengaluru",
        contact: "+91 444",
        bloodAvailability: {
            "A+": "yes",
            "A-": "no",
            "B+": "yes",
            "B-": "no"
        }
    },
    {
        bloodBankName: "EEE",
        cityName: "Bengaluru",
        location: "M.PBengaluruopal",
        contact: "+91 555",
        bloodAvailability: {
            "A+": "no",
            "A-": "yes",
            "B+": "yes",
            "B-": "no"
        }
    },
    {
        bloodBankName: "FFF",
        cityName: "Bengaluru",
        location: "M.Bengaluru",
        contact: "+91 666",
        bloodAvailability: {
            "A+": "no",
            "A-": "yes",
            "B+": "no",
            "B-": "no"
        }
    }
]

app.get("/setUpBB", (req, res) => {
    BloodBank.insertMany(exampleBloodBank, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully added BB info");
        }
    })
})

app.get("/BB/:cityName/:bloodType", (req, res) => {
    BloodBank.find({cityName: req.params.cityName}, (err, foundBB) => {
        if(!err){
            if(foundBB.length > 0){
                const result = [];

                foundBB.forEach((BB) => {
                    if(BB.bloodAvailability[req.params.bloodType] === "yes"){
                        result.push({
                            BBName: BB.bloodBankName,
                            location: BB.location,
                            contact: BB.contact
                        })
                    }
                })

                res.send(result)
            }else{
                res.send("No Blood Bank found in the city");
            }
        }else{
            console.log(err);
        }
    })
})

app.get("/", (req, res) => {
    BloodBank.find({}, (err, foundItems) => {
        if (foundItems) {
            res.send(foundItems);
        } else if (err) {
            log(err);
        }
    })
})

app.listen(4000, () => {
    console.log("Server started on port 4000");
})
