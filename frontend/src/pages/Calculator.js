/**
 * created by: jeanluc mutomb
 * handles the view for the Homepage of the website
 */
import React from "react";
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBInput,
MDBTable,MDBTableBody, MDBTableHead
} from 'mdbreact';
import InnerNavBar from "./InnerNavBar";
import SectionContainer from "../components/sectionContainer";
import './style.css';
import HSBar from "react-horizontal-stacked-bar-chart";
const URI='http://localhost:5000/';
const FormErrors = (props) =>
  <div className='formErrors'>
    {Object.keys(props.formErrors).map((fieldName, i) => {
      if(props.formErrors[fieldName].length > 0 && props.feedbackFor==fieldName){ 
        return (
          <small style={{color:'green'}} key={i}>{fieldName} {props.formErrors[fieldName]}</small>
        )        
      } else {
        return '';
      }
    })}
  </div>

class Calculator extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  constructor(props){
      super(props)
      this.state={
        deposit:0,
        price:0,
        term:0,
        interest:0,
        c:0,
        showResult:false,
        name:'',
        endBalances:[],
        formErrors: {
          deposit: '', 
          price: '',
          term:'',
          interest:'',
        }
      }
  }

  onChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    this.setState({
      [name]:value,
      showResult:false,
    });
  }
  onChangeName=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    this.setState({
      [name]:value
    });
  }
  onSubmit=()=>{
    const obj={
      name:this.state.name,
    }
  }
  calculate=(e)=>{
    e.preventDefault();
    const P=this.state.price-this.state.deposit;
    const N=this.state.term*12;
    const r=this.state.interest/1200;
    if(P>=0){
      if(N>0){
        if(r==0){
          const c=P/N;
          this.setState({
            c:c,
            showResult:true
          },()=>{
            this.amortize()
          })
        }
        else if(r>0){
          const temp=Math.pow((1+r),N);
          const c= (r*P*temp)/(temp-1);
          this.setState({
            c:c,
            showResult:true
          },()=>{
            this.amortize();
          });
        }
      }
    }
  }
  amortize=()=>{   
    if(this.state.showResult){ 
       const endBalances=[];
       var initial=this.state.price-this.state.deposit;
       var principal=0;
       var endBalance=0;
       var interest=0;
       for(var i=1; i<=this.state.term*12; i++){
           interest=initial*this.state.interest/1200;   
           principal=this.state.c-interest;
           endBalance=initial-principal;
           if(i%12==0){
             if(endBalance<0){
              endBalance=0;
             }
             endBalances.push(endBalance);
           }
           initial=endBalance;
       }
       this.setState({
        endBalances:[...endBalances.map(value=>value)]
       });
     }   
   }
  showResult=()=>{
    if(this.state.showResult){
      return (
      <div style={{border:"1px solid red", padding:'10px', borderRadius:'10px'}}>
      <p className="h5 font-weight-bold red-text text-center">Results</p>
      <p className="h5 font-weight-light red-text">Purchase Price - R{this.state.price}</p>
      <p className="h5 font-weight-light red-text">Deposit - R{this.state.deposit}</p>
      <p className="h5 font-weight-light red-text">Bond Terms - R{this.state.term}</p>
      <p className="h5 font-weight-light red-text">Fixed Interest Rate - R{this.state.interest}</p>
      <hr className="red-text"/>
      <p className="h5 font-weight-light red-text">monthly payment required- R{this.state.c.toFixed(2)}</p>
      <MDBInput
      type="text" 
      className="form-control input1"
      label="Enter Your Name"
      name="name"
      onChange={this.onChangeName}
      >
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} feedbackFor={'name'} />
        </div>   
      </MDBInput> 
      <div className="text-center"> 
      <MDBBtn className="btn btn-red m-0 px-5 py-3 " 
        disabled={!this.state.formValid}
        onClick={this.onSubmit}>
          Save  
       <MDBIcon className="ml-5 text-white" icon="book" />                    
      </MDBBtn>
      </div>
      </div>
      )
    }
  }
  visualize=()=>{
    if(this.state.showResult){
      const table=(
        <MDBCard>
        <MDBCardBody>
        <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>Year</th>
                  <th>Interest %</th>
                  <th>Capital %</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {
                  this.state.endBalances.map((value,index)=>{
                    return(
                    <tr>
                    <td>{index+1}</td>
                    <td>{(value*100/(this.state.price-this.state.deposit)).toFixed(2)}</td>
                    <td>{(100-(value*100/(this.state.price-this.state.deposit))).toFixed(2)}</td>
                    </tr>
                    )
                  })
                }
              </MDBTableBody>
            </MDBTable>
        </MDBCardBody>
      </MDBCard>
      );
      const bargraph=(
        <MDBCard>
        <MDBCardBody>
          <HSBar
          height={50}
          showTextIn
          showTextUp
          showTextDown
          id="new_id"
          fontColor="rgb(50,20,100)"
          data={[
            {
              name: "To pay",
              value: 80,
              description: "U$80,00",
              color: "red"
            },
            {
              name: "Paid",
              value: 200,
              description: "U$200,00",
              color: "rgb(150,150,220)"
            }
          ]}
        />
        </MDBCardBody>
        </MDBCard>
      )
      return(
        <InnerNavBar table={table} bargraph={bargraph}/>
      )
    }
    else{
      return ""
    }
  }
  render() {
    return (
      <>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="5">
            <MDBCard>
              <MDBCardBody>
              <form 
                onSubmit={this.submitHandler}
              > 
                  <p className="font-weight-bold red-text h5 text-center mb-4">Calculate Monthly Bond</p>
                 <MDBInput
                    type="number"
                    className="form-control input1"
                    label="purchase price(Rand)"
                    name="price"
                    onChange={this.onChange}
                  >
                    <div className="panel panel-default">
                      <FormErrors formErrors={this.state.formErrors} feedbackFor={'price'} />
                    </div>    
                  </MDBInput>
                 <MDBInput
                    type="number"
                    className="form-control input1"
                    label="Deposit(Rand)"
                    name="deposit"
                    onChange={this.onChange}
                  >
                    <div className="panel panel-default">
                      <FormErrors formErrors={this.state.formErrors} feedbackFor={'deposit'} />
                    </div>                        
                  </MDBInput> 
                  <MDBInput
                    type="number"
                    className="form-control input1"
                    label="Bond term(years)"
                    name="term"
                    onChange={this.onChange}
                  >
                    <div className="panel panel-default">
                      <FormErrors formErrors={this.state.formErrors} feedbackFor={'term'} />
                    </div>    
                  </MDBInput> 
                  <MDBInput
                    type="number"
                    className="form-control input1"
                    label="Fixed Interest Rate(yearly)"
                    name="interest"
                    onChange={this.onChange}
                  >
                    <div className="panel panel-default">
                      <FormErrors formErrors={this.state.formErrors} feedbackFor={'interest'} />
                    </div>    
                  </MDBInput>
                  <div className="text-center"> 
                  <MDBBtn className="btn btn-red  m-0 px-5 py-3" onClick={this.calculate}
                    type="submit"
                  >
                      Calculate
                    <MDBIcon className="ml-2 text-white" icon="calculator" />                    
                  </MDBBtn>
                  </div> 
                  {this.showResult()}              
                 </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            {this.visualize()}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </>
    );
  }
}
export default Calculator;

