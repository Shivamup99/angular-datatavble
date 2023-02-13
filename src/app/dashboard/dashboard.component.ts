import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // @ViewChild('cancel') cancel: any;
  formValue!:FormGroup;
  isSubmitted:boolean = false;
  showCreate!:boolean;
  showUpdate!:boolean;
  employee:any;
 constructor(private fb:FormBuilder,private dashboardService:DashboardService){}
  ngOnInit(): void {
    this._initForm();
    this._getAllEmployees()
  }

  _initForm(){
    this.formValue = this.fb.group({
      empId:['',Validators.required],
      name:['',Validators.required],
      email:['',Validators.required],
      accupation:['',Validators.required],
      salary:['',Validators.required]
    })
  }

  postEmployee(){
    this.isSubmitted = true
    if(this.formValue.invalid){
      return;
    }
    const employees:any={
    empId : this.formValue.value.empId,
    name :this.formValue.value.name,
    email : this.formValue.value.email,
    accupation : this.formValue.value.accupation,
    salary : this.formValue.value.salary
    }
    this._createEmp(employees);
  }

  clicktoEmptyEmp(){
    this.formValue.reset();
    this.showCreate = true;
    this.showUpdate = false;
  }

  private _createEmp(emp:any){
    this.dashboardService._postEmployee(emp).subscribe((res:any)=>{
       alert('Data uplodaed')
      // this.cancel.nativeElement.click();
      this.formValue.reset();
      this._getAllEmployees();
    },(error)=>{
      alert('Unscuccessfull')
    })
  }

  private _getAllEmployees(){
    this.dashboardService._getAllEmployee().subscribe((res:any)=>{
      this.employee = res.reverse();
    })
  }

  _deleteOneEmployee(row:any){
    this.dashboardService._deleteEmployee(row).subscribe(res=>{
      alert('deleted')
      this._getAllEmployees()
    })
  }

  _onEditRow(row:any){
    this.showCreate = false;
    this.showUpdate = true;
    this.employee.id = row.id
    this.EmployeeForm['empId'].setValue(row.empId);
    this.EmployeeForm['name'].setValue(row.name);
    this.EmployeeForm['email'].setValue(row.email);
    this.EmployeeForm['accupation'].setValue(row.accupation);
    this.EmployeeForm['salary'].setValue(row.salary);
  }

  updateEmployee(){
    const employees:any={
      id:  this.formValue.value.id,
      empId : this.formValue.value.empId,
      name :this.formValue.value.name,
      email : this.formValue.value.email,
      accupation : this.formValue.value.accupation,
      salary : this.formValue.value.salary

      }
      this.dashboardService._putEmployee(employees,this.employee.id).subscribe((res:any)=>{
        alert('Updated')
        this.formValue.reset();
       // this.cancel.nativeElement.click();
        this._getAllEmployees();
      },(error)=>{
        alert('Unscuccessfull')
      })
  }
  get EmployeeForm(){
    return this.formValue.controls;
  }
}
