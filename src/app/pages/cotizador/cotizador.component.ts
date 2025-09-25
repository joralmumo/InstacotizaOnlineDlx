import { Component, inject, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

interface Producto {
  producto: string;
  descripcion: string;
  unidad: string;
  cantidad: number;
  valorUnitario: number;
  total: number;
}

type productForm = FormGroup<{
  producto: FormControl<Producto | null>;
  descripcion: FormControl<string>;
  unidad: FormControl<string>;
  cantidad: FormControl<number>;
  valorUnitario: FormControl<number>;
  total: FormControl<number>;
}>;

type Form = FormGroup<{
  nombre_empresa: FormControl<string>;
  telefono_empresa: FormControl<string>;
  rut_empresa: FormControl<string>;
  email_empresa: FormControl<string>;
  direccion_empresa: FormControl<string>;
  productos: FormArray<productForm>
  nombre_cliente: FormControl<string>;
  obra_cliente: FormControl<string>;
  contacto_cliente: FormControl<string>;
  email_cliente: FormControl<string>;
  direccion_cliente: FormControl<string>;
  fecha: FormControl<string>;
  validez_oferta: FormControl<string>;
  forma_pago: FormControl<string>;
  presupuesto_incluye: FormControl<string>;
  moneda: FormControl<string>;
  logo: FormControl<File | null>;
}>;

@Component({
  selector: 'app-cotizador',
  imports: [ReactiveFormsModule],
  templateUrl: './cotizador.component.html',
  styleUrl: './cotizador.component.css'
})
export class CotizadorComponent {
  title = 'COTIZADOR DE INSTACOTIZA';
  formBuilder = inject(NonNullableFormBuilder);
  get productosArray(): FormArray<productForm> {
    return this.form.get('productos') as FormArray<productForm>;
  }

  form: Form = this.formBuilder.group({
    nombre_empresa: this.formBuilder.control('', Validators.required),
    telefono_empresa: this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    rut_empresa: this.formBuilder.control('', Validators.required),
    email_empresa: this.formBuilder.control('', [Validators.required, Validators.email]),
    direccion_empresa: this.formBuilder.control('', Validators.required),
    productos: this.formBuilder.array<productForm>([this.createProductForm()]),
    nombre_cliente: this.formBuilder.control('', Validators.required),
    obra_cliente: this.formBuilder.control('', Validators.required),
    contacto_cliente: this.formBuilder.control('', Validators.required),
    email_cliente: this.formBuilder.control('', [Validators.required, Validators.email]),
    direccion_cliente: this.formBuilder.control('', Validators.required),
    fecha: this.formBuilder.control('', Validators.required),
    validez_oferta: this.formBuilder.control('', Validators.required),
    forma_pago: this.formBuilder.control('', Validators.required),
    presupuesto_incluye: this.formBuilder.control('', Validators.required),
    moneda: this.formBuilder.control('CLP', Validators.required),
    logo: this.formBuilder.control<File | null>(null)
  });

  createProductForm(): productForm {
    return this.formBuilder.group({
      producto: this.formBuilder.control<Producto | null>(null, Validators.required),
      descripcion: this.formBuilder.control('', Validators.required),
      unidad: this.formBuilder.control('', Validators.required),
      cantidad: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      valorUnitario: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      total: this.formBuilder.control(0)
    });
  }
  
  addProduct(){
    console.log('HAY CLICK!!!!');
    this.productosArray.push(this.createProductForm());
    console.log('NUEVO LARGO:', this.productosArray.length);
  }

  removeProduct(index: number){
    if(this.productosArray.length > 1){
      this.productosArray.removeAt(index);
    }
  }

  generar_doc() {
    console.log('Generando DOC...');
  }

  generar_pdf() {
    console.log('Generando PDF...');
  }
  

}
