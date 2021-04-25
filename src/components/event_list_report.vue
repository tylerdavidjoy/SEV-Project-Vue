
<template>
  <v-btn color="green" @click.native="generateReport()">Generate <br/> Event List Report</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default ({
    name: "EventListReport",
    props:
    {
        selected: String
    },
    methods: 
    {
        generateReport: function()
        {

            var url = "http://team2.eaglesoftwareteam.com/event?isGetEventReport=1"

            axios.get(url)
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

        csvCreation(event)
        {
            console.log(event)
            var rows = [];
            for(var i=0; i < event.length; i++){
                rows.push([event[i].name, event[i].description, event[i].date, event[i].room_number, event[i].f_name + " " + event[i].l_name, event[i].email, event[i].number]);
            }

            let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
            
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "event.csv");
            document.body.appendChild(link); 

            link.click();
        },


        pdfCreation: async function(event)
        {
            require('jspdf-autotable');
            
            var columns = ["Event Name", "Description", "Date", "Location", "Leader", "Contact Email", "Contact Phone Number"];
            var rows = [];

            for(var i=0; i < event.length; i++){
                rows.push([event[i].name, event[i].description, new Date(event[i].date).toDateString(), event[i].room_number, event[i].f_name + " " + event[i].l_name, event[i].email, event[i].number]);
            }
            var doc = new jsPDF('l', 'pt');
            doc.autoTable(columns, rows);
            doc.save('event_List.pdf');
        }
    }
})
</script>