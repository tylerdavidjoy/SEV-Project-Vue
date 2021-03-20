
<template>
  <v-btn @click.native="generateReport('2000-04-04','2121-06-04', 5)">Generate Life Event Report</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
export default ({
    name: "LifeEventReport",
    methods: 
    {
    generateReport: function(date_start, date_end, type)
    {
        axios.get("http://team2.eaglesoftwareteam.com/life_event?date_start=" + date_start + "&date_end=" + date_end + "&type=" + type)
        .then(response => {
        this.pdfCreation(response.data);
        })
        .catch(error => {
        console.log(error);
        })
    },

    pdfCreation: function(life_event)
        {
        require('jspdf-autotable');
        
        var columns = ["Name", "Description", "Date" ];
        var rows = [];

        for(var i=0; i < life_event.length; i++){
            rows.push([life_event[i].name, life_event[i].description, life_event[i].date.toString().substr(0,10)]);
        }
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows);
        doc.save('table.pdf');
        }
    }
})
</script>