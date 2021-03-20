
<template>
  <v-btn @click.native="generateReport">Generate Directory</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
export default ({
    name: "DirectoryReportNoImg",
    methods: 
    {
    generateReport: function()
    {
        axios.get("http://team2.eaglesoftwareteam.com/person")
        .then(response => {
        this.pdfCreation(response.data);
        })
        .catch(error => {
        console.log(error);
        })
    },

    pdfCreation: function(people)
        {
        require('jspdf-autotable');
        
        var columns = ["Name", "Occupation", "Employer", "Email" ];
        var rows = [];

        for(var i=0; i < people.length; i++){
            rows.push([people[i].f_name + " " + people[i].l_name, people[i].occupation, people[i].employer, people[i].email]);
        }
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows);
        doc.save('table.pdf');
        }
    }
})
</script>