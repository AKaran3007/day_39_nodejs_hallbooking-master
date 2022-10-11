const express = require("express");
const app = express();

let bookings=[];
let rooms =[
    {
        seats:2,
        aminities:["AC","Refridgerator","Free Wifi","Premium Bedding"],
        price_for_hr:300,
        id:1
    },
    {
        seats:2,
        aminities:["AC","Refridgerator","Free Wifi","Premium Bedding"],
        price_for_hr:400,
        id:2
    },
    {
        seats:2,
        aminities:["AC","Refridgerator","Free Wifi","Premium Bedding"],
        price_for_hr:500,
        id:3
    },
    {
        seats:2,
        aminities:["AC","Refridgerator","Free Wifi","Premium Bedding"],
        price_for_hr:600,
        id:4
    },
    {
        seats:2,
        aminities:["AC","Refridgerator","Free Wifi","Premium Bedding"],
        price_for_hr:700,
        id:5
    }
];
app.use(express.json());



app.post("/create-room",function(req,res){
req.body.id=rooms.length+1
rooms.push(req.body);
res.json({messege:"Room created sucessfully..."})
})

app.get("/rooms",function(req,res){
    res.json(rooms)
    console.log("Room created")
    })

    app.get("/bookings",function(req,res){
res.json(bookings)
    })

let bookedList=[];

 app.post("/book/:id",function(req,res){
    bookings.push(req.body);
    let roomNo = req.params.id;
    req.body.roomId = roomNo;
    let roomList={}
    let list = rooms.find((item)=> item.id === parseInt(req.params.id));
    
    if(list && !bookedList.some(val=>val.room_name === list.id)){
        roomList.room_name=parseInt(roomNo);
    roomList.booked_status="Room booked";
    roomList.customer_name = req.body.customer_name;
    roomList.date = req.body.date;
    roomList.start_time =req.body.start_time;
    roomList.end_time = req.body.end_time;
    roomList.id = bookedList.length +1;
    bookedList.push(roomList)
    
    console.log(roomNo)
    res.json({messege:"Room booked...."})
    }
    else{
        res.json({messege:"room not found"})
    }
    
 })  

 app.get("/list-rooms",function(req,res){
res.json(bookedList);
 })

 app.get("/customer-details",function(req,res){
    let custDet=[];
    
bookedList.map(val=>{
        delete val.booked_status

        return custDet.push(val) ;
    })

    res.json(custDet)
 })





app.listen(process.env.PORT || 3000);





