import { Component, inject, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Document, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, 
         HeadingLevel, WidthType, PageOrientation, convertInchesToTwip } from 'docx';
import { saveAs } from 'file-saver';
import { DecimalPipe } from '@angular/common';

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
  imports: [ReactiveFormsModule, DecimalPipe],
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

  getTotal(index: number): number {
    const item = this.productosArray.at(index);
    if (!item) return 0;
    const cantidad = item.get('cantidad')?.value || 0;
    const valor = item.get('valorUnitario')?.value || 0;
    return cantidad * valor;
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
    console.log('Form valid:', this.form.valid);
    console.log('Form errors:', this.form.errors);
    // debug para cachar si hay errores los campos
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.invalid) {
        console.log(`Campo ${key} inválido:`, control.errors);
      }
    });
    
    // debug para cachar si hay errores en los productos
    const productosArray = this.form.get('productos') as FormArray;
    console.log('Productos array valid:', productosArray.valid);
    productosArray.controls.forEach((control, index) => {
      if (control.invalid) {
        console.log(`Producto ${index} inválido:`, control.errors);
        // errores específicos de cada campo del producto
        Object.keys((control as FormGroup).controls).forEach(fieldKey => {
          const fieldControl = control.get(fieldKey);
          if (fieldControl && fieldControl.invalid) {
            console.log(`  Campo ${fieldKey} inválido:`, fieldControl.errors);
          }
        });
      }
    });
    if (this.form.valid) {
      const formData = this.form.value;
      this.createWordDocument(formData);
    } else {
      console.log('Formulario inválido');
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  private createWordDocument(data: any) {
    // se crea el documento
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            size: {
              orientation: PageOrientation.PORTRAIT,
              width: convertInchesToTwip(8.5),
              height: convertInchesToTwip(11)
            },
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(0.75),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(0.75)
            }
          }
        },
        children: [
          // Título
          new Paragraph({
            children: [
              new TextRun({
                text: "COTIZACIÓN",
                bold: true,
                size: 32
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // Info empresa
          new Paragraph({
            children: [
              new TextRun({
                text: "INFORMACIÓN DE LA EMPRESA",
                bold: true,
                size: 24
              })
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 200 }
          }),

          new Paragraph({
            children: [
              new TextRun(`Empresa: ${data.nombre_empresa || ''}`),
              new TextRun("\n"),
              new TextRun(`Teléfono: ${data.telefono_empresa || ''}`),
              new TextRun("\n"),
              new TextRun(`RUT: ${data.rut_empresa || ''}`),
              new TextRun("\n"),
              new TextRun(`Email: ${data.email_empresa || ''}`),
              new TextRun("\n"),
              new TextRun(`Dirección: ${data.direccion_empresa || ''}`)
            ],
            spacing: { after: 300 }
          }),

          // Info cliente
          new Paragraph({
            children: [
              new TextRun({
                text: "INFORMACIÓN DEL CLIENTE",
                bold: true,
                size: 24
              })
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 200 }
          }),

          new Paragraph({
            children: [
              new TextRun(`Cliente: ${data.nombre_cliente || ''}`),
              new TextRun("\n"),
              new TextRun(`Obra: ${data.obra_cliente || ''}`),
              new TextRun("\n"),
              new TextRun(`Contacto: ${data.contacto_cliente || ''}`),
              new TextRun("\n"),
              new TextRun(`Email: ${data.email_cliente || ''}`),
              new TextRun("\n"),
              new TextRun(`Dirección: ${data.direccion_cliente || ''}`)
            ],
            spacing: { after: 300 }
          }),

          // Tabla de productos
          new Paragraph({
            children: [
              new TextRun({
                text: "DETALLE DE PRODUCTOS",
                bold: true,
                size: 24
              })
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 200 }
          }),

          // crear tabla de productos
          this.createProductsTable(data.productos, data.moneda),

          // Condiciones
          new Paragraph({
            children: [
              new TextRun({
                text: "CONDICIONES",
                bold: true,
                size: 24
              })
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),

          new Paragraph({
            children: [
              new TextRun(`Fecha: ${data.fecha || ''}`),
              new TextRun("\n"),
              new TextRun(`Validez de la oferta: ${data.validez_oferta || ''}`),
              new TextRun("\n"),
              new TextRun(`Forma de pago: ${data.forma_pago || ''}`),
              new TextRun("\n"),
              new TextRun(`El presupuesto incluye: ${data.presupuesto_incluye || ''}`),
              new TextRun("\n"),
              new TextRun(`Moneda: ${data.moneda || 'CLP'}`)
            ],
            spacing: { after: 300 }
          })
        ]
      }]
    });

    // descargar el archivo
    this.downloadDocument(doc);
  }

  private createProductsTable(productos: any[], moneda: string): Table {
    // FILAS DEL ENCABEZADO
    const headerRow = new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "Producto", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 20, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "Descripción", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 30, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "Unidad", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 10, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "Cantidad", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 10, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "Valor Unitario", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 15, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "Total", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 15, type: WidthType.PERCENTAGE }
        })
      ]
    });

    // FILAS DE PRODUCTOS
    const productRows = productos.map(producto => {
      const total = (producto.cantidad || 0) * (producto.valorUnitario || 0);
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(producto.producto || '')]
          }),
          new TableCell({
            children: [new Paragraph(producto.descripcion || '')]
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun(producto.unidad || '')],
              alignment: AlignmentType.CENTER
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun((producto.cantidad || 0).toString())],
              alignment: AlignmentType.CENTER
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun(this.formatCurrency(producto.valorUnitario || 0, moneda))],
              alignment: AlignmentType.RIGHT
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun(this.formatCurrency(total, moneda))],
              alignment: AlignmentType.RIGHT
            })]
          })
        ]
      });
    });

    // Calcular total general
    const totalGeneral = productos.reduce((sum, producto) => {
      return sum + ((producto.cantidad || 0) * (producto.valorUnitario || 0));
    }, 0);

    // Fila de total
    const totalRow = new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("")] }),
        new TableCell({ children: [new Paragraph("")] }),
        new TableCell({ children: [new Paragraph("")] }),
        new TableCell({ children: [new Paragraph("")] }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "TOTAL:", bold: true })],
            alignment: AlignmentType.RIGHT
          })]
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ 
              text: this.formatCurrency(totalGeneral, moneda), 
              bold: true 
            })],
            alignment: AlignmentType.RIGHT
          })]
        })
      ]
    });

    return new Table({
      rows: [headerRow, ...productRows, totalRow],
      width: { size: 100, type: WidthType.PERCENTAGE }
    });
  }

  private formatCurrency(amount: number, currency: string): string {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency === 'CLP' ? 'CLP' : 'USD',
      minimumFractionDigits: 0
    });
    return formatter.format(amount);
  }

  private downloadDocument(doc: Document) {
    // blob del documento
    import('docx').then(({ Packer }) => {
      Packer.toBlob(doc).then(blob => {
        const fileName = `Cotizacion_${new Date().getTime()}.docx`;
        saveAs(blob, fileName);
        console.log('Documento generado exitosamente');
      }).catch(error => {
        console.error('Error al generar el documento:', error);
      });
    });
  }

  generar_pdf() {
    console.log('Generando PDF...');
  }
  

}
