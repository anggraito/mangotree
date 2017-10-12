const express = require('express')
const firebase = require('firebase')
const port = process.env.PORT || 3000
const cors = require('cors')
const cron = require('node-cron')
const app = express()

app.use(cors())

var config = {
  authDomain: "slide-fun-fact.firebaseapp.com",
  databaseURL: "https://slide-fun-fact.firebaseio.com",
  projectId: "slide-fun-fact"
}
const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

const MangoTree = require('./mango')

app.get('/live', (req, res) => {
  let tree = new MangoTree(0,0,0,true);
  let cronJob = cron.schedule('*/5 * * * * *', function(){
    tree.grow();
    tree.harvest();
    tree.produceMangoes();
    db.ref('mango').set({
      deadMessage: '',
      status: `[Report: Year ${tree.age}] I have Height : ${tree.height} meters | 
              Have much fruits ${tree.fruits} harvested with specify : 
              (${tree.good} good, ${tree.bad} bad)`
    })
    console.log(`[Report: Year ${tree.age} Report] I have Height = ${tree.height} meters | 
                Have much fruits ${tree.fruits} harvested with specify : 
                (${tree.good} good, ${tree.bad} bad)`)
    if (tree.healthy == false) {
      console.log(`Enaugh to growth, don't let me fell`)
      db.ref('mango').set({
        deadMessage: 'FIN, and goodbye'
      })
      cronJob.stop()
    }
  })
})

app.listen(port);
console.log('I growt with port ' + port + ', i will die if you stoped me');
