
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
        axios.get("http://team2.eaglesoftwareteam.com/group?report=1")
        .then(response => {
        if (this.csv)
            this.csvCreation(response.data);
        else
            this.pdfCreation(response.data,false);
        })
        .catch(error => {
        console.log(error);
        })
    },

    csvCreation(group)
    {
        var rows = [];
        for(var i=0; i < group.length; i++){
            rows.push([group[i].ID, group[i].name, group[i].f_name + " " + group[i].l_name, group[i].value]);
        }

        let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "group.csv");
        document.body.appendChild(link); 

        link.click();
    },


    pdfCreation: function(group)
        {
        require('jspdf-autotable');
        
        var columns = ["ID", "Group Name", "Leader", "Type"];
        var rows = [];

        for(var i=0; i < group.length; i++){
            rows.push([group[i].ID, group[i].name, group[i].f_name + " " + group[i].l_name, group[i].value]);
        }
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows);
        doc.save('table.pdf');
        }
    }
})
</script>