/**
 * created by: Jeanluc Mutomb
 * Restful API handling uplaods/update of Calculation data to the database
 */

const router = require('express').Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
let Calculation = require('../models/calculation.model');
router.use(cors())

process.env.SECRET_KEY = 'secret';

router.get('/', (req, res) => {
    Calculation.find({
    })
        .then(calculations => {
            if (calculations) {
                if(calculations.length<1){
                    res.json({
                        found:false
                    })
                }
                else{
                    const payload = {
                        names: [...calculations.map(calc=>calc.name)]
                        }
                        res.json({
                            payload:payload,
                            found:true
                        })    
                }
                
            } 
            else {
                res.json({found:false })
            }
        })
        .catch(err => {
            console.log(err)
            res.send('Error' + err);
        })

})
router.get('/:name', (req, res) => {
    Organisation.findOne({
        name: req.params.name
    })
        .then(calc => {
            if (calc) {
                const payload = {
                    name: calc.name,
                    deposit: calc.deposit,
                    price:calc.price,
                    term:calc.term,
                    interest:calc.interest,
                    }
                    res.json({
                        payload:payload,
                        found:true
                    })              
                
            } else {
                res.json({found:false })
            }
        })
        .catch(err => {
            console.log(err)
            res.send('Error' + err);
        })
})
/**
 * add / update calculation
 */
router.post('/add',(req, res)=>{
        console.log(req.body)
        Calculation.findOne({
            name: req.body.name,
        })
        .then(calc=>{
            if(!calc){
                const obj=new Calculation({
                    name:req.body.name,
                    deposit:req.body.deposit,
                    price:req.body.price,
                    term:req.body.term,
                    interest:req.body.interest,                
                })
                obj.save()
                    .then((calc)=>res.json({
                        data:calc,
                        success:true
                    }))
                    .catch(err=>res.send('Error: '+err));
            }
            else{ 
                calc.name=req.body.name,
                calc.deposit=req.body.deposit,
                calc.price=req.body.price,
                calc.term=req.body.term,
                calc.interest=req.body.interest,
                calc.save()
                    .then((calc)=>res.json({
                        data:calc,
                        success:true
                    }))
                    .catch(err=>res.send('Error: '+err));
            }
        })
        .catch(err=>res.send('error: '+err));
});

module.exports = router;