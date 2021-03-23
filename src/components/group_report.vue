
<template>
  <v-btn color="green" @click.native="generateReport(1)">Generate <br/> Group Memeber Report</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
export default ({
    name: "GroupReportNoImg",
    methods: 
    {
    generateReport: function(id)
    {
        axios.get("http://team2.eaglesoftwareteam.com/group?id="+id+"&get_members=1")
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