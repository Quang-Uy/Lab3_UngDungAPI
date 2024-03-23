const express = require('express');

const app = express();

const port = 4000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server đang chạy ở cổng' + port);
});

const uri = 'mongodb+srv://uybqph35004:l42Bpv1HWH7Wk2A0@cluster0.igmz4cs.mongodb.net/uybqph35004';

const mongoose = require('mongoose');

const carModel = require('./carModel');

///Kết nối CSDL vs mongo
app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    let cars = carModel.find();

    console.log(cars);

    res.send(cars);
})

///Thêm xe mới
app.post('/add_xe', async (req, res) => {
    await mongoose.connect(uri);

    // let car = {
    //     ten: 'Xe 3',
    //     namSX: '2024',
    //     hang: 'Lambogini',
    //     gia: 2300000
    // }

    let car = req.body;
    
    let kq = carModel.create(car);
    console.log(kq);
})

app.get('/xoa:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;
    console.log(id);

    //Xử lý lỗi khi id không đúng
    await carModel.deleteOne({_id:id});

    res.redirect('../')
})

app.update('/update/:ten', async (req, res) => {
    await mongoose.connect(uri);

    console.log('Kết nối DB thành công');

    let tenXe = req.params.ten;
    console.log(tenXe);

    let tenXeMoi = tenXe + 'Phiên bản mới 2024';

    await carModel.updateOne({ten: tenXe}, {ten: tenXeMoi});

    let xehois = await carModel.find({});

    res.send(xehois);
})