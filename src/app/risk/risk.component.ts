import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../shared/identity-revealed.directive';
import { Risk } from './risk';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.scss'],
})
export class RiskComponent implements OnInit {
  constructor(private config:ConfigService){

  }

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  selectedRisk: Risk;

  creditRisk:Risk = new Risk();

  riskForm: FormGroup;

  clientsRiks:any =[];

  ngOnInit(): void {
    this.config.getRisk().subscribe((r) => this.powers = r);
    this.getAll();
    this.riskForm = new FormGroup({
      'nameClient': new FormControl(this.creditRisk.clientName, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i)
      ]),
      'creditLimit': new FormControl(this.creditRisk.creditLimit
        ),
      'typeRisk': new FormControl(this.creditRisk.type, Validators.required)
    },  { validators: identityRevealedValidator }); // <-- add custom validator at the FormGroup level
  }

  get nameClient() { return this.riskForm.get('nameClient'); }

  get typeRisk() { return this.riskForm.get('typeRisk'); }

  get creditLimit() { return this.riskForm.get('creditLimit'); }


  save():void{
    this.creditRisk.type = this.typeRisk.value;
    this.creditRisk.clientName = this.nameClient.value;
    this.creditRisk.creditLimit = this.creditLimit.value;
    this.config.saveCreditLimit(this.creditRisk).subscribe(
      data => this.getAll()
    );
  }

  getAll():any{

    this.config.getAll().subscribe(
      data => this.clientsRiks = data
    );
  }

}
