
<template>
  <v-btn color="green" @click.native="generateReport">Generate <br/> Directory</v-btn>
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
        //this.pdfCreation(response.data,false);
        this.csvCreation(response.data);
        })
        .catch(error => {
        console.log(error);
        })
    },

    csvCreation(people)
    {
        var rows = [];
        for(var i=0; i < people.length; i++){
            rows.push([people[i].f_name + " " + people[i].l_name, people[i].occupation, people[i].employer, people[i].email]);
        }

        let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "directory.csv");
        document.body.appendChild(link); 

        link.click();
    },

    pdfCreation: function(people,img)
        {
            var doc = new jsPDF('p', 'pt');
            if(!img)
            {       
                require('jspdf-autotable');
            
                var columns = ["Name", "Occupation", "Employer", "Email" ];
                var rows = [];

                for(var i=0; i < people.length; i++){
                    rows.push([people[i].f_name + " " + people[i].l_name, people[i].occupation, people[i].employer, people[i].email]);
                }
                
                doc.autoTable(columns, rows);
                doc.save('table.pdf');
            }

            else
            {
                var picture = new Image();
                picture.src = "../assets/dog.jpg";
                doc.setFontSize(20);
                
                for(i = 0; i < people.length; i++)
                {
                    doc.text(people[i].f_name + " " + people[i].l_name, (35 + (i % 4) * 50), (50 + (i % 4) * 70))
                    doc.addImage(picture,"JPEG", 15,40,60,60);
                }
                doc.save('table.pdf');
            }
        }
    }
})
</script>