const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const { json } = require('express')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'my_db_01',
})

const app = express()
app.use(cors())
app.use(express.static(__dirname+'/dist'))
/* app.use(express.urlencoded({extended: false})) */
//接口
/* app.get('/todoList',(req,res)=>{
    res.send({
        data:'Connected'
    })
}) */


app.get('/todoList',(req,res)=>{
    // 先取到要增加的字段值3
    //字符串转json
    const addInfor = JSON.parse(req.query.sendMassage)
    console.log(addInfor)
  // 定义sql语句
    const sql = "insert into task_table1 (id,atask,done) values (?,?,?)"
  // 执行sql语句,第二个参数代表sql语句中？的值
  /**
   * 如果增加的字段和数据库中的字段不是一一对应的
   * 将addInfor换成{name: addInfor.name, age: addInfor.age}
   * name代表数据库中的字段，addInfor.name代表他要增加的值
   */
    db.query(sql, [addInfor.id,addInfor.atask,addInfor.done], (err,results)=>{
    // sql语句执行失败
        if(err) {
            return res.send({status: 1, message: err.message})
        }
    // 数据库语句执行成功，但影响的条数不等于1，没有增加，也属于失败
        if(results.affectedRows !== 1) {
            return res.send({status: 1, message: '数据添加失败'})
        }
    // sql语句执行成功，影响条数也等于1
        return res.send({status:0, message: '添加成功', data:results})
  })
})

app.get('/getData',(req,res)=>{
    const sql = "select * from task_table1"
    db.query(sql,(err,results)=>{
        if(err) {return res.send({status: 1, message: err.message})}
        console.log(results)
        return res.send(JSON.stringify(results))
    })
})


/* app.get('/todoList',(req,res)=>{
    console.log(req.query)
    res.send({
        status:0,
        msg:'GET请求成功',
        data:{data:'前端已接受'}
    }) 
    res.send({
        status:'发送消息成功!',
        data:req.query
    });
})*/




app.listen(5005,(err)=>{
    if(!err) console.log('服务器成功启动在http://127.0.0.1:5005')
})