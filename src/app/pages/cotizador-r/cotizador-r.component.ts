<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
=======
import { Component, inject, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> Stashed changes
=======
import { Component, inject, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> Stashed changes
import { Document, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, 
         HeadingLevel, WidthType, PageOrientation, convertInchesToTwip,BorderStyle, 
         ShadingType, UnderlineType, Header} from 'docx';
import { saveAs } from 'file-saver';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { jsPDF } from 'jspdf';
import {autoTable} from 'jspdf-autotable';
import { AuthService } from '../../services/auth.service';
import { ApicrudService } from '../../services/apicrud.service';
import { ICotizacion, IProductoCotizacion, IUsuarioGPD } from '../interfaces/interfaces';
=======
=======
>>>>>>> Stashed changes
import { DecimalPipe } from '@angular/common';
import { ApicrudService } from '../../services/apicrud.service';
import { jsPDF } from 'jspdf';
import {autoTable} from 'jspdf-autotable';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

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
}>;

type Form = FormGroup<{
  nro_cotizacion: FormControl<string>;
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
  selector: 'app-cotizador-r',
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  imports: [ReactiveFormsModule, CommonModule],
=======
  imports: [ReactiveFormsModule, DecimalPipe],
>>>>>>> Stashed changes
=======
  imports: [ReactiveFormsModule, DecimalPipe],
>>>>>>> Stashed changes
  templateUrl: './cotizador-r.component.html',
  styleUrl: './cotizador-r.component.css'
})

<<<<<<< Updated upstream
<<<<<<< Updated upstream
export class CotizadorRComponent implements OnInit {
  title = 'COTIZADOR DE INSTACOTIZA - USUARIOS REGISTRADOS';
  formBuilder = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  apiService = inject(ApicrudService);
  router = inject(Router);

  // Propiedades para usuarios registrados
  usuario: IUsuarioGPD | null = null;
  cotizacionesGuardadas: ICotizacion[] = [];
  cotizacionActual: ICotizacion | null = null;
  cargandoCotizaciones = false;
  
  // Formulario
  form: Form = this.formBuilder.group({
    nro_cotizacion: this.formBuilder.control('', Validators.required),
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

=======
=======
>>>>>>> Stashed changes
export class CotizadorRComponent {
  constructor(private apiCrud: ApicrudService) {}

  title = 'COTIZADOR DE INSTACOTIZA';
  formBuilder = inject(NonNullableFormBuilder);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  get productosArray(): FormArray<productForm> {
    return this.form.get('productos') as FormArray<productForm>;
  }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  ngOnInit() {
    this.verificarUsuarioAutenticado();
    this.cargarDatosUsuario();
  }

  // Verificar autenticación
  private verificarUsuarioAutenticado() {
    if (!this.authService.IsLogged()) {
      alert('Debe iniciar sesión para acceder al cotizador de usuarios registrados.');
      this.router.navigate(['/login']);
      return;
    }
  }

  // Cargar datos del usuario y sus cotizaciones
  private cargarDatosUsuario() {
    const correoUsuario = sessionStorage.getItem('correo');
    if (!correoUsuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.GetUserById(correoUsuario).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.usuario = response[0];
          this.cotizacionesGuardadas = this.usuario?.cotizaciones || [];
          console.log('Usuario cargado:', this.usuario);
          console.log('Cotizaciones del usuario:', this.cotizacionesGuardadas);
        }
      },
      error: (error) => {
        console.error('Error al cargar datos del usuario:', error);
        alert('Error al cargar los datos del usuario');
      }
    });
  }

  // ============== FUNCIONES PARA USUARIOS REGISTRADOS ==============

  // Guardar cotización en la base de datos
  guardarCotizacionBD() {
    if (!this.form.valid) {
      alert('Por favor, complete todos los campos antes de guardar la cotización');
      return;
    }

    if (!this.usuario) {
      alert('Error: No se encontró información del usuario');
      return;
    }

    const formValue = this.form.value;
    const cotizacionData: ICotizacion = {
      nro_cotizacion: formValue.nro_cotizacion || '',
      nombre_empresa: formValue.nombre_empresa || '',
      telefono_empresa: formValue.telefono_empresa || '',
      rut_empresa: formValue.rut_empresa || '',
      email_empresa: formValue.email_empresa || '',
      direccion_empresa: formValue.direccion_empresa || '',
      nombre_cliente: formValue.nombre_cliente || '',
      obra_cliente: formValue.obra_cliente || '',
      contacto_cliente: formValue.contacto_cliente || '',
      email_cliente: formValue.email_cliente || '',
      direccion_cliente: formValue.direccion_cliente || '',
      fecha: formValue.fecha || '',
      validez_oferta: formValue.validez_oferta || '',
      forma_pago: formValue.forma_pago || '',
      presupuesto_incluye: formValue.presupuesto_incluye || '',
      moneda: formValue.moneda || 'CLP',
      productos: formValue.productos?.map((prod: any) => ({
        producto: prod.producto || '',
        descripcion: prod.descripcion || '',
        unidad: prod.unidad || '',
        cantidad: prod.cantidad || 0,
        valorUnitario: prod.valorUnitario || 0
      })) || [],
      usuario_id: this.usuario.id,
      fecha_creacion: new Date().toISOString(),
      fecha_modificacion: new Date().toISOString()
    };

    // Remover el logo del objeto a guardar
    delete (cotizacionData as any).logo;

    console.log('Guardando cotización:', cotizacionData);

    // Agregar la cotización al array de cotizaciones del usuario
    const cotizacionesActualizadas = [...(this.usuario.cotizaciones || []), cotizacionData];
    
    // Actualizar usuario con la nueva cotización
    const usuarioActualizado = {
      ...this.usuario,
      cotizaciones: cotizacionesActualizadas
    };

    delete (usuarioActualizado as any).id; // Remover ID para la actualización

    this.apiService.actualizarUsuario(this.usuario.id, usuarioActualizado).subscribe({
      next: (response) => {
        console.log('Cotización guardada exitosamente:', response);
        alert('Cotización guardada exitosamente');
        
        // Actualizar datos locales
        this.usuario = response;
        this.cotizacionesGuardadas = response.cotizaciones || [];
        this.cotizacionActual = cotizacionData;
      },
      error: (error) => {
        console.error('Error al guardar la cotización:', error);
        alert('Error al guardar la cotización. Por favor, intente nuevamente.');
      }
    });
  }

  // Cargar cotización existente
  cargarCotizacionBD(cotizacion: ICotizacion) {
    const confirmar = confirm(`¿Desea cargar la cotización N° ${cotizacion.nro_cotizacion}? Se reemplazarán los datos actuales.`);
    
    if (!confirmar) {
      return;
    }

    try {
      // Limpiar productos actuales
      this.productosArray.clear();

      // Cargar datos básicos del formulario
      this.form.patchValue({
        nro_cotizacion: cotizacion.nro_cotizacion,
        nombre_empresa: cotizacion.nombre_empresa,
        telefono_empresa: cotizacion.telefono_empresa,
        rut_empresa: cotizacion.rut_empresa,
        email_empresa: cotizacion.email_empresa,
        direccion_empresa: cotizacion.direccion_empresa,
        nombre_cliente: cotizacion.nombre_cliente,
        obra_cliente: cotizacion.obra_cliente,
        contacto_cliente: cotizacion.contacto_cliente,
        email_cliente: cotizacion.email_cliente,
        direccion_cliente: cotizacion.direccion_cliente,
        fecha: cotizacion.fecha,
        validez_oferta: cotizacion.validez_oferta,
        forma_pago: cotizacion.forma_pago,
        presupuesto_incluye: cotizacion.presupuesto_incluye,
        moneda: cotizacion.moneda || 'CLP',
        logo: null
      });

      // Cargar productos
      if (cotizacion.productos && cotizacion.productos.length > 0) {
        cotizacion.productos.forEach((producto) => {
          const productoForm = this.formBuilder.group({
            producto: this.formBuilder.control<Producto | null>(null, Validators.required),
            descripcion: this.formBuilder.control(producto.descripcion, Validators.required),
            unidad: this.formBuilder.control(producto.unidad, Validators.required),
            cantidad: this.formBuilder.control(producto.cantidad, [Validators.required, Validators.min(0)]),
            valorUnitario: this.formBuilder.control(producto.valorUnitario, [Validators.required, Validators.min(0)])
          });
          
          // Setear el valor del producto después de crear el form
          productoForm.patchValue({ 
            producto: {
              producto: producto.producto,
              descripcion: producto.descripcion,
              unidad: producto.unidad,
              cantidad: producto.cantidad,
              valorUnitario: producto.valorUnitario,
              total: producto.cantidad * producto.valorUnitario
            } as Producto
          });
          
          this.productosArray.push(productoForm);
        });
      } else {
        // Si no hay productos, agregar uno vacío
        this.productosArray.push(this.createProductForm());
      }

      this.cotizacionActual = cotizacion;
      console.log('Cotización cargada exitosamente');
      alert('Cotización cargada exitosamente');
      
    } catch (error) {
      console.error('Error al cargar la cotización:', error);
      alert('Error al cargar la cotización');
    }
  }

  // Eliminar cotización de la base de datos
  eliminarCotizacionBD(cotizacion: ICotizacion) {
    const confirmar = confirm(`¿Está seguro que desea eliminar la cotización N° ${cotizacion.nro_cotizacion}?`);
    
    if (!confirmar || !this.usuario) {
      return;
    }

    // Filtrar cotizaciones para remover la seleccionada
    const cotizacionesFiltradas = this.usuario.cotizaciones.filter(
      c => c.nro_cotizacion !== cotizacion.nro_cotizacion || c.fecha_creacion !== cotizacion.fecha_creacion
    );

    const usuarioActualizado = {
      ...this.usuario,
      cotizaciones: cotizacionesFiltradas
    };

    delete (usuarioActualizado as any).id;

    this.apiService.actualizarUsuario(this.usuario.id, usuarioActualizado).subscribe({
      next: (response) => {
        console.log('Cotización eliminada exitosamente');
        alert('Cotización eliminada exitosamente');
        
        // Actualizar datos locales
        this.usuario = response;
        this.cotizacionesGuardadas = response.cotizaciones || [];
        
        // Si la cotización eliminada era la actual, limpiar referencia
        if (this.cotizacionActual?.nro_cotizacion === cotizacion.nro_cotizacion) {
          this.cotizacionActual = null;
        }
      },
      error: (error) => {
        console.error('Error al eliminar la cotización:', error);
        alert('Error al eliminar la cotización. Por favor, intente nuevamente.');
=======
=======
>>>>>>> Stashed changes
  limpiarFormulario() {
    if (confirm('¿Está seguro que desea limpiar el formulario? Se perderán todos los datos no guardados.')) {
      this.form.reset({
        nro_cotizacion: '',
        nombre_empresa: '',
        telefono_empresa: '',
        rut_empresa: '',
        email_empresa: '',
        direccion_empresa: '',
        productos: [],
        nombre_cliente: '',
        obra_cliente: '',
        contacto_cliente: '',
        email_cliente: '',
        direccion_cliente: '',
        fecha: '',
        validez_oferta: '',
        forma_pago: '',
        presupuesto_incluye: '',
        moneda: 'CLP',
        logo: null
      });
    }
  }

  //METODOS DE ICTZ-ONLINE (GUARDAR Y CARGAR COTIZACION)
  guardarCotizacion() {
    console.log('Guardando cotización en la base de datos...');
    if (this.form.valid) {
      const formData = this.form.value;
      const userId = sessionStorage.getItem('id')
      if (!userId){
        alert('No se encontró usuario logueado. Por favor, inicie sesión nuevamente.');
        console.log('No se encontró usuario logueado. Por favor, inicie sesión nuevamente.');
        return;
      }

      // crear objeto cotizacion
      const cotizacionData: any = {
        ...formData,
        fecha_creacion: new Date().toISOString()
      };

      if (cotizacionData.logo){
        delete cotizacionData.logo; // elimino el logo porque da error al guardar xd
      }

      // guardando coti
      this.apiCrud.agregarCotizacion(userId, cotizacionData).subscribe({
        next: (response) => {
          console.log('Cotización guardada exitosamente:', response);
          alert('Cotización guardada exitosamente');

          if (response.totalCotizaciones){
            console.log(`Total cotizaciones del usuario: ${response.totalCotizaciones}`);
          }
        },
        error: (error) => {
          console.error('Error al guardar la cotización:', error);
          alert('Error al guardar la cotización. Por favor, intente nuevamente más tarde.');
        }
      });
    } else {
      console.log('Formulario inválido - No se puede guardar');
      alert('Por favor, complete todos los campos antes de guardar la cotización');
    }
  }

  cargarCotizacion() {
    console.log('Cargar cotización en la base de datos...');
    const userId = sessionStorage.getItem('id');
    if (!userId){
      alert('No se encontró usuario logueado. Por favor, inicie sesión nuevamente.');
      return;
    }

    this.apiCrud.buscarUsuarioPorId(userId).subscribe({
      next: (user) => {
        if (user && user.cotizaciones && user.cotizaciones.length > 0) {
          this.mostrarListaCotizaciones(user.cotizaciones);
        } else {
          alert('No se encontraron cotizaciones guardadas para este usuario.');
        }
      },
      error: (error) => {
        console.error('Error al buscar usuario:', error);
        alert('Error al buscar usuario. Por favor, intente nuevamente más tarde.');
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      }
    });
  }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // Actualizar cotización existente
  actualizarCotizacionBD() {
    if (!this.form.valid) {
      alert('Por favor, complete todos los campos antes de actualizar la cotización');
      return;
    }

    if (!this.cotizacionActual || !this.usuario) {
      alert('No hay cotización actual para actualizar');
      return;
    }

    const formValue = this.form.value;
    const cotizacionActualizada: ICotizacion = {
      nro_cotizacion: formValue.nro_cotizacion || '',
      nombre_empresa: formValue.nombre_empresa || '',
      telefono_empresa: formValue.telefono_empresa || '',
      rut_empresa: formValue.rut_empresa || '',
      email_empresa: formValue.email_empresa || '',
      direccion_empresa: formValue.direccion_empresa || '',
      nombre_cliente: formValue.nombre_cliente || '',
      obra_cliente: formValue.obra_cliente || '',
      contacto_cliente: formValue.contacto_cliente || '',
      email_cliente: formValue.email_cliente || '',
      direccion_cliente: formValue.direccion_cliente || '',
      fecha: formValue.fecha || '',
      validez_oferta: formValue.validez_oferta || '',
      forma_pago: formValue.forma_pago || '',
      presupuesto_incluye: formValue.presupuesto_incluye || '',
      moneda: formValue.moneda || 'CLP',
      productos: formValue.productos?.map((prod: any) => ({
        producto: prod.producto || '',
        descripcion: prod.descripcion || '',
        unidad: prod.unidad || '',
        cantidad: prod.cantidad || 0,
        valorUnitario: prod.valorUnitario || 0
      })) || [],
      id: this.cotizacionActual.id,
      usuario_id: this.usuario.id,
      fecha_creacion: this.cotizacionActual.fecha_creacion || new Date().toISOString(),
      fecha_modificacion: new Date().toISOString()
    };

    delete (cotizacionActualizada as any).logo;

    // Encontrar y reemplazar la cotización en el array
    const cotizacionesActualizadas = this.usuario.cotizaciones.map(c => 
      (c.nro_cotizacion === this.cotizacionActual?.nro_cotizacion && 
       c.fecha_creacion === this.cotizacionActual?.fecha_creacion) 
        ? cotizacionActualizada 
        : c
    );

    const usuarioActualizado = {
      ...this.usuario,
      cotizaciones: cotizacionesActualizadas
    };

    delete (usuarioActualizado as any).id;

    this.apiService.actualizarUsuario(this.usuario.id, usuarioActualizado).subscribe({
      next: (response) => {
        console.log('Cotización actualizada exitosamente');
        alert('Cotización actualizada exitosamente');
        
        this.usuario = response;
        this.cotizacionesGuardadas = response.cotizaciones || [];
        this.cotizacionActual = cotizacionActualizada;
      },
      error: (error) => {
        console.error('Error al actualizar la cotización:', error);
        alert('Error al actualizar la cotización. Por favor, intente nuevamente.');
      }
    });
  }

  // Nueva cotización (limpiar formulario)
  nuevaCotizacion() {
    const confirmar = confirm('¿Desea crear una nueva cotización? Se perderán los datos no guardados.');
    
    if (!confirmar) {
      return;
    }

    this.form.reset();
    this.form.patchValue({ moneda: 'CLP' });
    
    // Limpiar productos y agregar uno vacío
    this.productosArray.clear();
    this.productosArray.push(this.createProductForm());
    
    this.cotizacionActual = null;
    console.log('Nueva cotización iniciada');
  }

  // Función helper para calcular total de cotización guardada
  calcularTotalCotizacion(cotizacion: ICotizacion): number {
    const subtotal = cotizacion.productos.reduce((sum, p) => sum + (p.cantidad * p.valorUnitario), 0);
    return subtotal * 1.19; // Incluye IVA
  }

  //MÉTODOS DE ICTZ-OFFLINE (EXPORTACION E IMPORTACION)
=======
=======
>>>>>>> Stashed changes

  //temporal!! hay que poner la UI que aparezca una lista de las cotizaciones guardadas
  private mostrarListaCotizaciones(cotizaciones: any[]) {
    let mensaje = 'Seleccione una cotización para cargar:\n\n';
    
    cotizaciones.forEach((cotizacion, index) => {
      mensaje += `${index + 1}. ${cotizacion.nro_cotizacion || 'Sin número'} - ${cotizacion.nombre_cliente || 'Sin cliente'} (${cotizacion.fecha || 'Sin fecha'})\n`;
    });

    const seleccion = prompt(mensaje + '\nIngrese el número de la cotización:');
    
    if (seleccion) {
      const indice = parseInt(seleccion) - 1;
      if (indice >= 0 && indice < cotizaciones.length) {
        this.cargarDatosEnFormulario(cotizaciones[indice]);
        alert('Cotización cargada exitosamente');
      } else {
        alert('Selección inválida');
      }
    }
  }

  //MÉTODOS DE ICTZ-OFFLINE (EXPORTACION E IMPORTACION) con JSONS
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  exportar_cotizacion() {
    console.log('Exportando cotización como plantilla...');
    
    if (this.form.valid) {
      // sacar todos los datos del formulario
      const formData = this.form.value;

<<<<<<< Updated upstream
<<<<<<< Updated upstream
      // saco el logo porque da error la cuestion
=======
      // saco el logo porque da error la cuestion.......
>>>>>>> Stashed changes
=======
      // saco el logo porque da error la cuestion.......
>>>>>>> Stashed changes
      const datosParaExportar = { ...formData};
      delete datosParaExportar.logo;

      // creo objeto de plantilla con metadatos
      const plantilla = {
        nombre_plantilla: `Cotización_${formData.nro_cotizacion || 'Template'}`,
        fecha_creacion: new Date().toISOString(),
        version: '1.0',
        datos: formData
      };
      
      // Convertir a JSON
      const jsonString = JSON.stringify(plantilla, null, 2);
      
      // Crear blob y descargar
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Crear elemento de descarga
      const a = document.createElement('a');
      a.href = url;
      a.download = `plantilla_cotizacion_${formData.nro_cotizacion || new Date().getTime()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Limpiar URL
      URL.revokeObjectURL(url);
      
      console.log('Plantilla exportada exitosamente');
      alert('Plantilla exportada exitosamente');
      
    } else {
      console.log('Formulario inválido - No se puede exportar');
      alert('Por favor, complete todos los campos antes de exportar la plantilla');
    }
  }

  importar_cotizacion() {
    console.log('Importando cotización desde plantilla...');
    
    // input file oculto
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      
      if (file && file.type === 'application/json') {
        const reader = new FileReader();
        
        reader.onload = (e: any) => {
          try {
            const plantillaData = JSON.parse(e.target.result);
            
            // Validar estructura de la plantilla
            if (this.validarEstructuraPlantilla(plantillaData)) {
              this.cargarDatosEnFormulario(plantillaData.datos);
              console.log('Plantilla importada exitosamente');
              alert('Plantilla importada exitosamente');
            } else {
              console.error('Estructura de plantilla inválida');
              alert('El archivo JSON no tiene la estructura correcta de una plantilla de cotización');
            }
            
          } catch (error) {
            console.error('Error al parsear JSON:', error);
            alert('Error al leer el archivo JSON. Verifique que el archivo sea válido.');
          }
        };
        
        reader.readAsText(file);
      } else {
        alert('Por favor, seleccione un archivo JSON válido');
      }
      
      // Limpiar input
      document.body.removeChild(input);
    };
    
    // Agregar al DOM y hacer clic
    document.body.appendChild(input);
    input.click();
  }

  // validac/ del json
  private validarEstructuraPlantilla(plantilla: any): boolean {
    // Verificar estructura básica
    if (!plantilla || !plantilla.datos) {
      return false;
    }
    
    const datos = plantilla.datos;
    
    // campos de empresa
    const camposEmpresa = ['nro_cotizacion', 'nombre_empresa', 'telefono_empresa', 
                          'rut_empresa', 'email_empresa', 'direccion_empresa'];
    
    // campos de cliente  
    const camposCliente = ['nombre_cliente', 'obra_cliente', 'contacto_cliente',
                          'email_cliente', 'direccion_cliente'];
    
    // campos de condiciones
    const camposCondiciones = ['fecha', 'validez_oferta', 'forma_pago', 
                              'presupuesto_incluye', 'moneda'];
    
    const todosCampos = [...camposEmpresa, ...camposCliente, ...camposCondiciones];
    
    // Verificar que existan todod los campos
    for (const campo of todosCampos) {
      if (!(campo in datos)) {
        console.error(`Falta el campo: ${campo}`);
        return false;
      }
    }
    
    // Verificar que tenga productos
    if (!datos.productos || !Array.isArray(datos.productos)) {
      console.error('Falta array de productos');
      return false;
    }
    
    // Verificar estructura de prodyuctos
    for (const producto of datos.productos) {
      const camposProducto = ['producto', 'descripcion', 'unidad', 'cantidad', 'valorUnitario'];
      for (const campo of camposProducto) {
        if (!(campo in producto)) {
          console.error(`Falta el campo de producto: ${campo}`);
          return false;
        }
      }
    }
    
    return true;
  }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // Cargar datos de la plantilla en el forms
=======
  // Cargar datos de la plantilla-json en el forms
>>>>>>> Stashed changes
=======
  // Cargar datos de la plantilla-json en el forms
>>>>>>> Stashed changes
  private cargarDatosEnFormulario(datos: any) {
    // Confirmar si el usuario quiere reemplazar los datos actuales
    const confirmar = confirm('¿Está seguro que desea cargar esta plantilla? Se reemplazarán todos los datos actuales de la cotización.');
    
    if (!confirmar) {
      return;
    }
    
    try {
      // Limpiar productos actuales (dejar solo uno vacío)
      while (this.productosArray.length > 1) {
        this.productosArray.removeAt(this.productosArray.length - 1);
      }
      
      // Cargar datos del formulario
      this.form.patchValue({
        nro_cotizacion: datos.nro_cotizacion || '',
        nombre_empresa: datos.nombre_empresa || '',
        telefono_empresa: datos.telefono_empresa || '',
        rut_empresa: datos.rut_empresa || '',
        email_empresa: datos.email_empresa || '',
        direccion_empresa: datos.direccion_empresa || '',
        nombre_cliente: datos.nombre_cliente || '',
        obra_cliente: datos.obra_cliente || '',
        contacto_cliente: datos.contacto_cliente || '',
        email_cliente: datos.email_cliente || '',
        direccion_cliente: datos.direccion_cliente || '',
        fecha: datos.fecha || '',
        validez_oferta: datos.validez_oferta || '',
        forma_pago: datos.forma_pago || '',
        presupuesto_incluye: datos.presupuesto_incluye || '',
        moneda: datos.moneda || 'CLP',
        logo: datos.logo || null
      });
      
      // Limpiar array de productos actual
      this.productosArray.clear();
      
      // Cargar productos
      if (datos.productos && datos.productos.length > 0) {
        datos.productos.forEach((producto: any) => {
          const productoForm = this.formBuilder.group({
            producto: this.formBuilder.control(producto.producto || '', Validators.required),
            descripcion: this.formBuilder.control(producto.descripcion || '', Validators.required),
            unidad: this.formBuilder.control(producto.unidad || '', Validators.required),
            cantidad: this.formBuilder.control(producto.cantidad || 0, [Validators.required, Validators.min(0)]),
            valorUnitario: this.formBuilder.control(producto.valorUnitario || 0, [Validators.required, Validators.min(0)])
          });
          
          this.productosArray.push(productoForm);
        });
      } else {
        // Si no hay productos, se coloca uno vacio
        this.productosArray.push(this.createProductForm());
      }
      
      console.log('Formulario actualizado con datos de la plantilla');
      
    } catch (error) {
      console.error('Error al cargar datos en el formulario:', error);
      alert('Error al cargar los datos de la plantilla en el formulario');
    }
  }

  //MÉTODOS DEL FORMULARIO!

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
  form: Form = this.formBuilder.group({
    nro_cotizacion: this.formBuilder.control('', Validators.required),
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

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  createProductForm(): productForm {
    return this.formBuilder.group({
      producto: this.formBuilder.control<Producto | null>(null, Validators.required),
      descripcion: this.formBuilder.control('', Validators.required),
      unidad: this.formBuilder.control('', Validators.required),
      cantidad: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      valorUnitario: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
    });
  }

  // total = cantidad * valorUnitario para las fila
  getTotal(index: number): number {
    const item = this.productosArray.at(index);
    if (!item) return 0;
    const cantidad = item.get('cantidad')?.value || 0;
    const valor = item.get('valorUnitario')?.value || 0;
    return cantidad * valor;
  }

  // subtotal = suma de (cantidad * valorUnitario) de todos los productos
  getSubtotal(): number {
    return this.productosArray.controls.reduce((acc, control) => {
      const cantidad = control.get('cantidad')?.value || 0;
      const valor = control.get('valorUnitario')?.value || 0;
      return acc + (cantidad * valor);
    }, 0);
  }

  // iva = subtotal * 0.19
  getIVA(): number {
    return this.getSubtotal() * 0.19;
  }

  // total cotización = subtotal + iva
  getTotalCotizacion(): number {
    return this.getSubtotal() + this.getIVA();
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

  // FUNCION PARA GENERAR DOCX!!

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
    const doc = new Document({
      styles: {
        default:{
          document:{
            run:{
              font: "Arial",
              size: 22,
            },
            paragraph:{
              spacing: { after: 120}
            }
          }
        }
      },
      sections: [
        {
          properties: {
            page: {
              size: {
                orientation: PageOrientation.PORTRAIT,
                width: convertInchesToTwip(8.5),
                height: convertInchesToTwip(11),
              },
              margin: {
                top: convertInchesToTwip(0.8),
                right: convertInchesToTwip(0.75),
                bottom: convertInchesToTwip(0.8),
                left: convertInchesToTwip(0.75),
              },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Table({
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: data.nombre_empresa || '',
                                  bold: true,
                                  size: 20,
                                }),
                              ],
                            }),
                            new Paragraph(`RUT: ${data.rut_empresa || ''}`),
                            new Paragraph(`Tel: ${data.telefono_empresa || ''}`),
                            new Paragraph(`Email: ${data.email_empresa || ''}`),
                            new Paragraph(
                              `Dirección: ${data.direccion_empresa || ''}`
                            ),
                          ],
                          width: { size: 60, type: WidthType.PERCENTAGE },
                          borders: {
                            top: { style: 'none' },
                            bottom: { style: 'none' },
                            left: { style: 'none' },
                            right: { style: 'none' },
                          },
                        }),
                        new TableCell({
                          children: [new Paragraph('')],
                          width: { size: 40, type: WidthType.PERCENTAGE },
                          borders: {
                            top: { style: 'none' },
                            bottom: { style: 'none' },
                            left: { style: 'none' },
                            right: { style: 'none' },
                          },
                        }),
                      ],
                    }),
                  ],
                  width: { size: 100, type: WidthType.PERCENTAGE },
                }),
              ],
            }),
          },

          children: [
            // Espaciado después del encabezado
            new Paragraph({ text: '', spacing: { after: 400 } }),

            // Título principal centrado
            new Paragraph({
              children: [
                new TextRun({
                  text: `Cotización N°${data.nro_cotizacion || ''}`,
                  bold: true,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),

            // Línea separadora
            new Paragraph({
              children: [new TextRun({ text: '________________________', size: 20 })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),

            // Subtítulo
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Oferta Comercial',
                  bold: true,
                  italics: true,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),

            // Tabla de información del cliente
            this.tablaInfoCliente(data),

            new Paragraph({ text: '', spacing: { after: 400 } }),

            // Productos
            this.tablaProductos(data.productos, data.moneda),

            new Paragraph({ text: '', spacing: { after: 400 } }),

            // Resumen de precios
            this.ResumenPrecios(data.productos, data.moneda),

            new Paragraph({ text: '', spacing: { after: 400 } }),

            // Condiciones
            new Paragraph({
              children: [
                new TextRun({ text: 'Condiciones Comerciales', bold: true, size: 22 }),
              ],
              spacing: { after: 200 },
            }),

            new Paragraph({
              children: [
                new TextRun('Valores netos. No Incluyen IVA.'),
                new TextRun('\n'),
                new TextRun(`Validez Oferta: ${data.validez_oferta || ''}`),
                new TextRun('\n'),
                new TextRun(`Forma de Pago: ${data.forma_pago || ''}`),
                new TextRun('\n'),
                new TextRun(
                  `El presupuesto incluye: ${data.presupuesto_incluye || ''}`
                ),
              ],
            }),
          ],
        },
      ],
    });

    this.descargarDoc(doc);
  }

  private tablaInfoCliente(data: any): Table {
    return new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ 
                children: [new TextRun({ text: "Fecha", bold: true })] })],
              width: { size: 30, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
              children: [new Paragraph(data.fecha || '')],
              width: { size: 70, type: WidthType.PERCENTAGE },
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Cliente", bold: true })] })]
            }),
            new TableCell({
              children: [new Paragraph(data.nombre_cliente || '')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Contacto", bold: true })] })]
            }),
            new TableCell({
              children: [new Paragraph(data.contacto_cliente || '')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Obra", bold: true })] })]
            }),
            new TableCell({
              children: [new Paragraph(data.obra_cliente || '')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Dirección Obra", bold: true })] })]
            }),
            new TableCell({
              children: [new Paragraph(data.direccion_cliente || '')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Email", bold: true })] })]
            }),
            new TableCell({
              children: [new Paragraph(data.email_cliente || '')]
            })
          ]
        })
      ],
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: "4472C4" },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "4472C4" },
        left: { style: BorderStyle.SINGLE, size: 4, color: "4472C4" },
        right: { style: BorderStyle.SINGLE, size: 4, color: "4472C4" },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "D9D9D9" }        
      }
    });
  }

  private tablaProductos(productos: any[], moneda: string): Table {
    const headerRow = new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "ÍTEM", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 8, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "PRODUCTO", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 20, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "DESCRIPCIÓN", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 35, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "UNID.", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 8, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "CANT.", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 8, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "VALOR UNIT.", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 12, type: WidthType.PERCENTAGE }
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "TOTAL", bold: true })],
            alignment: AlignmentType.CENTER
          })],
          width: { size: 9, type: WidthType.PERCENTAGE }
        })
      ]
    });

    const productRows = productos.map((producto, index) => {
      const total = (producto.cantidad || 0) * (producto.valorUnitario || 0);
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun((index + 1).toString())],
              alignment: AlignmentType.CENTER
            })]
          }),
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
              children: [new TextRun(this.formatoMoneda(producto.valorUnitario || 0, moneda))],
              alignment: AlignmentType.RIGHT
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun(this.formatoMoneda(total, moneda))],
              alignment: AlignmentType.RIGHT
            })]
          })
        ]
      });
    });

    return new Table({
      rows: [headerRow, ...productRows],
      width: { size: 100, type: WidthType.PERCENTAGE }
    });
  }

  private ResumenPrecios(productos: any[], moneda: string): Table {
    const subtotal = this.getSubtotal();
    const iva = this.getIVA();
    const total = this.getTotalCotizacion();

    return new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "NETO", bold: true })],
                alignment: AlignmentType.RIGHT
              })],
              width: { size: 30, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun(this.formatoMoneda(subtotal, moneda))],
                alignment: AlignmentType.RIGHT
              })],
              width: { size: 70, type: WidthType.PERCENTAGE }
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "IVA (19%):", bold: true })],
                alignment: AlignmentType.RIGHT
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun(this.formatoMoneda(iva, moneda))],
                alignment: AlignmentType.RIGHT
              })]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: "TOTAL", bold: true })],
                alignment: AlignmentType.RIGHT
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ 
                  text: this.formatoMoneda(total, moneda), 
                  bold: true 
                })],
                alignment: AlignmentType.RIGHT
              })]
            })
          ]
        })
      ],
      width: { size: 50, type: WidthType.PERCENTAGE },
      alignment: AlignmentType.RIGHT
    });
  }

  private formatoMoneda(amount: number, currency: string): string {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency === 'CLP' ? 'CLP' : 'USD',
      minimumFractionDigits: 0
    });
    return formatter.format(amount);
  }

  private descargarDoc(doc: Document) {
    // empacado del docx y descarga
    import('docx').then(({ Packer }) => {
      Packer.toBlob(doc).then(blob => {
        const formData = this.form.value;
        const fileName = `nro.${formData.nro_cotizacion}_${formData.nombre_cliente}_${formData.obra_cliente}.docx`;
        saveAs(blob, fileName);
        console.log('Documento generado exitosamente');
      }).catch(error => {
        console.error('Error al generar el documento:', error);
      });
    });
  }
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  // FUNCIÓN PARA GENERAR PDF!!
  generar_pdf() {
    console.log('Generando PDF...');
    
    if (this.form.valid) {
      const formData = this.form.value;
      this.createPDFDocument(formData);
    } else {
      console.log('Formulario inválido');
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  private createPDFDocument(data: any) {
    // Crear documento PDF en tamaño carta
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter' // 8.5" x 11"
    });

    // Configurar fuente
    doc.setFont('helvetica');
    
    let currentY = 20; // Posición Y inicial

    // ENCABEZADO DE LA EMPRESA (esquina superior izquierda)
    this.addEmpresaHeader(doc, data, currentY);
    currentY += 40;

    // TÍTULO PRINCIPAL CENTRADO
    currentY = this.addTituloPrincipal(doc, data, currentY);
    currentY += 15;

    // TABLA DE INFORMACIÓN DEL CLIENTE
    currentY = this.addTablaCliente(doc, data, currentY);
    currentY += 20;

    // TABLA DE PRODUCTOS
    currentY = this.addTablaProductos(doc, data, currentY);
    currentY += 15;

    // RESUMEN FINANCIERO
    currentY = this.addResumenFinanciero(doc, data, currentY);
    currentY += 15;

    // CONDICIONES COMERCIALES
    this.addCondicionesComerciales(doc, data, currentY);

    // Descargar PDF
    this.descargarPDF(doc, data);
  }

  private addEmpresaHeader(doc: jsPDF, data: any, startY: number) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(data.nombre_empresa || '', 20, startY);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`RUT: ${data.rut_empresa || ''}`, 20, startY + 6);
    doc.text(`Tel: ${data.telefono_empresa || ''}`, 20, startY + 12);
    doc.text(`Email: ${data.email_empresa || ''}`, 20, startY + 18);
    doc.text(`Dirección: ${data.direccion_empresa || ''}`, 20, startY + 24);
  }

  private addTituloPrincipal(doc: jsPDF, data: any, startY: number): number {
    // Título principal
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const titulo = `Cotización N°${data.nro_cotizacion || ''}`;
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(titulo);
    doc.text(titulo, (pageWidth - titleWidth) / 2, startY);

    // Línea separadora
    doc.setFontSize(14);
    const linea = '________________________';
    const lineWidth = doc.getTextWidth(linea);
    doc.text(linea, (pageWidth - lineWidth) / 2, startY + 8);

    // Subtítulo "Oferta Comercial"
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bolditalic');
    const subtitulo = 'Oferta Comercial';
    const subtitleWidth = doc.getTextWidth(subtitulo);
    doc.text(subtitulo, (pageWidth - subtitleWidth) / 2, startY + 16);

    return startY + 25;
  }

  private addTablaCliente(doc: jsPDF, data: any, startY: number): number {
    const clienteData = [
      ['Fecha', data.fecha || ''],
      ['Cliente', data.nombre_cliente || ''],
      ['Contacto', data.contacto_cliente || ''],
      ['Obra', data.obra_cliente || ''],
      ['Dirección Obra', data.direccion_cliente || ''],
      ['Email', data.email_cliente || '']
    ];

    autoTable(doc,{
      startY: startY,
      head: [],
      body: clienteData,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3
      },
      columnStyles: {
        0: { 
          fontStyle: 'bold', 
          fillColor: [68, 114, 196], // Color azul profesional
          textColor: [255, 255, 255],
          cellWidth: 50
        },
        1: { 
          fillColor: [248, 249, 250], // Gris claro
          cellWidth: 120 
        }
      },
      margin: { left: 20, right: 20 }
    });

    return (doc as any).lastAutoTable.finalY;
  }

  private addTablaProductos(doc: jsPDF, data: any, startY: number): number {
    // Preparar datos de productos
    const productosData = data.productos.map((producto: any, index: number) => {
      const total = (producto.cantidad || 0) * (producto.valorUnitario || 0);
      return [
        (index + 1).toString(),
        producto.producto || '',
        producto.descripcion || '',
        producto.unidad || '',
        (producto.cantidad || 0).toString(),
        this.formatoMoneda(producto.valorUnitario || 0, data.moneda),
        this.formatoMoneda(total, data.moneda)
      ];
    });

    autoTable(doc,{
      startY: startY,
      head: [['ÍTEM', 'PRODUCTO', 'DESCRIPCIÓN', 'UNID.', 'CANT.', 'VALOR UNIT.', 'TOTAL']],
      body: productosData,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 2
      },
      headStyles: {
        fillColor: [47, 85, 151], // Azul oscuro profesional
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' }, // ÍTEM
        1: { cellWidth: 35 }, // PRODUCTO
        2: { cellWidth: 60 }, // DESCRIPCIÓN
        3: { cellWidth: 20, halign: 'center' }, // UNID.
        4: { cellWidth: 20, halign: 'center' }, // CANT.
        5: { cellWidth: 25, halign: 'right' }, // VALOR UNIT.
        6: { cellWidth: 25, halign: 'right' } // TOTAL
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250] // Filas alternas en gris claro
      },
      margin: { left: 20, right: 20 }
    });

    return (doc as any).lastAutoTable.finalY;
  }

  private addResumenFinanciero(doc: jsPDF, data: any, startY: number): number {
    const subtotal = this.getSubtotal();
    const iva = this.getIVA();
    const total = this.getTotalCotizacion();

    const resumenData = [
      ['SUBTOTAL (NETO)', this.formatoMoneda(subtotal, data.moneda)],
      ['IVA (19%)', this.formatoMoneda(iva, data.moneda)],
      ['TOTAL', this.formatoMoneda(total, data.moneda)]
    ];

    autoTable(doc,{
      startY: startY,
      head: [],
      body: resumenData,
      theme: 'grid',
      styles: {
        fontSize: 12,
        cellPadding: 4,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { 
          halign: 'right',
          cellWidth: 50
        },
        1: { 
          halign: 'right',
          cellWidth: 40
        }
      },
      // Estilo especial para la fila del total
      didParseCell: function (data: any) {
        if (data.row.index === 2) { // Fila del TOTAL
          data.cell.styles.fillColor = [47, 85, 151];
          data.cell.styles.textColor = [255, 255, 255];
        }
      },
      margin: { left: 130 } // Alinear a la derecha
    });

    return (doc as any).lastAutoTable.finalY;
  }

  private addCondicionesComerciales(doc: jsPDF, data: any, startY: number) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Condiciones Comerciales', 20, startY);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const condiciones = [
      'Valores netos. No Incluyen IVA.',
      `Validez Oferta: ${data.validez_oferta || ''}`,
      `Forma de Pago: ${data.forma_pago || ''}`,
      `El presupuesto incluye: ${data.presupuesto_incluye || ''}`
    ];

    let yPos = startY + 8;
    condiciones.forEach(condicion => {
      doc.text(condicion, 20, yPos);
      yPos += 6;
    });
  }

  private descargarPDF(doc: jsPDF, data: any) {
    const fileName = `nro.${data.nro_cotizacion}_${data.nombre_cliente}_${data.obra_cliente}.pdf`;
    doc.save(fileName);
    console.log('PDF generado exitosamente');
  }
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

}
