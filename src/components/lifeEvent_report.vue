
<template>
  <v-btn color="green" @click.native="generateReport(start,end, 5)">Generate <br/> Life Event  Report</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
export default ({
    name: "LifeEventReport",
    props:
    {
        selected: String,
        picture: Boolean,
        start: String,
        end: String
    },
    methods: 
    {
    generateReport: function(date_start, date_end, type)
    {
        axios.get("http://team2.eaglesoftwareteam.com/life_event?date_start=" + date_start + "&date_end=" + date_end + "&type=" + type + "&report=1")
        .then(response => {
        this.pdfCreation(response.data,this.picture);
        })
        .catch(error => {
        console.log(error);
        })
    },

    pdfCreation: function(life_event, img)
        {
        require('jspdf-autotable');
        img.use();
        var columns = ["Name", "Description", "Date" ];
        var rows = [];

        for(var i=0; i < life_event.length; i++){
            rows.push([life_event[i].f_name + " " + life_event[i].l_name , life_event[i].description, new Date(life_event[i].date).toLocaleDateString()]);
        }
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows);
        doc.save('Life_Events_Report.pdf');
        }
    }
})
</script>