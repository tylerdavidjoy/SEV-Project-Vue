
<template>
  <v-btn color="green" @click.native="generateReport">Generate <br/> Directory</v-btn>
</template>

<script>
import axios from 'axios';
import jsPDF  from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default ({
    name: "DirectoryReport",
    props:
    {
        selected: String,
        picture: Boolean
    },
    methods: 
    {
    generateReport: function()
    {
        axios.get("http://localhost:3000/person?getInfo=1")
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

    csvCreation(people)
    {
        var rows = [];
        for(var i=0; i < people.length; i++){
            rows.push([people[i].f_name + " " + people[i].l_name, people[i].preferred_name, people[i].occupation, people[i].employer, people[i].email, people[i].roleType, people[i].number, people[i].numType, people[i].can_publish, people[i].address, people[i].addType]);
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
            var doc = new jsPDF('l', 'pt');
            if(!img)
            {       
                require('jspdf-autotable');
            
                var columns = ["Name", "Preferred Name", "Occupation", "Employer", "Email", "Role Type", "Phone Number", "Number Type", "Publish to Directory?", "Address", "Address Type"  ];
                var rows = [];

                for(var i=0; i < people.length; i++){
                    rows.push([people[i].f_name + " " + people[i].l_name, people[i].preferred_name, people[i].occupation, people[i].employer, people[i].email, people[i].roleType, people[i].number, people[i].numType, people[i].can_publish, people[i].address, people[i].addType]);
                }
                
                doc.autoTable(columns, rows);
                doc.save('Directory.pdf');
            }

            else
            {

                var contentTemp = [];
                for (i = 0; i < people.length; i++)
                {
                   var tempImg = {
                        columns: [
                            {
                                image: 'sample', //First IMG in row
                                width: 150,
                                height: 150
                            },
                            {}, //Spacing
                            {
                                image: 'sample', //Second IMG in row
                                width: 150,
                                height: 150
                            },
                            {}, //Spacing
                            {
                                image: 'sample', //Third IMG in row
                                width: 150,
                                height: 150
                            }
                        ]
                    }

                    var tempNames = {
                        fontSize: 20,
                        alignment: 'center',
                        columns: [
                            {
                                text:people[i].f_name + " " + people[i].l_name
                            },
                             //Spacing
                            {
                                text:people[i + 1].f_name + " " + people[i + 1].l_name
                            },
                             //Spacing
                            {
                               text:people[i + 2].f_name + " " + people[i + 2].l_name
                            }
                        ]
                    }

                    contentTemp.push(tempImg);
                    contentTemp.push(tempNames);
                    i +=2;
                }

                var imgList = {}

                for (var x = 0; x < people.length; x++)
                {
                    imgList[x] = people[x].image;
                }

                console.log(imgList);

                var pdfContent = {
                    content: contentTemp,
                    images:{
                        sample: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"
                    }
                }
                pdfMake.createPdf(pdfContent).open();
                // doc.setFontSize(20);
                
                // for(i = 0; i < people.length; i++)
                // {
                //     doc.text(people[i].f_name + " " + people[i].l_name, (35 + (i % 4) * 50), (50 + (i % 4) * 70))
                //     doc.addImage(imgData,"JPEG", 15,40,60,60);
                // }
                // doc.save('Directory.pdf');
            }
        }
    }
})
</script>