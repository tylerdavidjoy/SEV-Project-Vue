
<template>
  <v-btn color="green" @click.native="generateReport(1)">Generate <br/> Group Memeber Report</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
export default ({
    name: "GroupReportNoImg",
    props:
    {
        selected: String,
        picture: Boolean
    },
    methods: 
    {
    generateReport: function(id)
    {
        axios.get("http://team2.eaglesoftwareteam.com/group?id="+id+"&get_members=1")
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

    csvCreation(group)
    {
        var rows = [];
        for(var i=0; i < group.length; i++){
            rows.push([group[i].f_name + " " + group[i].l_name, group[i].occupation, group[i].employer, group[i].email]);
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
        
        var columns = ["Name", "Occupation", "Employer", "Email" ];
        var rows = [];

        for(var i=0; i < group.length; i++){
            rows.push([group[i].f_name + " " + group[i].l_name, group[i].occupation, group[i].employer, group[i].email]);
        }
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows);
        doc.save('Group_Report.pdf');
        }
    }
})
</script>