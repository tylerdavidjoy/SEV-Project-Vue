
<template>
  <v-btn color="green" @click.native="generateReport(start,end, eventType)">Generate <br/> Life Event  Report</v-btn>
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
        end: String,
        eventType: Number
    },
    methods: 
    {
    generateReport: function(date_start, date_end, type)
    {
        console.log(date_start, date_end, type)
        axios.get("http://team2.eaglesoftwareteam.com/life_event?date_start=" + date_start + "&date_end=" + date_end + "&type=" + type + "&report=1")
        .then(response => {
           if (this.selected == "CSV")
                this.csvCreation(response.data);
            else
                this.pdfCreation(response.data,this.picture);
        })
        .catch(error => {
        console.log(error);
        })
    },

     csvCreation(life_event)
        {
            console.log(life_event)
            var rows = [];
            for(var i=0; i < life_event.length; i++){
                rows.push([life_event[i].f_name + " " + life_event[i].l_name , life_event[i].description, new Date(life_event[i].date).toLocaleDateString()]);
            }

            let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
            
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "life events.csv");
            document.body.appendChild(link); 

            link.click();
        },


    pdfCreation: function(life_event, img)
        {
            console.log(life_event);
        img;
        require('jspdf-autotable');
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