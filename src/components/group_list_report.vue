
<template>
  <v-btn color="green" @click.native="generateReport()">Generate <br/> Group List Report</v-btn>
</template>

<script>
import axios from 'axios'
import jsPDF  from "jspdf";
export default ({
    name: "GroupListReport",
    props:
    {
        selected: String,
        picture: Boolean
    },
    methods: 
    {
    generateReport: function()
    {
        axios.get("http://team2.eaglesoftwareteam.com/group?report=1")
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
        console.log(group)
        var rows = [];
        for(var i=0; i < group.length; i++){
            rows.push([group[i].id, group[i].name, group[i].f_name + " " + group[i].l_name, group[i].value]);
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
            rows.push([group[i].id, group[i].name, group[i].f_name + " " + group[i].l_name, group[i].value]);
        }
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows);
        doc.save('Group_List.pdf');
        }
    }
})
</script>